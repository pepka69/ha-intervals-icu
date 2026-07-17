"""Personal record helpers for ha-intervals-icu."""

from __future__ import annotations

from typing import Any


def _number(
    item: dict[str, Any],
    *keys: str,
) -> float | None:
    """Return the first usable numeric value."""

    for key in keys:
        value = item.get(key)

        if value is None or isinstance(value, bool):
            continue

        try:
            return float(value)
        except (TypeError, ValueError):
            continue

    return None


def _record(
    activities: list[dict[str, Any]],
    *keys: str,
) -> tuple[float | None, dict[str, Any] | None]:
    """Return the highest value and the matching activity."""

    best_value: float | None = None
    best_activity: dict[str, Any] | None = None

    for activity in activities:
        value = _number(activity, *keys)

        if value is None or value <= 0:
            continue

        if best_value is None or value > best_value:
            best_value = value
            best_activity = activity

    return best_value, best_activity


def _details(
    activity: dict[str, Any] | None,
) -> dict[str, Any] | None:
    """Return compact details about a record activity."""

    if not activity:
        return None

    return {
        key: activity.get(key)
        for key in (
            "id",
            "name",
            "type",
            "start_date_local",
            "start_date",
        )
        if activity.get(key) is not None
    }


def calculate_personal_records(
    athlete: dict[str, Any],
    activities: list[dict[str, Any]],
    period_days: int = 365,
) -> dict[str, Any]:
    """Calculate personal records from the supplied activity history."""

    definitions: dict[str, tuple[str, ...]] = {
        "record_distance": ("distance",),
        "record_duration": ("moving_time", "elapsed_time"),
        "record_elevation": ("total_elevation_gain",),
        "record_load": ("icu_training_load", "training_load"),
        "record_calories": ("calories",),
        "record_max_power": ("max_watts", "max_power"),
        "record_average_power": (
            "average_watts",
            "avg_watts",
            "average_power",
        ),
        "record_max_hr": ("max_heartrate", "max_hr"),
        "record_average_speed": ("average_speed",),
        "record_ftp": ("icu_ftp", "ftp"),
        "record_eftp": ("icu_eftp", "eftp", "eFTP"),
        "record_power_5s": (
            "power_5s",
            "watts_5s",
            "icu_power_5s",
            "icu_pm_5s",
            "p5s",
        ),
        "record_power_1m": (
            "power_60s",
            "watts_60s",
            "icu_power_60s",
            "icu_pm_60s",
            "p1m",
        ),
        "record_power_5m": (
            "power_300s",
            "watts_300s",
            "icu_power_300s",
            "icu_pm_300s",
            "p5m",
        ),
        "record_power_20m": (
            "power_1200s",
            "watts_1200s",
            "icu_power_1200s",
            "icu_pm_1200s",
            "p20m",
        ),
        "record_power_1h": (
            "power_3600s",
            "watts_3600s",
            "icu_power_3600s",
            "icu_pm_3600s",
            "p1h",
        ),
    }

    records: dict[str, Any] = {
        "records_period_days": period_days,
        "records_activity_count": len(activities),
    }

    for record_key, activity_keys in definitions.items():
        value, activity = _record(activities, *activity_keys)
        records[record_key] = value
        records[f"{record_key}_activity"] = _details(activity)

    current_ftp_values: list[float] = []

    for sport_setting in athlete.get("sportSettings", []):
        if not isinstance(sport_setting, dict):
            continue

        ftp = _number(sport_setting, "ftp")
        if ftp is not None and ftp > 0:
            current_ftp_values.append(ftp)

    if current_ftp_values:
        current_ftp = max(current_ftp_values)
        existing_ftp = records.get("record_ftp")

        if existing_ftp is None or current_ftp > existing_ftp:
            records["record_ftp"] = current_ftp
            records["record_ftp_activity"] = None

    return records
