"""The ha-intervals-icu integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import IntervalsICUClient
from .const import (
    CONF_API_KEY,
    CONF_ATHLETE_ID,
    DOMAIN,
)
from .coordinator import IntervalsICUCoordinator
from .services import async_setup_services

FRONTEND_URL = "/ha_intervals_icu"
FRONTEND_PATH = Path(__file__).parent / "frontend"

PLATFORMS: list[Platform] = [
    Platform.SENSOR,
    Platform.BINARY_SENSOR,
]


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Set up ha-intervals-icu from a config entry."""

    if not hass.data.get(f"{DOMAIN}_frontend_registered"):
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    FRONTEND_URL,
                    str(FRONTEND_PATH),
                    False,
                )
            ]
        )
        hass.data[f"{DOMAIN}_frontend_registered"] = True

    session = async_get_clientsession(hass)

    client = IntervalsICUClient(
        athlete_id=entry.data[CONF_ATHLETE_ID],
        api_key=entry.data[CONF_API_KEY],
        session=session,
    )

    coordinator = IntervalsICUCoordinator(
        hass,
        client,
    )

    await coordinator.async_config_entry_first_refresh()

    hass.data.setdefault(
        DOMAIN,
        {},
    )

    hass.data[DOMAIN][entry.entry_id] = {
        "coordinator": coordinator,
    }

    await async_setup_services(
        hass,
    )

    await hass.config_entries.async_forward_entry_setups(
        entry,
        PLATFORMS,
    )

    return True


async def async_unload_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Unload a config entry."""

    unload_ok = await hass.config_entries.async_unload_platforms(
        entry,
        PLATFORMS,
    )

    if unload_ok:
        hass.data[DOMAIN].pop(
            entry.entry_id,
        )

    return unload_ok
