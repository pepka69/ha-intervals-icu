"""Tests for the Intervals.icu API client."""

from unittest.mock import AsyncMock

import pytest

from custom_components.ha_intervals_icu.api import IntervalsICUClient


@pytest.mark.asyncio
async def test_get_dashboard(
    athlete: dict,
    wellness: list[dict],
    activities: list[dict],
) -> None:
    """Test dashboard aggregation."""

    client = IntervalsICUClient(
        athlete_id="i123456",
        api_key="secret",
        session=AsyncMock(),
    )

    client.get_athlete = AsyncMock(return_value=athlete)
    client.get_wellness = AsyncMock(return_value=wellness)
    client.get_activities = AsyncMock(return_value=activities)
    client.get_workouts = AsyncMock(return_value=[])

    result = await client.get_dashboard()

    assert result["fitness"] == 40.0
    assert result["fatigue"] == 52.0
    assert result["form"] == -12.0
    assert result["planned_today"] is False
    assert result["planned_tomorrow"] is False
