"""Tests for the Atlas daily coach."""

from custom_components.ha_intervals_icu.atlas.coach import evaluate_coach
from custom_components.ha_intervals_icu.atlas.coordinator import (
    ATLAS_COACH_KEY,
    enrich_dashboard_with_atlas,
)


def test_good_readiness_recommends_endurance() -> None:
    """Good readiness should produce a useful endurance recommendation."""
    result = evaluate_coach(
        {
            "atlas_readiness": {"score": 78, "confidence": 91},
            "form": 2,
            "fatigue": 45,
            "ftp": 200,
        }
    )

    assert result.intensity == "moderate"
    assert result.session_type == "endurance"
    assert result.duration_minutes == 75
    assert result.heart_rate_zone == "zone_2"
    assert result.power_zone == "zone_2"
    assert result.confidence == 91


def test_negative_form_downgrades_session() -> None:
    """Strong negative form should override an otherwise high score."""
    result = evaluate_coach(
        {
            "atlas_readiness": {"score": 88, "confidence": 80},
            "form": -24,
            "fatigue": 95,
        }
    )

    assert result.intensity == "recovery"
    assert result.session_type == "active_recovery"
    assert "negative_form" in result.rationale
    assert "high_fatigue" in result.rationale


def test_coach_payload_is_cached_by_coordinator() -> None:
    """Dashboard enrichment should add a serializable coach payload."""
    enriched = enrich_dashboard_with_atlas(
        {
            "form": 4,
            "fatigue": 40,
            "weekly_load": 300,
            "load_42_days": 1800,
        }
    )

    payload = enriched[ATLAS_COACH_KEY]
    assert isinstance(payload["duration_minutes"], int)
    assert isinstance(payload["rationale"], list)
    assert payload["intensity"] in {"high", "moderate", "easy", "recovery", "rest"}
