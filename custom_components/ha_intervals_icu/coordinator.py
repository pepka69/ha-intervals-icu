"""Data update coordinator for ha-intervals-icu."""

from __future__ import annotations

from datetime import timedelta

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator,
    UpdateFailed,
)

from .api import IntervalsICUClient
from .const import (
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    LOGGER_NAME,
)

import logging

LOGGER = logging.getLogger(LOGGER_NAME)


class IntervalsICUCoordinator(
    DataUpdateCoordinator,
):
    """Coordinator for Intervals.icu data."""

    def __init__(
        self,
        hass: HomeAssistant,
        client: IntervalsICUClient,
    ) -> None:
        """Initialize coordinator."""

        self.client = client

        super().__init__(
            hass,
            LOGGER,
            name=DOMAIN,
            update_interval=timedelta(
                seconds=DEFAULT_SCAN_INTERVAL
            ),
        )

    async def _async_update_data(self) -> dict:
        """Fetch data from API."""

        try:
            athlete = await self.client.get_athlete()

            wellness = await self.client.get_wellness()

            activities = await self.client.get_activities()

            return {
                "athlete": athlete,
                "wellness": wellness,
                "activities": activities,
            }

        except Exception as err:
            raise UpdateFailed(
                f"Unable to fetch Intervals.icu data: {err}"
            ) from err
