"""Tests for beta18 wellness charts."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_statistics_card_contains_wellness_charts() -> None:
    """Statistics Evolution must expose the four wellness charts."""

    source = (ROOT / "frontend/src/statistics-card.ts").read_text(encoding="utf-8")

    assert 't(this.hass, "chart_sleep")' in source
    assert 't(this.hass, "chart_readiness")' in source
    assert 't(this.hass, "chart_hrv")' in source
    assert 't(this.hass, "chart_resting_hr")' in source
    assert "value / 3600" in source
    assert "wellness-chart-grid" in source


def test_native_chart_contains_hover_values() -> None:
    """Native SVG points must expose date and value on hover."""

    source = (ROOT / "frontend/src/chart.ts").read_text(encoding="utf-8")

    assert 'class="chart-point ${item.className}"' in source
    assert "<title>" in source
    assert "valueSuffix" in source
    assert "valueDecimals" in source


def test_wellness_chart_translations_exist() -> None:
    """French and English labels must be bundled."""

    source = (ROOT / "frontend/src/i18n.ts").read_text(encoding="utf-8")

    assert 'chart_wellness: "Évolution du bien-être"' in source
    assert 'chart_wellness: "Wellness evolution"' in source
    assert 'chart_readiness: "Préparation"' in source
    assert 'chart_resting_hr: "Fréquence cardiaque au repos"' in source
