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
    """Describe Intervals.icu sensor."""

    attribute: str


SENSORS = (
    IntervalsICUSensorDescription(
        key="fitness",
        translation_key="fitness",
        attribute="ctl",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    IntervalsICUSensorDescription(
        key="fatigue",
        translation_key="fatigue",
        attribute="atl",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    IntervalsICUSensorDescription(
        key="form",
        translation_key="form",
        attribute="tsb",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    IntervalsICUSensorDescription(
        key="hrv",
        translation_key="hrv",
        attribute="hrv",
        native_unit_of_measurement=UnitOfTime.MS,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    IntervalsICUSensorDescription(
        key="weight",
        translation_key="weight",
        attribute="weight",
        device_class=SensorDeviceClass.WEIGHT,
        native_unit_of_measurement=UnitOfMass.KILOGRAMS,
        state_class=SensorStateClass.MEASUREMENT,
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
        """Return value."""

        wellness = self.coordinator.data.get(
            "wellness",
            [],
        )

        if not wellness:
            return None

        return wellness[-1].get(
            self.entity_description.attribute
        )
