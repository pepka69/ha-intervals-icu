"""Tests for Atlas coordinator integration."""

from custom_components.ha_intervals_icu.atlas import (
    ATLAS_TRAINING_STATUS_KEY,
    TrainingState,
    enrich_dashboard_with_atlas,
    metrics_from_dashboard,
)


def test_metrics_from_dashboard_maps_real_coordinator_keys() -> None:
    """Map processed dashboard values to Atlas metrics."""
    metrics = metrics_from_dashboard(
        {
            "fitness": "52.5",
            "fatigue": 71,
            "form": -18.5,
            "hrv": 48,
            "resting_hr": 58,
            "sleep_score": 82,
            "weekly_load": 410,
            "load_42_days": 1480,
            "training_streak": 4,
        }
    )

    assert metrics.fitness == 52.5
    assert metrics.fatigue == 71
    assert metrics.form == -18.5
    assert metrics.load_7d == 410
    assert metrics.load_30d == 1480
    assert metrics.consecutive_training_days == 4


def test_enrich_dashboard_with_atlas_keeps_source_data_unchanged() -> None:
    """Attach a serializable Atlas result without mutating API dashboard data."""
    dashboard = {
        "fitness": 52,
        "fatigue": 71,
        "form": -19,
        "weekly_load": 410,
        "load_42_days": 1480,
        "training_streak": 4,
    }

    enriched = enrich_dashboard_with_atlas(dashboard)
    payload = enriched[ATLAS_TRAINING_STATUS_KEY]

    assert ATLAS_TRAINING_STATUS_KEY not in dashboard
    assert payload["state"] == TrainingState.BUILDING.value
    assert payload["confidence"] == 100
    assert isinstance(payload["reasons"], list)
    assert all(
        isinstance(value, (str, int, float, bool, list, dict, type(None)))
        for value in payload.values()
    )
