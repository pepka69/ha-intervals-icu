"""Dashboard builder for ha-intervals-icu."""

from __future__ import annotations

from typing import Any

from .activities import last_activity
from .statistics import calculate_training_statistics


def build_dashboard(
    athlete: dict[str, Any],
    wellness: list[dict[str, Any]],
    activities: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build dashboard data."""

    latest = wellness[-1] if wellness else {}

    ctl = latest.get("ctl")
    atl = latest.get("atl")

    form = None

    if ctl is not None and atl is not None:
        form = round(
            ctl - atl,
            1,
        )

    ftp = None

    sport_settings = athlete.get(
        "sportSettings",
        [],
    )

    if sport_settings:
        ftp = sport_settings[0].get(
            "ftp"
        )

    dashboard = {
        "athlete": athlete,
        "wellness": latest,
        "fitness": (
            round(ctl, 1)
            if ctl is not None
            else None
        ),
        "fatigue": (
            round(atl, 1)
            if atl is not None
            else None
        ),
        "form": form,
        "activities": len(
            activities
        ),
        "ftp": ftp,
        "resting_hr": (
            latest.get("restingHR")
            or athlete.get(
                "icu_resting_hr"
            )
        ),
        "weight": (
            latest.get("weight")
            or athlete.get(
                "icu_weight"
            )
        ),
        "sleep": latest.get(
            "sleepSecs"
        ),
        "mood": latest.get(
            "mood"
        ),
        "energy": latest.get(
            "energy"
        ),
        "stress": latest.get(
            "stress"
        ),
        "soreness": latest.get(
            "soreness"
        ),
    }

    dashboard.update(
        last_activity(
            activities,
        )
    )

    dashboard.update(
        calculate_training_statistics(
            activities,
        )
    )

    return dashboard
