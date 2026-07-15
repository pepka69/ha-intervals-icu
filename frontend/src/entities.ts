import type { HassEntity, HomeAssistant } from "./types";

export const DEFAULT_KEYS = {
  fitness: "fitness",
  fatigue: "fatigue",
  form: "form",
  ftp: "ftp",
  weeklyLoad: "weekly_load",
  weeklyActivities: "weekly_activities",
  plannedTodayName: "planned_today_name",
  plannedTodayDuration: "planned_today_duration",
  plannedTodayLoad: "planned_today_load",
  lastActivityName: "last_activity_name",
  lastActivityDistance: "last_activity_distance",
  recordDistance: "record_distance",
  recordElevation: "record_elevation",
  recordMaxPower: "record_max_power"
} as const;

export function findEntity(hass: HomeAssistant, configured: string | undefined, key: string): string | undefined {
  if (configured && hass.states[configured]) return configured;
  const suffix = `_${key}`;
  return Object.keys(hass.states).find((id) => id.startsWith("sensor.") && id.endsWith(suffix));
}

export function getState(hass: HomeAssistant, configured: string | undefined, key: string): HassEntity | undefined {
  const id = findEntity(hass, configured, key);
  return id ? hass.states[id] : undefined;
}

export function numericValue(state?: HassEntity): number | null {
  if (!state || ["unknown", "unavailable", "none"].includes(state.state)) return null;
  const value = Number(state.state);
  return Number.isFinite(value) ? value : null;
}

export function formatState(hass: HomeAssistant, state?: HassEntity, fallback = "—"): string {
  if (!state || ["unknown", "unavailable", "none"].includes(state.state)) return fallback;
  try {
    return hass.formatEntityState?.(state) ?? `${state.state}${state.attributes.unit_of_measurement ? ` ${state.attributes.unit_of_measurement}` : ""}`;
  } catch {
    return state.state;
  }
}

export function historyValues(state?: HassEntity): number[] {
  const history = state?.attributes.history;
  if (!Array.isArray(history)) return [];
  return history.map((item) => Number(typeof item === "object" && item !== null && "value" in item ? (item as { value: unknown }).value : item)).filter(Number.isFinite);
}
