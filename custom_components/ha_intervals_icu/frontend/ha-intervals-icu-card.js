import "./editor.js";
import { sparkline } from "./graph.js";
import { styles } from "./styles.js";
import {
  CARD_VERSION,
  DEFAULT_KEYS,
  escapeHtml,
  formatDuration,
  formatState,
  getState,
  historyValues,
  numericValue,
  statusFor,
} from "./utils.js";

class HaIntervalsIcuCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }

  static getStubConfig() {
    return { title: "Intervals.icu", show_records: true, show_history: true };
  }

  setConfig(config) {
    this._config = { show_records: true, show_history: true, ...config };
    this._render();
  }

  set hass(value) {
    this._hass = value;
    this._render();
  }

  getCardSize() {
    return 9;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 8, min_rows: 5 };
  }

  _state(configKey, defaultKey) {
    return getState(this._hass, this._config?.[configKey], defaultKey);
  }

  _metric(label, metric, state) {
    const value = numericValue(state);
    return `<div class="metric"><div class="metric-head"><span class="metric-label">${label}</span><span class="dot ${statusFor(metric, value)}"></span></div><div class="metric-value">${formatState(this._hass, state)}</div></div>`;
  }

  _render() {
    if (!this._hass || !this._config) return;

    const fitness = this._state("fitness_entity", DEFAULT_KEYS.fitness);
    const fatigue = this._state("fatigue_entity", DEFAULT_KEYS.fatigue);
    const form = this._state("form_entity", DEFAULT_KEYS.form);
    const ftp = this._state("ftp_entity", DEFAULT_KEYS.ftp);
    const weeklyLoad = this._state("weekly_load_entity", DEFAULT_KEYS.weeklyLoad);
    const weeklyActivities = this._state("weekly_activities_entity", DEFAULT_KEYS.weeklyActivities);
    const plannedName = this._state("planned_today_name_entity", DEFAULT_KEYS.plannedTodayName);
    const plannedDuration = this._state("planned_today_duration_entity", DEFAULT_KEYS.plannedTodayDuration);
    const plannedLoad = this._state("planned_today_load_entity", DEFAULT_KEYS.plannedTodayLoad);
    const lastName = this._state("last_activity_name_entity", DEFAULT_KEYS.lastActivityName);
    const lastDistance = this._state("last_activity_distance_entity", DEFAULT_KEYS.lastActivityDistance);
    const recordDistance = this._state("record_distance_entity", DEFAULT_KEYS.recordDistance);
    const recordElevation = this._state("record_elevation_entity", DEFAULT_KEYS.recordElevation);
    const recordPower = this._state("record_max_power_entity", DEFAULT_KEYS.recordMaxPower);

    const history = historyValues(fitness);
    const athlete = fitness?.attributes?.device_class || fitness?.attributes?.friendly_name || "Données d’entraînement";
    const workoutDetails = [formatDuration(plannedDuration?.state), plannedLoad ? `Charge ${formatState(this._hass, plannedLoad)}` : null].filter(Boolean).join(" • ");

    this.innerHTML = `
      <style>${styles}</style>
      <ha-card>
        <div class="card">
          <div class="header"><div class="title-wrap"><div class="logo"><ha-icon icon="mdi:bike-fast"></ha-icon></div><div><h2>${escapeHtml(this._config.title || "Intervals.icu")}</h2><div class="subtitle">${escapeHtml(athlete)}</div></div></div></div>
          <div class="metrics">${this._metric("Fitness", "fitness", fitness)}${this._metric("Fatigue", "fatigue", fatigue)}${this._metric("Forme", "form", form)}</div>
          <div class="summary">
            <div class="summary-item"><div class="summary-label">FTP</div><div class="summary-value">${formatState(this._hass, ftp)}</div></div>
            <div class="summary-item"><div class="summary-label">Charge 7 j</div><div class="summary-value">${formatState(this._hass, weeklyLoad)}</div></div>
            <div class="summary-item"><div class="summary-label">Activités 7 j</div><div class="summary-value">${formatState(this._hass, weeklyActivities)}</div></div>
            <div class="summary-item"><div class="summary-label">Tendance fitness</div><div class="summary-value">${fitness?.attributes?.change_7_days ?? "—"}</div></div>
          </div>
          <div class="section"><div class="section-title"><ha-icon icon="mdi:calendar-today"></ha-icon>Aujourd’hui</div><div class="workout"><div class="main-line">${escapeHtml(plannedName?.state && plannedName.state !== "unknown" ? plannedName.state : "Aucun entraînement planifié")}</div>${workoutDetails ? `<div class="detail-line">${escapeHtml(workoutDetails)}</div>` : ""}</div></div>
          <div class="section"><div class="section-title"><ha-icon icon="mdi:history"></ha-icon>Dernière activité</div><div class="activity"><div class="main-line">${escapeHtml(lastName?.state && lastName.state !== "unknown" ? lastName.state : "Indisponible")}</div><div class="detail-line">${formatState(this._hass, lastDistance)}</div></div></div>
          ${this._config.show_records !== false ? `<div class="section"><div class="section-title"><ha-icon icon="mdi:trophy-outline"></ha-icon>Records personnels</div><div class="records"><div class="record"><div class="record-label">Distance</div><div class="record-value">${formatState(this._hass, recordDistance)}</div></div><div class="record"><div class="record-label">Dénivelé</div><div class="record-value">${formatState(this._hass, recordElevation)}</div></div><div class="record"><div class="record-label">Puissance max.</div><div class="record-value">${formatState(this._hass, recordPower)}</div></div></div></div>` : ""}
          ${this._config.show_history !== false ? `<div class="section"><div class="section-title"><ha-icon icon="mdi:chart-line"></ha-icon>Historique fitness</div><div class="graph-wrap">${sparkline(history)}</div></div>` : ""}
          <div class="footer">Carte ${CARD_VERSION}</div>
        </div>
      </ha-card>`;
  }
}

if (!customElements.get("ha-intervals-icu-card")) {
  customElements.define("ha-intervals-icu-card", HaIntervalsIcuCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "ha-intervals-icu-card")) {
  window.customCards.push({
    type: "ha-intervals-icu-card",
    name: "Intervals.icu Card",
    description: "Fitness, fatigue, forme, entraînements et records Intervals.icu.",
    preview: true,
    documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/main/docs/lovelace-card.md",
  });
}
