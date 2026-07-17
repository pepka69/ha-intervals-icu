"""Official Intervals.icu wellness statistics helpers."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any


def _record_date(item: dict[str, Any]) -> date | None:
    raw = item.get("id") or item.get("date")
    if not raw:
        return None
    try:
        return date.fromisoformat(str(raw)[:10])
    except ValueError:
        return None


def _number(item: dict[str, Any], *keys: str) -> float | None:
    for key in keys:
        value = item.get(key)
        if value is None:
            continue
        try:
            return float(value)
        except (TypeError, ValueError):
            continue
    return None


def _nearest_value(
    records: list[tuple[date, dict[str, Any]]],
    target: date,
    keys: tuple[str, ...],
) -> float | None:
    candidates = [(day, item) for day, item in records if day <= target]
    if not candidates:
        return None
    _, item = max(candidates, key=lambda value: value[0])
    return _number(item, *keys)


def _summary(
    records: list[tuple[date, dict[str, Any]]],
    keys: tuple[str, ...],
    prefix: str,
) -> dict[str, Any]:
    if not records:
        return {}

    latest_day, latest_item = records[-1]
    current = _number(latest_item, *keys)
    values_7 = [
        value
        for day, item in records
        if day >= latest_day - timedelta(days=6)
        and (value := _number(item, *keys)) is not None
    ]
    values_30 = [
        value
        for day, item in records
        if day >= latest_day - timedelta(days=29)
        and (value := _number(item, *keys)) is not None
    ]
    previous_7 = _nearest_value(records, latest_day - timedelta(days=7), keys)
    previous_30 = _nearest_value(records, latest_day - timedelta(days=30), keys)

    def average(values: list[float]) -> float | None:
        return round(sum(values) / len(values), 2) if values else None

    def change(previous: float | None) -> float | None:
        if current is None or previous is None:
            return None
        return round(current - previous, 2)

    return {
        prefix: round(current, 2) if current is not None else None,
        f"{prefix}_7_days_ago": (
            round(previous_7, 2) if previous_7 is not None else None
        ),
        f"{prefix}_30_days_ago": (
            round(previous_30, 2) if previous_30 is not None else None
        ),
        f"{prefix}_change_7_days": change(previous_7),
        f"{prefix}_change_30_days": change(previous_30),
        f"{prefix}_average_7_days": average(values_7),
        f"{prefix}_average_30_days": average(values_30),
        f"{prefix}_minimum_30_days": (round(min(values_30), 2) if values_30 else None),
        f"{prefix}_maximum_30_days": (round(max(values_30), 2) if values_30 else None),
        f"{prefix}_history": [
            {"date": day.isoformat(), "value": round(value, 2)}
            for day, item in records
            if (value := _number(item, *keys)) is not None
        ],
    }


def calculate_wellness_statistics(
    wellness: list[dict[str, Any]],
) -> dict[str, Any]:
    """Expose official Wellness metrics and useful trends without guessing."""

    records = sorted(
        (
            (record_day, item)
            for item in wellness
            if (record_day := _record_date(item)) is not None
        ),
        key=lambda value: value[0],
    )

    result: dict[str, Any] = {
        "wellness_record_count": len(records),
        "wellness_available_fields": sorted(
            {
                key
                for _, item in records
                for key, value in item.items()
                if value is not None
            }
        ),
    }

    metrics: dict[str, tuple[str, ...]] = {
        "official_ctl": ("ctl",),
        "official_atl": ("atl",),
        "official_ramp_rate": ("rampRate", "ramp_rate"),
        "official_ctl_load": ("ctlLoad", "ctl_load", "ctLoad"),
        "official_atl_load": ("atlLoad", "atl_load"),
        "official_eftp": ("eftp", "eFTP", "icu_eftp"),
        "wellness_weight": ("weight",),
        "wellness_resting_hr": ("restingHR", "resting_hr"),
        "wellness_hrv": ("hrv", "hrvRMSSD", "hrvSdnn", "hrvSDNN"),
        "wellness_sleep_score": ("sleepScore", "sleep_score"),
        "wellness_readiness": (
            "readiness",
            "readinessScore",
            "recovery",
            "recoveryScore",
        ),
        "wellness_vo2max": ("vo2max", "vo2Max"),
    }

    for prefix, keys in metrics.items():
        result.update(_summary(records, keys, prefix))

    ctl = result.get("official_ctl")
    atl = result.get("official_atl")
    result["official_form"] = (
        round(float(ctl) - float(atl), 2)
        if ctl is not None and atl is not None
        else None
    )

    form_history = []
    for day, item in records:
        item_ctl = _number(item, "ctl")
        item_atl = _number(item, "atl")
        if item_ctl is not None and item_atl is not None:
            form_history.append(
                {"date": day.isoformat(), "value": round(item_ctl - item_atl, 2)}
            )
    result["official_form_history"] = form_history

    if records:
        result["wellness_first_date"] = records[0][0].isoformat()
        result["wellness_latest_date"] = records[-1][0].isoformat()

    return result
