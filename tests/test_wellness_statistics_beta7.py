"""Tests for the beta7 official statistics layer."""

from custom_components.ha_intervals_icu.wellness_statistics import (
    calculate_wellness_statistics,
)
from custom_components.ha_intervals_icu.zones import calculate_zone_statistics


def test_official_wellness_statistics_and_inventory() -> None:
    wellness = [
        {"id": "2026-06-17", "ctl": 40, "atl": 55, "eftp": 190},
        {"id": "2026-07-10", "ctl": 48, "atl": 52, "eftp": 195},
        {
            "id": "2026-07-17",
            "ctl": 50,
            "atl": 45,
            "rampRate": 2.1,
            "ctlLoad": 49,
            "atlLoad": 44,
            "eftp": 197,
        },
    ]

    data = calculate_wellness_statistics(wellness)

    assert data["official_ctl"] == 50
    assert data["official_atl"] == 45
    assert data["official_form"] == 5
    assert data["official_eftp_change_7_days"] == 2
    assert data["official_ctl_change_30_days"] == 10
    assert "ctlLoad" in data["wellness_available_fields"]


def test_zone_aggregation_uses_only_api_values() -> None:
    data = calculate_zone_statistics(
        [
            {"icu_hr_zone_times": [10, 20, 30], "icu_power_zone_times": [5, 6]},
            {"icu_hr_zone_times": [1, 2, 3], "icu_power_zone_times": [4, 5]},
        ]
    )

    assert data["hr_zone_times_60_days"] == [11, 22, 33]
    assert data["power_zone_times_60_days"] == [9, 11]
    assert data["hr_zone_total_60_days"] == 66
