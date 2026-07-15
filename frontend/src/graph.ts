import { html, svg, type TemplateResult } from "lit";

export interface GraphSeries {
  label: string;
  values: number[];
  className: string;
}

function linePoints(values: number[], width: number, height: number, min: number, range: number): string {
  return values.map((value, index) => {
    const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 22) - 11;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

export function historyChart(series: GraphSeries[]): TemplateResult {
  const available = series.filter((item) => item.values.length >= 2);
  if (available.length === 0) return html`<div class="empty">Historique indisponible</div>`;

  const width = 760;
  const height = 220;
  const allValues = available.flatMap((item) => item.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const padding = Math.max((max - min) * 0.12, 2);
  const graphMin = min - padding;
  const graphMax = max + padding;
  const range = graphMax - graphMin || 1;
  const grid = [0, 1, 2, 3, 4];

  return html`
    <div class="chart-legend">
      ${available.map((item) => html`<span><i class=${item.className}></i>${item.label}</span>`)}
    </div>
    <svg class="history-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Évolution Fitness Fatigue Forme">
      ${grid.map((step) => {
        const y = 10 + (step / 4) * (height - 20);
        return svg`<line class="grid-line" x1="0" y1=${y} x2=${width} y2=${y}></line>`;
      })}
      ${available.map((item) => svg`<polyline class="series ${item.className}" points=${linePoints(item.values, width, height, graphMin, range)}></polyline>`)}
    </svg>`;
}

export function gauge(value: number | null, className: string, min: number, max: number): TemplateResult {
  const bounded = value === null ? 0 : Math.min(max, Math.max(min, value));
  const ratio = (bounded - min) / (max - min || 1);
  const circumference = Math.PI * 52;
  const dash = Math.max(0, Math.min(circumference, ratio * circumference));
  return html`<svg class="gauge" viewBox="0 0 120 68" aria-hidden="true">
    ${svg`<path class="gauge-track" d="M 8 60 A 52 52 0 0 1 112 60"></path>
    <path class="gauge-value ${className}" d="M 8 60 A 52 52 0 0 1 112 60" stroke-dasharray="${dash} ${circumference}"></path>`}
  </svg>`;
}
