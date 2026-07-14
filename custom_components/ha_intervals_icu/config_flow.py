"""Config flow for ha-intervals-icu."""

from __future__ import annotations

import aiohttp
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.const import CONF_API_KEY

from .api import (
    IntervalsICUClient,
    IntervalsICUAuthenticationError,
)
from .const import (
    CONF_ATHLETE_ID,
    DOMAIN,
)


class IntervalsICUConfigFlow(
    config_entries.ConfigFlow,
    domain=DOMAIN,
):
    """Handle a config flow for ha-intervals-icu."""

    VERSION = 1

    async def async_step_user(
        self,
        user_input=None,
    ):
        """Handle the initial setup."""

        errors = {}

        if user_input is not None:

            try:
                async with aiohttp.ClientSession() as session:

                    client = IntervalsICUClient(
                        athlete_id=user_input[CONF_ATHLETE_ID],
                        api_key=user_input[CONF_API_KEY],
                        session=session,
                    )

                    await client.get_athlete()

            except IntervalsICUAuthenticationError:
                errors["base"] = "invalid_auth"

            except Exception:
                errors["base"] = "cannot_connect"

            else:

                return self.async_create_entry(
                    title="ha-intervals-icu",
                    data=user_input,
                )

        schema = vol.Schema(
            {
                vol.Required(
                    CONF_ATHLETE_ID
                ): str,

                vol.Required(
                    CONF_API_KEY
                ): str,
            }
        )

        return self.async_show_form(
            step_id="user",
            data_schema=schema,
            errors=errors,
        )
