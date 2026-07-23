import { translateSportName } from "./i18n";
import type { HomeAssistant } from "./types";
export function translateSportType(value: unknown, fallback = "Activity", hass?: HomeAssistant): string {
  return translateSportName(hass, value, fallback);
}
