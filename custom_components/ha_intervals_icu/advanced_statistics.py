"""Multi-period statistics, trends, records and training insights."""

from __future__ import annotations

from collections import defaultdict
from datetime import date, timedelta
from typing import Any

PERIODS = (7, 30, 90, 365)


def _day(item: dict[str, Any]) -> date | None:
    raw = item.get("start_date_local") or item.get("start_date") or item.get("id")
    if not raw:
        return None
    try:
        return date.fromisoformat(str(raw)[:10])
    except ValueError:
        return None


def _num(item: dict[str, Any], *keys: str) -> float:
    for key in keys:
        value = item.get(key)
        if value is None or isinstance(value, bool):
            continue
        try:
            return float(value)
        except (TypeError, ValueError):
            pass
    return 0.0


def _sport(item: dict[str, Any]) -> str:
    return str(item.get("type") or item.get("sport") or item.get("sport_type") or "Other")


def _pct(current: float, previous: float) -> float | None:
    if previous == 0:
        return None if current == 0 else 100.0
    return round((current - previous) * 100 / previous, 1)


def _summary(items: list[dict[str, Any]]) -> dict[str, Any]:
    duration = sum(_num(a, "moving_time", "elapsed_time", "duration") for a in items)
    load = sum(_num(a, "icu_training_load", "training_load", "load") for a in items)
    distance = sum(_num(a, "distance") for a in items)
    hrss = sum(_num(a, "hrss", "icu_hrss", "hr_load") for a in items)
    trimp = sum(_num(a, "trimp", "icu_trimp") for a in items)
    elevation = sum(_num(a, "total_elevation_gain", "elevation_gain") for a in items)
    calories = sum(_num(a, "calories") for a in items)
    days = {_day(a) for a in items if _day(a)}
    return {
        "activities": len(items),
        "training_days": len(days),
        "duration_hours": round(duration / 3600, 2),
        "distance_km": round(distance / 1000, 2),
        "load": round(load, 1),
        "hrss": round(hrss, 1),
        "trimp": round(trimp, 1),
        "elevation_m": round(elevation),
        "calories": round(calories),
        "average_activity_minutes": round(duration / len(items) / 60, 1) if items else 0,
        "average_activity_load": round(load / len(items), 1) if items else 0,
    }


def _comparison(current: dict[str, Any], previous: dict[str, Any]) -> dict[str, Any]:
    keys = ("activities", "training_days", "duration_hours", "distance_km", "load", "hrss", "trimp", "elevation_m", "calories")
    return {f"{key}_change_percent": _pct(float(current[key]), float(previous[key])) for key in keys}


def _sport_summaries(items: list[dict[str, Any]]) -> dict[str, Any]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in items:
        grouped[_sport(item)].append(item)
    result = {sport: _summary(values) for sport, values in grouped.items()}
    return dict(sorted(result.items(), key=lambda row: row[1]["duration_hours"], reverse=True))


def _record(items: list[dict[str, Any]], keys: tuple[str, ...]) -> dict[str, Any] | None:
    best: tuple[float, dict[str, Any]] | None = None
    for item in items:
        value = _num(item, *keys)
        if value > 0 and (best is None or value > best[0]):
            best = (value, item)
    if best is None:
        return None
    value, item = best
    return {
        "value": round(value, 2),
        "activity": {key: item.get(key) for key in ("id", "name", "type", "start_date_local", "start_date") if item.get(key) is not None},
    }


def _records_by_sport(items: list[dict[str, Any]]) -> dict[str, Any]:
    definitions = {
        "distance_m": ("distance",),
        "duration_seconds": ("moving_time", "elapsed_time", "duration"),
        "elevation_m": ("total_elevation_gain", "elevation_gain"),
        "load": ("icu_training_load", "training_load", "load"),
        "calories": ("calories",),
        "max_power_w": ("max_watts", "max_power"),
        "average_power_w": ("average_watts", "weighted_average_watts", "average_power"),
        "max_hr_bpm": ("max_heartrate", "max_hr"),
        "average_speed_mps": ("average_speed",),
    }
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in items:
        grouped[_sport(item)].append(item)
    output: dict[str, Any] = {}
    for sport, values in grouped.items():
        output[sport] = {name: record for name, keys in definitions.items() if (record := _record(values, keys)) is not None}
    return output


def _period_records(items: list[dict[str, Any]]) -> dict[str, Any]:
    weekly: dict[str, list[dict[str, Any]]] = defaultdict(list)
    monthly: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in items:
        day = _day(item)
        if day is None:
            continue
        year, week, _ = day.isocalendar()
        weekly[f"{year}-W{week:02d}"].append(item)
        monthly[day.strftime("%Y-%m")].append(item)

    def best(groups: dict[str, list[dict[str, Any]]], metric: str) -> dict[str, Any] | None:
        summaries = [(key, _summary(value)) for key, value in groups.items()]
        if not summaries:
            return None
        period, summary = max(summaries, key=lambda row: float(row[1][metric]))
        return {"period": period, **summary}

    return {
        "best_week_by_load": best(weekly, "load"),
        "best_week_by_duration": best(weekly, "duration_hours"),
        "best_month_by_load": best(monthly, "load"),
        "best_month_by_duration": best(monthly, "duration_hours"),
    }


def _wellness_trends(wellness: list[dict[str, Any]]) -> dict[str, Any]:
    rows = sorted(((day, item) for item in wellness if (day := _day(item))), key=lambda row: row[0])
    aliases = {
        "ctl": ("ctl",), "atl": ("atl",), "form": ("form",),
        "eftp": ("eftp", "eFTP", "icu_eftp"), "weight": ("weight",),
        "sleep_hours": ("sleepSecs",), "resting_hr": ("restingHR",), "hrv": ("hrv", "hrvRMSSD", "hrvSDNN"),
    }
    today = date.today()
    result: dict[str, Any] = {}
    for name, keys in aliases.items():
        points = []
        for day, item in rows:
            value = _num(item, *keys)
            if name == "sleep_hours" and value:
                value /= 3600
            if value:
                points.append({"date": day.isoformat(), "value": round(value, 2)})
        metric: dict[str, Any] = {"history": points}
        if points:
            metric["latest"] = points[-1]["value"]
            for period in PERIODS:
                eligible = [p for p in points if date.fromisoformat(p["date"]) <= today - timedelta(days=period)]
                old = eligible[-1]["value"] if eligible else None
                metric[f"change_{period}_days"] = round(points[-1]["value"] - old, 2) if old is not None else None
        result[name] = metric
    return result


def _insights(periods: dict[str, Any], trends: dict[str, Any], sports: dict[str, Any]) -> list[dict[str, str]]:
    insights: list[dict[str, str]] = []
    p30 = periods.get("30_days", {})
    change = p30.get("comparison", {}).get("load_change_percent")
    if isinstance(change, (int, float)):
        level = "warning" if change > 25 else "positive" if change > 5 else "neutral"
        insights.append({"type": level, "title": "Training load", "message": f"30-day load is {abs(change):.0f}% {'higher' if change >= 0 else 'lower'} than the previous period."})
    form = trends.get("form", {}).get("latest")
    if isinstance(form, (int, float)) and form < -20:
        insights.append({"type": "warning", "title": "Fatigue", "message": "Form is below -20. Consider recovery before another hard session."})
    sleep = trends.get("sleep_hours", {}).get("change_7_days")
    if isinstance(sleep, (int, float)) and sleep < -1:
        insights.append({"type": "warning", "title": "Sleep", "message": "Latest sleep is more than one hour below the value from seven days ago."})
    sport30 = sports.get("30_days", {})
    if sport30:
        main, values = next(iter(sport30.items()))
        total = sum(float(row.get("duration_hours", 0)) for row in sport30.values())
        share = float(values.get("duration_hours", 0)) * 100 / total if total else 0
        insights.append({"type": "info", "title": "Sport mix", "message": f"{main} represents {share:.0f}% of training time over the last 30 days."})
    return insights[:6]


def calculate_advanced_statistics(activities: list[dict[str, Any]], wellness: list[dict[str, Any]]) -> dict[str, Any]:
    """Calculate the complete Statistics Dashboard payload."""
    today = date.today()
    dated = [(day, item) for item in activities if (day := _day(item)) and day <= today]
    periods: dict[str, Any] = {}
    sports: dict[str, Any] = {}
    for days in PERIODS:
        current_items = [item for day, item in dated if 0 <= (today - day).days < days]
        previous_items = [item for day, item in dated if days <= (today - day).days < days * 2]
        current = _summary(current_items)
        previous = _summary(previous_items)
        periods[f"{days}_days"] = {"current": current, "previous": previous, "comparison": _comparison(current, previous)}
        sports[f"{days}_days"] = _sport_summaries(current_items)
    trends = _wellness_trends(wellness)
    return {
        "advanced_periods": periods,
        "advanced_sports": sports,
        "advanced_trends": trends,
        "advanced_records_by_sport": _records_by_sport([item for day, item in dated if (today - day).days < 365]),
        "advanced_period_records": _period_records([item for day, item in dated if (today - day).days < 365]),
        "training_insights": _insights(periods, trends, sports),
    }
