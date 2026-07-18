"""Tests for the Atlas Engine."""

from custom_components.ha_intervals_icu.atlas import (
    AthleteMetrics,
    TrainingState,
    evaluate_training_status,
)


def test_unknown_when_form_is_missing() -> None:
    """Return unknown when form is unavailable."""
    result = evaluate_training_status(AthleteMetrics())
    assert result.state is TrainingState.UNKNOWN
    assert result.confidence == 0


def test_building_fitness_state() -> None:
    """Classify sustained negative form as building fitness."""
    result = evaluate_training_status(
        AthleteMetrics(
            fitness=52,
            fatigue=71,
            form=-19,
            load_7d=410,
            load_30d=1480,
        )
    )
    assert result.state is TrainingState.BUILDING
    assert result.confidence == 100
    assert result.explanation.title == "Construction de la forme"


def test_recovery_state() -> None:
    """Classify very negative form as recovery needed."""
    result = evaluate_training_status(AthleteMetrics(form=-31))
    assert result.state is TrainingState.RECOVERY
    assert result.confidence == 40


def test_peak_state() -> None:
    """Classify strongly positive form as peak freshness."""
    result = evaluate_training_status(AthleteMetrics(form=20))
    assert result.state is TrainingState.PEAK
    assert result.icon == "mdi:trophy-outline"
