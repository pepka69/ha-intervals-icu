"""Advanced activity statistics and API data coverage helpers."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any


def _activity_date(activity: dict[str, Any]) -> date | None:
    raw = activity.get("start_date_local") or activity.get("start_date")
    if not raw:
        return None
    try:
        return date.fromisoformat(str(raw)[:10])
    except ValueError:
        return None


def _number(activity: dict[str, Any], *keys: str) -> float:
    for key in keys:
        value = activity.get(key)
        if value is None:
            continue
        try:
            return float(value)
        except (TypeError, ValueError):
            continue
    return 0.0


def _has_value(activity: dict[str, Any], *keys: str) -> bool:
    return any(activity.get(key) is not None for key in keys)


def _sport(activity: dict[str, Any]) -> str:
    value = activity.get("type") or activity.get("sport") or activity.get("sport_type")
    return str(value).strip() if value else "Other"


def _percent(count: int, total: int) -> float:
    return round(count * 100 / total, 1) if total else 0.0


def calculate_activity_statistics(
    activities: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build 90-day trends and expose activity API field coverage."""

    today = date.today()
    recent: list[tuple[date, dict[str, Any]]] = []
    fields: set[str] = set()

    for activity in activities:
        activity_day = _activity_date(activity)
        if activity_day is None:
            continue
        age = (today - activity_day).days
        if age < 0 or age > 89:
            continue
        recent.append((activity_day, activity))
        fields.update(key for key, value in activity.items() if value is not None)

    total = len(recent)
    duration = sum(
        _number(activity, "moving_time", "elapsed_time", "duration")
        for _, activity in recent
    )
    load = sum(
        _number(activity, "icu_training_load", "training_load", "load")
        for _, activity in recent
    )
    distance = sum(_number(activity, "distance") for _, activity in recent)
    calories = sum(_number(activity, "calories") for _, activity in recent)
    elevation = sum(
        _number(activity, "total_elevation_gain", "elevation_gain")
        for _, activity in recent
    )
    training_days = {activity_day for activity_day, _ in recent}

    coverage_aliases: dict[str, tuple[str, ...]] = {
        "load": ("icu_training_load", "training_load", "load"),
        "hrss": ("hrss", "icu_hrss", "hr_load"),
        "trimp": ("trimp", "icu_trimp"),
        "heart_rate": ("average_heartrate", "max_heartrate"),
        "power": ("average_watts", "max_watts", "weighted_average_watts"),
        "hr_zones": (
            "icu_hr_zone_times",
            "hr_zone_times",
            "heartrate_zone_times",
            "hr_zones",
        ),
        "power_zones": (
            "icu_power_zone_times",
            "power_zone_times",
            "watts_zone_times",
            "power_zones",
        ),
        "calories": ("calories",),
    }
    coverage = {
        name: {
            "activities": count,
            "percent": _percent(count, total),
        }
        for name, aliases in coverage_aliases.items()
        if (count := sum(_has_value(activity, *aliases) for _, activity in recent)) >= 0
    }

    # A compact overall indicator based only on fields relevant to training stats.
    completeness = (
        round(sum(item["percent"] for item in coverage.values()) / len(coverage), 1)
        if coverage
        else 0.0
    )

    sports: dict[str, dict[str, float | int]] = {}
    for _, activity in recent:
        sport = _sport(activity)
        values = sports.setdefault(
            sport,
            {
                "activities": 0,
                "duration": 0.0,
                "distance": 0.0,
                "load": 0.0,
                "calories": 0.0,
            },
        )
        values["activities"] += 1
        values["duration"] += _number(
            activity, "moving_time", "elapsed_time", "duration"
        )
        values["distance"] += _number(activity, "distance")
        values["load"] += _number(
            activity, "icu_training_load", "training_load", "load"
        )
        values["calories"] += _number(activity, "calories")

    sport_summary = {
        sport: {
            "activities": int(values["activities"]),
            "duration_hours": round(float(values["duration"]) / 3600, 2),
            "distance_km": round(float(values["distance"]) / 1000, 2),
            "load": round(float(values["load"]), 1),
            "calories": round(float(values["calories"])),
        }
        for sport, values in sorted(
            sports.items(), key=lambda item: float(item[1]["duration"]), reverse=True
        )
    }

    weekly_history: list[dict[str, Any]] = []
    current_week_start = today - timedelta(days=today.weekday())
    for week_offset in range(12, -1, -1):
        week_start = current_week_start - timedelta(weeks=week_offset)
        week_end = week_start + timedelta(days=6)
        week_activities = [
            activity
            for activity_day, activity in recent
            if week_start <= activity_day <= week_end
        ]
        weekly_history.append(
            {
                "week_start": week_start.isoformat(),
                "activities": len(week_activities),
                "duration_hours": round(
                    sum(
                        _number(item, "moving_time", "elapsed_time", "duration")
                        for item in week_activities
                    )
                    / 3600,
                    2,
                ),
                "distance_km": round(
                    sum(_number(item, "distance") for item in week_activities) / 1000,
                    2,
                ),
                "load": round(
                    sum(
                        _number(item, "icu_training_load", "training_load", "load")
                        for item in week_activities
                    ),
                    1,
                ),
            }
        )

    return {
        "activities_90_days": total,
        "training_days_90_days": len(training_days),
        "duration_90_days": round(duration),
        "distance_90_days": round(distance / 1000, 2),
        "load_90_days": round(load, 1),
        "calories_90_days": round(calories),
        "elevation_90_days": round(elevation),
        "average_weekly_load_90_days": round(load / (90 / 7), 1),
        "average_weekly_duration_90_days": round(duration / (90 / 7)),
        "main_sport_90_days": next(iter(sport_summary), None),
        "sport_statistics_90_days": sport_summary,
        "weekly_history_90_days": weekly_history,
        "activity_available_fields": sorted(fields),
        "activity_field_count": len(fields),
        "activity_data_coverage": coverage,
        "activity_data_completeness_percent": completeness,
    }
