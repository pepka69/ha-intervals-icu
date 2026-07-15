"""Dashboard builder for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

from .activities import last_activity
from .history import calculate_fitness_history
from .statistics import calculate_training_statistics


def build_dashboard(
    athlete: dict[str, Any],
    wellness: list[dict[str, Any]],
    activities: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build dashboard data."""

    history = calculate_fitness_history(wellness)
    latest = history.pop("latest_wellness")

    ftp = None

    sport_settings = athlete.get("sportSettings", [])

    for sport_setting in sport_settings:
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
    }

    dashboard.update(history)
    dashboard.update(last_activity(activities))
    dashboard.update(calculate_training_statistics(activities))

    return dashboard
