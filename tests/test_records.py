"""Tests for personal record helpers."""

from custom_components.ha_intervals_icu.records import calculate_personal_records


def test_calculate_personal_records() -> None:
    """Test records are selected from the highest activity values."""

    athlete = {"sportSettings": [{"ftp": 250}]}
    activities = [
        {
            "id": "a1",
            "name": "Short ride",
            "distance": 20000,
            "moving_time": 3600,
            "total_elevation_gain": 300,
            "icu_training_load": 45,
            "calories": 500,
            "max_watts": 700,
            "average_watts": 190,
            "max_heartrate": 170,
            "average_speed": 8.0,
            "icu_ftp": 240,
            "icu_eftp": 245,
        },
        {
            "id": "a2",
            "name": "Long ride",
            "distance": 100000,
            "moving_time": 14400,
            "total_elevation_gain": 1800,
            "icu_training_load": 220,
            "calories": 2400,
            "max_watts": 900,
            "average_watts": 210,
            "max_heartrate": 185,
            "average_speed": 9.5,
            "icu_ftp": 260,
            "icu_eftp": 265,
        },
    ]

    records = calculate_personal_records(athlete, activities)

    assert records["record_distance"] == 100000
    assert records["record_duration"] == 14400
    assert records["record_elevation"] == 1800
    assert records["record_load"] == 220
    assert records["record_calories"] == 2400
    assert records["record_max_power"] == 900
    assert records["record_average_power"] == 210
    assert records["record_max_hr"] == 185
    assert records["record_average_speed"] == 9.5
    assert records["record_ftp"] == 260
    assert records["record_eftp"] == 265
    assert records["record_distance_activity"]["id"] == "a2"
    assert records["records_period_days"] == 365
    assert records["records_activity_count"] == 2


def test_current_ftp_is_used_when_higher() -> None:
    """Test current athlete FTP can provide the highest known FTP."""

    records = calculate_personal_records(
        {"sportSettings": [{"ftp": 300}]},
        [{"icu_ftp": 280}],
    )

    assert records["record_ftp"] == 300
    assert records["record_ftp_activity"] is None
