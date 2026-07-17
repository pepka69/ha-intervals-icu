"""Tests for beta2 training statistics."""

from datetime import date, timedelta

from custom_components.ha_intervals_icu.statistics import calculate_training_statistics


def _activity(day_offset: int, load: float = 10) -> dict:
    day = date.today() - timedelta(days=day_offset)
    return {
        "start_date_local": f"{day.isoformat()}T08:00:00",
        "moving_time": 3600,
        "distance": 10000,
        "icu_training_load": load,
    }


def test_42_day_statistics_and_streak() -> None:
    data = calculate_training_statistics(
        [
            _activity(0),
            _activity(1),
            _activity(2),
            _activity(40),
        ]
    )

    assert data["activities_42_days"] == 4
    assert data["load_42_days"] == 40
    assert data["training_streak"] == 3
