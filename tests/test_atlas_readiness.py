"""Tests for the Atlas readiness engine."""

from custom_components.ha_intervals_icu.atlas.coordinator import (
    ATLAS_READINESS_KEY,
    enrich_dashboard_with_atlas,
)
from custom_components.ha_intervals_icu.atlas.readiness import evaluate_readiness


def test_balanced_training_produces_good_readiness() -> None:
    """Balanced load and recovery should produce a usable score."""
    result = evaluate_readiness(
        {
            "form": 5,
            "fatigue": 45,
            "recovery_score": 82,
            "sleep_score": 85,
            "weekly_load": 360,
            "load_42_days": 2100,
            "training_streak": 3,
        }
    )

    assert result.score >= 70
    assert result.level in {"good", "excellent"}
    assert result.load_trend == "stable"
    assert "balanced_load" in result.positive_factors


def test_load_spike_reduces_readiness() -> None:
    """An acute load spike should lower the score and add a warning factor."""
    result = evaluate_readiness(
        {
            "form": -24,
            "fatigue": 95,
            "weekly_load": 900,
            "load_42_days": 1800,
            "training_streak": 9,
        }
    )

    assert result.score < 50
    assert result.load_trend == "spiking"
    assert "load_spike" in result.negative_factors
    assert result.recovery_hours > 0


def test_readiness_payload_is_added_to_coordinator_data() -> None:
    """Coordinator enrichment should cache a serializable readiness payload."""
    enriched = enrich_dashboard_with_atlas(
        {"form": 0, "weekly_load": 300, "load_42_days": 1800}
    )

    payload = enriched[ATLAS_READINESS_KEY]
    assert isinstance(payload["score"], int)
    assert isinstance(payload["positive_factors"], list)
    assert isinstance(payload["negative_factors"], list)
