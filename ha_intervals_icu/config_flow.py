"""Config flow for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.config_entries import ConfigFlowResult
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import (
    IntervalsICUAuthenticationError,
    IntervalsICUClient,
    IntervalsICUConnectionError,
)
from .const import CONF_API_KEY, CONF_ATHLETE_ID, DOMAIN


async def _validate_input(
    hass: HomeAssistant,
    data: dict[str, Any],
) -> dict[str, Any]:
    """Validate user credentials and return the athlete profile."""

    client = IntervalsICUClient(
        athlete_id=data[CONF_ATHLETE_ID].strip(),
        api_key=data[CONF_API_KEY].strip(),
        session=async_get_clientsession(hass),
    )

    return await client.get_athlete()


class IntervalsICUConfigFlow(
    config_entries.ConfigFlow,
    domain=DOMAIN,
):
    """Handle a config flow for ha-intervals-icu."""

    VERSION = 1

    async def async_step_user(
        self,
        user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Handle the initial setup step."""

        errors: dict[str, str] = {}

        if user_input is not None:
            user_input = {
                CONF_ATHLETE_ID: user_input[CONF_ATHLETE_ID].strip(),
                CONF_API_KEY: user_input[CONF_API_KEY].strip(),
            }

            try:
                athlete = await _validate_input(
                    self.hass,
                    user_input,
                )

            except IntervalsICUAuthenticationError:
                errors["base"] = "invalid_auth"

            except IntervalsICUConnectionError:
                errors["base"] = "cannot_connect"

            except Exception:
                errors["base"] = "unknown"

            else:
                await self.async_set_unique_id(user_input[CONF_ATHLETE_ID])
                self._abort_if_unique_id_configured()

                return self.async_create_entry(
                    title=athlete.get(
                        "name",
                        user_input[CONF_ATHLETE_ID],
                    ),
                    data=user_input,
                )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_ATHLETE_ID): str,
                    vol.Required(CONF_API_KEY): str,
                }
            ),
            errors=errors,
        )

    async def async_step_reauth(
        self,
        entry_data: dict[str, Any],
    ) -> ConfigFlowResult:
        """Start reauthentication for an existing entry."""

        self._reauth_entry = self.hass.config_entries.async_get_entry(
            self.context["entry_id"]
        )

        if self._reauth_entry is None:
            return self.async_abort(reason="reauth_entry_missing")

        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self,
        user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Validate and save replacement credentials."""

        errors: dict[str, str] = {}

        if user_input is not None:
            new_data = {
                CONF_ATHLETE_ID: self._reauth_entry.data[CONF_ATHLETE_ID],
                CONF_API_KEY: user_input[CONF_API_KEY].strip(),
            }

            try:
                athlete = await _validate_input(
                    self.hass,
                    new_data,
                )

            except IntervalsICUAuthenticationError:
                errors["base"] = "invalid_auth"

            except IntervalsICUConnectionError:
                errors["base"] = "cannot_connect"

            except Exception:
                errors["base"] = "unknown"

            else:
                self.hass.config_entries.async_update_entry(
                    self._reauth_entry,
                    title=athlete.get(
                        "name",
                        self._reauth_entry.title,
                    ),
                    data=new_data,
                )
                await self.hass.config_entries.async_reload(self._reauth_entry.entry_id)
                return self.async_abort(reason="reauth_successful")

        return self.async_show_form(
            step_id="reauth_confirm",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_API_KEY): str,
                }
            ),
            errors=errors,
        )
