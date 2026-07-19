"""Coordinator helpers for the Atlas training status engine."""

from __future__ import annotations

from typing import Any

from .coach import evaluate_coach
from .engine import evaluate_training_status
from .models import AthleteMetrics, TrainingStatus
from .readiness import evaluate_readiness

ATLAS_TRAINING_STATUS_KEY = "atlas_training_status"
ATLAS_READINESS_KEY = "atlas_readiness"
ATLAS_COACH_KEY = "atlas_coach"


def _optional_float(value: Any) -> float | None:
    """Return a float when a coordinator value is numeric."""
    if value is None:
        return None

    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _optional_int(value: Any) -> int:
    """Return an integer when a coordinator value is numeric."""
    if value is None:
        return 0

    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def metrics_from_dashboard(data: dict[str, Any]) -> AthleteMetrics:
    """Build Atlas metrics from processed Intervals.icu dashboard data."""
    return AthleteMetrics(
        fitness=_optional_float(data.get("fitness")),
        fatigue=_optional_float(data.get("fatigue")),
        form=_optional_float(data.get("form")),
        hrv=_optional_float(data.get("hrv")),
        resting_hr=_optional_float(data.get("resting_hr")),
        sleep_score=_optional_float(data.get("sleep_score")),
        load_7d=_optional_float(data.get("weekly_load")),
        load_30d=_optional_float(data.get("load_42_days")),
        consecutive_training_days=_optional_int(data.get("training_streak")),
    )


def status_to_payload(status: TrainingStatus) -> dict[str, Any]:
    """Convert an Atlas status into coordinator-safe primitive values."""
    return {
        "state": status.state.value,
        "icon": status.icon,
        "color": status.color,
        "confidence": status.confidence,
        "title": status.explanation.title,
        "summary": status.explanation.summary,
        "recommendation": status.explanation.recommendation,
        "reasons": list(status.explanation.reasons),
    }


def build_atlas_payload(data: dict[str, Any]) -> dict[str, Any]:
    """Evaluate dashboard data and return a coordinator-safe Atlas payload."""
    return status_to_payload(evaluate_training_status(metrics_from_dashboard(data)))


def enrich_dashboard_with_atlas(data: dict[str, Any]) -> dict[str, Any]:
    """Attach the Atlas evaluation to dashboard data once per refresh."""
    enriched = dict(data)
    enriched[ATLAS_TRAINING_STATUS_KEY] = build_atlas_payload(data)
    enriched[ATLAS_READINESS_KEY] = evaluate_readiness(data).as_payload()
    enriched[ATLAS_COACH_KEY] = evaluate_coach(enriched).as_payload()
    return enriched
