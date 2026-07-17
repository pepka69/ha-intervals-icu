"""Tests for beta10 activity coverage and 90-day statistics."""

from datetime import date, timedelta

from custom_components.ha_intervals_icu.activity_statistics import (
    calculate_activity_statistics,
)
from custom_components.ha_intervals_icu.zones import calculate_zone_statistics


def _activity(days_ago: int, **values):
    day = date.today() - timedelta(days=days_ago)
    return {
        "start_date_local": f"{day.isoformat()}T08:00:00",
        "type": "Ride",
        "moving_time": 3600,
        **values,
    }


def test_activity_statistics_90_days_and_coverage() -> None:
    data = calculate_activity_statistics(
        [
            _activity(0, distance=20000, icu_training_load=50, calories=500),
            _activity(10, distance=10000, icu_training_load=30),
            _activity(95, distance=999999, icu_training_load=999),
        ]
    )

    assert data["activities_90_days"] == 2
    assert data["duration_90_days"] == 7200
    assert data["distance_90_days"] == 30
    assert data["load_90_days"] == 80
    assert data["activity_data_coverage"]["load"]["percent"] == 100
    assert data["activity_data_coverage"]["calories"]["percent"] == 50
    assert len(data["weekly_history_90_days"]) == 13
    assert data["main_sport_90_days"] == "Ride"


def test_zone_percentages_and_dominant_zone() -> None:
    data = calculate_zone_statistics(
        [{"icu_hr_zone_times": [10, 20, 70], "icu_power_zone_times": [30, 10]}]
    )

    assert data["hr_zone_percentages_60_days"] == [10.0, 20.0, 70.0]
    assert data["dominant_hr_zone_60_days"] == 3
    assert data["power_zone_percentages_60_days"] == [75.0, 25.0]
    assert data["dominant_power_zone_60_days"] == 1
