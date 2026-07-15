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
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  formatEntityState?: (state: HassEntity) => string;
  locale?: { language?: string };
}

export interface CardConfig {
  type: string;
  title?: string;
  athlete_name?: string;
  fitness_entity?: string;
  fatigue_entity?: string;
  form_entity?: string;
  ftp_entity?: string;
  weekly_load_entity?: string;
  weekly_activities_entity?: string;
  show_records?: boolean;
  show_history?: boolean;
  show_workout?: boolean;
  show_last_activity?: boolean;
  show_sync_status?: boolean;
}
