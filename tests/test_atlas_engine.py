"""Tests for the Atlas Engine."""

from custom_components.ha_intervals_icu.atlas import (
    AthleteMetrics,
    TrainingState,
    evaluate_training_status,
)


def test_building_fitness_state() -> None:
    """Classify sustained training load as building fitness."""
    status = evaluate_training_status(
        AthleteMetrics(
            fitness=52,
            fatigue=71,
            form=-19,
            load_7d=410,
            load_30d=1480,
        )
    )

    assert status.state is TrainingState.BUILDING
    assert status.confidence == 100
    assert status.explanation.title == "Construction de la forme"


def test_unknown_state_without_form() -> None:
    """Return unknown when the form metric is missing."""
    status = evaluate_training_status(AthleteMetrics())

    assert status.state is TrainingState.UNKNOWN
    assert status.confidence == 0
