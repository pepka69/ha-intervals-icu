import { escapeHtml } from "./utils.js";

const SERIES = [
  ["fitness", "Fitness", "var(--primary-color)"],
  ["fatigue", "Fatigue", "var(--error-color, #db4437)"],
  ["form", "Forme", "var(--success-color, #43a047)"],
];

function polyline(points, width, height, min, max) {
  if (points.length < 2) return "";
  const range = max - min || 1;
  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point.value - min) / range) * (height - 12) - 6;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function historyGraph(seriesByKey, width = 420, height = 120) {
  const available = SERIES.map(([key, label, color]) => ({
    key,
    label,
    color,
    points: seriesByKey[key] ?? [],
  })).filter((series) => series.points.length >= 2);

  if (!available.length) {
    return `<div class="graph-empty">Historique indisponible</div>`;
  }

  const values = available.flatMap((series) => series.points.map((point) => point.value));
  const min = Math.min(...values);
  const max = Math.max(...values);

  const lines = available
    .map(
      (series) =>
        `<polyline class="graph-line" style="stroke:${series.color}" points="${polyline(series.points, width, height, min, max)}"></polyline>`,
    )
    .join("");

  const legend = available
    .map(
      (series) =>
        `<span class="legend-item"><span class="legend-dot" style="background:${series.color}"></span>${escapeHtml(series.label)}</span>`,
    )
    .join("");

  return `<div class="graph-legend">${legend}</div><svg class="history-graph" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="Historique fitness fatigue forme"><line class="zero-line" x1="0" x2="${width}" y1="${height / 2}" y2="${height / 2}"></line>${lines}</svg>`;
}
