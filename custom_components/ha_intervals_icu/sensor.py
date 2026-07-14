"""Sensors for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
)

from .entity import IntervalsICUEntity


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
        [
            IntervalsICUAthleteSensor(
                coordinator
            ),
            IntervalsICUActivitiesSensor(
                coordinator
            ),
        ]
    )


class IntervalsICUAthleteSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Athlete information sensor."""

    _attr_name = "Athlete"

    @property
    def native_value(self):
        """Return athlete name."""

        athlete = self.coordinator.data.get(
            "athlete",
            {},
        )

        return athlete.get(
            "name",
            "Unknown",
        )


class IntervalsICUActivitiesSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Activities count sensor."""

    _attr_name = "Activities count"

    @property
    def native_value(self):
        """Return activity count."""

        activities = self.coordinator.data.get(
            "activities",
            [],
        )

        return len(activities)
