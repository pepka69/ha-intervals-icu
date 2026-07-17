"""Tests for beta4 training statistics."""

from datetime import date, timedelta

from custom_components.ha_intervals_icu.statistics import (
    calculate_training_statistics,
)


def _activity(
    day_offset: int,
    *,
    load: float = 10,
    sport: str = "Ride",
) -> dict:
    activity_day = date.today() - timedelta(days=day_offset)
    return {
        "start_date_local": f"{activity_day.isoformat()}T08:00:00",
        "moving_time": 3600,
        "distance": 10000,
        "icu_training_load": load,
        "calories": 500,
        "total_elevation_gain": 100,
        "type": sport,
    }


def test_detailed_42_day_statistics() -> None:
    data = calculate_training_statistics(
        [
            _activity(0, load=20),
            _activity(1, load=20),
            _activity(2, load=20),
            _activity(7, load=10, sport="WeightTraining"),
            _activity(8, load=10, sport="WeightTraining"),
            _activity(40, load=10),
        ]
    )

    assert data["weekly_activities"] == 3
    assert data["previous_week_activities"] == 2
    assert data["activities_42_days"] == 6
    assert data["distance_42_days"] == 60
    assert data["load_42_days"] == 90
    assert data["training_streak"] == 3
    assert data["longest_training_streak_42_days"] == 3
    assert data["main_sport_42_days"] == "Ride"
    assert data["sport_statistics_42_days"]["Ride"]["activities"] == 4


def test_load_comparison_and_ratio() -> None:
    activities = [_activity(day, load=10) for day in range(14)]
    data = calculate_training_statistics(activities)

    assert data["weekly_load"] == 70
    assert data["previous_week_load"] == 70
    assert data["load_change_percent"] == 0
    assert data["acute_chronic_ratio"] is not None
