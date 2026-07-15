export const CARD_VERSION = "1.1.0-beta1";

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
  recordMaxPower: "record_max_power",
};

export function findEntity(hass, configuredEntity, key) {
  if (configuredEntity && hass.states[configuredEntity]) return configuredEntity;
  const suffix = `_${key}`;
  return Object.keys(hass.states).find(
    (entityId) => entityId.startsWith("sensor.") && entityId.endsWith(suffix),
  );
}

export function getState(hass, configuredEntity, key) {
  const entityId = findEntity(hass, configuredEntity, key);
  return entityId ? hass.states[entityId] : undefined;
}

export function numericValue(state) {
  if (!state || ["unknown", "unavailable", "none"].includes(state.state)) return null;
  const value = Number(state.state);
  return Number.isFinite(value) ? value : null;
}

export function formatState(hass, state, fallback = "—") {
  if (!state || ["unknown", "unavailable", "none"].includes(state.state)) return fallback;
  try {
    return hass.formatEntityState(state);
  } catch (_error) {
    const unit = state.attributes.unit_of_measurement || "";
    return `${state.state}${unit ? ` ${unit}` : ""}`;
  }
}

export function formatDuration(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return null;
  const hours = Math.floor(value / 3600);
  const minutes = Math.round((value % 3600) / 60);
  if (hours && minutes) return `${hours} h ${minutes} min`;
  if (hours) return `${hours} h`;
  return `${minutes} min`;
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function historyValues(state) {
  const history = state?.attributes?.history;
  if (!Array.isArray(history)) return [];
  return history
    .map((item) => Number(typeof item === "object" ? item.value : item))
    .filter(Number.isFinite);
}

export function statusFor(metric, value) {
  if (value === null) return "neutral";
  if (metric === "form") {
    if (value < -20) return "danger";
    if (value < -10) return "warning";
    if (value <= 15) return "good";
    return "warning";
  }
  if (metric === "fatigue") {
    if (value >= 80) return "danger";
    if (value >= 60) return "warning";
  }
  return "good";
}
