export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    unit_of_measurement?: string;
    history?: unknown[];
    change_7_days?: number;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  formatEntityState?: (state: HassEntity) => string;
}

export interface CardConfig {
  type: string;
  title?: string;
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
}
