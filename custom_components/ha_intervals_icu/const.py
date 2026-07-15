"""Constants for ha-intervals-icu."""

from __future__ import annotations

import logging

DOMAIN = "ha_intervals_icu"

LOGGER_NAME = "custom_components.ha_intervals_icu"

LOGGER = logging.getLogger(LOGGER_NAME)

CONF_ATHLETE_ID = "athlete_id"
CONF_API_KEY = "api_key"

DEFAULT_SCAN_INTERVAL = 900

ATTRIBUTION = "Data provided by Intervals.icu"
