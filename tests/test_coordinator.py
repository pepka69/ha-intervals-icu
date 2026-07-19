"""Tests for ha-intervals-icu coordinator."""

from unittest.mock import AsyncMock

import pytest

from custom_components.ha_intervals_icu.atlas import (
    ATLAS_READINESS_KEY,
    ATLAS_TRAINING_STATUS_KEY,
)
from custom_components.ha_intervals_icu.coordinator import (
    IntervalsICUCoordinator,
)


@pytest.mark.asyncio
async def test_coordinator_update(hass):
    """Test coordinator data update."""

    client = AsyncMock()
    client.get_dashboard.return_value = {
        "athlete": {
            "id": "123",
            "name": "Test Athlete",
        },
        "fitness": 50,
        "fatigue": 40,
        "form": 10,
        "last_activity_name": "CrossFit",
    }

    coordinator = IntervalsICUCoordinator(
        hass,
        client,
    )

    await coordinator.async_config_entry_first_refresh()

    assert coordinator.data["athlete"]["id"] == "123"
    assert coordinator.data["fitness"] == 50
    assert coordinator.data["fatigue"] == 40
    assert coordinator.data["last_activity_name"] == "CrossFit"
    assert ATLAS_TRAINING_STATUS_KEY in coordinator.data
    assert ATLAS_READINESS_KEY in coordinator.data
    client.get_dashboard.assert_awaited_once_with()
