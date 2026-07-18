"""Models used by the Atlas Engine."""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import StrEnum


class TrainingState(StrEnum):
    """Atlas training states."""

    UNKNOWN = "unknown"
    RECOVERY = "recovery_needed"
    HIGH_FATIGUE = "high_fatigue"
    BUILDING = "building_fitness"
    PRODUCTIVE = "productive_load"
    FRESH = "fresh"
    PEAK = "peak_performance"


@dataclass(slots=True)
class AthleteMetrics:
    """Metrics used by Atlas Engine."""

    fitness: float | None = None
    fatigue: float | None = None
    form: float | None = None

    hrv: float | None = None
    resting_hr: float | None = None
    sleep_score: float | None = None

    load_7d: float | None = None
    load_30d: float | None = None

    consecutive_training_days: int = 0


@dataclass(slots=True)
class Explanation:
    """Human-readable explanation."""

    title: str
    summary: str
    recommendation: str
    reasons: list[str] = field(default_factory=list)


@dataclass(slots=True)
class TrainingStatus:
    """Atlas Engine result."""

    state: TrainingState

    icon: str
    color: str

    confidence: int

    explanation: Explanation
