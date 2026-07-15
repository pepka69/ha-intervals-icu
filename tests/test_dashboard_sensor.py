"""Tests for the compact dashboard sensor payload."""

from custom_components.ha_intervals_icu.sensor import build_dashboard_attributes


def test_build_dashboard_attributes() -> None:
    """Dashboard payload contains the card sections."""

    payload = build_dashboard_attributes(
        {
            "athlete": {"name": "Alex"},
            "fitness": 42.1,
            "fatigue": 38.0,
            "form": 4.1,
            "weekly_load": 321.0,
            "weekly_activities": 5,
            "record_distance": 123000,
            "last_activity": {"name": "Ride", "id": "1"},
            "planned_today": True,
            "planned_today_name": "Tempo",
        }
    )

    assert payload["athlete_name"] == "Alex"
    assert payload["summary"]["fitness"] == 42.1
    assert payload["weekly"]["load"] == 321.0
    assert payload["records"]["distance"]["value"] == 123000
    assert payload["last_activity"]["name"] == "Ride"
    assert payload["planned_today"]["name"] == "Tempo"
