"""Tests for ha-intervals-icu config flow."""

from unittest.mock import AsyncMock, patch

import pytest

from homeassistant import config_entries
from homeassistant.core import HomeAssistant

from custom_components.ha_intervals_icu.const import (
    CONF_API_KEY,
    CONF_ATHLETE_ID,
    DOMAIN,
)


@pytest.mark.asyncio
async def test_config_flow_success(
    hass: HomeAssistant,
):
    """Test successful config flow."""

    with patch(
        "custom_components.ha_intervals_icu.config_flow.IntervalsICUClient.get_athlete",
        new=AsyncMock(
            return_value={
                "name": "Test Athlete",
            }
        ),
    ):

        result = await hass.config_entries.flow.async_init(
            DOMAIN,
            context={
                "source": config_entries.SOURCE_USER,
            },
            data={
                CONF_ATHLETE_ID: "i12345",
                CONF_API_KEY: "test_api_key",
            },
        )

    assert result["type"] == "create_entry"
    assert result["data"][CONF_ATHLETE_ID] == "i12345"
    assert result["data"][CONF_API_KEY] == "test_api_key"


@pytest.mark.asyncio
async def test_config_flow_invalid_auth(
    hass: HomeAssistant,
):
    """Test invalid authentication."""

    from custom_components.ha_intervals_icu.api import (
        IntervalsICUAuthenticationError,
    )

    with patch(
        "custom_components.ha_intervals_icu.config_flow.IntervalsICUClient.get_athlete",
        side_effect=IntervalsICUAuthenticationError,
    ):

        result = await hass.config_entries.flow.async_init(
            DOMAIN,
            context={
                "source": config_entries.SOURCE_USER,
            },
            data={
                CONF_ATHLETE_ID: "wrong",
                CONF_API_KEY: "wrong",
            },
        )

    assert result["type"] == "form"
    assert result["errors"]["base"] == "invalid_auth"
