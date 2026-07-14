"""Binary sensors for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.components.binary_sensor import (
    BinarySensorEntity,
)

from .entity import IntervalsICUEntity


async def async_setup_entry(
    hass,
    entry,
    async_add_entities,
):
    """Set up binary sensors."""

    coordinator = hass.data["ha_intervals_icu"][
        entry.entry_id
    ]["coordinator"]

    async_add_entities(
        [
            IntervalsICUConnectionSensor(
                coordinator
            )
        ]
    )


class IntervalsICUConnectionSensor(
    IntervalsICUEntity,
    BinarySensorEntity,
):
    """Connection status sensor."""

    _attr_translation_key = "connection"

    def __init__(
        self,
        coordinator,
    ):
        """Initialize."""

        super().__init__(
            coordinator,
            "connection",
        )

    @property
    def is_on(self):
        """Return connection state."""

        return bool(
            self.coordinator.data
        )
