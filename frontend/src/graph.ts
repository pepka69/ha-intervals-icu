import { html, svg, type TemplateResult } from "lit";

export function sparkline(values: number[]): TemplateResult {
  if (values.length < 2) return html`<div class="empty">Historique indisponible</div>`;
  const width = 320;
  const height = 76;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 12) - 6;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return html`<svg class="spark" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${svg`<polyline points=${points}></polyline>`}</svg>`;
}
