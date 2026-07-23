"""Tests for the Statistics card athlete selector."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_statistics_card_supports_athlete_selection() -> None:
    """Ensure Statistics can be scoped to an Intervals.icu athlete."""
    statistics_card = (
        ROOT / "frontend/src/statistics-card.ts"
    ).read_text(encoding="utf-8")

    assert "device_id?: string" in statistics_card
    assert "integrationDevices" in statistics_card
    assert "deviceName" in statistics_card

    assert (
        'customElement("ha-intervals-icu-statistics-card-editor")'
        in statistics_card
    )
    assert (
        '"ha-intervals-icu-statistics-card-editor"'
        in statistics_card
    )

    assert "changeDevice" in statistics_card
    assert "delete config.entity" in statistics_card

    assert '"statistics_dashboard"' in statistics_card
    assert "this.config?.device_id" in statistics_card
