"""Tests for beta18 activity timeline."""

from pathlib import Path

from custom_components.ha_intervals_icu.sensor import (
    build_statistics_dashboard_attributes,
)

ROOT = Path(__file__).resolve().parents[1]


def test_statistics_dashboard_exposes_activity_timeline() -> None:
    """Existing activity data must be reused without another API call."""

    activities = [
        {
            "id": "activity-1",
            "date": "2026-07-28T08:00:00+02:00",
            "name": "Morning ride",
            "type": "Ride",
            "duration": 3600,
        }
    ]

    attributes = build_statistics_dashboard_attributes(
        {"activity_timeline": activities}
    )

    assert attributes["activity_timeline"] == activities


def test_statistics_dashboard_uses_recent_activities_fallback() -> None:
    """Recent activities must remain compatible with older payloads."""

    activities = [
        {
            "id": "activity-2",
            "date": "2026-07-27T08:00:00+02:00",
            "name": "CrossFit",
            "type": "HighIntensityIntervalTraining",
        }
    ]

    attributes = build_statistics_dashboard_attributes(
        {"recent_activities": activities}
    )

    assert attributes["activity_timeline"] == activities


def test_frontend_contains_activity_timeline() -> None:
    """The activity timeline and sport distribution must be bundled."""

    timeline = (ROOT / "frontend/src/activity-timeline.ts").read_text(encoding="utf-8")

    card = (ROOT / "frontend/src/statistics-card.ts").read_text(encoding="utf-8")

    assert "renderActivityTimeline" in timeline
    assert "ActivityTimelineItem" in timeline
    assert "sportIcon" in timeline
    assert 'this.section === "activities"' in card
    assert "activityTimeline(data: Dict)" in card
    assert "sport-distribution-list" in card


def test_activity_timeline_translations_exist() -> None:
    """French and English translations must exist."""

    source = (ROOT / "frontend/src/i18n.ts").read_text(encoding="utf-8")

    assert 'activity_timeline: "Chronologie des activités"' in source
    assert 'activity_timeline: "Activity timeline"' in source
    assert 'sport_distribution: "Répartition sportive"' in source
    assert 'sport_distribution: "Sport distribution"' in source
