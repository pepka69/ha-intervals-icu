import "./card";
import "./statistics-card";

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

const isFrench = (navigator.language ?? "en").toLowerCase().startsWith("fr");

window.customCards = window.customCards ?? [];

if (!window.customCards.some((card) => card.type === "ha-intervals-icu-card")) {
  window.customCards.push({
    type: "ha-intervals-icu-card",
    name: "Intervals.icu Card",
    description: isFrench
      ? "Tableau de bord Fitness, Fatigue, Forme, records et entraînements Intervals.icu."
      : "Intervals.icu fitness, fatigue, form, records and workouts dashboard.",
    preview: true,
    documentationURL:
      "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
  });
}

if (
  !window.customCards.some(
    (card) => card.type === "ha-intervals-icu-statistics-card"
  )
) {
  window.customCards.push({
    type: "ha-intervals-icu-statistics-card",
    name: isFrench
      ? "Carte Statistiques Intervals.icu"
      : "Intervals.icu Statistics Card",
    description: isFrench
      ? "Statistiques avancées sur 7, 30, 90 ou 365 jours, records, tendances et analyses."
      : "Advanced 7, 30, 90 or 365-day statistics, records, trends and insights.",
    preview: true,
    documentationURL:
      "https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/lovelace-card.md"
  });
}

console.info(
  "%c HA Intervals.icu Card %c 2.0.0-beta10 ",
  "color:white;background:#1976d2;font-weight:700",
  "color:#1976d2;background:white"
);
