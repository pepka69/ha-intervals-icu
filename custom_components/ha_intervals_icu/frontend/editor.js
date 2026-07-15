import { styles } from "./styles.js";
import { DEFAULT_KEYS, escapeHtml, matchingSensorEntities } from "./utils.js";

const ENTITY_FIELDS = [
  ["fitness_entity", "Fitness", DEFAULT_KEYS.fitness],
  ["fatigue_entity", "Fatigue", DEFAULT_KEYS.fatigue],
  ["form_entity", "Forme", DEFAULT_KEYS.form],
  ["ftp_entity", "FTP", DEFAULT_KEYS.ftp],
  ["weekly_load_entity", "Charge 7 jours", DEFAULT_KEYS.weeklyLoad],
  ["weekly_activities_entity", "Activités 7 jours", DEFAULT_KEYS.weeklyActivities],
];

class IntervalsIcuCardEditor extends HTMLElement {
  set hass(value) {
    this._hass = value;
    this._render();
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  connectedCallback() {
    this._render();
  }

  _entitySelect(field, label, key) {
    const entities = matchingSensorEntities(this._hass, key);
    const configured = this._config[field] ?? "";
    const options = [
      `<option value="">Détection automatique</option>`,
      ...entities.map((entityId) => {
        const state = this._hass.states[entityId];
        const name = state?.attributes?.friendly_name || entityId;
        const selected = configured === entityId ? " selected" : "";
        return `<option value="${escapeHtml(entityId)}"${selected}>${escapeHtml(name)} — ${escapeHtml(entityId)}</option>`;
      }),
    ].join("");
    return `<div class="editor-row"><label for="${field}">${escapeHtml(label)}</label><select id="${field}" data-field="${field}">${options}</select></div>`;
  }

  _render() {
    if (!this._config || !this._hass) return;
    this.innerHTML = `
      <style>${styles}</style>
      <div class="editor">
        <div class="editor-row">
          <label for="title">Titre</label>
          <input id="title" data-field="title" value="${escapeHtml(this._config.title || "Intervals.icu")}">
        </div>
        ${ENTITY_FIELDS.map(([field, label, key]) => this._entitySelect(field, label, key)).join("")}
        <label class="checkbox"><input type="checkbox" data-field="show_records" ${this._config.show_records !== false ? "checked" : ""}>Afficher les records</label>
        <label class="checkbox"><input type="checkbox" data-field="show_history" ${this._config.show_history !== false ? "checked" : ""}>Afficher l’historique</label>
        <label class="checkbox"><input type="checkbox" data-field="show_workout" ${this._config.show_workout !== false ? "checked" : ""}>Afficher la séance du jour</label>
        <label class="checkbox"><input type="checkbox" data-field="show_last_activity" ${this._config.show_last_activity !== false ? "checked" : ""}>Afficher la dernière activité</label>
      </div>`;

    this.querySelectorAll("[data-field]").forEach((element) => {
      element.addEventListener("change", (event) => this._changed(event));
    });
  }

  _changed(event) {
    const field = event.target.dataset.field;
    const config = { ...this._config };
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value.trim();
    if (value === "") delete config[field];
    else config[field] = value;
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }
}

if (!customElements.get("ha-intervals-icu-card-editor")) {
  customElements.define("ha-intervals-icu-card-editor", IntervalsIcuCardEditor);
}
