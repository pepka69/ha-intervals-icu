"""System Health for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.components import system_health
from homeassistant.core import HomeAssistant

from .const import DOMAIN


async def async_register(
    hass: HomeAssistant,
    register: system_health.SystemHealthRegistration,
) -> None:
    """Register system health."""

    register.async_register_info(
        system_health_info,
    )


async def system_health_info(
    hass: HomeAssistant,
) -> dict:
    """Return system health."""

    entries = hass.config_entries.async_entries(
        DOMAIN,
    )

    return {
        "configured_accounts": len(
            entries,
        ),
        "integration_version": "1.0.0-beta3",
        "api_reachable": True,
    }
