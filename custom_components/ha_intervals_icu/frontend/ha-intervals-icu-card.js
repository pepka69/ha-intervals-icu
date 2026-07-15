const CARD_VERSION = "1.1.0";

const DEFAULT_ENTITIES = {
  fitness: ["fitness"],
  fatigue: ["fatigue"],
  form: ["form", "forme"],
  ftp: ["ftp"],
  weeklyLoad: ["weekly_load", "charge_sur_7_jours", "charge_7_jours"],
  weeklyActivities: ["weekly_activities", "activites_sur_7_jours", "activites_7_jours"],
  plannedToday: ["planned_today_name", "entrainement_planifie_aujourdhui"],
  plannedTodayDuration: ["planned_today_duration", "duree_planifiee_aujourdhui"],
  plannedTodayLoad: ["planned_today_load", "charge_planifiee_aujourdhui"],
  lastActivity: ["last_activity_name", "derniere_activite"],
  lastActivityDistance: ["last_activity_distance", "distance_derniere_activite"],
  recordDistance: ["record_distance", "record_distance_365_jours"],
  recordElevation: ["record_elevation", "record_denivele_365_jours"],
  recordPower: ["record_max_power", "record_puissance_maximale_365_jours"],
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function numberValue(stateObj) {
  if (!stateObj || ["unknown", "unavailable", "none", "null"].includes(stateObj.state)) {
    return null;
  }
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

function formatState(stateObj, fallback = "—") {
  if (!stateObj || ["unknown", "unavailable", "none", "null", ""].includes(stateObj.state)) {
    return fallback;
  }
  const unit = stateObj.attributes.unit_of_measurement;
  return unit ? `${stateObj.state} ${unit}` : stateObj.state;
}

function findEntity(hass, configured, candidates = []) {
  if (configured && hass.states[configured]) return configured;
  const sensorIds = Object.keys(hass.states).filter((id) => id.startsWith("sensor."));
  for (const suffix of candidates) {
    const exact = sensorIds.find((id) => id.endsWith(`_${suffix}`));
    if (exact) return exact;
  }
  return null;
}

function statusForMetric(key, value) {
  if (value === null) return "neutral";
  if (key === "form") {
    if (value >= -10 && value <= 10) return "good";
    if (value < -25) return "bad";
    return "warn";
  }
  if (key === "fatigue") {
    if (value >= 70) return "bad";
    if (value >= 50) return "warn";
    return "good";
  }
  return "good";
}

function sparkline(history, width = 260, height = 62) {
  const values = Array.isArray(history)
    ? history
        .map((item) => (typeof item === "number" ? item : Number(item?.value)))
        .filter(Number.isFinite)
    : [];

  if (values.length < 2) {
    return '<div class="spark-empty">Historique indisponible</div>';
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - 4 - ((value - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
    <polyline points="${points}"></polyline>
  </svg>`;
}

class HaIntervalsIcuCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ha-intervals-icu-card-editor");
  }

  static getStubConfig(hass) {
    const config = { title: "Intervals.icu", show_records: true, show_history: true };
    if (!hass) return config;
    for (const [key, candidates] of Object.entries(DEFAULT_ENTITIES)) {
      const entityId = findEntity(hass, null, candidates);
      if (entityId) config[`${key}_entity`] = entityId;
    }
    return config;
  }

  setConfig(config) {
    this._config = {
      title: "Intervals.icu",
      show_records: true,
      show_history: true,
      ...config,
    };
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getCardSize() {
    return 8;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 8, min_rows: 5 };
  }

  entity(key) {
    if (!this._hass) return null;
    const entityId = findEntity(
      this._hass,
      this._config?.[`${key}_entity`],
      DEFAULT_ENTITIES[key] || [],
    );
    return entityId ? this._hass.states[entityId] : null;
  }

  metric(key, label, icon) {
    const stateObj = this.entity(key);
    const value = numberValue(stateObj);
    const status = statusForMetric(key, value);
    const history = stateObj?.attributes?.history || [];
    return `<div class="metric ${status}">
      <div class="metric-head"><ha-icon icon="${icon}"></ha-icon><span>${label}</span></div>
      <div class="metric-value">${escapeHtml(formatState(stateObj))}</div>
      ${this._config.show_history ? sparkline(history) : ""}
    </div>`;
  }

  smallStat(key, label) {
    return `<div class="small-stat"><span>${label}</span><strong>${escapeHtml(formatState(this.entity(key)))}</strong></div>`;
  }

  render() {
    if (!this._config || !this._hass) return;

    const planned = this.entity("plannedToday");
    const lastActivity = this.entity("lastActivity");
    const showRecords = this._config.show_records !== false;

    this.innerHTML = `
      <ha-card>
        <style>
          ha-card { overflow: hidden; }
          .wrap { padding: 18px; }
          .header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; }
          .title { display:flex; align-items:center; gap:10px; font-size:1.3rem; font-weight:700; }
          .version { color:var(--secondary-text-color); font-size:.72rem; }
          .metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
          .metric { border:1px solid var(--divider-color); border-radius:14px; padding:12px; background:var(--card-background-color); min-width:0; }
          .metric.good { border-top:3px solid var(--success-color,#43a047); }
          .metric.warn { border-top:3px solid var(--warning-color,#f9a825); }
          .metric.bad { border-top:3px solid var(--error-color,#d32f2f); }
          .metric-head { display:flex; gap:6px; align-items:center; color:var(--secondary-text-color); font-size:.84rem; }
          .metric-head ha-icon { --mdc-icon-size:18px; }
          .metric-value { font-size:1.55rem; font-weight:700; margin:8px 0 2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
          .sparkline { width:100%; height:42px; margin-top:4px; }
          .sparkline polyline { fill:none; stroke:var(--primary-color); stroke-width:2.5; vector-effect:non-scaling-stroke; }
          .spark-empty { height:42px; display:flex; align-items:center; color:var(--disabled-text-color); font-size:.72rem; }
          .stats { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:12px; }
          .small-stat { padding:12px; border-radius:12px; background:var(--secondary-background-color); display:flex; flex-direction:column; gap:4px; min-width:0; }
          .small-stat span { color:var(--secondary-text-color); font-size:.78rem; }
          .small-stat strong { font-size:1.05rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
          .section { margin-top:14px; border-top:1px solid var(--divider-color); padding-top:14px; }
          .section-title { font-weight:700; display:flex; align-items:center; gap:7px; margin-bottom:8px; }
          .section-title ha-icon { --mdc-icon-size:20px; }
          .activity { background:var(--secondary-background-color); padding:12px; border-radius:12px; }
          .activity-name { font-weight:700; font-size:1rem; }
          .activity-meta { color:var(--secondary-text-color); margin-top:4px; font-size:.84rem; }
          .records { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; }
          .record { padding:10px; border:1px solid var(--divider-color); border-radius:10px; min-width:0; }
          .record span { display:block; color:var(--secondary-text-color); font-size:.74rem; }
          .record strong { display:block; margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
          @media (max-width: 560px) {
            .metrics { grid-template-columns:1fr; }
            .stats, .records { grid-template-columns:repeat(2,minmax(0,1fr)); }
          }
        </style>
        <div class="wrap">
          <div class="header">
            <div class="title"><ha-icon icon="mdi:bike-fast"></ha-icon>${escapeHtml(this._config.title)}</div>
            <div class="version">v${CARD_VERSION}</div>
          </div>

          <div class="metrics">
            ${this.metric("fitness", "Fitness", "mdi:heart-pulse")}
            ${this.metric("fatigue", "Fatigue", "mdi:lightning-bolt")}
            ${this.metric("form", "Forme", "mdi:run-fast")}
          </div>

          <div class="stats">
            ${this.smallStat("ftp", "FTP")}
            ${this.smallStat("weeklyLoad", "Charge 7 jours")}
            ${this.smallStat("weeklyActivities", "Activités 7 jours")}
          </div>

          <div class="section">
            <div class="section-title"><ha-icon icon="mdi:calendar-today"></ha-icon>Aujourd’hui</div>
            <div class="activity">
              <div class="activity-name">${escapeHtml(formatState(planned, "Aucun entraînement planifié"))}</div>
              <div class="activity-meta">Durée : ${escapeHtml(formatState(this.entity("plannedTodayDuration")))} · Charge : ${escapeHtml(formatState(this.entity("plannedTodayLoad")))}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title"><ha-icon icon="mdi:history"></ha-icon>Dernière activité</div>
            <div class="activity">
              <div class="activity-name">${escapeHtml(formatState(lastActivity, "Aucune activité"))}</div>
              <div class="activity-meta">Distance : ${escapeHtml(formatState(this.entity("lastActivityDistance")))}</div>
            </div>
          </div>

          ${showRecords ? `<div class="section">
            <div class="section-title"><ha-icon icon="mdi:trophy"></ha-icon>Records personnels · 365 jours</div>
            <div class="records">
              <div class="record"><span>Distance</span><strong>${escapeHtml(formatState(this.entity("recordDistance")))}</strong></div>
              <div class="record"><span>Dénivelé</span><strong>${escapeHtml(formatState(this.entity("recordElevation")))}</strong></div>
              <div class="record"><span>Puissance max</span><strong>${escapeHtml(formatState(this.entity("recordPower")))}</strong></div>
            </div>
          </div>` : ""}
        </div>
      </ha-card>`;
  }
}

class HaIntervalsIcuCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { show_records: true, show_history: true, ...config };
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  changed(key, value) {
    const config = { ...this._config, [key]: value };
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this._config) return;
    const fields = [
      ["fitness_entity", "Entité Fitness"],
      ["fatigue_entity", "Entité Fatigue"],
      ["form_entity", "Entité Forme"],
      ["ftp_entity", "Entité FTP"],
      ["weeklyLoad_entity", "Entité charge 7 jours"],
      ["weeklyActivities_entity", "Entité activités 7 jours"],
      ["plannedToday_entity", "Entité entraînement du jour"],
      ["lastActivity_entity", "Entité dernière activité"],
      ["recordDistance_entity", "Entité record distance"],
      ["recordElevation_entity", "Entité record dénivelé"],
      ["recordPower_entity", "Entité record puissance"],
    ];

    this.innerHTML = `<style>
      .editor { display:grid; gap:12px; padding:8px 0; }
      label { display:grid; gap:5px; color:var(--primary-text-color); font-size:.9rem; }
      input[type=text] { box-sizing:border-box; width:100%; padding:10px; border:1px solid var(--divider-color); border-radius:8px; background:var(--card-background-color); color:var(--primary-text-color); }
      .check { display:flex; align-items:center; gap:8px; }
    </style>
    <div class="editor">
      <label>Titre<input type="text" data-key="title" value="${escapeHtml(this._config.title || "Intervals.icu")}"></label>
      ${fields.map(([key, label]) => `<label>${label}<input type="text" data-key="${key}" placeholder="sensor..." value="${escapeHtml(this._config[key] || "")}"></label>`).join("")}
      <label class="check"><input type="checkbox" data-key="show_history" ${this._config.show_history !== false ? "checked" : ""}>Afficher les mini-graphiques</label>
      <label class="check"><input type="checkbox" data-key="show_records" ${this._config.show_records !== false ? "checked" : ""}>Afficher les records</label>
    </div>`;

    this.querySelectorAll("input[type=text]").forEach((input) => {
      input.addEventListener("change", (event) => this.changed(event.target.dataset.key, event.target.value.trim()));
    });
    this.querySelectorAll("input[type=checkbox]").forEach((input) => {
      input.addEventListener("change", (event) => this.changed(event.target.dataset.key, event.target.checked));
    });
  }
}

if (!customElements.get("ha-intervals-icu-card")) {
  customElements.define("ha-intervals-icu-card", HaIntervalsIcuCard);
}
if (!customElements.get("ha-intervals-icu-card-editor")) {
  customElements.define("ha-intervals-icu-card-editor", HaIntervalsIcuCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-intervals-icu-card",
  name: "Intervals.icu Card",
  description: "Fitness, fatigue, form, workouts, activities and personal records.",
  preview: true,
  documentationURL: "https://github.com/pepka69/ha-intervals-icu",
});

console.info(`%c HA-INTERVALS-ICU-CARD %c v${CARD_VERSION} `, "color:white;background:#1565c0;font-weight:bold", "color:#1565c0;background:white;font-weight:bold");
