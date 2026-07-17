import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import {
  DEFAULT_KEYS,
  deviceName,
  findEntity,
  integrationDevices
} from "./entities";
import type {
  CardConfig,
  HealthMetricKey,
  HomeAssistant
} from "./types";


const INTEGRATION_VERSION = "1.3.0-beta1";
const PROJECT_URL = "https://github.com/pepka69/ha-intervals-icu";
const DOCUMENTATION_URL = `${PROJECT_URL}/blob/main/README.fr.md`;
const ISSUES_URL = `${PROJECT_URL}/issues`;
const FEATURE_REQUEST_URL = `${PROJECT_URL}/issues/new/choose`;
const SUPPORT_URL = "https://buymeacoffee.com/pep_ka";

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
  ["show_sync_status", "Afficher l’état de synchronisation"],
  ["show_refresh_button", "Afficher le bouton Actualiser"],
  ["compact", "Mode compact"]
];

const healthMetrics: Array<{
  key: HealthMetricKey;
  label: string;
}> = [
  { key: "weight", label: "Poids" },
  { key: "body_fat", label: "Graisse corporelle" },
  { key: "muscle_mass", label: "Masse musculaire" },
  { key: "bone_mass", label: "Masse osseuse" },
  { key: "body_water", label: "Eau corporelle" },
  { key: "visceral_fat", label: "Graisse viscérale" },
  { key: "bmi", label: "IMC" },
  { key: "metabolic_age", label: "Âge métabolique" },
  { key: "resting_hr", label: "Fréquence cardiaque au repos" },
  { key: "hrv", label: "HRV" },
  { key: "sleep", label: "Sommeil" },
  { key: "vo2max", label: "VO₂max" },
  { key: "blood_oxygen", label: "Saturation en oxygène" },
  { key: "respiration_rate", label: "Fréquence respiratoire" },
  { key: "body_temperature", label: "Température corporelle" },
  { key: "stress", label: "Stress" },
  { key: "daily_calories", label: "Calories quotidiennes" }
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

  private healthMetricConfig(key: HealthMetricKey) {
    const configured = this.config?.health?.[key];

    if (key === "weight") {
      return {
        show: configured?.show ?? this.config?.show_weight ?? true,
        entity: configured?.entity ?? this.config?.weight_entity ?? ""
      };
    }

    return {
      show: configured?.show ?? false,
      entity: configured?.entity ?? ""
    };
  }

  private changeHealthMetric(
    key: HealthMetricKey,
    propertyName: "show" | "entity",
    value: boolean | string
  ): void {
    const currentHealth = { ...(this.config?.health ?? {}) };
    const currentMetric = { ...(currentHealth[key] ?? {}) };

    if (propertyName === "entity" && value === "") {
      delete currentMetric.entity;
    } else {
      Object.assign(currentMetric, { [propertyName]: value });
    }

    currentHealth[key] = currentMetric;

    const config: CardConfig = {
      ...this.config!,
      health: currentHealth
    };

    if (key === "weight") {
      delete config.weight_entity;
      delete config.show_weight;
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
                      ${this.hass!.states[id].attributes.friendly_name ?? id}
                    </option>
                  `
                )}
              </select>
            </label>
          `
        )}

        <div class="editor-group">
          <h3>Santé et composition corporelle</h3>
          <p class="editor-help">
            Active uniquement les données que tu souhaites afficher, puis
            sélectionne n’importe quel capteur Home Assistant. Sans capteur
            manuel, les données Intervals.icu disponibles sont utilisées.
          </p>

          ${healthMetrics.map(({ key, label }) => {
            const metric = this.healthMetricConfig(key);

            return html`
              <div class="health-editor-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${metric.show}
                    @change=${(event: Event) =>
                      this.changeHealthMetric(
                        key,
                        "show",
                        (event.target as HTMLInputElement).checked
                      )}
                  />
                  Afficher ${label}
                </label>

                <label>
                  Capteur — ${label}
                  <select
                    .value=${metric.entity}
                    @change=${(event: Event) =>
                      this.changeHealthMetric(
                        key,
                        "entity",
                        (event.target as HTMLSelectElement).value
                      )}
                  >
                    <option value="">
                      Détection automatique Intervals.icu
                    </option>
                    ${allSensorIds.map(
                      (id) => html`
                        <option value=${id}>
                          ${this.hass!.states[id].attributes.friendly_name ??
                          id}
                        </option>
                      `
                    )}
                  </select>
                </label>
              </div>
            `;
          })}
        </div>

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

        <details class="about-panel">
          <summary>
            <span class="about-summary">
              <ha-icon icon="mdi:information-outline"></ha-icon>
              À propos
            </span>
            <span class="about-version">v${INTEGRATION_VERSION}</span>
          </summary>

          <div class="about-content">
            <div class="about-heading">
              <ha-icon icon="mdi:chart-timeline-variant-shimmer"></ha-icon>
              <div>
                <strong>Intervals.icu pour Home Assistant</strong>
                <span>Développé par Alexandre Perez</span>
              </div>
            </div>

            <div class="about-links">
              <a href=${DOCUMENTATION_URL} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
                Documentation
              </a>
              <a href=${ISSUES_URL} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:bug-outline"></ha-icon>
                Signaler un bug
              </a>
              <a href=${FEATURE_REQUEST_URL} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                Proposer une fonctionnalité
              </a>
              <a href=${PROJECT_URL} target="_blank" rel="noopener noreferrer">
                <ha-icon icon="mdi:github"></ha-icon>
                Dépôt GitHub
              </a>
            </div>

            <a
              class="beer-link"
              href=${SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ha-icon icon="mdi:beer"></ha-icon>
              <span>
                <strong>Offrez-moi une bière</strong>
                <small>Soutenir discrètement le développement bénévole</small>
              </span>
              <ha-icon icon="mdi:open-in-new"></ha-icon>
            </a>
          </div>
        </details>
      </div>
    `;
  }
}
