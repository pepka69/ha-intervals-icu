"""Tests for Lovelace About metadata."""

from custom_components.ha_intervals_icu.sensor import (
    _integration_version,
    build_dashboard_attributes,
)


def test_dashboard_exposes_manifest_version() -> None:
    attributes = build_dashboard_attributes({"athlete": {"name": "Alex"}})

    assert attributes["integration_version"] == _integration_version()
    assert attributes["integration_version"] != "1.3.0-beta1"
