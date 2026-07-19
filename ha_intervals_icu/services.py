"""Services for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.core import HomeAssistant, ServiceCall

from .const import DOMAIN

SERVICE_REFRESH = "refresh"


async def async_setup_services(
    hass: HomeAssistant,
) -> None:
    """Set up integration services."""

    if hass.services.has_service(
        DOMAIN,
        SERVICE_REFRESH,
    ):
        return

    async def handle_refresh(
        call: ServiceCall,
    ) -> None:
        """Refresh Intervals.icu data."""

        for entry_data in hass.data.get(
            DOMAIN,
            {},
        ).values():
            coordinator = entry_data.get("coordinator")

            if coordinator:
                await coordinator.async_request_refresh()

    hass.services.async_register(
        DOMAIN,
        SERVICE_REFRESH,
        handle_refresh,
    )
