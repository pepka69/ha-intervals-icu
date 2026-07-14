"""Sensors for ha-intervals-icu."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from homeassistant.components.sensor import (
    SensorEntity,
    SensorEntityDescription,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import (
    AddEntitiesCallback,
)

from .const import DOMAIN
from .entity import IntervalsICUEntity


@dataclass(frozen=True, kw_only=True)
class IntervalsICUSensorDescription(
    SensorEntityDescription,
):
    """Intervals.icu sensor description."""


SENSORS: tuple[IntervalsICUSensorDescription, ...] = (
    IntervalsICUSensorDescription(
        key="fitness",
        name="Fitness",
        icon="mdi:heart-pulse",
    ),
    IntervalsICUSensorDescription(
        key="fatigue",
        name="Fatigue",
        icon="mdi:lightning-bolt",
    ),
    IntervalsICUSensorDescription(
        key="form",
        name="Form",
        icon="mdi:run-fast",
    ),
    IntervalsICUSensorDescription(
        key="activities",
        name="Activities",
        icon="mdi:bike",
    ),
    IntervalsICUSensorDescription(
        key="ftp",
        name="FTP",
        native_unit_of_measurement="W",
        icon="mdi:flash",
    ),
    IntervalsICUSensorDescription(
        key="resting_hr",
        name="Resting HR",
        native_unit_of_measurement="bpm",
        icon="mdi:heart",
    ),
    IntervalsICUSensorDescription(
        key="weight",
        name="Weight",
        native_unit_of_measurement="kg",
        icon="mdi:scale-bathroom",
    ),
    IntervalsICUSensorDescription(
        key="sleep",
        name="Sleep",
        native_unit_of_measurement="s",
        icon="mdi:sleep",
    ),
    IntervalsICUSensorDescription(
        key="mood",
        name="Mood",
        icon="mdi:emoticon",
    ),
    IntervalsICUSensorDescription(
        key="energy",
        name="Energy",
        icon="mdi:battery-heart",
    ),
    IntervalsICUSensorDescription(
        key="stress",
        name="Stress",
        icon="mdi:alert",
    ),
    IntervalsICUSensorDescription(
        key="soreness",
        name="Soreness",
        icon="mdi:arm-flex",
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up sensors."""

    coordinator = hass.data[
        DOMAIN
    ][entry.entry_id]["coordinator"]

    athlete = coordinator.data.get(
        "athlete",
        {},
    )

    athlete_name = athlete.get(
        "name",
    )

    async_add_entities(
        IntervalsICUSensor(
            coordinator,
            entry.data["athlete_id"],
            athlete_name,
            description,
        )
        for description in SENSORS
    )


class IntervalsICUSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Intervals.icu sensor."""

    entity_description: (
        IntervalsICUSensorDescription
    )

    def __init__(
        self,
        coordinator,
        athlete_id: str,
        athlete_name: str | None,
        description: IntervalsICUSensorDescription,
    ) -> None:
        """Initialize sensor."""

        super().__init__(
            coordinator,
            athlete_id,
            athlete_name,
        )

        self.entity_description = (
            description
        )

        self._attr_unique_id = (
            f"{DOMAIN}_{athlete_id}_{description.key}"
        )

    @property
    def native_value(
        self,
    ) -> Any:
        """Return sensor value."""

        return self.coordinator.data.get(
            self.entity_description.key
        )

    @property
    def extra_state_attributes(
        self,
    ) -> dict[str, Any]:
        """Return attributes."""

        attributes = {}

        if self.coordinator.data.get(
            "last_activity"
        ):
            attributes[
                "last_activity"
            ] = self.coordinator.data[
                "last_activity"
            ]

        return attributes
