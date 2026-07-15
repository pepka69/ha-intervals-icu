"""Tests for planned workout helpers."""

from datetime import date

from custom_components.ha_intervals_icu.workouts import planned_workouts


def test_planned_workouts(monkeypatch) -> None:
    """Test today's and tomorrow's workout mapping."""

    class FixedDate(date):
        @classmethod
        def today(cls):
            return cls(2026, 7, 15)

    monkeypatch.setattr(
        "custom_components.ha_intervals_icu.workouts.date",
        FixedDate,
    )

    workouts = [
        {
            "name": "Intervals",
            "type": "Ride",
            "start_date_local": "2026-07-15T09:00:00",
            "duration": 3600,
            "icu_training_load": 70,
            "description": "5 x 5 minutes",
        },
        {
            "name": "Recovery",
            "type": "Ride",
            "start_date_local": "2026-07-16T09:00:00",
            "duration": 2700,
            "icu_training_load": 25,
        },
    ]

    result = planned_workouts(workouts)

    assert result["planned_today"] is True
    assert result["planned_today_name"] == "Intervals"
    assert result["planned_today_sport"] == "Ride"
    assert result["planned_today_duration"] == 3600
    assert result["planned_today_load"] == 70

    assert result["planned_tomorrow"] is True
    assert result["planned_tomorrow_name"] == "Recovery"


def test_planned_workouts_empty() -> None:
    """Test empty workout list."""

    result = planned_workouts([])

    assert result["planned_today"] is False
    assert result["planned_tomorrow"] is False
    assert result["planned_today_name"] is None
    assert result["planned_tomorrow_name"] is None
