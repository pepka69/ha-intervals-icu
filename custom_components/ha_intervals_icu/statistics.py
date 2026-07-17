"""Training statistics helpers for ha-intervals-icu."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any


def _activity_date(activity: dict[str, Any]) -> date | None:
    """Return the local date of an activity."""

    raw_date = activity.get("start_date_local") or activity.get("start_date")
    if not raw_date:
        return None

    try:
        return date.fromisoformat(str(raw_date)[:10])
    except ValueError:
        return None


def _number(activity: dict[str, Any], *keys: str) -> float:
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
    statistics["distance"] += _number(activity, "distance")
    statistics["duration"] += _number(activity, "moving_time", "elapsed_time")
    statistics["load"] += _number(activity, "icu_training_load")
    statistics["calories"] += _number(activity, "calories")
    statistics["elevation"] += _number(activity, "total_elevation_gain")


def _training_streak(activity_days: set[date], today: date) -> int:
    """Return consecutive training days ending today or yesterday."""

    if not activity_days:
        return 0

    cursor = today
    if cursor not in activity_days:
        cursor -= timedelta(days=1)

    streak = 0
    while cursor in activity_days:
        streak += 1
        cursor -= timedelta(days=1)

    return streak


def calculate_training_statistics(
    activities: list[dict[str, Any]],
) -> dict[str, float | int]:
    """Calculate 7, 30 and 42-day training statistics."""

    today = date.today()
    weekly = _empty_statistics()
    monthly = _empty_statistics()
    forty_two_days = _empty_statistics()
    activity_days: set[date] = set()

    for activity in activities:
        activity_day = _activity_date(activity)
        if activity_day is None:
            continue

        age = (today - activity_day).days
        if age < 0:
            continue

        if age <= 41:
            activity_days.add(activity_day)
            _add_activity(forty_two_days, activity)

        if age <= 29:
            _add_activity(monthly, activity)

        if age <= 6:
            _add_activity(weekly, activity)

    return {
        "weekly_activities": int(weekly["activities"]),
        "weekly_distance": round(float(weekly["distance"]) / 1000, 2),
        "weekly_duration": int(weekly["duration"]),
        "weekly_load": round(float(weekly["load"]), 1),
        "weekly_calories": round(float(weekly["calories"])),
        "weekly_elevation": round(float(weekly["elevation"])),
        "monthly_activities": int(monthly["activities"]),
        "monthly_distance": round(float(monthly["distance"]) / 1000, 2),
        "monthly_duration": int(monthly["duration"]),
        "monthly_load": round(float(monthly["load"]), 1),
        "monthly_calories": round(float(monthly["calories"])),
        "monthly_elevation": round(float(monthly["elevation"])),
        "activities_42_days": int(forty_two_days["activities"]),
        "distance_42_days": round(float(forty_two_days["distance"]) / 1000, 2),
        "duration_42_days": int(forty_two_days["duration"]),
        "load_42_days": round(float(forty_two_days["load"]), 1),
        "calories_42_days": round(float(forty_two_days["calories"])),
        "elevation_42_days": round(float(forty_two_days["elevation"])),
        "training_streak": _training_streak(activity_days, today),
    }
