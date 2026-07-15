"""Workout helpers for ha-intervals-icu."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from typing import Any


def planned_workouts(
    workouts: list[dict[str, Any]],
) -> dict[str, Any]:
    """Return today's and tomorrow's planned workouts."""

    today = date.today()
    tomorrow = today + timedelta(days=1)

    result = {
        "planned_today": False,
        "planned_tomorrow": False,
        "planned_today_name": None,
        "planned_today_sport": None,
        "planned_today_start": None,
        "planned_today_duration": None,
        "planned_today_load": None,
        "planned_today_description": None,
        "planned_tomorrow_name": None,
        "planned_tomorrow_sport": None,
        "planned_tomorrow_start": None,
        "planned_tomorrow_duration": None,
        "planned_tomorrow_load": None,
        "planned_tomorrow_description": None,
    }

    for workout in workouts:

        raw = (
            workout.get("start_date_local")
            or workout.get("start_date")
            or workout.get("date")
        )

        if not raw:
            continue

        try:
            workout_day = datetime.fromisoformat(
                str(raw).replace("Z", "+00:00")
            ).date()
        except Exception:
            try:
                workout_day = date.fromisoformat(
                    str(raw)[:10]
                )
            except Exception:
                continue

        target = None

        if workout_day == today:
            target = "today"

        elif workout_day == tomorrow:
            target = "tomorrow"

        if target is None:
            continue

        result[f"planned_{target}"] = True

        result[f"planned_{target}_name"] = (
            workout.get("name")
            or workout.get("title")
        )

        result[f"planned_{target}_sport"] = (
            workout.get("type")
            or workout.get("sport")
        )

        result[f"planned_{target}_start"] = raw

        result[f"planned_{target}_duration"] = (
            workout.get("moving_time")
            or workout.get("duration")
            or workout.get("seconds")
        )

        result[f"planned_{target}_load"] = (
            workout.get("icu_training_load")
            or workout.get("load")
            or workout.get("tss")
        )

        result[f"planned_{target}_description"] = (
            workout.get("description")
        )

    return result
