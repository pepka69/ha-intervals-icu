"""Config flow for ha-intervals-icu."""

from __future__ import annotations

import aiohttp
import voluptuous as vol

from homeassistant import config_entries

from .api import (
    IntervalsICUAuthenticationError,
    IntervalsICUClient,
    IntervalsICUConnectionError,
)
from .const import (
    CONF_API_KEY,
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

            athlete_id = user_input[
                CONF_ATHLETE_ID
            ]

            try:
                async with aiohttp.ClientSession() as session:

                    client = IntervalsICUClient(
                        athlete_id=athlete_id,
                        api_key=user_input[
                            CONF_API_KEY
                        ],
                        session=session,
                    )

                    athlete = await client.get_athlete()

            except IntervalsICUAuthenticationError as err:
                errors["base"] = "invalid_auth"
                print(err)

            except IntervalsICUConnectionError:
                errors["base"] = "cannot_connect"

            else:
                await self.async_set_unique_id(
                    athlete_id
                )

                self._abort_if_unique_id_configured()

                return self.async_create_entry(
                    title=athlete.get(
                        "name",
                        athlete_id,
                    ),
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
