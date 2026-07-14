"""Base entity for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import ATTRIBUTION
from .device import get_device_info


class IntervalsICUEntity(CoordinatorEntity):
    """Base Intervals.icu entity."""

    _attr_has_entity_name = True
    _attr_attribution = ATTRIBUTION

    def __init__(
        self,
        coordinator,
        athlete_id: str,
        athlete_name: str | None = None,
    ) -> None:
        """Initialize entity."""

        super().__init__(coordinator)

        self._athlete_id = athlete_id

        self._attr_device_info = get_device_info(
            athlete_id,
            athlete_name,
        )
