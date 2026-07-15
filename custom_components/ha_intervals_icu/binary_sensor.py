"""Binary sensors for ha-intervals-icu."""

from __future__ import annotations

from dataclasses import dataclass

from homeassistant.components.binary_sensor import (
    BinarySensorEntity,
    BinarySensorEntityDescription,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .entity import IntervalsICUEntity


@dataclass(frozen=True, kw_only=True)
class IntervalsICUBinarySensorDescription(
    BinarySensorEntityDescription,
):
    """Describe an Intervals.icu binary sensor."""


BINARY_SENSORS: tuple[
    IntervalsICUBinarySensorDescription,
    ...
] = (
    IntervalsICUBinarySensorDescription(
        key="positive_form",
        translation_key="positive_form",
        icon="mdi:emoticon-happy",
    ),
    IntervalsICUBinarySensorDescription(
        key="high_fatigue",
        translation_key="high_fatigue",
        icon="mdi:alert",
    ),
    IntervalsICUBinarySensorDescription(
        key="planned_today",
        translation_key="planned_today",
        icon="mdi:calendar-check",
    ),
    IntervalsICUBinarySensorDescription(
        key="planned_tomorrow",
        translation_key="planned_tomorrow",
        icon="mdi:calendar-arrow-right",
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Intervals.icu binary sensors."""

    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

    athlete = coordinator.data.get("athlete", {})
    athlete_name = athlete.get("name")

    async_add_entities(
        IntervalsICUBinarySensor(
            coordinator=coordinator,
            athlete_id=entry.data["athlete_id"],
            athlete_name=athlete_name,
            description=description,
        )
        for description in BINARY_SENSORS
    )


class IntervalsICUBinarySensor(
    IntervalsICUEntity,
    BinarySensorEntity,
):
    """Representation of an Intervals.icu binary sensor."""

    entity_description: IntervalsICUBinarySensorDescription

    def __init__(
        self,
        coordinator,
        athlete_id: str,
        athlete_name: str | None,
        description: IntervalsICUBinarySensorDescription,
    ) -> None:
        """Initialize the binary sensor."""

        super().__init__(
            coordinator,
            athlete_id,
            athlete_name,
        )

        self.entity_description = description
        self._attr_unique_id = (
            f"{DOMAIN}_{athlete_id}_{description.key}"
        )

    @property
    def is_on(self) -> bool:
        """Return the binary sensor state."""

        data = self.coordinator.data

        if self.entity_description.key == "positive_form":
            form = data.get("form")

            return (
                form is not None
                and float(form) >= 0
            )

        if self.entity_description.key == "high_fatigue":
            fatigue = data.get("fatigue")
            fitness = data.get("fitness")

            return (
                fatigue is not None
                and fitness is not None
                and float(fatigue) > float(fitness) + 10
            )

        if self.entity_description.key == "planned_today":
            return bool(
                data.get("planned_today")
            )

        if self.entity_description.key == "planned_tomorrow":
            return bool(
                data.get("planned_tomorrow")
            )

        return False
