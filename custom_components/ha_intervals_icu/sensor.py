"""Sensors for ha-intervals-icu."""

from __future__ import annotations

from dataclasses import dataclass

from homeassistant.components.sensor import (
    SensorEntity,
    SensorEntityDescription,
)

from .entity import IntervalsICUEntity


@dataclass(frozen=True, kw_only=True)
class IntervalsICUSensorDescription(
    SensorEntityDescription,
):
    """Describe an Intervals.icu sensor."""

    value_key: str


SENSORS = (
    IntervalsICUSensorDescription(
        key="fitness",
        translation_key="fitness",
        value_key="ctl",
    ),
    IntervalsICUSensorDescription(
        key="fatigue",
        translation_key="fatigue",
        value_key="atl",
    ),
    IntervalsICUSensorDescription(
        key="form",
        translation_key="form",
        value_key="tsb",
    ),
)


async def async_setup_entry(
    hass,
    entry,
    async_add_entities,
):
    """Set up sensors."""

    coordinator = hass.data["ha_intervals_icu"][
        entry.entry_id
    ]["coordinator"]

    async_add_entities(
        IntervalsICUSensor(
            coordinator,
            description,
        )
        for description in SENSORS
    )


class IntervalsICUSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Intervals.icu sensor."""

    entity_description: IntervalsICUSensorDescription

    def __init__(
        self,
        coordinator,
        description,
    ):
        """Initialize sensor."""

        super().__init__(
            coordinator,
        )

        self.entity_description = description

    @property
    def native_value(self):
        """Return sensor value."""

        wellness = self.coordinator.data.get(
            "wellness",
            [],
        )

        if not wellness:
            return None

        latest = wellness[-1]

        return latest.get(
            self.entity_description.value_key
        )
