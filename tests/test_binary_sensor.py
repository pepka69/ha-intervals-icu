"""Tests for binary sensor state logic."""

from types import SimpleNamespace

from custom_components.ha_intervals_icu.binary_sensor import (
    IntervalsICUBinarySensor,
    IntervalsICUBinarySensorDescription,
)


def _entity(key: str, data: dict) -> IntervalsICUBinarySensor:
    coordinator = SimpleNamespace(data=data)
    description = IntervalsICUBinarySensorDescription(
        key=key,
        translation_key=key,
    )

    return IntervalsICUBinarySensor(
        coordinator=coordinator,
        athlete_id="i123456",
        athlete_name="Test Athlete",
        description=description,
    )


def test_positive_form() -> None:
    """Test positive form binary sensor."""

    assert _entity("positive_form", {"form": 2}).is_on is True
    assert _entity("positive_form", {"form": -1}).is_on is False


def test_high_fatigue() -> None:
    """Test high fatigue binary sensor."""

    assert (
        _entity(
            "high_fatigue",
            {"fitness": 30, "fatigue": 41},
        ).is_on
        is True
    )

    assert (
        _entity(
            "high_fatigue",
            {"fitness": 30, "fatigue": 39},
        ).is_on
        is False
    )


def test_planned_workout_flags() -> None:
    """Test planned workout binary sensors."""

    assert (
        _entity(
            "planned_today",
            {"planned_today": True},
        ).is_on
        is True
    )

    assert (
        _entity(
            "planned_tomorrow",
            {"planned_tomorrow": False},
        ).is_on
        is False
    )
