import "./card";

declare global { interface Window { customCards?: Array<Record<string, unknown>>; } }
window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-intervals-icu-card")) {
  window.customCards.push({
    type: "ha-intervals-icu-card",
    name: "Intervals.icu Card",
    description: "Fitness, fatigue, forme, entraînements et records Intervals.icu.",
    preview: true,
    documentationURL: "https://github.com/pepka69/ha-intervals-icu/blob/main/docs/lovelace-card.md"
  });
}
console.info("%c HA Intervals.icu Card %c 1.1.0-beta1 ", "color:white;background:#1976d2;font-weight:700", "color:#1976d2;background:white");
