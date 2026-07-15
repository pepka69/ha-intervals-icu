"""API client for ha-intervals-icu."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any

import aiohttp

from .dashboard import build_dashboard
from .workouts import planned_workouts

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
        """Make an API request."""

        url = f"{BASE_URL}/{endpoint}"

        headers = {"User-Agent": ("Mozilla/5.0 HomeAssistant ha-intervals-icu")}

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
                if response.status in (401, 403):
                    raise IntervalsICUAuthenticationError

                response.raise_for_status()

                return await response.json()

        except IntervalsICUAuthenticationError:
            raise

        except aiohttp.ClientError as err:
            raise IntervalsICUConnectionError(str(err)) from err

    async def get_athlete(
        self,
    ) -> dict[str, Any]:
        """Return athlete profile."""

        return await self._request(f"athlete/{self.athlete_id}")

    async def get_wellness(
        self,
        days: int = 30,
    ) -> list[dict[str, Any]]:
        """Return wellness history."""

        end = date.today()
        start = end - timedelta(
            days=days,
        )

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
        start = end - timedelta(
            days=days,
        )

        return await self._request(
            f"athlete/{self.athlete_id}/activities",
            params={
                "oldest": start.isoformat(),
                "newest": end.isoformat(),
            },
        )

    async def get_workouts(
        self,
        days: int = 7,
    ) -> list[dict[str, Any]]:
        """Return planned workouts."""

        start = date.today()
        end = start + timedelta(
            days=days,
        )

        return await self._request(
            f"athlete/{self.athlete_id}/events",
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
        workouts = await self.get_workouts()

        dashboard = build_dashboard(
            athlete,
            wellness,
            activities,
        )

        dashboard.update(
            planned_workouts(
                workouts,
            )
        )

        return dashboard
