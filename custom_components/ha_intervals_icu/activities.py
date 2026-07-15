"""Activity helpers for ha-intervals-icu."""

from __future__ import annotations

from typing import Any


def last_activity(
    activities: list[dict[str, Any]],
) -> dict[str, Any]:
    """Return processed last activity."""

    if not activities:
        return {}

    activity = activities[-1]

    return {
        "last_activity": activity,
        "last_activity_name": activity.get("name"),
        "last_activity_type": activity.get("type"),
        "last_activity_date": (
            activity.get("start_date_local") or activity.get("start_date")
        ),
        "last_activity_distance": activity.get("distance"),
        "last_activity_duration": (
            activity.get("moving_time") or activity.get("elapsed_time")
        ),
        "last_activity_load": activity.get("icu_training_load"),
        "last_activity_calories": activity.get("calories"),
        "last_activity_elevation_gain": activity.get("total_elevation_gain"),
        "last_activity_avg_hr": activity.get("average_heartrate"),
        "last_activity_max_hr": activity.get("max_heartrate"),
        "last_activity_avg_power": activity.get("average_watts"),
        "last_activity_max_power": activity.get("max_watts"),
        "last_activity_avg_speed": activity.get("average_speed"),
    }
