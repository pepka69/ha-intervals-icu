"""Data update coordinator for ha-intervals-icu."""

from __future__ import annotations

import logging
from datetime import timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntryAuthFailed
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator,
    UpdateFailed,
)

from .api import (
    IntervalsICUAuthenticationError,
    IntervalsICUClient,
    IntervalsICUConnectionError,
)
from .atlas import enrich_dashboard_with_atlas
from .const import DEFAULT_SCAN_INTERVAL, DOMAIN

LOGGER = logging.getLogger(__name__)


class IntervalsICUCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Coordinator for Intervals.icu."""

    def __init__(
        self,
        hass: HomeAssistant,
        client: IntervalsICUClient,
    ) -> None:
        """Initialize the coordinator."""

        self.client = client

        super().__init__(
            hass,
            LOGGER,
            name=DOMAIN,
            update_interval=timedelta(
                seconds=DEFAULT_SCAN_INTERVAL,
            ),
        )

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch Intervals.icu dashboard data."""

        try:
            dashboard = await self.client.get_dashboard()
            return enrich_dashboard_with_atlas(dashboard)

        except IntervalsICUAuthenticationError as err:
            raise ConfigEntryAuthFailed("Intervals.icu authentication failed") from err

        except IntervalsICUConnectionError as err:
            raise UpdateFailed("Unable to connect to Intervals.icu") from err

        except Exception as err:
            LOGGER.exception("Unexpected error while updating Intervals.icu")
            raise UpdateFailed(f"Unexpected Intervals.icu error: {err}") from err
