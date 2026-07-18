"""Deterministic classification rules used by the Atlas Engine."""

from __future__ import annotations

from .models import AthleteMetrics, TrainingState


def classify_training_state(metrics: AthleteMetrics) -> TrainingState:
    """Classify the current training state from athlete metrics."""
    if metrics.form is None:
        return TrainingState.UNKNOWN
    if metrics.form <= -30:
        return TrainingState.RECOVERY
    if metrics.form <= -20:
        return TrainingState.HIGH_FATIGUE
    if metrics.form <= -10:
        return TrainingState.BUILDING
    if metrics.form <= 5:
        return TrainingState.PRODUCTIVE
    if metrics.form <= 15:
        return TrainingState.FRESH
    return TrainingState.PEAK


def calculate_confidence(metrics: AthleteMetrics) -> int:
    """Calculate confidence from the amount of available athlete data."""
    weighted_metrics = (
        (metrics.form, 40),
        (metrics.fitness, 20),
        (metrics.fatigue, 20),
        (metrics.load_7d, 10),
        (metrics.load_30d, 10),
    )
    return min(
        sum(weight for value, weight in weighted_metrics if value is not None),
        100,
    )
