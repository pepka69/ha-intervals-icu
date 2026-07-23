import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getState } from "./entities";
import type { HomeAssistant } from "./types";
import { t, translateDynamicText, translateSportName, translateValue } from "./i18n";

type Period = "7_days" | "30_days" | "90_days" | "365_days";
type StatsConfig = { type: string; title?: string; entity?: string; device_id?: string; default_period?: Period };
type Dict = Record<string, any>;

@customElement("ha-intervals-icu-statistics-card")
export class HaIntervalsIcuStatisticsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: StatsConfig;
  @state() private period: Period = "30_days";
  @state() private section = "overview";

  static getStubConfig(): Omit<StatsConfig, "type"> {
    return { title: "Intervals.icu Statistics", default_period: "30_days" };
  }

  public setConfig(config: StatsConfig): void {
    this.config = { title: "Intervals.icu Statistics", default_period: "30_days", ...config };
    this.period = this.config.default_period ?? "30_days";
  }

  public getCardSize(): number { return 12; }
  public getGridOptions() { return { columns: 12, min_columns: 6, rows: 10, min_rows: 6 }; }

  private attrs(): Dict {
    if (!this.hass) return {};
    const entity = getState(this.hass, this.config?.entity, "statistics_dashboard", this.config?.device_id);
    return (entity?.attributes ?? {}) as Dict;
  }

  private number(value: unknown, digits = 1): string {
    const n = Number(value);
    return Number.isFinite(n) ? n.toLocaleString(this.hass?.locale?.language, { maximumFractionDigits: digits }) : "—";
  }

  private change(value: unknown): unknown {
    const n = Number(value);
    if (!Number.isFinite(n)) return html`<span class="change neutral">—</span>`;
    const cls = n > 3 ? "up" : n < -3 ? "down" : "neutral";
    return html`<span class="change ${cls}">${n > 0 ? "+" : ""}${n.toFixed(1)}%</span>`;
  }

  private tile(icon: string, label: string, value: unknown, unit = "", change?: unknown) {
    return html`<article class="tile"><ha-icon icon=${icon}></ha-icon><div><span>${label}</span><strong>${this.number(value)}${unit}</strong>${change !== undefined ? this.change(change) : nothing}</div></article>`;
  }

  private label(key: string): string { return t(this.hass, key); }

  private name(value: string): string { return translateDynamicText(this.hass, value.replaceAll("_", " ")); }

  private overview(data: Dict) {
    const block = data.periods?.[this.period] ?? {};
    const current = block.current ?? {};
    const comparison = block.comparison ?? {};
    return html`
      <div class="tiles">
        ${this.tile("mdi:calendar-check", this.label("activities"), current.activities, "", comparison.activities_change_percent)}
        ${this.tile("mdi:clock-outline", this.label("duration"), current.duration_hours, " h", comparison.duration_hours_change_percent)}
        ${this.tile("mdi:map-marker-distance", this.label("distance"), current.distance_km, " km", comparison.distance_km_change_percent)}
        ${this.tile("mdi:chart-bell-curve", this.label("load"), current.load, "", comparison.load_change_percent)}
        ${this.tile("mdi:image-filter-hdr", this.label("elevation"), current.elevation_m, " m", comparison.elevation_m_change_percent)}
        ${this.tile("mdi:fire", this.label("calories"), current.calories, " kcal", comparison.calories_change_percent)}
        ${this.tile("mdi:heart-pulse", "HRSS", current.hrss, "", comparison.hrss_change_percent)}
        ${this.tile("mdi:chart-timeline-variant", "TRIMP", current.trimp, "", comparison.trimp_change_percent)}
      </div>
      <div class="insights">
        ${(data.insights ?? []).map((item: Dict) => html`<div class="insight ${item.type ?? "info"}"><ha-icon icon=${item.type === "warning" ? "mdi:alert-circle-outline" : "mdi:lightbulb-on-outline"}></ha-icon><div><strong>${translateDynamicText(this.hass, item.title)}</strong><span>${translateDynamicText(this.hass, item.message)}</span></div></div>`)}
      </div>`;
  }

  private sports(data: Dict) {
    const sports = data.sports?.[this.period] ?? {};
    return html`<div class="table">${Object.entries(sports).map(([sport, row]: [string, any]) => html`
      <div class="row"><strong>${translateSportName(this.hass, sport)}</strong><span>${this.number(row.activities, 0)} act.</span><span>${this.number(row.duration_hours)} h</span><span>${this.number(row.distance_km)} km</span><span>${t(this.hass, "load")} ${this.number(row.load)}</span></div>`)}
      ${Object.keys(sports).length ? nothing : html`<div class="empty">${t(this.hass, "no_sport_data")}</div>`}
    </div>`;
  }

  private records(data: Dict) {
    const period = data.period_records ?? {};
    const sports = data.records_by_sport ?? {};
    return html`
      <div class="record-grid">
        ${Object.entries(period).map(([name, row]: [string, any]) => row ? html`<article class="record"><span>${this.name(name)}</span><strong>${row.period}</strong><small>${this.number(row.load)} ${t(this.hass, "load").toLowerCase()} · ${this.number(row.duration_hours)} h</small></article>` : nothing)}
      </div>
      ${Object.entries(sports).map(([sport, rows]: [string, any]) => html`<details><summary>${translateSportName(this.hass, sport)}</summary><div class="record-list">${Object.entries(rows).map(([name, record]: [string, any]) => html`<div><span>${this.name(name)}</span><strong>${this.number(record.value)}</strong><small>${record.activity?.name ?? ""}</small></div>`)}</div></details>`)}
    `;
  }

  private trends(data: Dict) {
    const trends = data.trends ?? {};
    return html`<div class="trend-grid">${Object.entries(trends).map(([name, metric]: [string, any]) => html`
      <article class="trend"><span>${this.name(name)}</span><strong>${this.number(metric.latest)}</strong><div class="trend-changes"><small>7d ${this.number(metric.change_7_days)}</small><small>30d ${this.number(metric.change_30_days)}</small><small>90d ${this.number(metric.change_90_days)}</small><small>365d ${this.number(metric.change_365_days)}</small></div></article>`)}
    </div>`;
  }

  private quality(data: Dict) {
    const quality = data.data_quality ?? {};
    const coverage = quality.coverage ?? {};
    return html`<div class="quality-head"><strong>${this.number(quality.completeness_percent)}%</strong><span>${t(this.hass, "completeness")} · ${this.number(quality.field_count, 0)} ${t(this.hass, "api_fields")}</span></div>
      <div class="coverage">${Object.entries(coverage).map(([name, item]: [string, any]) => html`<div><span>${this.name(name)}</span><progress max="100" value=${item.percent ?? 0}></progress><strong>${this.number(item.percent)}%</strong></div>`)}</div>`;
  }

  protected render() {
    if (!this.hass || !this.config) return nothing;
    const data = this.attrs();
    const content = this.section === "sports" ? this.sports(data) : this.section === "records" ? this.records(data) : this.section === "trends" ? this.trends(data) : this.section === "quality" ? this.quality(data) : this.overview(data);
    return html`<ha-card><div class="shell"><header><div><ha-icon icon="mdi:chart-box-outline"></ha-icon><div><h2>${this.config.title}</h2><span>${t(this.hass, "statistics_trends")}</span></div></div><nav>${(["7_days","30_days","90_days","365_days"] as Period[]).map(p => html`<button class=${this.period === p ? "active" : ""} @click=${() => this.period = p}>${p.replace("_days", "d")}</button>`)}</nav></header>
      <div class="tabs">${["overview","sports","records","trends","quality"].map(tab => html`<button class=${this.section === tab ? "active" : ""} @click=${() => this.section = tab}>${t(this.hass, tab)}</button>`)}</div>
      <section>${content}</section></div></ha-card>`;
  }

  static styles = css`
    :host{display:block}*{box-sizing:border-box}ha-card{border-radius:24px;overflow:hidden;background:linear-gradient(145deg,color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 95%,#10233f),color-mix(in srgb,var(--ha-card-background,var(--card-background-color)) 88%,#19385f))}.shell{padding:20px}header{display:flex;justify-content:space-between;gap:16px;align-items:center}header>div{display:flex;gap:12px;align-items:center}header ha-icon{--mdc-icon-size:32px;color:var(--primary-color)}h2{margin:0;font-size:1.3rem}header span{color:var(--secondary-text-color);font-size:.82rem}nav,.tabs{display:flex;gap:6px;flex-wrap:wrap}button{border:0;border-radius:999px;padding:8px 11px;background:color-mix(in srgb,var(--secondary-background-color) 80%,transparent);color:var(--primary-text-color);cursor:pointer;text-transform:capitalize}button.active{background:var(--primary-color);color:var(--text-primary-color,#fff)}.tabs{margin:18px 0 14px;border-bottom:1px solid var(--divider-color);padding-bottom:10px}.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.tile{display:flex;gap:10px;align-items:center;padding:14px;border-radius:16px;background:color-mix(in srgb,var(--secondary-background-color) 75%,transparent);border:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent)}.tile>ha-icon{color:var(--primary-color)}.tile div{display:grid;gap:2px}.tile span,.tile small{font-size:.72rem;color:var(--secondary-text-color)}.tile strong{font-size:1.12rem}.change{width:max-content;padding:2px 6px;border-radius:999px}.change.up{color:#4caf50;background:rgba(76,175,80,.12)}.change.down{color:#ef5350;background:rgba(239,83,80,.12)}.insights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}.insight{display:flex;gap:9px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--secondary-background-color) 68%,transparent)}.insight.warning ha-icon{color:#ff9800}.insight div{display:grid}.insight span{font-size:.78rem;color:var(--secondary-text-color)}.table,.record-list{display:grid;gap:8px}.row{display:grid;grid-template-columns:2fr repeat(4,1fr);gap:8px;padding:12px;border-radius:13px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.row span{color:var(--secondary-text-color)}.record-grid,.trend-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.record,.trend{display:grid;gap:5px;padding:14px;border-radius:15px;background:color-mix(in srgb,var(--secondary-background-color) 72%,transparent)}.record span,.trend span{text-transform:capitalize;color:var(--secondary-text-color);font-size:.76rem}.record small{color:var(--secondary-text-color)}details{margin-top:9px;padding:10px;border:1px solid var(--divider-color);border-radius:12px}summary{font-weight:700;cursor:pointer}.record-list{margin-top:10px}.record-list>div{display:grid;grid-template-columns:2fr 1fr 2fr;gap:8px;padding:7px 0;border-bottom:1px solid var(--divider-color)}.trend-changes{display:grid;grid-template-columns:1fr 1fr;gap:4px;color:var(--secondary-text-color)}.quality-head{display:flex;gap:14px;align-items:center;margin-bottom:14px}.quality-head strong{font-size:2rem;color:var(--primary-color)}.coverage{display:grid;gap:10px}.coverage>div{display:grid;grid-template-columns:160px 1fr 55px;gap:10px;align-items:center;text-transform:capitalize}progress{width:100%;accent-color:var(--primary-color)}.empty{text-align:center;padding:30px;color:var(--secondary-text-color)}
    @media(max-width:850px){.tiles,.record-grid,.trend-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.row{grid-template-columns:1fr 1fr}.insights{grid-template-columns:1fr}}
    @media(max-width:520px){.shell{padding:14px}header{align-items:flex-start;flex-direction:column}.tiles,.record-grid,.trend-grid{grid-template-columns:1fr}.coverage>div{grid-template-columns:110px 1fr 48px}}
  `;
}
