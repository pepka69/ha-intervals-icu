import type { HassDevice, HassEntity, HomeAssistant } from "./types";

export const INTEGRATION_DOMAIN = "ha_intervals_icu";

export const DEFAULT_KEYS = {
  fitness: "fitness",
  fatigue: "fatigue",
  form: "form",
  ftp: "ftp",

  weeklyLoad: "weekly_load",
  weeklyActivities: "weekly_activities",

  plannedTodayName: "planned_today_name",
  plannedTodaySport: "planned_today_sport",
  plannedTodayDuration: "planned_today_duration",
  plannedTodayLoad: "planned_today_load",

  lastActivityName: "last_activity_name",
  lastActivityType: "last_activity_type",
  lastActivityDate: "last_activity_date",
  lastActivityDuration: "last_activity_duration",
  lastActivityLoad: "last_activity_load",
  lastActivityCalories: "last_activity_calories",

  recordDistance: "record_distance",
  recordElevation: "record_elevation",
  recordMaxPower: "record_max_power",
  recordFtp: "record_ftp",
  recordEftp: "record_eftp"
} as const;

type EntityRegistryEntry = {
  entity_id?: string;
  platform?: string;
  device_id?: string | null;
  unique_id?: string;
  translation_key?: string;
};

const SPORT_NAMES: Record<string, string> = {
  AlpineSki: "Ski alpin",
  BackcountrySki: "Ski de randonnée",
  Badminton: "Badminton",
  Basketball: "Basket-ball",
  Canoeing: "Canoë",
  Crossfit: "CrossFit",
  CrossFit: "CrossFit",
  Cycling: "Vélo",
  EBikeRide: "VAE",
  Elliptical: "Vélo elliptique",
  GravelRide: "Gravel",
  Handcycle: "Handbike",
  HighIntensityIntervalTraining: "HIIT",
  Hike: "Randonnée",
  IndoorCycling: "Vélo d’intérieur",
  IndoorRide: "Vélo d’intérieur",
  IndoorRun: "Course en intérieur",
  Kayaking: "Kayak",
  MountainBikeRide: "VTT",
  NordicSki: "Ski de fond",
  OpenWaterSwim: "Natation en eau libre",
  OpenWaterSwimming: "Natation en eau libre",
  Other: "Autre",
  Pilates: "Pilates",
  Ride: "Vélo",
  RoadBikeRide: "Vélo de route",
  Rowing: "Rameur",
  Run: "Course à pied",
  Running: "Course à pied",
  Snowboard: "Snowboard",
  Soccer: "Football",
  StairStepper: "Escalier",
  StrengthTraining: "Musculation",
  Swim: "Natation",
  Swimming: "Natation",
  Tennis: "Tennis",
  TrailRun: "Trail",
  VirtualRide: "Vélo virtuel",
  VirtualRun: "Course virtuelle",
  Walk: "Marche",
  Walking: "Marche",
  WeightTraining: "Musculation",
  Workout: "Entraînement",
  Yoga: "Yoga"
};

function belongsToDevice(
  hass: HomeAssistant,
  entityId: string,
  deviceId?: string
): boolean {
  if (!deviceId) {
    return true;
  }

  return hass.entities?.[entityId]?.device_id === deviceId;
}

function registryEntries(hass: HomeAssistant): EntityRegistryEntry[] {
  return Object.values(hass.entities ?? {}) as EntityRegistryEntry[];
}

function keyMatches(entry: EntityRegistryEntry, key: string): boolean {
  if (entry.translation_key === key) {
    return true;
  }

  const uniqueId = entry.unique_id ?? "";

  return (
    uniqueId === key ||
    uniqueId.endsWith(`_${key}`) ||
    uniqueId.endsWith(`-${key}`)
  );
}

function formatDuration(totalSeconds: number): string {
  const roundedSeconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(roundedSeconds / 3600);
  const minutes = Math.floor((roundedSeconds % 3600) / 60);
  const seconds = roundedSeconds % 60;

  if (hours === 0) {
    if (minutes === 0) {
      return `${seconds} s`;
    }

    if (seconds === 0) {
      return `${minutes} min`;
    }

    return `${minutes} min ${seconds} s`;
  }

  return `${hours} h ${String(minutes).padStart(2, "0")} min ${String(
    seconds
  ).padStart(2, "0")} s`;
}

function humanizeSportName(value: string): string {
  const translated = SPORT_NAMES[value];

  if (translated) {
    return translated;
  }

  const normalized = value
    .replace(/[_-]+/g, " ")
    .replace(/([a-zà-ÿ0-9])([A-Z])/g, "$1 $2")
    .trim();

  if (!normalized) {
    return value;
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
}

function isDurationEntity(state: HassEntity): boolean {
  const unit = state.attributes.unit_of_measurement;
  const translationKey = state.attributes.translation_key;
  const entityId = state.entity_id ?? "";

  return (
    unit === "s" ||
    translationKey === "planned_today_duration" ||
    translationKey === "last_activity_duration" ||
    entityId.endsWith("_planned_today_duration") ||
    entityId.endsWith("_last_activity_duration")
  );
}

function isSportEntity(state: HassEntity): boolean {
  const translationKey = state.attributes.translation_key;
  const entityId = state.entity_id ?? "";

  return (
    translationKey === "planned_today_sport" ||
    translationKey === "last_activity_type" ||
    entityId.endsWith("_planned_today_sport") ||
    entityId.endsWith("_last_activity_type") ||
    Boolean(SPORT_NAMES[state.state])
  );
}

export function integrationDevices(hass: HomeAssistant): HassDevice[] {
  const deviceIds = new Set(
    registryEntries(hass)
      .filter(
        (entry) =>
          entry.platform === INTEGRATION_DOMAIN &&
          typeof entry.device_id === "string"
      )
      .map((entry) => entry.device_id as string)
  );

  return [...deviceIds]
    .map((deviceId) => hass.devices?.[deviceId])
    .filter((device): device is HassDevice => Boolean(device))
    .sort((a, b) => deviceName(a).localeCompare(deviceName(b)));
}

export function deviceName(device?: HassDevice): string {
  return device?.name_by_user ?? device?.name ?? "Athlète Intervals.icu";
}

export function findEntity(
  hass: HomeAssistant,
  configured: string | undefined,
  key: string,
  deviceId?: string
): string | undefined {
  if (
    configured &&
    hass.states[configured] &&
    belongsToDevice(hass, configured, deviceId)
  ) {
    return configured;
  }

  const registryMatch = registryEntries(hass).find(
    (entry) =>
      entry.platform === INTEGRATION_DOMAIN &&
      typeof entry.entity_id === "string" &&
      (!deviceId || entry.device_id === deviceId) &&
      keyMatches(entry, key)
  );

  if (registryMatch?.entity_id && hass.states[registryMatch.entity_id]) {
    return registryMatch.entity_id;
  }

  const suffix = `_${key}`;

  return Object.keys(hass.states).find(
    (entityId) =>
      entityId.startsWith("sensor.") &&
      entityId.endsWith(suffix) &&
      belongsToDevice(hass, entityId, deviceId)
  );
}

export function getState(
  hass: HomeAssistant,
  configured: string | undefined,
  key: string,
  deviceId?: string
): HassEntity | undefined {
  const entityId = findEntity(hass, configured, key, deviceId);

  return entityId ? hass.states[entityId] : undefined;
}

export function numericValue(state?: HassEntity): number | null {
  if (
    !state ||
    ["unknown", "unavailable", "none", ""].includes(state.state)
  ) {
    return null;
  }

  const value = Number(state.state);

  return Number.isFinite(value) ? value : null;
}

export function formatState(
  hass: HomeAssistant,
  state?: HassEntity,
  fallback = "—"
): string {
  if (
    !state ||
    ["unknown", "unavailable", "none", ""].includes(state.state)
  ) {
    return fallback;
  }

  if (isDurationEntity(state)) {
    const value = Number(state.state);

    if (Number.isFinite(value)) {
      return formatDuration(value);
    }
  }

  if (isSportEntity(state)) {
    return humanizeSportName(state.state);
  }

  try {
    return (
      hass.formatEntityState?.(state) ??
      `${state.state}${
        state.attributes.unit_of_measurement
          ? ` ${state.attributes.unit_of_measurement}`
          : ""
      }`
    );
  } catch {
    return state.state;
  }
}

export function historyValues(state?: HassEntity): number[] {
  const history = state?.attributes.history;

  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .map((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "value" in item
      ) {
        return Number((item as { value: unknown }).value);
      }

      return Number(item);
    })
    .filter(Number.isFinite);
}

export function relativeTime(
  iso?: string
): {
  label: string;
  level: "good" | "warning" | "danger";
} {
  if (!iso) {
    return {
      label: "Synchronisation inconnue",
      level: "danger"
    };
  }

  const timestamp = new Date(iso).getTime();

  if (!Number.isFinite(timestamp)) {
    return {
      label: "Synchronisation inconnue",
      level: "danger"
    };
  }

  const ageMinutes = Math.max(
    0,
    Math.floor((Date.now() - timestamp) / 60000)
  );

  if (ageMinutes < 1) {
    return {
      label: "Synchronisé à l’instant",
      level: "good"
    };
  }

  if (ageMinutes < 5) {
    return {
      label: `Synchronisé il y a ${ageMinutes} min`,
      level: "good"
    };
  }

  if (ageMinutes <= 30) {
    return {
      label: `Synchronisé il y a ${ageMinutes} min`,
      level: "warning"
    };
  }

  return {
    label: `Synchronisé il y a ${ageMinutes} min`,
    level: "danger"
  };
}