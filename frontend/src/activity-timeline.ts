import { html, type TemplateResult } from "lit";
import { translateDynamicText, translateSportName } from "./i18n";
import type { HomeAssistant } from "./types";

export interface ActivityTimelineItem {
  id: string;
  date: string;
  name: string;
  sport: string;
  durationSeconds?: number;
  distanceMeters?: number;
  load?: number;
}

export interface ActivityTimelineOptions {
  emptyLabel: string;
  durationLabel: string;
  distanceLabel: string;
  loadLabel: string;
}

function formatDuration(seconds: number | undefined): string {
  if (!Number.isFinite(seconds) || Number(seconds) <= 0) {
    return "";
  }

  const totalMinutes = Math.round(Number(seconds) / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${minutes.toString().padStart(2, "0")}`;
}

function formatDistance(
  hass: HomeAssistant,
  meters: number | undefined
): string {
  if (!Number.isFinite(meters) || Number(meters) <= 0) {
    return "";
  }

  const kilometers = Number(meters) / 1000;

  return `${new Intl.NumberFormat(hass.locale.language, {
    maximumFractionDigits: 1
  }).format(kilometers)} km`;
}

function sportIcon(sport: string): string {
  const normalized = sport
    .toLowerCase()
    .replaceAll(/[^a-z0-9]/g, "");

  if (
    normalized.includes("ride") ||
    normalized.includes("cycling") ||
    normalized.includes("bike")
  ) {
    return "mdi:bike";
  }

  if (
    normalized.includes("run") ||
    normalized.includes("jog")
  ) {
    return "mdi:run";
  }

  if (normalized.includes("walk") || normalized.includes("hike")) {
    return "mdi:walk";
  }

  if (normalized.includes("swim")) {
    return "mdi:swim";
  }

  if (
    normalized.includes("crossfit") ||
    normalized.includes("highintensity") ||
    normalized === "hiit"
  ) {
    return "mdi:kettlebell";
  }

  if (
    normalized.includes("strength") ||
    normalized.includes("weighttraining")
  ) {
    return "mdi:dumbbell";
  }

  if (normalized.includes("row")) {
    return "mdi:rowing";
  }

  return "mdi:arm-flex";
}

function sportClass(sport: string): string {
  return `sport-${sport
    .toLowerCase()
    .replaceAll(/[^a-z0-9]/g, "-")
    .replaceAll(/-+/g, "-")
    .replace(/^-|-$/g, "") || "other"}`;
}

export function renderActivityTimeline(
  hass: HomeAssistant,
  activities: ActivityTimelineItem[],
  options: ActivityTimelineOptions
): TemplateResult {
  if (!activities.length) {
    return html`
      <div class="activity-timeline-empty">
        ${options.emptyLabel}
      </div>
    `;
  }

  return html`
    <div class="activity-timeline">
      ${activities.map((activity) => {
        const duration = formatDuration(activity.durationSeconds);
        const distance = formatDistance(
          hass,
          activity.distanceMeters
        );

        return html`
          <article class="activity-timeline-item">
            <div
              class="activity-timeline-marker ${sportClass(
                activity.sport
              )}"
            >
              <ha-icon icon=${sportIcon(activity.sport)}></ha-icon>
            </div>

            <div class="activity-timeline-content">
              <header>
                <div>
                  <strong>
                    ${translateDynamicText(hass, activity.name)}
                  </strong>

                  <span>
                    ${translateSportName(hass, activity.sport)}
                  </span>
                </div>

                <time datetime=${activity.date}>
                  ${new Date(activity.date).toLocaleDateString(
                    hass.locale.language,
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }
                  )}
                </time>
              </header>

              <div class="activity-timeline-metrics">
                ${duration
                  ? html`
                      <span>
                        <ha-icon icon="mdi:timer-outline"></ha-icon>
                        ${options.durationLabel} : ${duration}
                      </span>
                    `
                  : ""}

                ${distance
                  ? html`
                      <span>
                        <ha-icon icon="mdi:map-marker-distance"></ha-icon>
                        ${options.distanceLabel} : ${distance}
                      </span>
                    `
                  : ""}

                ${Number.isFinite(activity.load)
                  ? html`
                      <span>
                        <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                        ${options.loadLabel} :
                        ${Math.round(Number(activity.load))}
                      </span>
                    `
                  : ""}
              </div>
            </div>
          </article>
        `;
      })}
    </div>
  `;
}
