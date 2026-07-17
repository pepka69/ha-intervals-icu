"""Time-in-zone aggregation helpers."""

from __future__ import annotations

from typing import Any


def _zone_values(activity: dict[str, Any], aliases: tuple[str, ...]) -> list[float]:
    for key in aliases:
        value = activity.get(key)
        if isinstance(value, list):
            values: list[float] = []
            for item in value:
                try:
                    values.append(float(item))
                except (TypeError, ValueError):
                    values.append(0.0)
            return values
        if isinstance(value, dict):
            values = []
            for key_name in sorted(value):
                try:
                    values.append(float(value[key_name]))
                except (TypeError, ValueError):
                    values.append(0.0)
            return values
    return []


def _aggregate(activities: list[dict[str, Any]], aliases: tuple[str, ...]) -> list[int]:
    totals: list[float] = []
    for activity in activities:
        values = _zone_values(activity, aliases)
        if len(totals) < len(values):
            totals.extend([0.0] * (len(values) - len(totals)))
        for index, value in enumerate(values):
            totals[index] += value
    return [round(value) for value in totals]


def calculate_zone_statistics(
    activities: list[dict[str, Any]],
) -> dict[str, Any]:
    """Aggregate API-provided HR and power zone durations when present."""

    hr = _aggregate(
        activities,
        (
            "icu_hr_zone_times",
            "hr_zone_times",
            "heartrate_zone_times",
            "hr_zones",
        ),
    )
    power = _aggregate(
        activities,
        (
            "icu_power_zone_times",
            "power_zone_times",
            "watts_zone_times",
            "power_zones",
        ),
    )

    return {
        "hr_zone_times_60_days": hr,
        "power_zone_times_60_days": power,
        "hr_zone_total_60_days": sum(hr) if hr else None,
        "power_zone_total_60_days": sum(power) if power else None,
        "hr_zone_count": len(hr),
        "power_zone_count": len(power),
    }
