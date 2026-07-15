"""Tests for fitness, fatigue and form history helpers."""

from custom_components.ha_intervals_icu.history import calculate_fitness_history


def test_calculate_fitness_history() -> None:
    """Test historical values, changes and ordered series."""

    wellness = [
        {"id": "2026-06-15", "ctl": 30, "atl": 35},
        {"id": "2026-07-08", "ctl": 38, "atl": 45},
        {"id": "2026-07-15", "ctl": 40, "atl": 52},
    ]

    result = calculate_fitness_history(wellness)

    assert result["fitness"] == 40.0
    assert result["fatigue"] == 52.0
    assert result["form"] == -12.0
    assert result["fitness_7_days_ago"] == 38.0
    assert result["fitness_30_days_ago"] == 30.0
    assert result["fatigue_7_days_ago"] == 45.0
    assert result["fatigue_30_days_ago"] == 35.0
    assert result["form_7_days_ago"] == -7.0
    assert result["form_30_days_ago"] == -5.0
    assert result["fitness_change_7_days"] == 2.0
    assert result["fitness_change_30_days"] == 10.0
    assert result["fatigue_change_7_days"] == 7.0
    assert result["fatigue_change_30_days"] == 17.0
    assert result["form_change_7_days"] == -5.0
    assert result["form_change_30_days"] == -7.0
    assert result["fitness_history"] == [
        {"date": "2026-06-15", "value": 30.0},
        {"date": "2026-07-08", "value": 38.0},
        {"date": "2026-07-15", "value": 40.0},
    ]


def test_history_uses_latest_date_not_list_order() -> None:
    """Test that unordered API payloads are handled correctly."""

    result = calculate_fitness_history(
        [
            {"id": "2026-07-15", "ctl": 40, "atl": 52},
            {"id": "2026-07-08", "ctl": 38, "atl": 45},
        ]
    )

    assert result["fitness"] == 40.0
    assert result["fitness_7_days_ago"] == 38.0


def test_history_handles_missing_dates() -> None:
    """Test missing historical dates return None."""

    result = calculate_fitness_history([{"id": "2026-07-15", "ctl": 40, "atl": 52}])

    assert result["fitness_7_days_ago"] is None
    assert result["fitness_change_7_days"] is None
