"""Tests for the Atlas dashboard frontend sources."""

from pathlib import Path

ROOT = Path(__file__).parents[1]


def test_atlas_dashboard_is_enabled_and_discoverable() -> None:
    """Ensure the official card exposes the Atlas dashboard section."""
    card = (ROOT / "frontend/src/card.ts").read_text(encoding="utf-8")
    entities = (ROOT / "frontend/src/entities.ts").read_text(encoding="utf-8")
    types = (ROOT / "frontend/src/types.ts").read_text(encoding="utf-8")

    assert "show_atlas" in types
    assert "Atlas Readiness" in card
    assert "Atlas Coach" in card
    assert 'trainingStatus: "training_status"' in entities
    assert 'readinessScore: "readiness_score"' in entities
    assert 'atlasCoach: "atlas_coach"' in entities
