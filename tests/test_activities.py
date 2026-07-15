"""Tests for activity helpers."""

from custom_components.ha_intervals_icu.activities import last_activity


def test_last_activity_empty() -> None:
    """Test empty activity list."""

    assert last_activity([]) == {}


def test_last_activity_mapping(activities: list[dict]) -> None:
    """Test latest activity processing."""

    result = last_activity(activities)

    assert result["last_activity_name"] == "Morning Ride"
    assert result["last_activity_type"] == "Ride"
    assert result["last_activity_distance"] == 40000
    assert result["last_activity_duration"] == 5400
    assert result["last_activity_load"] == 75
    assert result["last_activity_avg_power"] == 185
