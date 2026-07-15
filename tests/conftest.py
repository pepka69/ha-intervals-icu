"""Pytest fixtures for ha-intervals-icu."""

from __future__ import annotations

import pytest


@pytest.fixture
def athlete() -> dict:
    """Return a sample athlete payload."""

    return {
        "id": "i123456",
        "name": "Test Athlete",
        "icu_resting_hr": 58,
        "icu_weight": 72.5,
        "sportSettings": [
            {
                "types": ["Ride"],
                "ftp": 250,
            }
        ],
    }


@pytest.fixture
def wellness() -> list[dict]:
    """Return sample wellness payload."""

    return [
        {
            "id": "2026-07-14",
            "ctl": 40.0,
            "atl": 52.0,
            "restingHR": 60,
            "weight": 73.0,
            "sleepSecs": 28800,
            "mood": 75,
            "energy": 80,
            "stress": 20,
            "soreness": 15,
        }
    ]


@pytest.fixture
def activities() -> list[dict]:
    """Return sample activity payload."""

    return [
        {
            "id": "a1",
            "name": "Morning Ride",
            "type": "Ride",
            "start_date_local": "2026-07-14T08:00:00",
            "distance": 40000,
            "moving_time": 5400,
            "icu_training_load": 75,
            "calories": 900,
            "total_elevation_gain": 450,
            "average_heartrate": 142,
            "max_heartrate": 168,
            "average_watts": 185,
            "max_watts": 650,
            "average_speed": 7.4074,
        }
    ]
