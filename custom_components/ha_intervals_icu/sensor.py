"""Sensors for ha-intervals-icu."""

from __future__ import annotations

from dataclasses import dataclass

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import (
    UnitOfMass,
    UnitOfTime,
)

from .entity import IntervalsICUEntity


@dataclass(frozen=True, kw_only=True)
class IntervalsICUSensorDescription(
    SensorEntityDescription,
):
    """Describe an Intervals.icu sensor."""

    attribute: str
    source: str = "wellness"


SENSORS = (
    IntervalsICUSensorDescription(
        key="fitness",
        translation_key="fitness",
        attribute="ctl",
    ),
    IntervalsICUSensorDescription(
        key="fatigue",
        translation_key="fatigue",
        attribute="atl",
    ),
    IntervalsICUSensorDescription(
        key="form",
        translation_key="form",
        attribute="tsb",
    ),
    IntervalsICUSensorDescription(
        key="hrv",
        translation_key="hrv",
        attribute="hrv",
        native_unit_of_measurement=UnitOfTime.MS,
    ),
    IntervalsICUSensorDescription(
        key="weight",
        translation_key="weight",
        attribute="weight",
        device_class=SensorDeviceClass.WEIGHT,
        native_unit_of_measurement=UnitOfMass.KILOGRAMS,
    ),
    IntervalsICUSensorDescription(
        key="activity_count",
        translation_key="activity_count",
        attribute="count",
        source="activities",
    ),
    IntervalsICUSensorDescription(
        key="last_activity",
        translation_key="last_activity",
        attribute="name",
        source="activities",
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
            description.key,
        )

        self.entity_description = description

    @property
    def native_value(self):
        """Return sensor value."""

        data = self.coordinator.data.get(
            self.entity_description.source,
            [],
        )

        if not data:
            return None

        if self.entity_description.key == "activity_count":
            return len(data)

        latest = data[-1]

        return latest.get(
            self.entity_description.attribute
        )
