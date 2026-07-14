"""Sensors for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.components.sensor import (
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
            AthleteSensor(coordinator),
            FitnessSensor(coordinator),
            FatigueSensor(coordinator),
            FormSensor(coordinator),
            ActivitiesSensor(coordinator),
        ]
    )


class AthleteSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Athlete name sensor."""

    _attr_translation_key = "athlete"

    @property
    def native_value(self):
        """Return athlete name."""

        return self.coordinator.data.get(
            "athlete",
            {},
        ).get(
            "name"
        )


class FitnessSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Fitness sensor."""

    _attr_translation_key = "fitness"

    @property
    def native_value(self):
        """Return fitness value."""

        wellness = self.coordinator.data.get(
            "wellness",
            [],
        )

        if wellness:
            return wellness[-1].get(
                "ctl"
            )

        return None


class FatigueSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Fatigue sensor."""

    _attr_translation_key = "fatigue"

    @property
    def native_value(self):
        """Return fatigue value."""

        wellness = self.coordinator.data.get(
            "wellness",
            [],
        )

        if wellness:
            return wellness[-1].get(
                "atl"
            )

        return None


class FormSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Form sensor."""

    _attr_translation_key = "form"

    @property
    def native_value(self):
        """Return form value."""

        wellness = self.coordinator.data.get(
            "wellness",
            [],
        )

        if wellness:
            return wellness[-1].get(
                "tsb"
            )

        return None


class ActivitiesSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Activities count sensor."""

    _attr_translation_key = "activities"

    @property
    def native_value(self):
        """Return number of activities."""

        return len(
            self.coordinator.data.get(
                "activities",
                [],
            )
        )
