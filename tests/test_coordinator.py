"""Tests for ha-intervals-icu coordinator."""

from unittest.mock import AsyncMock

import pytest

from custom_components.ha_intervals_icu.coordinator import (
    IntervalsICUCoordinator,
)


@pytest.mark.asyncio
async def test_coordinator_update(hass):
    """Test coordinator data update."""

    client = AsyncMock()

    client.get_athlete.return_value = {
        "id": "123",
        "name": "Test Athlete",
    }

    client.get_wellness.return_value = [
        {
            "ctl": 50,
            "atl": 40,
            "tsb": 10,
            "hrv": 60,
            "weight": 72,
        }
    ]

    client.get_activities.return_value = [
        {
            "name": "CrossFit",
        }
    ]

    coordinator = IntervalsICUCoordinator(
        hass,
        client,
    )

    await coordinator.async_config_entry_first_refresh()

    assert coordinator.data["athlete"]["id"] == "123"
    assert coordinator.data["wellness"][0]["ctl"] == 50
    assert coordinator.data["activities"][0]["name"] == "CrossFit"
