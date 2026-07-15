import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { DEFAULT_KEYS, formatState, getState, historyValues, numericValue } from "./entities";
import { sparkline } from "./graph";
import type { CardConfig, HassEntity, HomeAssistant } from "./types";
import "./editor";

@customElement("ha-intervals-icu-card")
export class HaIntervalsIcuCard extends LitElement {
  static styles = cardStyles;
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;
  static getConfigElement() { return document.createElement("ha-intervals-icu-card-editor"); }
  static getStubConfig(): Omit<CardConfig,"type"> { return { title:"Intervals.icu", show_records:true, show_history:true, show_workout:true, show_last_activity:true }; }
  public setConfig(config: CardConfig): void { if (!config) throw new Error("Configuration manquante"); this.config = { show_records:true, show_history:true, show_workout:true, show_last_activity:true, ...config }; }
  public getCardSize(): number { return 9; }
  public getGridOptions() { return { columns:12, min_columns:6, rows:8, min_rows:5 }; }
  private state(field: keyof CardConfig, key: string) { return this.hass ? getState(this.hass, this.config?.[field] as string | undefined, key) : undefined; }
  private status(metric:string,state?:HassEntity){const v=numericValue(state);if(v===null)return "";if(metric==="form")return v<-20?"danger":v<-10?"warning":"good";if(metric==="fatigue")return v>=80?"danger":v>=60?"warning":"good";return "good"}
  private metric(label:string,key:string,state?:HassEntity){return html`<div class="metric"><div class="metric-head"><span class="label">${label}</span><span class="dot ${this.status(key,state)}"></span></div><div class="value">${formatState(this.hass!,state)}</div><div class="detail">7 j : ${state?.attributes.change_7_days ?? "—"}</div></div>`}
  protected render() {
    if(!this.hass||!this.config)return html``;
    const hass = this.hass;
    const fitness=this.state("fitness_entity",DEFAULT_KEYS.fitness), fatigue=this.state("fatigue_entity",DEFAULT_KEYS.fatigue), form=this.state("form_entity",DEFAULT_KEYS.form);
    const ftp=this.state("ftp_entity",DEFAULT_KEYS.ftp), load=this.state("weekly_load_entity",DEFAULT_KEYS.weeklyLoad), acts=this.state("weekly_activities_entity",DEFAULT_KEYS.weeklyActivities);
    const workout=getState(hass,undefined,DEFAULT_KEYS.plannedTodayName), workoutDuration=getState(hass,undefined,DEFAULT_KEYS.plannedTodayDuration), workoutLoad=getState(hass,undefined,DEFAULT_KEYS.plannedTodayLoad);
    const last=getState(hass,undefined,DEFAULT_KEYS.lastActivityName), lastDistance=getState(hass,undefined,DEFAULT_KEYS.lastActivityDistance);
    return html`<ha-card><div class="card"><div class="header"><div class="logo"><ha-icon icon="mdi:bike-fast"></ha-icon></div><div><h2>${this.config.title}</h2><div class="subtitle">Intervals.icu</div></div></div>
      <div class="metrics">${this.metric("Fitness","fitness",fitness)}${this.metric("Fatigue","fatigue",fatigue)}${this.metric("Forme","form",form)}</div>
      <div class="summary"><div><span class="label">FTP</span><strong>${formatState(hass,ftp)}</strong></div><div><span class="label">Charge 7 j</span><strong>${formatState(hass,load)}</strong></div><div><span class="label">Activités 7 j</span><strong>${formatState(hass,acts)}</strong></div></div>
      ${this.config.show_workout!==false?html`<section class="section"><div class="section-title"><ha-icon icon="mdi:calendar-today"></ha-icon>Aujourd’hui</div><div class="panel"><strong>${formatState(hass,workout,"Aucun entraînement planifié")}</strong><div class="detail">${formatState(hass,workoutDuration)} • Charge ${formatState(hass,workoutLoad)}</div></div></section>`:""}
      ${this.config.show_last_activity!==false?html`<section class="section"><div class="section-title"><ha-icon icon="mdi:history"></ha-icon>Dernière activité</div><div class="panel"><strong>${formatState(hass,last)}</strong><div class="detail">${formatState(hass,lastDistance)}</div></div></section>`:""}
      ${this.config.show_records!==false?html`<section class="section"><div class="section-title"><ha-icon icon="mdi:trophy-outline"></ha-icon>Records personnels</div><div class="records">${[["Distance",DEFAULT_KEYS.recordDistance],["Dénivelé",DEFAULT_KEYS.recordElevation],["Puissance max.",DEFAULT_KEYS.recordMaxPower]].map(([label,key])=>html`<div class="record"><span class="label">${label}</span><strong>${formatState(hass,getState(hass,undefined,key))}</strong></div>`)}</div></section>`:""}
      ${this.config.show_history!==false?html`<section class="section"><div class="section-title"><ha-icon icon="mdi:chart-line"></ha-icon>Historique fitness</div><div class="graph">${sparkline(historyValues(fitness))}</div></section>`:""}
    </div></ha-card>`;
  }
}
