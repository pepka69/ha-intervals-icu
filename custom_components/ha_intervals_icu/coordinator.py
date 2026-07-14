"""Data update coordinator for ha-intervals-icu."""

from __future__ import annotations

from datetime import timedelta
import logging

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
from .const import (
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
)

LOGGER = logging.getLogger(__name__)


class IntervalsICUCoordinator(
    DataUpdateCoordinator[dict],
):
    """Coordinator for Intervals.icu."""

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
                seconds=DEFAULT_SCAN_INTERVAL,
            ),
        )

    async def _async_update_data(
        self,
    ) -> dict:
        """Fetch Intervals.icu dashboard."""

        try:
            return await self.client.get_dashboard()

        except IntervalsICUAuthenticationError as err:
            raise UpdateFailed(
                "Invalid Intervals.icu authentication"
            ) from err

        except IntervalsICUConnectionError as err:
            raise UpdateFailed(
                "Unable to connect to Intervals.icu"
            ) from err

        except Exception as err:
            LOGGER.exception(
                "Unexpected error while updating Intervals.icu"
            )

            raise UpdateFailed(
                f"Unexpected error: {err}"
            ) from err
