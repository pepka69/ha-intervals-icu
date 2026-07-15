"""Tests for dashboard builder."""

from custom_components.ha_intervals_icu.dashboard import build_dashboard


def test_build_dashboard(
    athlete: dict,
    wellness: list[dict],
    activities: list[dict],
) -> None:
    """Test dashboard values."""

    result = build_dashboard(
        athlete,
        wellness,
        activities,
    )

    assert result["fitness"] == 40.0
    assert result["fatigue"] == 52.0
    assert result["form"] == -12.0
    assert result["ftp"] == 250
    assert result["resting_hr"] == 60
    assert result["weight"] == 73.0
    assert result["sleep"] == 28800
    assert result["activities"] == 1
    assert result["last_activity_name"] == "Morning Ride"
