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
    """Describe Intervals.icu sensor."""

    data_path: str
    attribute: str


SENSORS = (
    IntervalsICUSensorDescription(
        key="fitness",
        translation_key="fitness",
        data_path="wellness",
        attribute="ctl",
    ),
    IntervalsICUSensorDescription(
        key="fatigue",
        translation_key="fatigue",
        data_path="wellness",
        attribute="atl",
    ),
    IntervalsICUSensorDescription(
        key="form",
        translation_key="form",
        data_path="wellness",
        attribute="tsb",
    ),
    IntervalsICUSensorDescription(
        key="hrv",
        translation_key="hrv",
        data_path="wellness",
        attribute="hrv",
    ),
    IntervalsICUSensorDescription(
        key="weight",
        translation_key="weight",
        data_path="wellness",
        attribute="weight",
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
            coordinator
        )

        self.entity_description = description

    @property
    def native_value(self):
        """Return value."""

        data = self.coordinator.data.get(
            self.entity_description.data_path,
            [],
        )

        if not data:
            return None

        latest = data[-1]

        return latest.get(
            self.entity_description.attribute
        )
