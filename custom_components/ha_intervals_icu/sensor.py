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


def _compact_activity(activity: Any) -> dict[str, Any] | None:
    """Return a compact activity payload suitable for entity attributes."""

    if not isinstance(activity, dict):
        return None

    keys = (
        "id",
        "name",
        "type",
        "start_date_local",
        "start_date",
        "distance",
        "moving_time",
        "elapsed_time",
        "icu_training_load",
        "calories",
        "total_elevation_gain",
        "average_heartrate",
        "max_heartrate",
        "average_watts",
        "max_watts",
        "average_speed",
    )

    return {key: activity.get(key) for key in keys if activity.get(key) is not None}


def build_dashboard_attributes(data: dict[str, Any]) -> dict[str, Any]:
    """Build the compact dashboard payload exposed to Lovelace."""

    athlete = data.get("athlete")
    athlete_name = athlete.get("name") if isinstance(athlete, dict) else None

    records: dict[str, Any] = {}
    for key in (
        "record_distance",
        "record_duration",
        "record_elevation",
        "record_load",
        "record_calories",
        "record_max_power",
        "record_average_power",
        "record_max_hr",
        "record_average_speed",
        "record_ftp",
        "record_eftp",
        "record_power_5s",
        "record_power_1m",
        "record_power_5m",
        "record_power_20m",
        "record_power_1h",
    ):
        records[key.removeprefix("record_")] = {
            "value": data.get(key),
            "activity": data.get(f"{key}_activity"),
        }

    return {
        "schema_version": 1,
        "athlete_name": athlete_name,
        "summary": {
            "fitness": data.get("fitness"),
            "fatigue": data.get("fatigue"),
            "form": data.get("form"),
            "ftp": data.get("ftp"),
            "activities": data.get("activities"),
        },
        "history": {
            "fitness": data.get("fitness_history", []),
            "fatigue": data.get("fatigue_history", []),
            "form": data.get("form_history", []),
        },
        "changes": {
            "fitness_7_days": data.get("fitness_change_7_days"),
            "fatigue_7_days": data.get("fatigue_change_7_days"),
            "form_7_days": data.get("form_change_7_days"),
            "fitness_30_days": data.get("fitness_change_30_days"),
            "fatigue_30_days": data.get("fatigue_change_30_days"),
            "form_30_days": data.get("form_change_30_days"),
        },
        "weekly": {
            "activities": data.get("weekly_activities"),
            "distance": data.get("weekly_distance"),
            "duration": data.get("weekly_duration"),
            "load": data.get("weekly_load"),
            "calories": data.get("weekly_calories"),
            "elevation": data.get("weekly_elevation"),
        },
        "monthly": {
            "activities": data.get("monthly_activities"),
            "distance": data.get("monthly_distance"),
            "duration": data.get("monthly_duration"),
            "load": data.get("monthly_load"),
            "calories": data.get("monthly_calories"),
            "elevation": data.get("monthly_elevation"),
            "hrss": data.get("monthly_hrss"),
            "trimp": data.get("monthly_trimp"),
            "load_change_percent": data.get("monthly_load_change_percent"),
            "duration_change_percent": data.get("monthly_duration_change_percent"),
            "activities_change_percent": data.get("monthly_activities_change_percent"),
            "trend": data.get("monthly_load_trend"),
        },
        "previous_month": {
            "activities": data.get("previous_month_activities"),
            "distance": data.get("previous_month_distance"),
            "duration": data.get("previous_month_duration"),
            "load": data.get("previous_month_load"),
            "calories": data.get("previous_month_calories"),
            "elevation": data.get("previous_month_elevation"),
            "hrss": data.get("previous_month_hrss"),
            "trimp": data.get("previous_month_trimp"),
        },
        "health": {
            "resting_hr": data.get("resting_hr"),
            "weight": data.get("weight"),
            "sleep": data.get("sleep"),
            "mood": data.get("mood"),
            "energy": data.get("energy"),
            "stress": data.get("stress"),
            "soreness": data.get("soreness"),
            "hrv": data.get("hrv"),
            "recovery_score": data.get("recovery_score"),
        },
        "performance": {
            "ramp_rate": data.get("ramp_rate"),
            "ctl_load": data.get("ctl_load"),
            "atl_load": data.get("atl_load"),
            "eftp": data.get("eftp"),
            "wellness_date": data.get("wellness_date"),
            "load_7_days": data.get("weekly_load"),
            "load_previous_7_days": data.get("previous_week_load"),
            "load_42_days": data.get("load_42_days"),
            "acute_chronic_ratio": data.get("acute_chronic_ratio"),
            "load_change_percent": data.get("load_change_percent"),
            "load_trend": data.get("load_trend"),
            "hrss_7_days": data.get("weekly_hrss"),
            "trimp_7_days": data.get("weekly_trimp"),
            "hrss_42_days": data.get("forty_two_days_hrss"),
            "trimp_42_days": data.get("forty_two_days_trimp"),
            "training_streak": data.get("training_streak"),
            "longest_streak_42_days": data.get("longest_training_streak_42_days"),
            "days_since_training": data.get("days_since_training"),
            "main_sport_42_days": data.get("main_sport_42_days"),
            "sport_count_42_days": data.get("sport_count_42_days"),
        },
        "statistics_42_days": {
            "activities": data.get("activities_42_days"),
            "training_days": data.get("training_days_42_days"),
            "rest_days": data.get("rest_days_42_days"),
            "distance": data.get("distance_42_days"),
            "duration": data.get("duration_42_days"),
            "load": data.get("load_42_days"),
            "calories": data.get("calories_42_days"),
            "elevation": data.get("elevation_42_days"),
            "average_weekly_load": data.get("average_weekly_load_42_days"),
            "average_weekly_duration": data.get("average_weekly_duration_42_days"),
            "average_activities_per_week": data.get(
                "average_activities_per_week_42_days"
            ),
            "average_activity_duration": data.get("average_activity_duration_42_days"),
            "average_activity_load": data.get("average_activity_load_42_days"),
            "sports": data.get("sport_statistics_42_days"),
        },
        "official_statistics": {
            "ctl": data.get("official_ctl"),
            "atl": data.get("official_atl"),
            "form": data.get("official_form"),
            "ramp_rate": data.get("official_ramp_rate"),
            "ctl_load": data.get("official_ctl_load"),
            "atl_load": data.get("official_atl_load"),
            "eftp": data.get("official_eftp"),
            "eftp_change_7_days": data.get("official_eftp_change_7_days"),
            "eftp_change_30_days": data.get("official_eftp_change_30_days"),
            "ctl_average_7_days": data.get("official_ctl_average_7_days"),
            "ctl_average_30_days": data.get("official_ctl_average_30_days"),
            "atl_average_7_days": data.get("official_atl_average_7_days"),
            "atl_average_30_days": data.get("official_atl_average_30_days"),
            "wellness_records": data.get("wellness_record_count"),
            "available_fields": data.get("wellness_available_fields", []),
            "first_date": data.get("wellness_first_date"),
            "latest_date": data.get("wellness_latest_date"),
        },
        "zones_60_days": {
            "heart_rate_seconds": data.get("hr_zone_times_60_days", []),
            "power_seconds": data.get("power_zone_times_60_days", []),
            "heart_rate_zone_count": data.get("hr_zone_count"),
            "power_zone_count": data.get("power_zone_count"),
        },
        "records_period_days": data.get("records_period_days"),
        "records_activity_count": data.get("records_activity_count"),
        "records": records,
        "last_activity": _compact_activity(data.get("last_activity")),
        "planned_today": {
            "planned": data.get("planned_today"),
            "name": data.get("planned_today_name"),
            "sport": data.get("planned_today_sport"),
            "start": data.get("planned_today_start"),
            "duration": data.get("planned_today_duration"),
            "load": data.get("planned_today_load"),
            "description": data.get("planned_today_description"),
        },
        "planned_tomorrow": {
            "planned": data.get("planned_tomorrow"),
            "name": data.get("planned_tomorrow_name"),
            "sport": data.get("planned_tomorrow_sport"),
            "start": data.get("planned_tomorrow_start"),
            "duration": data.get("planned_tomorrow_duration"),
            "load": data.get("planned_tomorrow_load"),
            "description": data.get("planned_tomorrow_description"),
        },
        "next_workout": {
            "name": data.get("next_workout_name"),
            "sport": data.get("next_workout_sport"),
            "start": data.get("next_workout_start"),
            "duration": data.get("next_workout_duration"),
            "load": data.get("next_workout_load"),
            "description": data.get("next_workout_description"),
        },
    }


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
        key="ctl_load",
        translation_key="ctl_load",
        icon="mdi:chart-bell-curve-cumulative",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("ctl_load"),
    ),
    IntervalsICUSensorDescription(
        key="atl_load",
        translation_key="atl_load",
        icon="mdi:chart-timeline-variant-shimmer",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("atl_load"),
    ),
    IntervalsICUSensorDescription(
        key="eftp",
        translation_key="eftp",
        icon="mdi:flash-triangle",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("eftp", 0),
    ),
    IntervalsICUSensorDescription(
        key="sleep_score",
        translation_key="sleep_score",
        icon="mdi:sleep",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("sleep_score", 0),
    ),
    IntervalsICUSensorDescription(
        key="official_ctl_average_7_days",
        translation_key="official_ctl_average_7_days",
        icon="mdi:chart-line",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("official_ctl_average_7_days"),
    ),
    IntervalsICUSensorDescription(
        key="official_ctl_average_30_days",
        translation_key="official_ctl_average_30_days",
        icon="mdi:chart-line",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("official_ctl_average_30_days"),
    ),
    IntervalsICUSensorDescription(
        key="official_atl_average_7_days",
        translation_key="official_atl_average_7_days",
        icon="mdi:chart-timeline-variant",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("official_atl_average_7_days"),
    ),
    IntervalsICUSensorDescription(
        key="official_atl_average_30_days",
        translation_key="official_atl_average_30_days",
        icon="mdi:chart-timeline-variant",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("official_atl_average_30_days"),
    ),
    IntervalsICUSensorDescription(
        key="official_eftp_change_7_days",
        translation_key="official_eftp_change_7_days",
        icon="mdi:flash-triangle",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("official_eftp_change_7_days", 0),
    ),
    IntervalsICUSensorDescription(
        key="official_eftp_change_30_days",
        translation_key="official_eftp_change_30_days",
        icon="mdi:flash-triangle",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("official_eftp_change_30_days", 0),
    ),
    IntervalsICUSensorDescription(
        key="wellness_record_count",
        translation_key="wellness_record_count",
        icon="mdi:database-check-outline",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("wellness_record_count"),
    ),
    IntervalsICUSensorDescription(
        key="hr_zone_total_60_days",
        translation_key="hr_zone_total_60_days",
        icon="mdi:heart-pulse",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("hr_zone_total_60_days"),
    ),
    IntervalsICUSensorDescription(
        key="power_zone_total_60_days",
        translation_key="power_zone_total_60_days",
        icon="mdi:flash",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("power_zone_total_60_days"),
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
        key="record_distance",
        translation_key="record_distance",
        icon="mdi:map-marker-distance",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.KILOMETERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_meters_to_kilometers("record_distance"),
    ),
    IntervalsICUSensorDescription(
        key="record_duration",
        translation_key="record_duration",
        icon="mdi:timer-star-outline",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("record_duration"),
    ),
    IntervalsICUSensorDescription(
        key="record_elevation",
        translation_key="record_elevation",
        icon="mdi:elevation-rise",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.METERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_elevation", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_load",
        translation_key="record_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("record_load"),
    ),
    IntervalsICUSensorDescription(
        key="record_calories",
        translation_key="record_calories",
        icon="mdi:fire",
        native_unit_of_measurement="kcal",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_calories", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_max_power",
        translation_key="record_max_power",
        icon="mdi:flash-outline",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_max_power", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_average_power",
        translation_key="record_average_power",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_average_power", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_max_hr",
        translation_key="record_max_hr",
        icon="mdi:heart-flash",
        native_unit_of_measurement="bpm",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_max_hr", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_average_speed",
        translation_key="record_average_speed",
        icon="mdi:speedometer",
        device_class=SensorDeviceClass.SPEED,
        native_unit_of_measurement=UnitOfSpeed.KILOMETERS_PER_HOUR,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_meters_per_second_to_kmh("record_average_speed"),
    ),
    IntervalsICUSensorDescription(
        key="record_ftp",
        translation_key="record_ftp",
        icon="mdi:lightning-bolt-circle",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_ftp", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_eftp",
        translation_key="record_eftp",
        icon="mdi:chart-bell-curve-cumulative",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_eftp", 0),
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
    IntervalsICUSensorDescription(
        key="hrv",
        translation_key="hrv",
        icon="mdi:heart-pulse",
        native_unit_of_measurement="ms",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("hrv"),
    ),
    IntervalsICUSensorDescription(
        key="recovery_score",
        translation_key="recovery_score",
        icon="mdi:battery-heart-variant",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("recovery_score", 0),
    ),
    IntervalsICUSensorDescription(
        key="ramp_rate",
        translation_key="ramp_rate",
        icon="mdi:chart-timeline-variant-shimmer",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("ramp_rate"),
    ),
    IntervalsICUSensorDescription(
        key="load_42_days",
        translation_key="load_42_days",
        icon="mdi:chart-line",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("load_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="activities_42_days",
        translation_key="activities_42_days",
        icon="mdi:calendar-range",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("activities_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="duration_42_days",
        translation_key="duration_42_days",
        icon="mdi:timer-sand-complete",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("duration_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="weekly_hrss",
        translation_key="weekly_hrss",
        icon="mdi:heart-flash",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("weekly_hrss"),
    ),
    IntervalsICUSensorDescription(
        key="weekly_trimp",
        translation_key="weekly_trimp",
        icon="mdi:heart-cog-outline",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("weekly_trimp"),
    ),
    IntervalsICUSensorDescription(
        key="forty_two_days_hrss",
        translation_key="forty_two_days_hrss",
        icon="mdi:heart-flash",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("forty_two_days_hrss"),
    ),
    IntervalsICUSensorDescription(
        key="forty_two_days_trimp",
        translation_key="forty_two_days_trimp",
        icon="mdi:heart-cog-outline",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("forty_two_days_trimp"),
    ),
    IntervalsICUSensorDescription(
        key="previous_month_load",
        translation_key="previous_month_load",
        icon="mdi:calendar-arrow-left",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("previous_month_load"),
    ),
    IntervalsICUSensorDescription(
        key="previous_month_duration",
        translation_key="previous_month_duration",
        icon="mdi:timer-sand",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("previous_month_duration"),
    ),
    IntervalsICUSensorDescription(
        key="monthly_load_change_percent",
        translation_key="monthly_load_change_percent",
        icon="mdi:percent",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("monthly_load_change_percent"),
    ),
    IntervalsICUSensorDescription(
        key="monthly_duration_change_percent",
        translation_key="monthly_duration_change_percent",
        icon="mdi:percent",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("monthly_duration_change_percent"),
    ),
    IntervalsICUSensorDescription(
        key="sport_count_42_days",
        translation_key="sport_count_42_days",
        icon="mdi:format-list-numbered",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("sport_count_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="load_trend",
        translation_key="load_trend",
        icon="mdi:trending-neutral",
        value_fn=_value("load_trend"),
    ),
    IntervalsICUSensorDescription(
        key="monthly_load_trend",
        translation_key="monthly_load_trend",
        icon="mdi:chart-timeline-variant",
        value_fn=_value("monthly_load_trend"),
    ),
    IntervalsICUSensorDescription(
        key="distance_42_days",
        translation_key="distance_42_days",
        icon="mdi:map-marker-distance",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.KILOMETERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_round_value("distance_42_days", 2),
    ),
    IntervalsICUSensorDescription(
        key="calories_42_days",
        translation_key="calories_42_days",
        icon="mdi:fire",
        native_unit_of_measurement="kcal",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("calories_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="elevation_42_days",
        translation_key="elevation_42_days",
        icon="mdi:elevation-rise",
        device_class=SensorDeviceClass.DISTANCE,
        native_unit_of_measurement=UnitOfLength.METERS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("elevation_42_days", 0),
    ),
    IntervalsICUSensorDescription(
        key="previous_week_activities",
        translation_key="previous_week_activities",
        icon="mdi:calendar-arrow-left",
        value_fn=_value("previous_week_activities"),
    ),
    IntervalsICUSensorDescription(
        key="previous_week_duration",
        translation_key="previous_week_duration",
        icon="mdi:timer-sand",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("previous_week_duration"),
    ),
    IntervalsICUSensorDescription(
        key="previous_week_load",
        translation_key="previous_week_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("previous_week_load"),
    ),
    IntervalsICUSensorDescription(
        key="acute_chronic_ratio",
        translation_key="acute_chronic_ratio",
        icon="mdi:scale-balance",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_round_value("acute_chronic_ratio", 2),
    ),
    IntervalsICUSensorDescription(
        key="load_change_percent",
        translation_key="load_change_percent",
        icon="mdi:percent",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("load_change_percent"),
    ),
    IntervalsICUSensorDescription(
        key="duration_change_percent",
        translation_key="duration_change_percent",
        icon="mdi:percent",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("duration_change_percent"),
    ),
    IntervalsICUSensorDescription(
        key="average_daily_load_7_days",
        translation_key="average_daily_load_7_days",
        icon="mdi:chart-bar",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("average_daily_load_7_days"),
    ),
    IntervalsICUSensorDescription(
        key="average_daily_load_42_days",
        translation_key="average_daily_load_42_days",
        icon="mdi:chart-bar-stacked",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("average_daily_load_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="average_weekly_load_42_days",
        translation_key="average_weekly_load_42_days",
        icon="mdi:chart-line",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("average_weekly_load_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="average_weekly_duration_42_days",
        translation_key="average_weekly_duration_42_days",
        icon="mdi:timer-sync-outline",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.HOURS,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_seconds_to_hours("average_weekly_duration_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="average_activities_per_week_42_days",
        translation_key="average_activities_per_week_42_days",
        icon="mdi:calendar-week",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=2,
        value_fn=_round_value("average_activities_per_week_42_days", 2),
    ),
    IntervalsICUSensorDescription(
        key="longest_training_streak_42_days",
        translation_key="longest_training_streak_42_days",
        icon="mdi:fire-circle",
        native_unit_of_measurement="d",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("longest_training_streak_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="days_since_training",
        translation_key="days_since_training",
        icon="mdi:calendar-remove-outline",
        native_unit_of_measurement="d",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("days_since_training"),
    ),
    IntervalsICUSensorDescription(
        key="training_days_42_days",
        translation_key="training_days_42_days",
        icon="mdi:calendar-check-outline",
        native_unit_of_measurement="d",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("training_days_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="rest_days_42_days",
        translation_key="rest_days_42_days",
        icon="mdi:calendar-blank-outline",
        native_unit_of_measurement="d",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("rest_days_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="main_sport_42_days",
        translation_key="main_sport_42_days",
        icon="mdi:trophy-outline",
        value_fn=_value("main_sport_42_days"),
    ),
    IntervalsICUSensorDescription(
        key="training_streak",
        translation_key="training_streak",
        icon="mdi:fire",
        native_unit_of_measurement="d",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("training_streak"),
    ),
    IntervalsICUSensorDescription(
        key="record_power_5s",
        translation_key="record_power_5s",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_power_5s", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_power_1m",
        translation_key="record_power_1m",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_power_1m", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_power_5m",
        translation_key="record_power_5m",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_power_5m", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_power_20m",
        translation_key="record_power_20m",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_power_20m", 0),
    ),
    IntervalsICUSensorDescription(
        key="record_power_1h",
        translation_key="record_power_1h",
        icon="mdi:flash",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=_round_value("record_power_1h", 0),
    ),
    IntervalsICUSensorDescription(
        key="next_workout_name",
        translation_key="next_workout_name",
        icon="mdi:calendar-clock",
        value_fn=_value("next_workout_name"),
    ),
    IntervalsICUSensorDescription(
        key="next_workout_sport",
        translation_key="next_workout_sport",
        icon="mdi:run",
        value_fn=_value("next_workout_sport"),
    ),
    IntervalsICUSensorDescription(
        key="next_workout_start",
        translation_key="next_workout_start",
        icon="mdi:clock-outline",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_timestamp("next_workout_start"),
    ),
    IntervalsICUSensorDescription(
        key="next_workout_duration",
        translation_key="next_workout_duration",
        icon="mdi:timer-outline",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.SECONDS,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=_value("next_workout_duration"),
    ),
    IntervalsICUSensorDescription(
        key="next_workout_load",
        translation_key="next_workout_load",
        icon="mdi:weight-lifter",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=_round_value("next_workout_load"),
    ),
    IntervalsICUSensorDescription(
        key="next_workout_description",
        translation_key="next_workout_description",
        icon="mdi:text-box-outline",
        value_fn=_value("next_workout_description"),
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

    entities: list[SensorEntity] = [
        IntervalsICUSensor(
            coordinator=coordinator,
            athlete_id=entry.data["athlete_id"],
            athlete_name=athlete_name,
            description=description,
        )
        for description in SENSORS
    ]
    entities.append(
        IntervalsICUDashboardSensor(
            coordinator=coordinator,
            athlete_id=entry.data["athlete_id"],
            athlete_name=athlete_name,
        )
    )

    async_add_entities(entities)


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

        if key.startswith("record_"):
            activity = self.coordinator.data.get(f"{key}_activity")

            attributes: dict[str, Any] = {
                "period_days": self.coordinator.data.get("records_period_days"),
                "activity_count": self.coordinator.data.get("records_activity_count"),
            }

            if isinstance(activity, dict):
                attributes["activity"] = activity

            return attributes

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


class IntervalsICUDashboardSensor(
    IntervalsICUEntity,
    SensorEntity,
):
    """Compact dashboard entity for the Lovelace card."""

    _attr_icon = "mdi:view-dashboard-outline"
    _attr_name = "Dashboard"

    def __init__(
        self,
        coordinator,
        athlete_id: str,
        athlete_name: str | None,
    ) -> None:
        """Initialize the dashboard sensor."""

        super().__init__(coordinator, athlete_id, athlete_name)
        self._attr_unique_id = f"{DOMAIN}_{athlete_id}_dashboard"

    @property
    def native_value(self) -> str:
        """Return dashboard availability state."""

        return "ready" if self.coordinator.last_update_success else "error"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return all data required by the Lovelace card."""

        return build_dashboard_attributes(self.coordinator.data)
