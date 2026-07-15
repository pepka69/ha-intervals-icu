import { DEFAULT_KEYS, findEntity } from "./utils.js";
import { styles } from "./styles.js";

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

  _render() {
    if (!this._config || !this._hass) return;
    this.innerHTML = `
      <style>${styles}</style>
      <div class="editor">
        <div class="editor-row">
          <label for="title">Titre</label>
          <input id="title" data-field="title" value="${this._config.title || "Intervals.icu"}">
        </div>
        ${ENTITY_FIELDS.map(([field, label, key]) => {
          const detected = findEntity(this._hass, this._config[field], key) || "";
          return `<div class="editor-row"><label for="${field}">${label}</label><input id="${field}" data-field="${field}" value="${detected}"></div>`;
        }).join("")}
        <label class="checkbox"><input type="checkbox" data-field="show_records" ${this._config.show_records !== false ? "checked" : ""}>Afficher les records</label>
        <label class="checkbox"><input type="checkbox" data-field="show_history" ${this._config.show_history !== false ? "checked" : ""}>Afficher l’historique</label>
      </div>`;

    this.querySelectorAll("[data-field]").forEach((element) => {
      element.addEventListener("change", (event) => this._changed(event));
    });
  }

  _changed(event) {
    const field = event.target.dataset.field;
    const config = { ...this._config };
    config[field] = event.target.type === "checkbox" ? event.target.checked : event.target.value.trim();
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }
}

if (!customElements.get("ha-intervals-icu-card-editor")) {
  customElements.define("ha-intervals-icu-card-editor", IntervalsIcuCardEditor);
}
