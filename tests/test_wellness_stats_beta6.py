"""Tests for official wellness training metrics."""

from custom_components.ha_intervals_icu.dashboard import build_dashboard
from custom_components.ha_intervals_icu.history import calculate_fitness_history


def test_official_wellness_metrics_are_exposed() -> None:
    wellness = [
        {
            "id": "2026-07-17",
            "ctl": 51.2,
            "atl": 63.4,
            "rampRate": 4.1,
            "ctlLoad": 55.0,
            "atlLoad": 70.0,
            "eftp": 204,
            "sleepScore": 82,
        }
    ]
    data = build_dashboard({"sportSettings": []}, wellness, [])
    assert data["fitness"] == 51.2
    assert data["fatigue"] == 63.4
    assert data["form"] == -12.2
    assert data["ramp_rate"] == 4.1
    assert data["ctl_load"] == 55.0
    assert data["atl_load"] == 70.0
    assert data["eftp"] == 204
    assert data["sleep_score"] == 82


def test_history_uses_closest_previous_record() -> None:
    data = calculate_fitness_history(
        [
            {"id": "2026-07-09", "ctl": 40, "atl": 42},
            {"id": "2026-07-17", "ctl": 45, "atl": 50},
        ]
    )
    assert data["fitness_7_days_ago"] == 40
    assert data["fatigue_7_days_ago"] == 42
