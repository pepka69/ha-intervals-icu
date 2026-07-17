"""Fitness, fatigue and form history helpers for ha-intervals-icu."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any


def _wellness_date(item: dict[str, Any]) -> date | None:
    """Return the date of a wellness record."""

    raw_date = item.get("id") or item.get("date")

    if not raw_date:
        return None

    try:
        return date.fromisoformat(str(raw_date)[:10])
    except ValueError:
        return None


def _number(item: dict[str, Any], key: str) -> float | None:
    """Return a numeric wellness value."""

    value = item.get(key)

    if value is None:
        return None

    try:
        return round(float(value), 1)
    except (TypeError, ValueError):
        return None


def _form(item: dict[str, Any]) -> float | None:
    """Calculate form from fitness and fatigue."""

    fitness = _number(item, "ctl")
    fatigue = _number(item, "atl")

    if fitness is None or fatigue is None:
        return None

    return round(fitness - fatigue, 1)


def _variation(current: float | None, previous: float | None) -> float | None:
    """Return the variation between two values."""

    if current is None or previous is None:
        return None

    return round(current - previous, 1)


def _record_on_or_before(
    records: dict[date, dict[str, Any]],
    target: date,
) -> dict[str, Any]:
    """Return the closest wellness record on or before a target date."""

    candidates = [record_date for record_date in records if record_date <= target]
    if not candidates:
        return {}
    return records[max(candidates)]


def calculate_fitness_history(
    wellness: list[dict[str, Any]],
) -> dict[str, Any]:
    """Calculate current, historical and variation values."""

    records = {
        record_date: item
        for item in wellness
        if (record_date := _wellness_date(item)) is not None
    }

    if not records:
        return {
            "fitness": None,
            "fatigue": None,
            "form": None,
            "fitness_7_days_ago": None,
            "fitness_30_days_ago": None,
            "fatigue_7_days_ago": None,
            "fatigue_30_days_ago": None,
            "form_7_days_ago": None,
            "form_30_days_ago": None,
            "fitness_change_7_days": None,
            "fitness_change_30_days": None,
            "fatigue_change_7_days": None,
            "fatigue_change_30_days": None,
            "form_change_7_days": None,
            "form_change_30_days": None,
            "fitness_history": [],
            "fatigue_history": [],
            "form_history": [],
            "latest_wellness": {},
        }

    latest_date = max(records)
    latest = records[latest_date]
    seven_days_ago = _record_on_or_before(records, latest_date - timedelta(days=7))
    thirty_days_ago = _record_on_or_before(records, latest_date - timedelta(days=30))

    fitness = _number(latest, "ctl")
    fatigue = _number(latest, "atl")
    form = _form(latest)

    fitness_7 = _number(seven_days_ago, "ctl")
    fitness_30 = _number(thirty_days_ago, "ctl")
    fatigue_7 = _number(seven_days_ago, "atl")
    fatigue_30 = _number(thirty_days_ago, "atl")
    form_7 = _form(seven_days_ago)
    form_30 = _form(thirty_days_ago)

    fitness_history = []
    fatigue_history = []
    form_history = []

    for record_date in sorted(records):
        item = records[record_date]
        date_value = record_date.isoformat()
        item_fitness = _number(item, "ctl")
        item_fatigue = _number(item, "atl")
        item_form = _form(item)

        if item_fitness is not None:
            fitness_history.append({"date": date_value, "value": item_fitness})

        if item_fatigue is not None:
            fatigue_history.append({"date": date_value, "value": item_fatigue})

        if item_form is not None:
            form_history.append({"date": date_value, "value": item_form})

    return {
        "fitness": fitness,
        "fatigue": fatigue,
        "form": form,
        "fitness_7_days_ago": fitness_7,
        "fitness_30_days_ago": fitness_30,
        "fatigue_7_days_ago": fatigue_7,
        "fatigue_30_days_ago": fatigue_30,
        "form_7_days_ago": form_7,
        "form_30_days_ago": form_30,
        "fitness_change_7_days": _variation(fitness, fitness_7),
        "fitness_change_30_days": _variation(fitness, fitness_30),
        "fatigue_change_7_days": _variation(fatigue, fatigue_7),
        "fatigue_change_30_days": _variation(fatigue, fatigue_30),
        "form_change_7_days": _variation(form, form_7),
        "form_change_30_days": _variation(form, form_30),
        "fitness_history": fitness_history,
        "fatigue_history": fatigue_history,
        "form_history": form_history,
        "latest_wellness": latest,
    }
