"""Atlas daily readiness scoring engine."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any


@dataclass(frozen=True, slots=True)
class ReadinessResult:
    """Serializable daily readiness evaluation."""

    score: int
    level: str
    fatigue_level: str
    load_trend: str
    recovery_hours: int
    confidence: int
    recommendation: str
    positive_factors: tuple[str, ...]
    negative_factors: tuple[str, ...]

    def as_payload(self) -> dict[str, Any]:
        """Return coordinator-safe primitive values."""
        payload = asdict(self)
        payload["positive_factors"] = list(self.positive_factors)
        payload["negative_factors"] = list(self.negative_factors)
        return payload


def _number(data: dict[str, Any], key: str) -> float | None:
    value = data.get(key)
    if value is None:
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _clamp(value: float, minimum: float, maximum: float) -> float:
    return max(minimum, min(maximum, value))


def _level(score: int) -> str:
    if score >= 85:
        return "excellent"
    if score >= 70:
        return "good"
    if score >= 50:
        return "moderate"
    if score >= 30:
        return "low"
    return "very_low"


def _fatigue_level(atl: float | None, form: float | None) -> str:
    if form is not None:
        if form <= -25:
            return "very_high"
        if form <= -15:
            return "high"
        if form <= -5:
            return "moderate"
        return "low"
    if atl is None:
        return "unknown"
    if atl >= 100:
        return "very_high"
    if atl >= 70:
        return "high"
    if atl >= 40:
        return "moderate"
    return "low"


def _load_trend(
    load_7d: float | None, load_42d: float | None
) -> tuple[str, float | None]:
    if load_7d is None or load_42d is None or load_42d <= 0:
        return "unknown", None
    chronic_weekly = load_42d / 6
    ratio = load_7d / chronic_weekly if chronic_weekly > 0 else None
    if ratio is None:
        return "unknown", None
    if ratio < 0.75:
        return "decreasing", ratio
    if ratio <= 1.25:
        return "stable", ratio
    if ratio <= 1.5:
        return "increasing", ratio
    return "spiking", ratio


def evaluate_readiness(data: dict[str, Any]) -> ReadinessResult:
    """Calculate a conservative readiness score from available dashboard data."""
    score = 65.0
    available = 0
    positive: list[str] = []
    negative: list[str] = []

    form = _number(data, "form")
    atl = _number(data, "fatigue")
    hrv = _number(data, "hrv")
    resting_hr = _number(data, "resting_hr")
    sleep = _number(data, "sleep_score")
    recovery = _number(data, "recovery_score")
    load_7d = _number(data, "weekly_load")
    load_42d = _number(data, "load_42_days")
    streak = _number(data, "training_streak")

    if form is not None:
        available += 1
        score += _clamp(form, -30, 20) * 0.75
        if -10 <= form <= 15:
            positive.append("balanced_form")
        elif form < -15:
            negative.append("negative_form")

    if recovery is not None:
        available += 1
        score += (recovery - 50) * 0.28
        if recovery >= 70:
            positive.append("good_recovery")
        elif recovery < 40:
            negative.append("poor_recovery")

    if sleep is not None:
        available += 1
        score += (sleep - 70) * 0.18
        if sleep >= 80:
            positive.append("good_sleep")
        elif sleep < 60:
            negative.append("poor_sleep")

    if hrv is not None:
        available += 1
        positive.append("hrv_available")

    if resting_hr is not None:
        available += 1

    trend, ratio = _load_trend(load_7d, load_42d)
    if ratio is not None:
        available += 1
        if 0.8 <= ratio <= 1.25:
            score += 7
            positive.append("balanced_load")
        elif ratio > 1.5:
            score -= 18
            negative.append("load_spike")
        elif ratio > 1.25:
            score -= 7
            negative.append("rising_load")
        elif ratio < 0.6:
            score -= 5
            negative.append("low_load")

    if streak is not None:
        available += 1
        if streak >= 7:
            score -= min(12, (streak - 5) * 2)
            negative.append("long_training_streak")

    if atl is not None:
        available += 1

    final_score = int(round(_clamp(score, 0, 100)))
    fatigue = _fatigue_level(atl, form)
    recovery_hours = int(round(_clamp((70 - final_score) * 1.5, 0, 72)))
    confidence = int(round(_clamp(35 + available * 8, 35, 99)))

    level = _level(final_score)
    recommendations = {
        "excellent": "quality_session",
        "good": "normal_training",
        "moderate": "easy_or_moderate",
        "low": "recovery_session",
        "very_low": "rest_recommended",
    }

    return ReadinessResult(
        score=final_score,
        level=level,
        fatigue_level=fatigue,
        load_trend=trend,
        recovery_hours=recovery_hours,
        confidence=confidence,
        recommendation=recommendations[level],
        positive_factors=tuple(dict.fromkeys(positive)),
        negative_factors=tuple(dict.fromkeys(negative)),
    )
