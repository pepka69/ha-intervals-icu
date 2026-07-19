"""Tests for the Atlas training status sensor."""

from custom_components.ha_intervals_icu.atlas import TrainingState
from custom_components.ha_intervals_icu.sensor import build_training_status


def test_build_training_status_from_coordinator_data() -> None:
    """Convert coordinator metrics into an actionable Atlas status."""
    status = build_training_status(
        {
            "fitness": 52,
            "fatigue": 71,
            "form": -19,
            "weekly_load": 410,
            "load_42_days": 1480,
            "training_streak": 4,
        }
    )

    assert status.state is TrainingState.BUILDING
    assert status.confidence == 100
    assert status.icon == "mdi:trending-up"
    assert status.explanation.recommendation


def test_build_training_status_ignores_invalid_numbers() -> None:
    """Treat malformed optional coordinator values as unavailable."""
    status = build_training_status(
        {
            "fitness": "invalid",
            "fatigue": None,
            "form": -5,
            "training_streak": None,
        }
    )

    assert status.state is TrainingState.PRODUCTIVE
    assert status.confidence == 40


def test_build_training_status_prefers_coordinator_atlas_payload() -> None:
    """Use the Atlas result calculated by the coordinator during refresh."""
    status = build_training_status(
        {
            "fitness": 1,
            "fatigue": 1,
            "form": 1,
            "atlas_training_status": {
                "state": "peak_performance",
                "icon": "mdi:trophy-outline",
                "color": "purple",
                "confidence": 87,
                "title": "Peak performance",
                "summary": "You are ready for a key effort.",
                "recommendation": "Prioritize quality over volume.",
                "reasons": ["Positive form"],
            },
        }
    )

    assert status.state is TrainingState.PEAK
    assert status.confidence == 87
    assert status.explanation.reasons == ["Positive form"]
