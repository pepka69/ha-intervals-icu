import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import {
  DEFAULT_KEYS,
  deviceName,
  formatState,
  getState,
  historyValues,
  numericValue,
  relativeTime
} from "./entities";
import { gauge, historyChart } from "./graph";
import { translateSportType } from "./sport-translations";
import type {
  CardConfig,
  HassEntity,
  HealthMetricKey,
  HomeAssistant
} from "./types";
import "./editor";

const HEALTH_METRICS: Array<{
  key: HealthMetricKey;
  label: string;
  icon: string;
  defaultShow: boolean;
}> = [
  { key: "weight", label: "Poids", icon: "mdi:scale-bathroom", defaultShow: true },
  { key: "body_fat", label: "Graisse corporelle", icon: "mdi:percent-outline", defaultShow: false },
  { key: "muscle_mass", label: "Masse musculaire", icon: "mdi:arm-flex", defaultShow: false },
  { key: "bone_mass", label: "Masse osseuse", icon: "mdi:bone", defaultShow: false },
  { key: "body_water", label: "Eau corporelle", icon: "mdi:water-percent", defaultShow: false },
  { key: "visceral_fat", label: "Graisse viscérale", icon: "mdi:human-male", defaultShow: false },
  { key: "bmi", label: "IMC", icon: "mdi:human", defaultShow: false },
  { key: "metabolic_age", label: "Âge métabolique", icon: "mdi:calendar-heart", defaultShow: false },
  { key: "resting_hr", label: "FC au repos", icon: "mdi:heart-pulse", defaultShow: false },
  { key: "hrv", label: "HRV", icon: "mdi:heart-flash", defaultShow: false },
  { key: "sleep", label: "Sommeil", icon: "mdi:sleep", defaultShow: false },
  { key: "vo2max", label: "VO₂max", icon: "mdi:lungs", defaultShow: false },
  { key: "blood_oxygen", label: "Oxygène sanguin", icon: "mdi:water-plus-outline", defaultShow: false },
  { key: "respiration_rate", label: "Respiration", icon: "mdi:weather-windy", defaultShow: false },
  { key: "body_temperature", label: "Température", icon: "mdi:thermometer", defaultShow: false },
  { key: "stress", label: "Stress", icon: "mdi:head-heart-outline", defaultShow: false },
  { key: "daily_calories", label: "Calories quotidiennes", icon: "mdi:fire", defaultShow: false }
];

@customElement("ha-intervals-icu-card")
export class HaIntervalsIcuCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;
  @state() private refreshing = false;

  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }

  static getStubConfig(): Omit<CardConfig, "type"> {
    return {
      title: "Intervals.icu",
      show_atlas: true,
      show_health: true,
      show_records: true,
      show_history: true,
      show_workout: true,
      show_last_activity: true,
      show_sync_status: true,
      show_refresh_button: true,
      compact: false,
      health: {
        weight: { show: true }
      }
    };
  }

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error("Configuration manquante");

    this.config = {
      show_atlas: true,
      show_health: true,
      show_records: true,
      show_history: true,
      show_workout: true,
      show_last_activity: true,
      show_sync_status: true,
      show_refresh_button: true,
      compact: false,
      ...config
    };
  }

  public getCardSize(): number {
    return 10;
  }

  public getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 9, min_rows: 5 };
  }


  private async refresh(): Promise<void> {
    if (!this.hass?.callService || this.refreshing) return;
    this.refreshing = true;
    try {
      await this.hass.callService("ha_intervals_icu", "refresh", {});
    } finally {
      window.setTimeout(() => { this.refreshing = false; }, 900);
    }
  }

  private sportIcon(value?: string): string {
    const sport = (value ?? "").toLowerCase();
    if (sport.includes("ride") || sport.includes("cycl") || sport.includes("vélo")) return "mdi:bike-fast";
    if (sport.includes("run") || sport.includes("course")) return "mdi:run-fast";
    if (sport.includes("swim") || sport.includes("natation")) return "mdi:swim";
    if (sport.includes("strength") || sport.includes("musculation") || sport.includes("crossfit")) return "mdi:weight-lifter";
    if (sport.includes("walk") || sport.includes("marche")) return "mdi:walk";
    return "mdi:arm-flex";
  }

  private quickStat(icon: string, label: string, state?: HassEntity) {
    return html`<div class="quick-stat"><ha-icon icon=${icon}></ha-icon><div><span>${label}</span><strong>${formatState(this.hass!, state)}</strong></div></div>`;
  }

  private state(
    field: keyof CardConfig,
    key: string
  ): HassEntity | undefined {
    return this.hass
      ? getState(
          this.hass,
          this.config?.[field] as string | undefined,
          key,
          this.config?.device_id
        )
      : undefined;
  }

  private status(
    metric: "fitness" | "fatigue" | "form",
    state?: HassEntity
  ): "good" | "warning" | "danger" | "neutral" {
    const value = numericValue(state);
    if (value === null) return "neutral";
    if (metric === "form") {
      return value < -20 ? "danger" : value < -10 ? "warning" : "good";
    }
    if (metric === "fatigue") {
      return value >= 80 ? "danger" : value >= 60 ? "warning" : "good";
    }
    return "good";
  }

  private metric(
    label: string,
    shortLabel: string,
    metric: "fitness" | "fatigue" | "form",
    state?: HassEntity
  ) {
    const value = numericValue(state);
    const status = this.status(metric, state);
    const min = metric === "form" ? -30 : 0;
    const max = metric === "form" ? 30 : 100;
    const change = state?.attributes.change_7_days;

    return html`<article class="metric ${metric}">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${formatState(this.hass!, state)}</div>
      <div class="metric-short">${shortLabel}</div>
      ${gauge(value, status, min, max)}
      <div class="metric-foot">
        7 j
        ${typeof change === "number"
          ? `${change > 0 ? "+" : ""}${change.toFixed(1)}`
          : "—"}
      </div>
    </article>`;
  }

  private infoRow(icon: string, label: string, state?: HassEntity) {
    return html`<div class="info-row">
      <ha-icon icon=${icon}></ha-icon>
      <span>${label}</span>
      <strong>${formatState(this.hass!, state)}</strong>
    </div>`;
  }

  private healthState(key: HealthMetricKey): HassEntity | undefined {
    if (!this.hass || !this.config) return undefined;

    const configuredEntity =
      this.config.health?.[key]?.entity ??
      (key === "weight" ? this.config.weight_entity : undefined);

    if (configuredEntity && this.hass.states[configuredEntity]) {
      return this.hass.states[configuredEntity];
    }

    return getState(
      this.hass,
      undefined,
      DEFAULT_KEYS[key],
      this.config.device_id
    );
  }

  private healthVisible(key: HealthMetricKey, defaultShow: boolean): boolean {
    const configuredShow = this.config?.health?.[key]?.show;

    if (configuredShow !== undefined) {
      return configuredShow;
    }

    if (key === "weight" && this.config?.show_weight !== undefined) {
      return this.config.show_weight;
    }

    return defaultShow;
  }

  protected render() {
    if (!this.hass || !this.config) return nothing;

    const hass = this.hass;
    const fitness = this.state("fitness_entity", DEFAULT_KEYS.fitness);
    const fatigue = this.state("fatigue_entity", DEFAULT_KEYS.fatigue);
    const form = this.state("form_entity", DEFAULT_KEYS.form);
    const ftp = this.state("ftp_entity", DEFAULT_KEYS.ftp);
    const weeklyLoad = this.state(
      "weekly_load_entity",
      DEFAULT_KEYS.weeklyLoad
    );
    const weeklyActivities = this.state(
      "weekly_activities_entity",
      DEFAULT_KEYS.weeklyActivities
    );

    const trainingStatus = getState(
      hass,
      undefined,
      DEFAULT_KEYS.trainingStatus,
      this.config.device_id
    );
    const readinessScore = getState(
      hass,
      undefined,
      DEFAULT_KEYS.readinessScore,
      this.config.device_id
    );
    const readinessLevel = getState(
      hass,
      undefined,
      DEFAULT_KEYS.readinessLevel,
      this.config.device_id
    );
    const readinessRecovery = getState(
      hass,
      undefined,
      DEFAULT_KEYS.readinessRecoveryHours,
      this.config.device_id
    );
    const atlasCoach = getState(
      hass,
      undefined,
      DEFAULT_KEYS.atlasCoach,
      this.config.device_id
    );

    const deviceId = this.config.device_id;
    const selectedDevice = deviceId ? hass.devices?.[deviceId] : undefined;
    const athleteLabel =
      this.config.athlete_name || deviceName(selectedDevice);

    const workout = getState(
      hass,
      undefined,
      DEFAULT_KEYS.plannedTodayName,
      deviceId
    );
    const workoutSport = getState(
      hass,
      undefined,
      DEFAULT_KEYS.plannedTodaySport,
      deviceId
    );
    const workoutDuration = getState(
      hass,
      undefined,
      DEFAULT_KEYS.plannedTodayDuration,
      deviceId
    );
    const workoutLoad = getState(
      hass,
      undefined,
      DEFAULT_KEYS.plannedTodayLoad,
      deviceId
    );

    const last = getState(
      hass,
      undefined,
      DEFAULT_KEYS.lastActivityName,
      deviceId
    );
    const lastType = getState(
      hass,
      undefined,
      DEFAULT_KEYS.lastActivityType,
      deviceId
    );
    const lastDate = getState(
      hass,
      undefined,
      DEFAULT_KEYS.lastActivityDate,
      deviceId
    );
    const lastDuration = getState(
      hass,
      undefined,
      DEFAULT_KEYS.lastActivityDuration,
      deviceId
    );
    const lastLoad = getState(
      hass,
      undefined,
      DEFAULT_KEYS.lastActivityLoad,
      deviceId
    );
    const lastCalories = getState(
      hass,
      undefined,
      DEFAULT_KEYS.lastActivityCalories,
      deviceId
    );

    const lastNameText = formatState(hass, last);
    const lastTypeText = translateSportType(formatState(hass, lastType, "Activité"));
    const showLastType =
      lastTypeText !== "Activité" &&
      lastTypeText.trim().toLowerCase() !==
        lastNameText.trim().toLowerCase();

    const healthItems = HEALTH_METRICS.map((metric) => ({
      ...metric,
      state: this.healthState(metric.key),
      visible: this.healthVisible(metric.key, metric.defaultShow)
    })).filter((metric) => metric.visible && metric.state);

    const sync = relativeTime(
      fitness?.last_updated ?? fitness?.last_changed
    );

    return html`<ha-card class=${this.config.compact ? "compact" : ""}>
      <div class="card-shell">
        <header class="header">
          <div class="identity">
            <div class="logo">
              <ha-icon
                icon="mdi:chart-timeline-variant-shimmer"
              ></ha-icon>
            </div>
            <div>
              <h2>${this.config.title ?? "Intervals.icu"}</h2>
              ${athleteLabel
                ? html`<div class="athlete">${athleteLabel}</div>`
                : nothing}
            </div>
          </div>
          <div class="header-actions">
            ${this.config.show_sync_status !== false
              ? html`<div class="sync"><span class="dot ${sync.level}"></span>${sync.label}</div>`
              : nothing}
            ${this.config.show_refresh_button !== false
              ? html`<button class="refresh" title="Actualiser" @click=${() => this.refresh()}>
                  <ha-icon class=${this.refreshing ? "spinning" : ""} icon="mdi:refresh"></ha-icon>
                </button>`
              : nothing}
          </div>
        </header>

        ${this.config.show_atlas !== false
          ? html`<section class="atlas-panel">
              <article class="atlas-readiness">
                <div class="section-title">
                  <ha-icon icon="mdi:gauge"></ha-icon><span>Atlas Readiness</span>
                </div>
                <div class="atlas-score">
                  <strong>${formatState(hass, readinessScore)}</strong>
                  <span>${formatState(hass, readinessLevel, "Indisponible")}</span>
                </div>
                <div class="atlas-meta">
                  <span><ha-icon icon="mdi:timer-sand"></ha-icon>Récupération ${formatState(hass, readinessRecovery)}</span>
                  <span><ha-icon icon=${trainingStatus?.attributes.icon as string || "mdi:chart-timeline-variant-shimmer"}></ha-icon>${formatState(hass, trainingStatus, "Statut inconnu")}</span>
                </div>
              </article>
              <article class="atlas-coach">
                <div class="section-title">
                  <ha-icon icon="mdi:account-heart-outline"></ha-icon><span>Atlas Coach</span>
                </div>
                <h3>${formatState(hass, atlasCoach, "Aucune recommandation")}</h3>
                ${atlasCoach?.attributes.recommendation
                  ? html`<p>${String(atlasCoach.attributes.recommendation)}</p>`
                  : nothing}
                <div class="atlas-chips">
                  ${atlasCoach?.attributes.intensity
                    ? html`<span>${String(atlasCoach.attributes.intensity)}</span>`
                    : nothing}
                  ${atlasCoach?.attributes.duration_minutes
                    ? html`<span>${String(atlasCoach.attributes.duration_minutes)} min</span>`
                    : nothing}
                  ${atlasCoach?.attributes.heart_rate_zone
                    ? html`<span>${String(atlasCoach.attributes.heart_rate_zone)}</span>`
                    : nothing}
                </div>
              </article>
            </section>`
          : nothing}

        <section class="metrics">
          ${this.metric("FITNESS", "CTL", "fitness", fitness)}
          ${this.metric("FATIGUE", "ATL", "fatigue", fatigue)}
          ${this.metric("FORME", "TSB", "form", form)}
        </section>

        <section class="quick-stats">
          ${this.quickStat("mdi:bike-fast", "FTP", ftp)}
          ${this.quickStat("mdi:chart-areaspline", "Charge 7 j", weeklyLoad)}
          ${this.quickStat("mdi:calendar-check", "Activités 7 j", weeklyActivities)}
        </section>

        ${this.config.show_history !== false
          ? html`<section class="section chart-section">
              <div class="section-title">
                <ha-icon icon="mdi:chart-line"></ha-icon
                ><span>Évolution</span>
              </div>
              ${historyChart([
                {
                  label: "Fitness",
                  values: historyValues(fitness),
                  className: "fitness-line"
                },
                {
                  label: "Fatigue",
                  values: historyValues(fatigue),
                  className: "fatigue-line"
                },
                {
                  label: "Forme",
                  values: historyValues(form),
                  className: "form-line"
                }
              ])}
            </section>`
          : nothing}

        ${this.config.show_health !== false && healthItems.length > 0
          ? html`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>Santé et composition corporelle</span>
              </div>
              <div class="health-grid">
                ${healthItems.map(
                  (metric) => html`
                    <div class="health-item">
                      <ha-icon icon=${metric.icon}></ha-icon>
                      <div>
                        <span>${metric.label}</span>
                        <strong>${formatState(hass, metric.state)}</strong>
                      </div>
                    </div>
                  `
                )}
              </div>
            </section>`
          : nothing}

        <section class="lower-grid">
          ${this.config.show_workout !== false
            ? html`<article class="feature workout spotlight">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar-today"></ha-icon
                  ><span>Aujourd’hui</span>
                </div>
                <h3>
                  ${formatState(
                    hass,
                    workout,
                    "Aucun entraînement planifié"
                  )}
                </h3>
                <div class="pill">
                  ${translateSportType(formatState(hass, workoutSport, "Entraînement"), "Entraînement")}
                </div>
                <div class="feature-meta">
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${formatState(hass, workoutDuration)}</span
                  ><span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>Charge
                    ${formatState(hass, workoutLoad)}</span
                  >
                </div>
              </article>`
            : nothing}

          ${this.config.show_records !== false
            ? html`<article class="feature records-card">
                <div class="section-title">
                  <ha-icon icon="mdi:trophy-outline"></ha-icon
                  ><span>Records</span>
                </div>
                ${this.infoRow(
                  "mdi:bike-fast",
                  "FTP",
                  getState(
                    hass,
                    undefined,
                    DEFAULT_KEYS.recordFtp,
                    deviceId
                  )
                )}
                ${this.infoRow(
                  "mdi:map-marker-distance",
                  "Distance",
                  getState(
                    hass,
                    undefined,
                    DEFAULT_KEYS.recordDistance,
                    deviceId
                  )
                )}
                ${this.infoRow(
                  "mdi:image-filter-hdr",
                  "Dénivelé",
                  getState(
                    hass,
                    undefined,
                    DEFAULT_KEYS.recordElevation,
                    deviceId
                  )
                )}
                ${this.infoRow(
                  "mdi:flash",
                  "Puissance max",
                  getState(
                    hass,
                    undefined,
                    DEFAULT_KEYS.recordMaxPower,
                    deviceId
                  )
                )}
              </article>`
            : nothing}

          ${this.config.show_last_activity !== false
            ? html`<article class="feature last-activity spotlight">
                <div class="section-title">
                  <ha-icon icon=${this.sportIcon(lastTypeText)}></ha-icon
                  ><span>Dernière activité</span>
                </div>
                <h3>${lastNameText}</h3>
                ${showLastType
                  ? html`<div class="pill purple">${lastTypeText}</div>`
                  : nothing}
                <div class="activity-details">
                  <span
                    ><ha-icon
                      icon="mdi:calendar-blank-outline"
                    ></ha-icon
                    >${formatState(hass, lastDate)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:clock-outline"></ha-icon
                    >${formatState(hass, lastDuration)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:fire"></ha-icon
                    >${formatState(hass, lastCalories)}</span
                  >
                  <span
                    ><ha-icon icon="mdi:chart-bar"></ha-icon>Charge
                    ${formatState(hass, lastLoad)}</span
                  >
                </div>
              </article>`
            : nothing}
        </section>
      </div>
    </ha-card>`;
  }
}
