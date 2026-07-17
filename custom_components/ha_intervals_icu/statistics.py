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


def _sport(activity: dict[str, Any]) -> str:
    """Return a normalized sport name."""

    value = (
        activity.get("type")
        or activity.get("sport")
        or activity.get("sport_type")
        or "Other"
    )
    return str(value).strip() or "Other"


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
    statistics["duration"] += _number(
        activity,
        "moving_time",
        "elapsed_time",
        "duration",
    )
    statistics["load"] += _number(
        activity,
        "icu_training_load",
        "training_load",
        "load",
    )
    statistics["calories"] += _number(activity, "calories")
    statistics["elevation"] += _number(
        activity,
        "total_elevation_gain",
        "elevation_gain",
    )


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


def _longest_streak(activity_days: set[date]) -> int:
    """Return the longest consecutive training streak."""

    if not activity_days:
        return 0

    ordered_days = sorted(activity_days)
    longest = 1
    current = 1

    for previous, current_day in zip(ordered_days, ordered_days[1:], strict=False):
        if current_day == previous + timedelta(days=1):
            current += 1
            longest = max(longest, current)
        else:
            current = 1

    return longest


def _percentage_change(current: float, previous: float) -> float | None:
    """Return percentage change without dividing by zero."""

    if previous == 0:
        return None if current == 0 else 100.0
    return round(((current - previous) / previous) * 100, 1)


def _ratio(current: float, baseline: float) -> float | None:
    """Return a rounded ratio without dividing by zero."""

    if baseline <= 0:
        return None
    return round(current / baseline, 2)


def _round_statistics(
    prefix: str,
    statistics: dict[str, float | int],
) -> dict[str, float | int]:
    """Convert raw statistics to exposed values."""

    return {
        f"{prefix}_activities": int(statistics["activities"]),
        f"{prefix}_distance": round(float(statistics["distance"]) / 1000, 2),
        f"{prefix}_duration": int(statistics["duration"]),
        f"{prefix}_load": round(float(statistics["load"]), 1),
        f"{prefix}_calories": round(float(statistics["calories"])),
        f"{prefix}_elevation": round(float(statistics["elevation"])),
    }


def calculate_training_statistics(
    activities: list[dict[str, Any]],
) -> dict[str, Any]:
    """Calculate detailed 7 and 42-day training statistics."""

    today = date.today()
    current_7_days = _empty_statistics()
    previous_7_days = _empty_statistics()
    monthly = _empty_statistics()
    forty_two_days = _empty_statistics()
    activity_days: set[date] = set()
    sport_statistics: dict[str, dict[str, float | int]] = {}

    for activity in activities:
        activity_day = _activity_date(activity)
        if activity_day is None:
            continue

        age = (today - activity_day).days
        if age < 0 or age > 41:
            continue

        activity_days.add(activity_day)
        _add_activity(forty_two_days, activity)

        sport_name = _sport(activity)
        if sport_name not in sport_statistics:
            sport_statistics[sport_name] = _empty_statistics()
        _add_activity(sport_statistics[sport_name], activity)

        if age <= 29:
            _add_activity(monthly, activity)

        if age <= 6:
            _add_activity(current_7_days, activity)
        elif age <= 13:
            _add_activity(previous_7_days, activity)

    load_7 = float(current_7_days["load"])
    load_previous_7 = float(previous_7_days["load"])
    load_42 = float(forty_two_days["load"])
    chronic_weekly_load = load_42 / 6 if load_42 else 0.0
    activities_42 = int(forty_two_days["activities"])
    duration_42 = float(forty_two_days["duration"])

    ordered_sports = sorted(
        sport_statistics.items(),
        key=lambda item: float(item[1]["duration"]),
        reverse=True,
    )
    sports = {
        sport: {
            "activities": int(values["activities"]),
            "distance_km": round(float(values["distance"]) / 1000, 2),
            "duration_hours": round(float(values["duration"]) / 3600, 2),
            "load": round(float(values["load"]), 1),
            "calories": round(float(values["calories"])),
            "elevation_m": round(float(values["elevation"])),
        }
        for sport, values in ordered_sports
    }

    most_recent_day = max(activity_days) if activity_days else None
    days_since_training = (
        (today - most_recent_day).days if most_recent_day is not None else None
    )

    result: dict[str, Any] = {}
    result.update(_round_statistics("weekly", current_7_days))
    result.update(_round_statistics("previous_week", previous_7_days))
    result.update(_round_statistics("monthly", monthly))
    result.update(_round_statistics("forty_two_days", forty_two_days))

    # Compatibility with the beta2 entity keys.
    result.update(
        {
            "activities_42_days": result["forty_two_days_activities"],
            "distance_42_days": result["forty_two_days_distance"],
            "duration_42_days": result["forty_two_days_duration"],
            "load_42_days": result["forty_two_days_load"],
            "calories_42_days": result["forty_two_days_calories"],
            "elevation_42_days": result["forty_two_days_elevation"],
        }
    )

    result.update(
        {
            "acute_chronic_ratio": _ratio(load_7, chronic_weekly_load),
            "load_change_percent": _percentage_change(load_7, load_previous_7),
            "duration_change_percent": _percentage_change(
                float(current_7_days["duration"]),
                float(previous_7_days["duration"]),
            ),
            "activities_change_percent": _percentage_change(
                float(current_7_days["activities"]),
                float(previous_7_days["activities"]),
            ),
            "average_daily_load_7_days": round(load_7 / 7, 1),
            "average_daily_load_42_days": round(load_42 / 42, 1),
            "average_weekly_load_42_days": round(chronic_weekly_load, 1),
            "average_weekly_duration_42_days": round(duration_42 / 6),
            "average_activities_per_week_42_days": round(activities_42 / 6, 2),
            "average_activity_duration_42_days": (
                round(duration_42 / activities_42) if activities_42 else 0
            ),
            "average_activity_load_42_days": (
                round(load_42 / activities_42, 1) if activities_42 else 0.0
            ),
            "training_streak": _training_streak(activity_days, today),
            "longest_training_streak_42_days": _longest_streak(activity_days),
            "days_since_training": days_since_training,
            "training_days_42_days": len(activity_days),
            "rest_days_42_days": 42 - len(activity_days),
            "main_sport_42_days": ordered_sports[0][0] if ordered_sports else None,
            "sport_statistics_42_days": sports,
        }
    )
    return result
