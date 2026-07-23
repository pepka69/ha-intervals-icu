"""Tests for the Atlas dashboard frontend section."""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_atlas_dashboard_is_enabled_and_discoverable() -> None:
    """Ensure the official card exposes the localized Atlas dashboard section."""
    card = (ROOT / "frontend/src/card.ts").read_text(encoding="utf-8")
    entities = (ROOT / "frontend/src/entities.ts").read_text(encoding="utf-8")
    types = (ROOT / "frontend/src/types.ts").read_text(encoding="utf-8")
    translations = (ROOT / "frontend/src/i18n.ts").read_text(encoding="utf-8")

    assert "show_atlas" in types

    # Atlas sections must be rendered through the frontend translation system.
    assert 't(hass, "atlas_readiness")' in card
    assert 't(hass, "atlas_coach")' in card

    # English fallback translations must remain available.
    assert 'atlas_readiness:"Atlas Readiness"' in translations
    assert 'atlas_coach:"Atlas Coach"' in translations

    # Atlas entities must still be exposed.
    assert "readinessScore" in entities
    assert "readinessLevel" in entities
    assert "readinessRecoveryHours" in entities
    assert "atlasCoach" in entities

    # The Atlas entities must still be consumed by the card.
    assert "DEFAULT_KEYS.readinessScore" in card
    assert "DEFAULT_KEYS.readinessLevel" in card
    assert "DEFAULT_KEYS.readinessRecoveryHours" in card
    assert "DEFAULT_KEYS.atlasCoach" in card