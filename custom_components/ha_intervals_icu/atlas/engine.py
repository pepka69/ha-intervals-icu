"""Main orchestration layer for the Atlas Engine."""

from __future__ import annotations

from .explanations import build_explanation
from .models import AthleteMetrics, TrainingState, TrainingStatus
from .rules import calculate_confidence, classify_training_state

_STATE_PRESENTATION: dict[TrainingState, tuple[str, str]] = {
    TrainingState.UNKNOWN: ("mdi:help-circle-outline", "grey"),
    TrainingState.RECOVERY: ("mdi:bed", "red"),
    TrainingState.HIGH_FATIGUE: ("mdi:battery-low", "orange"),
    TrainingState.BUILDING: ("mdi:trending-up", "orange"),
    TrainingState.PRODUCTIVE: ("mdi:check-circle-outline", "green"),
    TrainingState.FRESH: ("mdi:lightning-bolt", "blue"),
    TrainingState.PEAK: ("mdi:trophy-outline", "purple"),
}


class AtlasEngine:
    """Evaluate athlete metrics and return an actionable training status."""

    def evaluate(self, metrics: AthleteMetrics) -> TrainingStatus:
        """Evaluate athlete metrics."""
        state = classify_training_state(metrics)
        icon, color = _STATE_PRESENTATION[state]
        return TrainingStatus(
            state=state,
            icon=icon,
            color=color,
            confidence=calculate_confidence(metrics),
            explanation=build_explanation(state, metrics),
        )


def evaluate_training_status(metrics: AthleteMetrics) -> TrainingStatus:
    """Evaluate athlete metrics with the default Atlas Engine."""
    return AtlasEngine().evaluate(metrics)
