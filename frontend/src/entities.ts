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
  return (
    device?.name_by_user ??
    device?.name ??
    "Athlète Intervals.icu"
  );
}

export function findEntity(
  hass: HomeAssistant,
  configured: string | undefined,
  key: string,
  deviceId?: string
): string | undefined {
  /*
   * 1. Entité choisie manuellement.
   */
  if (
    configured &&
    hass.states[configured] &&
    belongsToDevice(hass, configured, deviceId)
  ) {
    return configured;
  }

  /*
   * 2. Recherche fiable dans le registre Home Assistant.
   *
   * On utilise translation_key et unique_id afin de ne pas dépendre
   * de la langue de l'identifiant d'entité.
   */
  const registryMatch = registryEntries(hass).find(
    (entry) =>
      entry.platform === INTEGRATION_DOMAIN &&
      typeof entry.entity_id === "string" &&
      (!deviceId || entry.device_id === deviceId) &&
      keyMatches(entry, key)
  );

  if (
    registryMatch?.entity_id &&
    hass.states[registryMatch.entity_id]
  ) {
    return registryMatch.entity_id;
  }

  /*
   * 3. Ancienne méthode conservée comme solution de secours.
   */
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
  const entityId = findEntity(
    hass,
    configured,
    key,
    deviceId
  );

  return entityId ? hass.states[entityId] : undefined;
}

export function numericValue(
  state?: HassEntity
): number | null {
  if (
    !state ||
    ["unknown", "unavailable", "none", ""].includes(
      state.state
    )
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
    ["unknown", "unavailable", "none", ""].includes(
      state.state
    )
  ) {
    return fallback;
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

export function historyValues(
  state?: HassEntity
): number[] {
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
        return Number(
          (item as { value: unknown }).value
        );
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