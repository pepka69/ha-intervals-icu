"""Diagnostics support for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components.diagnostics import (
    async_redact_data,
)

TO_REDACT = {
    "api_key",
}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> dict[str, Any]:
    """Return diagnostics."""

    coordinator = hass.data[
        entry.domain
    ][entry.entry_id]["coordinator"]

    return {
        "entry": async_redact_data(
            dict(entry.data),
            TO_REDACT,
        ),
        "data": coordinator.data,
    }
