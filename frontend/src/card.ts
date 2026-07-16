import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { DEFAULT_KEYS, deviceName, formatState, getState, historyValues, numericValue, relativeTime } from "./entities";
import { gauge, historyChart } from "./graph";
import type { CardConfig, HassEntity, HomeAssistant } from "./types";
import "./editor";

@customElement("ha-intervals-icu-card")
export class HaIntervalsIcuCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;

  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }

  static getStubConfig(): Omit<CardConfig, "type"> {
    return {
      title: "Intervals.icu",
      show_health: true,
      show_weight: true,
      show_records: true,
      show_history: true,
      show_workout: true,
      show_last_activity: true,
      show_sync_status: true
    };
  }

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error("Configuration manquante");
    this.config = {
      show_records: true,
      show_history: true,
      show_workout: true,
      show_last_activity: true,
      show_sync_status: true,
      ...config
    };
  }

  public getCardSize(): number { return 10; }
  public getGridOptions() { return { columns: 12, min_columns: 6, rows: 9, min_rows: 5 }; }

  private state(field: keyof CardConfig, key: string): HassEntity | undefined {
    return this.hass ? getState(this.hass, this.config?.[field] as string | undefined, key, this.config?.device_id) : undefined;
  }

  private status(metric: "fitness" | "fatigue" | "form", state?: HassEntity): "good" | "warning" | "danger" | "neutral" {
    const value = numericValue(state);
    if (value === null) return "neutral";
    if (metric === "form") return value < -20 ? "danger" : value < -10 ? "warning" : "good";
    if (metric === "fatigue") return value >= 80 ? "danger" : value >= 60 ? "warning" : "good";
    return "good";
  }

  private metric(label: string, shortLabel: string, metric: "fitness" | "fatigue" | "form", state?: HassEntity) {
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
      <div class="metric-foot">7 j ${typeof change === "number" ? `${change > 0 ? "+" : ""}${change.toFixed(1)}` : "—"}</div>
    </article>`;
  }

  private infoRow(icon: string, label: string, state?: HassEntity) {
    return html`<div class="info-row"><ha-icon icon=${icon}></ha-icon><span>${label}</span><strong>${formatState(this.hass!, state)}</strong></div>`;
  }

  protected render() {
    if (!this.hass || !this.config) return nothing;
    const hass = this.hass;
    const fitness = this.state("fitness_entity", DEFAULT_KEYS.fitness);
    const fatigue = this.state("fatigue_entity", DEFAULT_KEYS.fatigue);
    const form = this.state("form_entity", DEFAULT_KEYS.form);
    const ftp = this.state("ftp_entity", DEFAULT_KEYS.ftp);
    const weeklyLoad = this.state("weekly_load_entity", DEFAULT_KEYS.weeklyLoad);
    const weeklyActivities = this.state("weekly_activities_entity", DEFAULT_KEYS.weeklyActivities);

    const deviceId = this.config.device_id;
    const selectedDevice = deviceId ? hass.devices?.[deviceId] : undefined;
    const athleteLabel = this.config.athlete_name || deviceName(selectedDevice);

    const workout = getState(hass, undefined, DEFAULT_KEYS.plannedTodayName, deviceId);
    const workoutSport = getState(hass, undefined, DEFAULT_KEYS.plannedTodaySport, deviceId);
    const workoutDuration = getState(hass, undefined, DEFAULT_KEYS.plannedTodayDuration, deviceId);
    const workoutLoad = getState(hass, undefined, DEFAULT_KEYS.plannedTodayLoad, deviceId);

    const last = getState(hass, undefined, DEFAULT_KEYS.lastActivityName, deviceId);
    const lastType = getState(hass, undefined, DEFAULT_KEYS.lastActivityType, deviceId);
    const lastDate = getState(hass, undefined, DEFAULT_KEYS.lastActivityDate, deviceId);
    const lastDuration = getState(hass, undefined, DEFAULT_KEYS.lastActivityDuration, deviceId);
    const lastLoad = getState(hass, undefined, DEFAULT_KEYS.lastActivityLoad, deviceId);
    const lastCalories = getState(hass, undefined, DEFAULT_KEYS.lastActivityCalories, deviceId);

    const lastNameText = formatState(hass, last);
    const lastTypeText = formatState(hass, lastType, "Activité");
    const showLastType =
      lastTypeText !== "Activité" &&
      lastTypeText.trim().toLowerCase() !==
        lastNameText.trim().toLowerCase();

    const configuredWeightEntity = this.config.weight_entity;
    const weight =
      configuredWeightEntity && hass.states[configuredWeightEntity]
        ? hass.states[configuredWeightEntity]
        : getState(hass, undefined, DEFAULT_KEYS.weight, deviceId);

    const sync = relativeTime(fitness?.last_updated ?? fitness?.last_changed);

    return html`<ha-card>
      <div class="card-shell">
        <header class="header">
          <div class="identity">
            <div class="logo"><ha-icon icon="mdi:chart-timeline-variant-shimmer"></ha-icon></div>
            <div><h2>${this.config.title ?? "Intervals.icu"}</h2>${athleteLabel ? html`<div class="athlete">${athleteLabel}</div>` : nothing}</div>
          </div>
          ${this.config.show_sync_status !== false ? html`<div class="sync"><span class="dot ${sync.level}"></span>${sync.label}</div>` : nothing}
        </header>

        <section class="metrics">
          ${this.metric("FITNESS", "CTL", "fitness", fitness)}
          ${this.metric("FATIGUE", "ATL", "fatigue", fatigue)}
          ${this.metric("FORME", "TSB", "form", form)}
        </section>

        <section class="quick-stats">
          <div><span>FTP</span><strong>${formatState(hass, ftp)}</strong></div>
          <div><span>Charge 7 j</span><strong>${formatState(hass, weeklyLoad)}</strong></div>
          <div><span>Activités 7 j</span><strong>${formatState(hass, weeklyActivities)}</strong></div>
        </section>

        ${this.config.show_history !== false ? html`<section class="section chart-section">
          <div class="section-title"><ha-icon icon="mdi:chart-line"></ha-icon><span>Évolution</span></div>
          ${historyChart([
            { label: "Fitness", values: historyValues(fitness), className: "fitness-line" },
            { label: "Fatigue", values: historyValues(fatigue), className: "fatigue-line" },
            { label: "Forme", values: historyValues(form), className: "form-line" }
          ])}
        </section>` : nothing}

        ${this.config.show_health !== false &&
        this.config.show_weight !== false &&
        weight
          ? html`<section class="section health-section">
              <div class="section-title">
                <ha-icon icon="mdi:heart-pulse"></ha-icon>
                <span>Santé</span>
              </div>
              <div class="health-grid">
                <div class="health-item">
                  <ha-icon icon="mdi:scale-bathroom"></ha-icon>
                  <div>
                    <span>Poids</span>
                    <strong>${formatState(hass, weight)}</strong>
                  </div>
                </div>
              </div>
            </section>`
          : nothing}

        <section class="lower-grid">
          ${this.config.show_workout !== false ? html`<article class="feature workout">
            <div class="section-title"><ha-icon icon="mdi:calendar-today"></ha-icon><span>Aujourd’hui</span></div>
            <h3>${formatState(hass, workout, "Aucun entraînement planifié")}</h3>
            <div class="pill">${formatState(hass, workoutSport, "Entraînement")}</div>
            <div class="feature-meta"><span><ha-icon icon="mdi:clock-outline"></ha-icon>${formatState(hass, workoutDuration)}</span><span><ha-icon icon="mdi:chart-bar"></ha-icon>Charge ${formatState(hass, workoutLoad)}</span></div>
          </article>` : nothing}

          ${this.config.show_records !== false ? html`<article class="feature records-card">
            <div class="section-title"><ha-icon icon="mdi:trophy-outline"></ha-icon><span>Records</span></div>
            ${this.infoRow("mdi:bike-fast", "FTP", getState(hass, undefined, DEFAULT_KEYS.recordFtp, deviceId))}
            ${this.infoRow("mdi:map-marker-distance", "Distance", getState(hass, undefined, DEFAULT_KEYS.recordDistance, deviceId))}
            ${this.infoRow("mdi:image-filter-hdr", "Dénivelé", getState(hass, undefined, DEFAULT_KEYS.recordElevation, deviceId))}
            ${this.infoRow("mdi:flash", "Puissance max", getState(hass, undefined, DEFAULT_KEYS.recordMaxPower, deviceId))}
          </article>` : nothing}

          ${this.config.show_last_activity !== false ? html`<article class="feature last-activity">
            <div class="section-title"><ha-icon icon="mdi:history"></ha-icon><span>Dernière activité</span></div>
            <h3>${lastNameText}</h3>
            ${showLastType
              ? html`<div class="pill purple">${lastTypeText}</div>`
              : nothing}
            <div class="activity-details">
              <span><ha-icon icon="mdi:calendar-blank-outline"></ha-icon>${formatState(hass, lastDate)}</span>
              <span><ha-icon icon="mdi:clock-outline"></ha-icon>${formatState(hass, lastDuration)}</span>
              <span><ha-icon icon="mdi:fire"></ha-icon>${formatState(hass, lastCalories)}</span>
              <span><ha-icon icon="mdi:chart-bar"></ha-icon>Charge ${formatState(hass, lastLoad)}</span>
            </div>
          </article>` : nothing}
        </section>
      </div>
    </ha-card>`;
  }
}
