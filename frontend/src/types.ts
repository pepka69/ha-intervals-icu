export interface HassEntity {
  entity_id: string;
  state: string;
  last_changed?: string;
  last_updated?: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    unit_of_measurement?: string;
    history?: unknown[];
    change_7_days?: number;
    activity_name?: string;
    activity_date?: string;
    translation_key?: string;
  };
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  unique_id?: string;
  translation_key?: string;
}

export interface HassDevice {
  id: string;
  name?: string;
  name_by_user?: string | null;
  manufacturer?: string;
  model?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassEntityRegistryEntry>;
  devices?: Record<string, HassDevice>;
  formatEntityState?: (state: HassEntity) => string;
  locale?: { language?: string };
  callService?: (domain: string, service: string, data?: Record<string, unknown>) => Promise<unknown>;
}

export const HEALTH_METRIC_KEYS = [
  "weight",
  "body_fat",
  "muscle_mass",
  "bone_mass",
  "body_water",
  "visceral_fat",
  "bmi",
  "metabolic_age",
  "resting_hr",
  "hrv",
  "sleep",
  "vo2max",
  "blood_oxygen",
  "respiration_rate",
  "body_temperature",
  "stress",
  "daily_calories"
] as const;

export type HealthMetricKey = (typeof HEALTH_METRIC_KEYS)[number];

export interface HealthMetricConfig {
  show?: boolean;
  entity?: string;
}

export type HealthConfig = Partial<
  Record<HealthMetricKey, HealthMetricConfig>
>;

export interface CardConfig {
  type: string;
  title?: string;
  athlete_name?: string;
  device_id?: string;

  fitness_entity?: string;
  fatigue_entity?: string;
  form_entity?: string;
  ftp_entity?: string;
  weekly_load_entity?: string;
  weekly_activities_entity?: string;

  health?: HealthConfig;

  /* Backward compatibility with existing YAML. */
  weight_entity?: string;
  show_weight?: boolean;

  show_health?: boolean;
  show_records?: boolean;
  show_history?: boolean;
  show_workout?: boolean;
  show_last_activity?: boolean;
  show_sync_status?: boolean;
  show_refresh_button?: boolean;
  compact?: boolean;
}
