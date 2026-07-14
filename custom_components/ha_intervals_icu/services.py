"""Services for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.core import HomeAssistant, ServiceCall

from .const import DOMAIN


async def async_setup_services(
    hass: HomeAssistant,
) -> None:
    """Set up integration services."""

    async def handle_refresh(
        call: ServiceCall,
    ) -> None:
        """Refresh Intervals.icu data."""

        for entry_data in hass.data.get(
            DOMAIN,
            {},
        ).values():

            coordinator = entry_data.get(
                "coordinator"
            )

            if coordinator:
                await coordinator.async_request_refresh()

    hass.services.async_register(
        DOMAIN,
        "refresh",
        handle_refresh,
    )
