"""Base entity for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity,
)

from .const import (
    ATTRIBUTION,
    DOMAIN,
)
from .coordinator import IntervalsICUCoordinator


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

        self._attr_unique_id = (
            f"{DOMAIN}_{id(self)}"
        )
