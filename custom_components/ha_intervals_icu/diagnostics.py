"""Diagnostics support for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components.diagnostics import async_redact_data

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

    data = hass.data.get(
        DOMAIN,
        {},
    ).get(
        entry.entry_id,
        {},
    )

    return async_redact_data(
        data,
        TO_REDACT,
    )
