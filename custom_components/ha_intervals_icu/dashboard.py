"""Dashboard builder for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

from .activities import last_activity
from .history import calculate_fitness_history
from .statistics import calculate_training_statistics
from .wellness_statistics import calculate_wellness_statistics
from .zones import calculate_zone_statistics


def _first_value(data: dict[str, Any], *keys: str) -> Any:
    """Return the first non-empty value for known API aliases."""

    for key in keys:
        value = data.get(key)
        if value is not None:
            return value
    return None


def build_dashboard(
    athlete: dict[str, Any],
    wellness: list[dict[str, Any]],
    activities: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build dashboard data."""

    history = calculate_fitness_history(wellness)
    latest = history.pop("latest_wellness")
    ftp = None

    for sport_setting in athlete.get("sportSettings", []):
        candidate_ftp = sport_setting.get("ftp")
        if candidate_ftp is not None:
            ftp = candidate_ftp
            break

    dashboard: dict[str, Any] = {
        "athlete": athlete,
        "wellness": latest,
        "activities": len(activities),
        "ftp": ftp,
        "resting_hr": latest.get("restingHR") or athlete.get("icu_resting_hr"),
        "weight": latest.get("weight") or athlete.get("icu_weight"),
        "sleep": latest.get("sleepSecs"),
        "mood": latest.get("mood"),
        "energy": latest.get("energy"),
        "stress": latest.get("stress"),
        "soreness": latest.get("soreness"),
        "hrv": _first_value(latest, "hrv", "hrvRMSSD", "hrvSdnn", "hrvSDNN"),
        "recovery_score": _first_value(
            latest,
            "recovery",
            "recoveryScore",
            "readiness",
            "readinessScore",
        ),
        "ramp_rate": _first_value(latest, "rampRate", "ramp_rate"),
        "ctl_load": _first_value(latest, "ctlLoad", "ctl_load"),
        "atl_load": _first_value(latest, "atlLoad", "atl_load"),
        "eftp": _first_value(latest, "eftp", "eFTP", "icu_eftp"),
        "sleep_score": _first_value(latest, "sleepScore", "sleep_score"),
        "wellness_date": _first_value(latest, "id", "date"),
    }

    dashboard.update(history)
    dashboard.update(calculate_wellness_statistics(wellness))

    if dashboard["ramp_rate"] is None:
        dashboard["ramp_rate"] = dashboard.get("fitness_change_7_days")

    dashboard.update(last_activity(activities))
    dashboard.update(calculate_training_statistics(activities))
    dashboard.update(calculate_zone_statistics(activities))
    return dashboard
