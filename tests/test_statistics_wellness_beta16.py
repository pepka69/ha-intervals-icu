"""Tests for beta16 Wellness statistics dashboard exposure."""

from custom_components.ha_intervals_icu.sensor import (
    build_statistics_dashboard_attributes,
)
from custom_components.ha_intervals_icu.wellness_statistics import (
    calculate_wellness_statistics,
)


def test_sleep_duration_is_calculated() -> None:
    result = calculate_wellness_statistics(
        [
            {
                "id": "2026-07-26",
                "sleepSecs": 25200,
                "sleepScore": 82,
                "hrv": 44,
            },
            {
                "id": "2026-07-27",
                "sleepSecs": 27000,
                "sleepScore": 86,
                "hrv": 47,
            },
        ]
    )

    assert result["wellness_sleep"] == 27000
    assert result["wellness_sleep_score"] == 86
    assert result["wellness_sleep_average_7_days"] == 26100


def test_wellness_is_exposed_to_statistics_dashboard() -> None:
    data = {
        "wellness_sleep": 27000,
        "wellness_sleep_score": 86,
        "wellness_hrv": 47,
        "wellness_sleep_history": [
            {"date": "2026-07-27", "value": 27000},
        ],
        "advanced_periods": {},
        "advanced_sports": {},
        "advanced_trends": {},
        "advanced_records_by_sport": {},
        "advanced_period_records": {},
        "training_insights": [],
        "training_insights_by_period": {},
    }

    attributes = build_statistics_dashboard_attributes(data)

    assert attributes["wellness"]["wellness_sleep"] == 27000
    assert attributes["wellness"]["wellness_sleep_score"] == 86
    assert attributes["wellness"]["wellness_hrv"] == 47
    assert attributes["wellness"]["wellness_sleep_history"] == [
        {"date": "2026-07-27", "value": 27000},
    ]
