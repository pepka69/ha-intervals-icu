"""Tests for beta5 advanced statistics."""

from datetime import date, timedelta

from custom_components.ha_intervals_icu.records import (
    calculate_personal_records,
)
from custom_components.ha_intervals_icu.statistics import (
    calculate_training_statistics,
)


def _activity(day_offset: int, load: float, **values: float) -> dict:
    activity_day = date.today() - timedelta(days=day_offset)
    return {
        "start_date_local": f"{activity_day.isoformat()}T08:00:00",
        "moving_time": 3600,
        "icu_training_load": load,
        "type": "Ride",
        **values,
    }


def test_monthly_comparison_and_load_methods() -> None:
    data = calculate_training_statistics(
        [
            _activity(0, 40, hrss=35, trimp=50),
            _activity(10, 20, hrss=15, trimp=25),
            _activity(35, 25, hrss=20, trimp=30),
        ]
    )

    assert data["monthly_load"] == 60
    assert data["previous_month_load"] == 25
    assert data["monthly_load_change_percent"] == 140
    assert data["monthly_load_trend"] == "up"
    assert data["forty_two_days_hrss"] == 70
    assert data["forty_two_days_trimp"] == 105


def test_peak_power_records() -> None:
    records = calculate_personal_records(
        {},
        [
            _activity(
                0,
                10,
                power_5s=800,
                power_60s=420,
                power_300s=300,
                power_1200s=245,
                power_3600s=205,
            )
        ],
    )

    assert records["record_power_5s"] == 800
    assert records["record_power_1m"] == 420
    assert records["record_power_5m"] == 300
    assert records["record_power_20m"] == 245
    assert records["record_power_1h"] == 205
