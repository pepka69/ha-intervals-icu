import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { DEFAULT_KEYS, findEntity } from "./entities";
import type { CardConfig, HomeAssistant } from "./types";

const fields: Array<[keyof CardConfig, string, string]> = [
  ["fitness_entity", "Fitness", DEFAULT_KEYS.fitness],
  ["fatigue_entity", "Fatigue", DEFAULT_KEYS.fatigue],
  ["form_entity", "Forme", DEFAULT_KEYS.form],
  ["ftp_entity", "FTP", DEFAULT_KEYS.ftp],
  ["weekly_load_entity", "Charge 7 jours", DEFAULT_KEYS.weeklyLoad],
  ["weekly_activities_entity", "Activités 7 jours", DEFAULT_KEYS.weeklyActivities]
];

const toggles: Array<[keyof CardConfig, string]> = [
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_sync_status", "Afficher l’état de synchronisation"]
];

@customElement("ha-intervals-icu-card-editor")
export class IntervalsIcuCardEditor extends LitElement {
  static styles = cardStyles;
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;

  public setConfig(config: CardConfig): void { this.config = { ...config }; }

  private change(field: keyof CardConfig, value: string | boolean): void {
    this.config = { ...this.config!, [field]: value };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config }, bubbles: true, composed: true }));
  }

  protected render() {
    if (!this.config || !this.hass) return html``;
    const sensorIds = Object.keys(this.hass.states).filter((id) => id.startsWith("sensor.")).sort();
    return html`<div class="editor">
      <label>Titre<input .value=${this.config.title ?? "Intervals.icu"} @change=${(event: Event) => this.change("title", (event.target as HTMLInputElement).value)}></label>
      <label>Nom de l’athlète<input .value=${this.config.athlete_name ?? ""} placeholder="Facultatif" @change=${(event: Event) => this.change("athlete_name", (event.target as HTMLInputElement).value)}></label>
      ${fields.map(([field, label, key]) => html`<label>${label}<select .value=${String(this.config![field] ?? findEntity(this.hass!, undefined, key) ?? "")} @change=${(event: Event) => this.change(field, (event.target as HTMLSelectElement).value)}><option value="">Détection automatique</option>${sensorIds.map((id) => html`<option value=${id}>${this.hass!.states[id].attributes.friendly_name ?? id}</option>`)}</select></label>`)}
      ${toggles.map(([field, label]) => html`<label class="check"><input type="checkbox" .checked=${this.config![field] !== false} @change=${(event: Event) => this.change(field, (event.target as HTMLInputElement).checked)}>${label}</label>`)}
    </div>`;
  }
}
