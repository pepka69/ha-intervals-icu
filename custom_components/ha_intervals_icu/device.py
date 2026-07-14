"""Device information for ha-intervals-icu."""

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceInfo

from .const import DOMAIN


def get_device_info(
    athlete_id: str,
    athlete_name: str | None = None,
) -> DeviceInfo:
    """Return device information."""

    return DeviceInfo(
        identifiers={
            (
                DOMAIN,
                athlete_id,
            )
        },
        name=(
            athlete_name
            or "Intervals.icu Athlete"
        ),
        manufacturer="Intervals.icu",
        model="Athlete Profile",
    )
