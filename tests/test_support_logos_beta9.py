"""Regression tests for localized support logos."""

from pathlib import Path

ROOT = Path(__file__).parents[1]


def test_readmes_use_one_localized_logo_each() -> None:
    english = (ROOT / "README.md").read_text(encoding="utf-8")
    french = (ROOT / "README.fr.md").read_text(encoding="utf-8")

    assert "buy-me-a-beer-en.png" in english
    assert "offre-moi-une-biere-fr.png" not in english
    assert "offre-moi-une-biere-fr.png" in french
    assert "buy-me-a-beer-en.png" not in french


def test_home_assistant_uses_english_support_logo() -> None:
    editor = (ROOT / "frontend/src/editor.ts").read_text(encoding="utf-8")

    assert "buy-me-a-beer-en.png" in editor
    assert "offre-moi-une-biere-fr.png" not in editor
