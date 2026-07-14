"""Diagnostics support for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    CONF_API_KEY,
    CONF_ATHLETE_ID,
    DOMAIN,
)


TO_REDACT = {
    CONF_API_KEY,
    CONF_ATHLETE_ID,
}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""

    integration_data = hass.data.get(
        DOMAIN,
        {},
    ).get(
        entry.entry_id,
        {},
    )

    coordinator = integration_data.get(
        "coordinator"
    )

    diagnostics = {
        "config_entry": {
            "title": entry.title,
            "data": entry.data,
        },
        "coordinator": {
            "available": (
                coordinator.last_update_success
                if coordinator
                else False
            ),
            "data": (
                coordinator.data
                if coordinator
                else None
            ),
        },
    }

    return async_redact_data(
        diagnostics,
        TO_REDACT,
    )
