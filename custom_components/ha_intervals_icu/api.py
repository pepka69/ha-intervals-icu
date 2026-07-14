"""API client for ha-intervals-icu."""

from __future__ import annotations

import aiohttp

from .const import API_BASE_URL


class IntervalsICUApiError(Exception):
    """Base exception for Intervals.icu API errors."""


class IntervalsICUAuthenticationError(IntervalsICUApiError):
    """Authentication error."""


class IntervalsICUClient:
    """Client for Intervals.icu API."""

    def __init__(
        self,
        athlete_id: str,
        api_key: str,
        session: aiohttp.ClientSession,
    ) -> None:
        """Initialize the API client."""
        self.athlete_id = athlete_id
        self.api_key = api_key
        self.session = session

    async def _request(self, endpoint: str) -> dict:
        """Make a request to Intervals.icu API."""

        url = f"{API_BASE_URL}{endpoint}"

        auth = aiohttp.BasicAuth(
            self.athlete_id,
            self.api_key,
        )

        async with self.session.get(
            url,
            auth=auth,
        ) as response:

            if response.status == 401:
                raise IntervalsICUAuthenticationError(
                    "Invalid Athlete ID or API Key"
                )

            if response.status != 200:
                raise IntervalsICUApiError(
                    f"API error: {response.status}"
                )

            return await response.json()

    async def get_athlete(self) -> dict:
        """Get athlete information."""

        return await self._request(
            f"/athlete/{self.athlete_id}"
        )

    async def get_wellness(self) -> list:
        """Get athlete wellness data."""

        return await self._request(
            f"/athlete/{self.athlete_id}/wellness"
        )

    async def get_activities(self) -> list:
        """Get recent activities."""

        return await self._request(
            f"/athlete/{self.athlete_id}/activities"
        )
