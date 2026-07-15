"""Sensors for ha-intervals-icu."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    PERCENTAGE,
    UnitOfLength,
    UnitOfMass,
    UnitOfPower,
    UnitOfSpeed,
    UnitOfTime,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .const import DOMAIN
from .entity import IntervalsICUEntity


def _value(key: str) -> Callable[[dict[str, Any]], Any]:
    """Return a coordinator value."""

    return lambda data: data.get(key)


def _round_value(
    key: str,
    digits: int = 1,
) -> Callable[[dict[str, Any]], float | None]:
    """Return a rounded numeric coordinator value."""

    def get_value(data: dict[str, Any]) -> float | None:
        value = data.get(key)

        if value is None:
            return None

        return round(float(value), digits)

    return get_value


def _meters_to_kilometers(
    key: str,
) -> Callable[[dict[str, Any]], float | None]:
    """Convert meters to kilometers."""

    def get_value(data: dict[str, Any]) -> float | None:
        value = data.get(key)

        if value is None:
            return None

        return round(float(value) / 1000, 2)

    return get_value


def _meters_per_second_to_kmh(
    key: str,
) -> Callable[[dict[str, Any]], float | None]:
    """Convert meters per second to kilometers per hour."""

    def get_value(data: dict[str, Any]) -> float | None:
        value = data.get(key)

        if value is None:
            return None

        return round(float(value) * 3.6, 1)

    return get_value


def _seconds_to_hours(
    key: str,
) -> Callable[[dict[str, Any]], float | None]:
    """Convert seconds to hours."""

    def get_value(data: dict[str, Any]) -> float | None:
        value = data.get(key)

        if value is None:
            return None

        return round(float(value) / 3600, 2)

    return get_value


def _timestamp(
    key: str,
) -> Callable[[dict[str, Any]], datetime | None]:
    """Convert an API timestamp to a timezone-aware datetime."""

    def get_value(data: dict[str, Any]) -> datetime | None:
        value = data.get(key)

        if not value:
            return None

        parsed = dt_util.parse_datetime(str(value))

        if parsed is None:
            return None

        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=dt_util.UTC)

        return parsed

    return get_value


@dataclass(frozen=True, kw_only=True)
class IntervalsICUSensorDescription(SensorEntityDescription):
    """Describe an Intervals.icu sensor."""

    value_fn: Callable[[dict[str, Any]], Any]


SENSORS: tuple[IntervalsICUSensorDescription, ...] = (
    IntervalsICUSensorDescription(
        key="fitness",
        translation_key="fitness",
        icon="mdi:heart-pulse",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fitness"),
    ),
    IntervalsICUSensorDescription(
        key="fatigue",
        translation_key="fatigue",
        icon="mdi:lightning-bolt",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fatigue"),
    ),
    IntervalsICUSensorDescription(
        key="form",
        translation_key="form",
        icon="mdi:run-fast",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("form"),
    ),
    IntervalsICUSensorDescription(
        key="fitness_7_days_ago",
        translation_key="fitness_7_days_ago",
        icon="mdi:history",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fitness_7_days_ago"),
    ),
    IntervalsICUSensorDescription(
        key="fitness_30_days_ago",
        translation_key="fitness_30_days_ago",
        icon="mdi:history",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fitness_30_days_ago"),
    ),
    IntervalsICUSensorDescription(
        key="fitness_change_7_days",
        translation_key="fitness_change_7_days",
        icon="mdi:trending-up",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fitness_change_7_days"),
    ),
    IntervalsICUSensorDescription(
        key="fitness_change_30_days",
        translation_key="fitness_change_30_days",
        icon="mdi:chart-line",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fitness_change_30_days"),
    ),
    IntervalsICUSensorDescription(
        key="fatigue_7_days_ago",
        translation_key="fatigue_7_days_ago",
        icon="mdi:history",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fatigue_7_days_ago"),
    ),
    IntervalsICUSensorDescription(
        key="fatigue_30_days_ago",
        translation_key="fatigue_30_days_ago",
        icon="mdi:history",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fatigue_30_days_ago"),
    ),
    IntervalsICUSensorDescription(
        key="fatigue_change_7_days",
        translation_key="fatigue_change_7_days",
        icon="mdi:trending-up",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fatigue_change_7_days"),
    ),
    IntervalsICUSensorDescription(
        key="fatigue_change_30_days",
        translation_key="fatigue_change_30_days",
        icon="mdi:chart-line",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("fatigue_change_30_days"),
    ),
    IntervalsICUSensorDescription(
        key="form_7_days_ago",
        translation_key="form_7_days_ago",
        icon="mdi:history",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("form_7_days_ago"),
    ),
    IntervalsICUSensorDescription(
        key="form_30_days_ago",
        translation_key="form_30_days_ago",
        icon="mdi:history",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("form_30_days_ago"),
    ),
    IntervalsICUSensorDescription(
        key="form_change_7_days",
        translation_key="form_change_7_days",
        icon="mdi:trending-up",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("form_change_7_days"),
    ),
    IntervalsICUSensorDescription(
        key="form_change_30_days",
        translation_key="form_change_30_days",
        icon="mdi:chart-line",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("form_change_30_days"),
    ),
    IntervalsICUSensorDescription(
        key="activities",
        translation_key="activities",
        icon="mdi:counter",
        value_fn=_value("activities"),
    ),
    IntervalsICUSensorDescription(
        key="ftp",
        translation_key="ftp",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("ftp"),
    ),
    IntervalsICUSensorDescription(
        key="resting_hr",
        translation_key="resting_hr",
        icon="mdi:heart",
        native_unit_of_measurement="bpm",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("resting_hr"),
    ),
    IntervalsICUSensorDescription(
        key="weight",
        translation_key="weight",
        icon="mdi:scale-bathroom",
        device_class=SensorDeviceClass.WEIGHT,
        native_unit_of_measurement=UnitOfMass.KILOGRAMS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("weight"),
    ),
    IntervalsICUSensorDescription(
        key="sleep",
        translation_key="sleep",
        icon="mdi:sleep",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("sleep"),
    ),
    IntervalsICUSensorDescription(
        key="mood",
        translation_key="mood",
        icon="mdi:emoticon",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("mood"),
    ),
    IntervalsICUSensorDescription(
        key="energy",
        translation_key="energy",
        icon="mdi:battery-heart",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("energy"),
    ),
    IntervalsICUSensorDescription(
        key="stress",
        translation_key="stress",
        icon="mdi:alert",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("stress"),
    ),
    IntervalsICUSensorDescription(
        key="soreness",
        translation_key="soreness",
        icon="mdi:arm-flex",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("soreness"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_name",
        translation_key="last_activity_name",
        icon="mdi:calendar-check",
        value_fn=_value("last_activity_name"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_type",
        translation_key="last_activity_type",
        icon="mdi:run",
        value_fn=_value("last_activity_type"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_date",
        translation_key="last_activity_date",
        icon="mdi:calendar-clock",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_timestamp("last_activity_date"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_distance",
        translation_key="last_activity_distance",
        icon="mdi:map-marker-distance",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.KILOMETERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_meters_to_kilometers("last_activity_distance"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_duration",
        translation_key="last_activity_duration",
        icon="mdi:timer-outline",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.SECONDS,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("last_activity_duration"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_load",
        translation_key="last_activity_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("last_activity_load"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_calories",
        translation_key="last_activity_calories",
        icon="mdi:fire",
        native_unit_of_measurement="kcal",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("last_activity_calories"),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_elevation_gain",
        translation_key="last_activity_elevation_gain",
        icon="mdi:elevation-rise",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.METERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("last_activity_elevation_gain", 0),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_avg_hr",
        translation_key="last_activity_avg_hr",
        icon="mdi:heart-pulse",
        native_unit_of_measurement="bpm",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("last_activity_avg_hr", 0),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_max_hr",
        translation_key="last_activity_max_hr",
        icon="mdi:heart-flash",
        native_unit_of_measurement="bpm",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("last_activity_max_hr", 0),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_avg_power",
        translation_key="last_activity_avg_power",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("last_activity_avg_power", 0),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_max_power",
        translation_key="last_activity_max_power",
        icon="mdi:flash-outline",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("last_activity_max_power", 0),
    ),
    IntervalsICUSensorDescription(
        key="last_activity_avg_speed",
        translation_key="last_activity_avg_speed",
        icon="mdi:speedometer",
        device_class=SensorDeviceClass.SPEED,
        native_unit_of_measurement=UnitOfSpeed.KILOMETERS_PER_HOUR,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_meters_per_second_to_kmh("last_activity_avg_speed"),
    ),
    IntervalsICUSensorDescription(
        key="weekly_activities",
        translation_key="weekly_activities",
        icon="mdi:calendar-week",
        value_fn=_value("weekly_activities"),
    ),
    IntervalsICUSensorDescription(
        key="weekly_distance",
        translation_key="weekly_distance",
        icon="mdi:map-marker-distance",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.KILOMETERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_round_value("weekly_distance", 2),
    ),
    IntervalsICUSensorDescription(
        key="weekly_duration",
        translation_key="weekly_duration",
        icon="mdi:timer-sand",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("weekly_duration"),
    ),
    IntervalsICUSensorDescription(
        key="weekly_load",
        translation_key="weekly_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("weekly_load"),
    ),
    IntervalsICUSensorDescription(
        key="weekly_calories",
        translation_key="weekly_calories",
        icon="mdi:fire",
        native_unit_of_measurement="kcal",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("weekly_calories"),
    ),
    IntervalsICUSensorDescription(
        key="weekly_elevation",
        translation_key="weekly_elevation",
        icon="mdi:elevation-rise",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.METERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("weekly_elevation", 0),
    ),
    IntervalsICUSensorDescription(
        key="monthly_activities",
        translation_key="monthly_activities",
        icon="mdi:calendar-month",
        value_fn=_value("monthly_activities"),
    ),
    IntervalsICUSensorDescription(
        key="monthly_distance",
        translation_key="monthly_distance",
        icon="mdi:map-marker-distance",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.KILOMETERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_round_value("monthly_distance", 2),
    ),
    IntervalsICUSensorDescription(
        key="monthly_duration",
        translation_key="monthly_duration",
        icon="mdi:timer-sand",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("monthly_duration"),
    ),
    IntervalsICUSensorDescription(
        key="monthly_load",
        translation_key="monthly_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("monthly_load"),
    ),
    IntervalsICUSensorDescription(
        key="monthly_calories",
        translation_key="monthly_calories",
        icon="mdi:fire",
        native_unit_of_measurement="kcal",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("monthly_calories"),
    ),
    IntervalsICUSensorDescription(
        key="monthly_elevation",
        translation_key="monthly_elevation",
        icon="mdi:elevation-rise",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.METERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("monthly_elevation", 0),
    ),
    IntervalsICUSensorDescription(
        key="planned_today_name",
        translation_key="planned_today_name",
        icon="mdi:calendar-today",
        value_fn=_value("planned_today_name"),
    ),
    IntervalsICUSensorDescription(
        key="planned_today_sport",
        translation_key="planned_today_sport",
        icon="mdi:bike",
        value_fn=_value("planned_today_sport"),
    ),
    IntervalsICUSensorDescription(
        key="planned_today_start",
        translation_key="planned_today_start",
        icon="mdi:clock-outline",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_timestamp("planned_today_start"),
    ),
    IntervalsICUSensorDescription(
        key="planned_today_duration",
        translation_key="planned_today_duration",
        icon="mdi:timer-outline",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.SECONDS,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("planned_today_duration"),
    ),
    IntervalsICUSensorDescription(
        key="planned_today_load",
        translation_key="planned_today_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("planned_today_load"),
    ),
    IntervalsICUSensorDescription(
        key="planned_today_description",
        translation_key="planned_today_description",
        icon="mdi:text-box-outline",
        value_fn=_value("planned_today_description"),
    ),
    IntervalsICUSensorDescription(
        key="planned_tomorrow_name",
        translation_key="planned_tomorrow_name",
        icon="mdi:calendar-arrow-right",
        value_fn=_value("planned_tomorrow_name"),
    ),
    IntervalsICUSensorDescription(
        key="planned_tomorrow_sport",
        translation_key="planned_tomorrow_sport",
        icon="mdi:bike",
        value_fn=_value("planned_tomorrow_sport"),
    ),
    IntervalsICUSensorDescription(
        key="planned_tomorrow_start",
        translation_key="planned_tomorrow_start",
        icon="mdi:clock-outline",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_timestamp("planned_tomorrow_start"),
    ),
    IntervalsICUSensorDescription(
        key="planned_tomorrow_duration",
        translation_key="planned_tomorrow_duration",
        icon="mdi:timer-outline",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.SECONDS,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("planned_tomorrow_duration"),
    ),
    IntervalsICUSensorDescription(
        key="planned_tomorrow_load",
        translation_key="planned_tomorrow_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("planned_tomorrow_load"),
    ),
    IntervalsICUSensorDescription(
        key="planned_tomorrow_description",
        translation_key="planned_tomorrow_description",
        icon="mdi:text-box-outline",
        value_fn=_value("planned_tomorrow_description"),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Intervals.icu sensors."""

    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

    athlete = coordinator.data.get("athlete", {})
    athlete_name = athlete.get("name")

    async_add_entities(
        IntervalsICUSensor(
            coordinator=coordinator,
            athlete_id=entry.data["athlete_id"],
            athlete_name=athlete_name,
            description=description,
        )
        for description in SENSORS
    )


class IntervalsICUSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Representation of an Intervals.icu sensor."""

    entity_description: IntervalsICUSensorDescription

    def __init__(
        self,
        coordinator,
        athlete_id: str,
        athlete_name: str | None,
        description: IntervalsICUSensorDescription,
    ) -> None:
        """Initialize the sensor."""

        super().__init__(
            coordinator,
            athlete_id,
            athlete_name,
        )

        self.entity_description = description
        self._attr_unique_id = f"{DOMAIN}_{athlete_id}_{description.key}"

    @property
    def native_value(self) -> Any:
        """Return the sensor value."""

        return self.entity_description.value_fn(self.coordinator.data)

    @property
    def extra_state_attributes(
        self,
    ) -> dict[str, Any] | None:
        """Return useful details for selected sensors."""

        key = self.entity_description.key

        if key in {"fitness", "fatigue", "form"}:
            return {
                "history": self.coordinator.data.get(f"{key}_history", []),
                "value_7_days_ago": self.coordinator.data.get(f"{key}_7_days_ago"),
                "value_30_days_ago": self.coordinator.data.get(f"{key}_30_days_ago"),
                "change_7_days": self.coordinator.data.get(f"{key}_change_7_days"),
                "change_30_days": self.coordinator.data.get(f"{key}_change_30_days"),
            }

        if key != "last_activity_name":
            return None

        activity = self.coordinator.data.get("last_activity")

        if not isinstance(activity, dict):
            return None

        return {
            attribute: activity.get(attribute)
            for attribute in (
                "id",
                "type",
                "start_date_local",
                "distance",
                "moving_time",
                "icu_training_load",
                "calories",
            )
            if activity.get(attribute) is not None
        }
