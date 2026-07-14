"""The ha-intervals-icu integration."""

from __future__ import annotations

import aiohttp

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .api import IntervalsICUClient
from .const import (
    CONF_API_KEY,
    CONF_ATHLETE_ID,
    DOMAIN,
)
from .coordinator import IntervalsICUCoordinator
from .services import async_setup_services


PLATFORMS: list[Platform] = [
    Platform.SENSOR,
]


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Set up ha-intervals-icu from a config entry."""

    session = aiohttp.ClientSession()

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
        "session": session,
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
        data = hass.data[DOMAIN].pop(
            entry.entry_id,
        )

        await data["session"].close()

    return unload_ok
