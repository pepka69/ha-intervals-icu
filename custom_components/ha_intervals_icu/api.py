"""API client for ha-intervals-icu."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any

import aiohttp


BASE_URL = "https://intervals.icu/api/v1"


class IntervalsICUAuthenticationError(Exception):
    """Authentication error."""


class IntervalsICUConnectionError(Exception):
    """Connection error."""


class IntervalsICUClient:
    """Client for Intervals.icu API."""

    def __init__(
        self,
        athlete_id: str,
        api_key: str,
        session: aiohttp.ClientSession,
    ) -> None:
        """Initialize client."""

        self.athlete_id = athlete_id
        self.api_key = api_key
        self.session = session

    async def _request(
        self,
        endpoint: str,
        params: dict[str, Any] | None = None,
    ) -> Any:
        """Make API request."""

        url = f"{BASE_URL}/{endpoint}"

        headers = {
            "User-Agent": (
                "Mozilla/5.0 HomeAssistant "
                "ha-intervals-icu"
            )
        }

        try:
            async with self.session.get(
                url,
                params=params,
                headers=headers,
                auth=aiohttp.BasicAuth(
                    "API_KEY",
                    self.api_key,
                ),
                timeout=aiohttp.ClientTimeout(
                    total=20,
                ),
            ) as response:

                if response.status == 401:
                    raise IntervalsICUAuthenticationError

                response.raise_for_status()

                return await response.json()

        except aiohttp.ClientError as err:
            raise IntervalsICUConnectionError(
                err
            ) from err

    async def get_athlete(
        self,
    ) -> dict[str, Any]:
        """Return athlete profile."""

        return await self._request(
            f"athlete/{self.athlete_id}"
        )

    async def get_wellness(
        self,
        days: int = 30,
    ) -> list[dict[str, Any]]:
        """Return wellness history."""

        end = date.today()
        start = end - timedelta(days=days)

        return await self._request(
            f"athlete/{self.athlete_id}/wellness",
            params={
                "oldest": start.isoformat(),
                "newest": end.isoformat(),
            },
        )

    async def get_activities(
        self,
        days: int = 30,
    ) -> list[dict[str, Any]]:
        """Return recent activities."""

        end = date.today()
        start = end - timedelta(days=days)

        return await self._request(
            f"athlete/{self.athlete_id}/activities",
            params={
                "oldest": start.isoformat(),
                "newest": end.isoformat(),
            },
        )

    async def get_dashboard(
        self,
    ) -> dict[str, Any]:
        """Return processed dashboard data."""

        athlete = await self.get_athlete()
        wellness = await self.get_wellness()
        activities = await self.get_activities()

        latest = wellness[-1] if wellness else {}

        ctl = latest.get("ctl")
        atl = latest.get("atl")

        form = (
            round(ctl - atl, 1)
            if ctl is not None and atl is not None
            else None
        )

        ftp = None

        sport_settings = athlete.get(
            "sportSettings",
            [],
        )

        if sport_settings:
            ftp = sport_settings[0].get("ftp")

        last_activity = (
            activities[-1]
            if activities
            else {}
        )

        return {
            "athlete": athlete,
            "wellness": latest,

            "fitness": round(ctl, 1)
            if ctl is not None
            else None,

            "fatigue": round(atl, 1)
            if atl is not None
            else None,

            "form": form,

            "activities": len(activities),

            "ftp": ftp,

            "resting_hr": (
                latest.get("restingHR")
                or athlete.get("icu_resting_hr")
            ),

            "weight": (
                latest.get("weight")
                or athlete.get("icu_weight")
            ),

            "sleep": latest.get("sleepSecs"),

            "mood": latest.get("mood"),
            "energy": latest.get("energy"),
            "soreness": latest.get("soreness"),
            "stress": latest.get("stress"),

            "last_activity": last_activity,

            "last_activity_name": last_activity.get("name"),
            "last_activity_type": last_activity.get("type"),
            "last_activity_date": last_activity.get("start_date_local"),
            "last_activity_distance": last_activity.get("distance"),
            "last_activity_duration": last_activity.get("moving_time"),
            "last_activity_load": last_activity.get("icu_training_load"),
            "last_activity_calories": last_activity.get("calories"),
            "last_activity_elevation_gain": last_activity.get("total_elevation_gain"),
            "last_activity_avg_hr": last_activity.get("average_heartrate"),
            "last_activity_max_hr": last_activity.get("max_heartrate"),
            "last_activity_avg_power": last_activity.get("average_watts"),
            "last_activity_max_power": last_activity.get("max_watts"),
            "last_activity_avg_speed": last_activity.get("average_speed"),
        }
