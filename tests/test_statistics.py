"""Tests for training statistics."""

from datetime import date

from custom_components.ha_intervals_icu.statistics import (
    calculate_training_statistics,
)


def test_training_statistics(monkeypatch) -> None:
    """Test weekly and monthly totals."""

    class FixedDate(date):
        @classmethod
        def today(cls):
            return cls(2026, 7, 15)

    monkeypatch.setattr(
        "custom_components.ha_intervals_icu.statistics.date",
        FixedDate,
    )

    activities = [
        {
            "start_date_local": "2026-07-14T08:00:00",
            "distance": 10000,
            "moving_time": 3600,
            "icu_training_load": 50,
            "calories": 500,
            "total_elevation_gain": 100,
        },
        {
            "start_date_local": "2026-06-25T08:00:00",
            "distance": 20000,
            "moving_time": 7200,
            "icu_training_load": 100,
            "calories": 1000,
            "total_elevation_gain": 200,
        },
    ]

    result = calculate_training_statistics(activities)

    assert result["weekly_activities"] == 1
    assert result["weekly_distance"] == 10.0
    assert result["weekly_duration"] == 3600
    assert result["weekly_load"] == 50.0

    assert result["monthly_activities"] == 2
    assert result["monthly_distance"] == 30.0
    assert result["monthly_duration"] == 10800
    assert result["monthly_load"] == 150.0
