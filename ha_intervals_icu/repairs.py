"""Repairs support for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.helpers.issue_registry import IssueSeverity

from .const import DOMAIN


def create_invalid_auth_issue(
    hass,
) -> None:
    """Create an authentication repair issue."""

    hass.helpers.issue_registry.async_create_issue(
        DOMAIN,
        "invalid_auth",
        is_fixable=True,
        severity=IssueSeverity.ERROR,
        translation_key="invalid_auth",
    )


def delete_invalid_auth_issue(
    hass,
) -> None:
    """Remove authentication repair issue."""

    hass.helpers.issue_registry.async_delete_issue(
        DOMAIN,
        "invalid_auth",
    )
