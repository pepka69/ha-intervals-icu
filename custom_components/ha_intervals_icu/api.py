"""API client for Intervals.icu."""

from __future__ import annotations

from datetime import datetime

import aiohttp


BASE_URL = "https://intervals.icu/api/v1"


class IntervalsICUAuthenticationError(Exception):
    """Authentication error."""


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
    ):
        """Make API request."""

        url = (
            f"{BASE_URL}"
            f"/{endpoint}"
        )

        async with self.session.get(
            url,
            auth=aiohttp.BasicAuth(
                self.api_key,
                "",
            ),
        ) as response:

            if response.status == 401:
                raise IntervalsICUAuthenticationError

            response.raise_for_status()

            return await response.json()

    async def get_athlete(
        self,
    ):
        """Get athlete profile."""

        return await self._request(
            f"athlete/{self.athlete_id}"
        )

    async def get_wellness(
        self,
    ):
        """Get wellness data."""

        return await self._request(
            f"athlete/{self.athlete_id}/wellness"
        )

    async def get_activities(
        self,
    ):
        """Get activities."""

        return await self._request(
            f"athlete/{self.athlete_id}/activities"
        )
