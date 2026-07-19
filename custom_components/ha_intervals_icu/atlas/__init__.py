"""Atlas Engine for the Intervals.icu integration."""

from .coordinator import (
    ATLAS_TRAINING_STATUS_KEY,
    build_atlas_payload,
    enrich_dashboard_with_atlas,
    metrics_from_dashboard,
)
from .engine import AtlasEngine, evaluate_training_status
from .models import AthleteMetrics, Explanation, TrainingState, TrainingStatus

__all__ = [
    "ATLAS_TRAINING_STATUS_KEY",
    "AtlasEngine",
    "AthleteMetrics",
    "Explanation",
    "TrainingState",
    "TrainingStatus",
    "build_atlas_payload",
    "enrich_dashboard_with_atlas",
    "evaluate_training_status",
    "metrics_from_dashboard",
]
