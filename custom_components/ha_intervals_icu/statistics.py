"""Training statistics helpers for ha-intervals-icu."""

from __future__ import annotations

from datetime import date
from typing import Any


def _activity_date(
    activity: dict[str, Any],
) -> date | None:
    """Return the local date of an activity."""

    raw_date = activity.get("start_date_local") or activity.get("start_date")

    if not raw_date:
        return None

    try:
        return date.fromisoformat(str(raw_date)[:10])
    except ValueError:
        return None


def _number(
    activity: dict[str, Any],
    *keys: str,
) -> float:
    """Return the first available numeric value."""

    for key in keys:
        value = activity.get(key)

        if value is not None:
            try:
                return float(value)
            except (TypeError, ValueError):
                continue

    return 0.0


def _empty_statistics() -> dict[str, float | int]:
    """Return an empty statistics structure."""

    return {
        "activities": 0,
        "distance": 0.0,
        "duration": 0.0,
        "load": 0.0,
        "calories": 0.0,
        "elevation": 0.0,
    }


def _add_activity(
    statistics: dict[str, float | int],
    activity: dict[str, Any],
) -> None:
    """Add an activity to a statistics structure."""

    statistics["activities"] += 1

    statistics["distance"] += _number(
        activity,
        "distance",
    )

    statistics["duration"] += _number(
        activity,
        "moving_time",
        "elapsed_time",
    )

    statistics["load"] += _number(
        activity,
        "icu_training_load",
    )

    statistics["calories"] += _number(
        activity,
        "calories",
    )

    statistics["elevation"] += _number(
        activity,
        "total_elevation_gain",
    )


def calculate_training_statistics(
    activities: list[dict[str, Any]],
) -> dict[str, float | int]:
    """Calculate weekly and monthly training statistics."""

    today = date.today()

    weekly = _empty_statistics()
    monthly = _empty_statistics()

    for activity in activities:
        activity_day = _activity_date(activity)

        if activity_day is None:
            continue

        age = (today - activity_day).days

        if age < 0:
            continue

        if age <= 6:
            _add_activity(
                weekly,
                activity,
            )

        if age <= 29:
            _add_activity(
                monthly,
                activity,
            )

    return {
        "weekly_activities": int(weekly["activities"]),
        "weekly_distance": round(
            float(weekly["distance"]) / 1000,
            2,
        ),
        "weekly_duration": int(weekly["duration"]),
        "weekly_load": round(
            float(weekly["load"]),
            1,
        ),
        "weekly_calories": round(
            float(weekly["calories"]),
        ),
        "weekly_elevation": round(
            float(weekly["elevation"]),
        ),
        "monthly_activities": int(monthly["activities"]),
        "monthly_distance": round(
            float(monthly["distance"]) / 1000,
            2,
        ),
        "monthly_duration": int(monthly["duration"]),
        "monthly_load": round(
            float(monthly["load"]),
            1,
        ),
        "monthly_calories": round(
            float(monthly["calories"]),
        ),
        "monthly_elevation": round(
            float(monthly["elevation"]),
        ),
    }
