"""Atlas daily training coach."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any


@dataclass(frozen=True, slots=True)
class CoachResult:
    """Serializable daily coaching recommendation."""

    intensity: str
    session_type: str
    duration_minutes: int
    heart_rate_zone: str
    power_zone: str | None
    objective: str
    recommendation: str
    rationale: tuple[str, ...]
    confidence: int

    def as_payload(self) -> dict[str, Any]:
        """Return coordinator-safe primitive values."""
        payload = asdict(self)
        payload["rationale"] = list(self.rationale)
        return payload


def _number(data: dict[str, Any], key: str) -> float | None:
    value = data.get(key)
    if value is None:
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _readiness(data: dict[str, Any]) -> dict[str, Any]:
    payload = data.get("atlas_readiness")
    return payload if isinstance(payload, dict) else {}


def evaluate_coach(data: dict[str, Any]) -> CoachResult:
    """Build a conservative daily session recommendation."""
    readiness = _readiness(data)
    score = _number(readiness, "score")
    form = _number(data, "form")
    fatigue = _number(data, "fatigue")
    ftp = _number(data, "ftp")

    score = 50 if score is None else score
    rationale: list[str] = []

    if score >= 85 and (form is None or form >= -10):
        intensity = "high"
        session_type = "quality"
        duration = 75
        hr_zone = "zone_4"
        power_zone = "zone_4" if ftp else None
        objective = "develop_performance"
        recommendation = "quality_session"
        rationale.append("excellent_readiness")
    elif score >= 70 and (form is None or form >= -15):
        intensity = "moderate"
        session_type = "endurance"
        duration = 75
        hr_zone = "zone_2"
        power_zone = "zone_2" if ftp else None
        objective = "build_aerobic_base"
        recommendation = "endurance_session"
        rationale.append("good_readiness")
    elif score >= 50:
        intensity = "easy"
        session_type = "easy_endurance"
        duration = 45
        hr_zone = "zone_1_2"
        power_zone = "zone_1_2" if ftp else None
        objective = "maintain_consistency"
        recommendation = "easy_session"
        rationale.append("moderate_readiness")
    elif score >= 30:
        intensity = "recovery"
        session_type = "active_recovery"
        duration = 30
        hr_zone = "zone_1"
        power_zone = "zone_1" if ftp else None
        objective = "promote_recovery"
        recommendation = "recovery_session"
        rationale.append("low_readiness")
    else:
        intensity = "rest"
        session_type = "rest"
        duration = 0
        hr_zone = "none"
        power_zone = None
        objective = "restore_readiness"
        recommendation = "rest_day"
        rationale.append("very_low_readiness")

    if form is not None and form <= -20:
        intensity = "recovery" if score >= 30 else "rest"
        session_type = "active_recovery" if intensity == "recovery" else "rest"
        duration = 25 if intensity == "recovery" else 0
        hr_zone = "zone_1" if intensity == "recovery" else "none"
        power_zone = "zone_1" if intensity == "recovery" and ftp else None
        objective = "reduce_fatigue"
        recommendation = "recovery_session" if intensity == "recovery" else "rest_day"
        rationale.append("negative_form")

    if fatigue is not None and fatigue >= 90:
        rationale.append("high_fatigue")

    confidence = readiness.get("confidence")
    try:
        confidence_value = int(confidence)
    except (TypeError, ValueError):
        confidence_value = 50

    return CoachResult(
        intensity=intensity,
        session_type=session_type,
        duration_minutes=duration,
        heart_rate_zone=hr_zone,
        power_zone=power_zone,
        objective=objective,
        recommendation=recommendation,
        rationale=tuple(dict.fromkeys(rationale)),
        confidence=max(0, min(100, confidence_value)),
    )
