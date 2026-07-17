import "./card";
import "./statistics-card";

declare global { interface Window { customCards?: Array<Record<string, unknown>>; } }
window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-intervals-icu-card")) {
  window.customCards.push({
    type: "ha-intervals-icu-card",
    name: "Intervals.icu Card",
    description: "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu.",
    preview: true,
    documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
  });
}
if (!window.customCards.some((card) => card.type === "ha-intervals-icu-statistics-card")) {
  window.customCards.push({
    type: "ha-intervals-icu-statistics-card",
    name: "Intervals.icu Statistics Card",
    description: "Advanced 7/30/90/365-day statistics, records, trends and insights.",
    preview: true,
    documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
  });
}
console.info("%c HA Intervals.icu Card %c 1.3.0-beta11 ", "color:white;background:#1976d2;font-weight:700", "color:#1976d2;background:white");
