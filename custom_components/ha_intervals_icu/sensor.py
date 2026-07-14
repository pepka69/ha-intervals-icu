"""Sensors for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import (
    SensorEntity,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    UnitOfTime,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import (
    AddEntitiesCallback,
)
from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity,
)

from .const import DOMAIN
from .device import get_device_info


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up sensors."""

    data = hass.data[DOMAIN][entry.entry_id]

    coordinator = data["coordinator"]

    athlete_id = entry.data["athlete_id"]

    async_add_entities(
        [
            IntervalsICUSensor(
                coordinator,
                athlete_id,
                "fitness",
                "Fitness",
            ),
            IntervalsICUSensor(
                coordinator,
                athlete_id,
                "fatigue",
                "Fatigue",
            ),
            IntervalsICUSensor(
                coordinator,
                athlete_id,
                "form",
                "Form",
            ),
            IntervalsICUSensor(
                coordinator,
                athlete_id,
                "activities",
                "Activities",
            ),
        ]
    )


class IntervalsICUSensor(
    CoordinatorEntity,
    SensorEntity,
):
    """Representation of an Intervals.icu sensor."""

    def __init__(
        self,
        coordinator,
        athlete_id: str,
        key: str,
        name: str,
    ) -> None:
        """Initialize sensor."""

        super().__init__(
            coordinator
        )

        self._key = key

        self._attr_name = (
            f"Intervals.icu {name}"
        )

        self._attr_unique_id = (
            f"{DOMAIN}_{athlete_id}_{key}"
        )

        self._attr_device_info = get_device_info(
            athlete_id
        )

    @property
    def native_value(
        self,
    ) -> Any:
        """Return sensor value."""

        if not self.coordinator.data:
            return None

        return self.coordinator.data.get(
            self._key
        )
