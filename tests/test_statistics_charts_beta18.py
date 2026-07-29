"""Tests for the beta18 Statistics chart infrastructure."""

from pathlib import Path

from custom_components.ha_intervals_icu.sensor import (
    build_statistics_dashboard_attributes,
)

ROOT = Path(__file__).resolve().parents[1]


def test_statistics_dashboard_exposes_evolution_history() -> None:
    """The Statistics entity must expose existing history without API calls."""

    data = {
        "fitness_history": [{"date": "2026-07-01", "value": 50.0}],
        "fatigue_history": [{"date": "2026-07-01", "value": 55.0}],
        "form_history": [{"date": "2026-07-01", "value": -5.0}],
        "wellness_sleep_history": [{"date": "2026-07-01", "value": 28800.0}],
        "wellness_hrv_history": [{"date": "2026-07-01", "value": 48.0}],
        "wellness_resting_hr_history": [{"date": "2026-07-01", "value": 52.0}],
        "wellness_readiness_history": [{"date": "2026-07-01", "value": 72.0}],
    }

    attributes = build_statistics_dashboard_attributes(data)

    assert attributes["evolution"]["fitness"] == data["fitness_history"]
    assert attributes["evolution"]["fatigue"] == data["fatigue_history"]
    assert attributes["evolution"]["form"] == data["form_history"]
    assert attributes["evolution"]["sleep"] == data["wellness_sleep_history"]
    assert attributes["evolution"]["hrv"] == data["wellness_hrv_history"]
    assert attributes["evolution"]["resting_hr"] == data["wellness_resting_hr_history"]
    assert attributes["evolution"]["readiness"] == data["wellness_readiness_history"]


def test_statistics_frontend_contains_native_chart_infrastructure() -> None:
    """The frontend must include the native chart and Evolution tab."""

    chart_source = (ROOT / "frontend/src/chart.ts").read_text(encoding="utf-8")
    card_source = (ROOT / "frontend/src/statistics-card.ts").read_text(encoding="utf-8")

    assert "renderLineChart" in chart_source
    assert "filterSeriesByDays" in chart_source
    assert "statistics-history-chart" in chart_source
    assert 'this.section === "evolution"' in card_source
    assert '"overview","evolution","sports"' in card_source
