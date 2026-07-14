"""Base entity for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity,
)

from .const import ATTRIBUTION
from .coordinator import IntervalsICUCoordinator
from .device import get_device_info


class IntervalsICUEntity(
    CoordinatorEntity[IntervalsICUCoordinator],
):
    """Base entity for ha-intervals-icu."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: IntervalsICUCoordinator,
    ) -> None:
        """Initialize entity."""

        super().__init__(
            coordinator
        )

        self._attr_attribution = ATTRIBUTION

        athlete = coordinator.data.get(
            "athlete",
            {},
        )

        athlete_id = athlete.get(
            "id",
            "unknown",
        )

        athlete_name = athlete.get(
            "name",
        )

        self._attr_device_info = get_device_info(
            athlete_id,
            athlete_name,
        )
