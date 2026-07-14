"""API client for ha-intervals-icu."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any
import logging

import aiohttp


BASE_URL = "https://intervals.icu/api/v1"

_LOGGER = logging.getLogger(__name__)


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

        _LOGGER.warning(
            "Intervals DEBUG init - athlete=%s key_length=%s",
            athlete_id,
            len(api_key),
        )

    async def _request(
        self,
        endpoint: str,
        params: dict[str, Any] | None = None,
    ) -> Any:
        """Make API request."""

        url = f"{BASE_URL}/{endpoint}"

        _LOGGER.warning(
            "Intervals DEBUG request URL=%s",
            url,
        )

        try:
            async with self.session.get(
                url,
                params=params,
                auth=aiohttp.BasicAuth(
                    "API_KEY",
                    self.api_key,
                ),
                timeout=aiohttp.ClientTimeout(
                    total=20,
                ),
                headers={
                    "User-Agent": "HomeAssistant-ha-intervals-icu",
                },
            ) as response:

                text = await response.text()

                _LOGGER.warning(
                    "Intervals DEBUG status=%s response=%s",
                    response.status,
                    text[:200],
                )

                if response.status in (401, 403):
                    raise IntervalsICUAuthenticationError(
                        f"HTTP {response.status}: {text}"
                    )

                response.raise_for_status()

                return await response.json()

        except IntervalsICUAuthenticationError:
            raise

        except aiohttp.ClientError as err:
            raise IntervalsICUConnectionError(
                str(err)
            ) from err

    async def get_athlete(
        self,
    ) -> dict[str, Any]:
        """Get athlete profile."""

        return await self._request(
            f"athlete/{self.athlete_id}"
        )

    async def get_wellness(
        self,
        days: int = 30,
    ) -> list[dict[str, Any]]:
        """Get wellness data."""

        end = date.today()
        start = end - timedelta(
            days=days
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
        """Get activities."""

        end = date.today()
        start = end - timedelta(
            days=days
        )

        return await self._request(
            f"athlete/{self.athlete_id}/activities",
            params={
                "oldest": start.isoformat(),
                "newest": end.isoformat(),
            },
        )
