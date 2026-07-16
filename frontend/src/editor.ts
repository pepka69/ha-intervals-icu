import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import {
  DEFAULT_KEYS,
  deviceName,
  findEntity,
  integrationDevices
} from "./entities";
import type { CardConfig, HomeAssistant } from "./types";

const fields: Array<[keyof CardConfig, string, string]> = [
  ["fitness_entity", "Fitness", DEFAULT_KEYS.fitness],
  ["fatigue_entity", "Fatigue", DEFAULT_KEYS.fatigue],
  ["form_entity", "Forme", DEFAULT_KEYS.form],
  ["ftp_entity", "FTP", DEFAULT_KEYS.ftp],
  ["weekly_load_entity", "Charge 7 jours", DEFAULT_KEYS.weeklyLoad],
  [
    "weekly_activities_entity",
    "Activités 7 jours",
    DEFAULT_KEYS.weeklyActivities
  ]
];

const entityOverrideFields: Array<keyof CardConfig> = fields.map(
  ([field]) => field
);

const toggles: Array<[keyof CardConfig, string]> = [
  ["show_workout", "Afficher l’entraînement du jour"],
  ["show_last_activity", "Afficher la dernière activité"],
  ["show_records", "Afficher les records"],
  ["show_history", "Afficher l’historique"],
  ["show_health", "Afficher le bloc Santé"],
  ["show_weight", "Afficher le poids"],
  ["show_sync_status", "Afficher l’état de synchronisation"]
];

@customElement("ha-intervals-icu-card-editor")
export class IntervalsIcuCardEditor extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;

  public setConfig(config: CardConfig): void {
    this.config = { ...config };
  }

  private emitConfig(config: CardConfig): void {
    this.config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true
      })
    );
  }

  private change(
    field: keyof CardConfig,
    value: string | boolean
  ): void {
    const config = { ...this.config! };

    if (value === "") {
      delete config[field];
    } else {
      Object.assign(config, { [field]: value });
    }

    this.emitConfig(config);
  }

  private changeDevice(deviceId: string): void {
    const config = {
      ...this.config!,
      device_id: deviceId || undefined
    };

    for (const field of entityOverrideFields) {
      delete config[field];
    }

    this.emitConfig(config);
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const devices = integrationDevices(this.hass);
    const selectedDeviceId =
      this.config.device_id ??
      (devices.length === 1 ? devices[0].id : "");

    const athleteSensorIds = Object.keys(this.hass.states)
      .filter(
        (id) =>
          id.startsWith("sensor.") &&
          (!selectedDeviceId ||
            this.hass!.entities?.[id]?.device_id === selectedDeviceId)
      )
      .sort();

    const allSensorIds = Object.keys(this.hass.states)
      .filter((id) => id.startsWith("sensor."))
      .sort();

    return html`
      <div class="editor">
        <label>
          Athlète / appareil
          <select
            .value=${selectedDeviceId}
            @change=${(event: Event) =>
              this.changeDevice(
                (event.target as HTMLSelectElement).value
              )}
          >
            <option value="">Sélectionner un athlète</option>
            ${devices.map(
              (device) => html`
                <option value=${device.id}>
                  ${deviceName(device)}
                </option>
              `
            )}
          </select>
        </label>

        ${devices.length === 0
          ? html`
              <p>
                Aucun appareil Intervals.icu détecté. Recharge Home
                Assistant après avoir configuré l’intégration.
              </p>
            `
          : ""}

        <label>
          Titre
          <input
            .value=${this.config.title ?? "Intervals.icu"}
            @change=${(event: Event) =>
              this.change(
                "title",
                (event.target as HTMLInputElement).value
              )}
          />
        </label>

        <label>
          Nom affiché
          <input
            .value=${this.config.athlete_name ?? ""}
            placeholder="Nom de l’appareil par défaut"
            @change=${(event: Event) =>
              this.change(
                "athlete_name",
                (event.target as HTMLInputElement).value
              )}
          />
        </label>

        ${fields.map(
          ([field, label, key]) => html`
            <label>
              ${label}
              <select
                .value=${String(
                  this.config![field] ??
                    findEntity(
                      this.hass!,
                      undefined,
                      key,
                      selectedDeviceId
                    ) ??
                    ""
                )}
                @change=${(event: Event) =>
                  this.change(
                    field,
                    (event.target as HTMLSelectElement).value
                  )}
              >
                <option value="">
                  Détection automatique pour cet athlète
                </option>
                ${athleteSensorIds.map(
                  (id) => html`
                    <option value=${id}>
                      ${this.hass!.states[id].attributes.friendly_name ??
                      id}
                    </option>
                  `
                )}
              </select>
            </label>
          `
        )}

        <label>
          Capteur de poids personnalisé
          <select
            .value=${this.config.weight_entity ?? ""}
            @change=${(event: Event) =>
              this.change(
                "weight_entity",
                (event.target as HTMLSelectElement).value
              )}
          >
            <option value="">
              Détection automatique Intervals.icu
            </option>
            ${allSensorIds.map(
              (id) => html`
                <option value=${id}>
                  ${this.hass!.states[id].attributes.friendly_name ?? id}
                </option>
              `
            )}
          </select>
        </label>

        ${toggles.map(
          ([field, label]) => html`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this.config![field] !== false}
                @change=${(event: Event) =>
                  this.change(
                    field,
                    (event.target as HTMLInputElement).checked
                  )}
              />
              ${label}
            </label>
          `
        )}
      </div>
    `;
  }
}
