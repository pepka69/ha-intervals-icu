import type { HomeAssistant } from "./types";

const FR: Record<string,string> = {
  refresh:"Actualiser", atlas_readiness:"Préparation Atlas", atlas_coach:"Atlas Coach", recovery:"Récupération",
  unavailable:"Indisponible", unknown_status:"Statut inconnu", no_recommendation:"Aucune recommandation",
  fitness:"CONDITION", fatigue:"FATIGUE", form:"FORME", load_7d:"Charge 7 j", activities_7d:"Activités 7 j",
  evolution:"Évolution", health:"Santé et composition corporelle", today:"Aujourd’hui", no_workout:"Aucun entraînement planifié",
  workout:"Entraînement", load:"Charge", records:"Records", distance:"Distance", elevation:"Dénivelé", max_power:"Puissance max",
  last_activity:"Dernière activité", activity:"Activité", overview:"Overview", sports:"Sports", trends:"Tendances",
  quality:"Quality", statistics_trends:"Statistiques et tendances", activities:"Activités", duration:"Durée", calories:"Calories",
  no_sport_data:"Aucune donnée sportive", completeness:"Complétude des données d’activité", api_fields:"champs API",
  training_load:"Charge d’entraînement", sport_mix:"Sport mix", previous_period:"période précédente",
  higher:"supérieure", lower:"inférieure", stable:"stable", represents:"représente", training_time:"du temps d’entraînement",
  last_30_days:"sur les 30 derniers jours", sync_unknown:"Synchronisation inconnue", sync_now:"Synchronisé à l’instant",
  sync_minutes:"Synchronisé il y a {value} min", sync_hours:"Synchronisé il y a {value} h", sync_days:"Synchronisé il y a {value} j",
  weight:"Poids", body_fat:"Graisse corporelle", muscle_mass:"Masse musculaire", bone_mass:"Masse osseuse",
  body_water:"Eau corporelle", visceral_fat:"Graisse viscérale", bmi:"IMC", metabolic_age:"Âge métabolique",
  resting_hr:"FC au repos", hrv:"HRV", sleep:"Sommeil", vo2max:"VO₂max", blood_oxygen:"Oxygène sanguin",
  respiration_rate:"Respiration", body_temperature:"Température", stress:"Stress", daily_calories:"Calories quotidiennes"
};
const EN: Record<string,string> = {
  refresh:"Refresh", atlas_readiness:"Atlas Readiness", atlas_coach:"Atlas Coach", recovery:"Recovery", unavailable:"Unavailable",
  unknown_status:"Unknown status", no_recommendation:"No recommendation", fitness:"FITNESS", fatigue:"FATIGUE", form:"FORM",
  load_7d:"7-day load", activities_7d:"7-day activities", evolution:"Evolution", health:"Health and body composition", today:"Today",
  no_workout:"No workout planned", workout:"Workout", load:"Load", records:"Records", distance:"Distance", elevation:"Elevation",
  max_power:"Max power", last_activity:"Last activity", activity:"Activity", overview:"Overview", sports:"Sports", trends:"Tendances",
  quality:"Quality", statistics_trends:"Statistics & trends", activities:"Activities", duration:"Duration", calories:"Calories",
  no_sport_data:"No sport data", completeness:"Activity data completeness", api_fields:"API fields", training_load:"Training load",
  sport_mix:"Sport mix", previous_period:"previous period", higher:"higher", lower:"lower", stable:"stable", represents:"represents",
  training_time:"of training time", last_30_days:"over the last 30 days", sync_unknown:"Sync unknown", sync_now:"Synced just now",
  sync_minutes:"Synced {value} min ago", sync_hours:"Synced {value} h ago", sync_days:"Synced {value} d ago",
  weight:"Weight", body_fat:"Body fat", muscle_mass:"Muscle mass", bone_mass:"Bone mass", body_water:"Body water",
  visceral_fat:"Visceral fat", bmi:"BMI", metabolic_age:"Metabolic age", resting_hr:"Resting HR", hrv:"HRV", sleep:"Sleep",
  vo2max:"VO₂max", blood_oxygen:"Blood oxygen", respiration_rate:"Respiration", body_temperature:"Temperature", stress:"Stress",
  daily_calories:"Daily calories"
};

export function locale(hass?: HomeAssistant): "fr"|"en" {
  return (hass?.locale?.language ?? "en").toLowerCase().startsWith("fr") ? "fr" : "en";
}
export function t(hass: HomeAssistant|undefined, key: string, vars: Record<string,string|number> = {}): string {
  let text = (locale(hass)==="fr" ? FR : EN)[key] ?? EN[key] ?? key;
  for (const [k,v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, String(v));
  return text;
}

const VALUES_FR: Record<string,string> = {
  moderate:"Modérée", low:"Faible", very_low:"Très faible", good:"Bonne", high:"Élevée", excellent:"Excellente",
  productive_load:"Charge productive", productive:"Productive", maintaining:"Maintien", overreaching:"Surcharge",
  detraining:"Désentraînement", recovering:"Récupération", recovery:"Récupération", optimal:"Optimale", balanced:"Équilibrée",
  easy:"Facile", easy_session:"Séance facile", rest_day:"Jour de repos", endurance:"Endurance", tempo:"Tempo",
  threshold:"Seuil", sweetspot:"Sweet spot", sweet_spot:"Sweet spot", vo2max:"VO₂max", anaerobic:"Anaérobie", race:"Course"
};
export function translateValue(hass: HomeAssistant|undefined, value: unknown): string {
  const text = String(value ?? "").trim();
  if (!text || locale(hass)!=="fr") return text;
  const key = text.toLowerCase().replace(/[\s-]+/g,"_");
  return VALUES_FR[key] ?? text.replace(/_/g," ").replace(/^./, c=>c.toUpperCase());
}

export function translateDynamicText(hass: HomeAssistant|undefined, value: unknown): string {
  const text = String(value ?? "").trim();
  if (!text || locale(hass)!=="fr") return text;
  let m = text.match(/^(\d+)-day load\s+([\d.,]+)%\s+(lower|higher) than the previous period\.?$/i);
  if (m) return `Charge sur ${m[1]} jours ${m[2]} % ${m[3].toLowerCase()==="lower" ? "inférieure" : "supérieure"} à la période précédente`;
  m = text.match(/^(.+?) represents\s+([\d.,]+)% of training time over the last\s+(\d+) days\.?$/i);
  if (m) return `${translateSportName(hass,m[1])} représente ${m[2]} % du temps d’entraînement sur les ${m[3]} derniers jours`;
  return translateValue(hass, text);
}

const SPORTS_FR: Record<string,string> = {
  ride:"Vélo", virtualride:"Vélo virtuel", mountainbikeride:"VTT", gravelride:"Gravel", ebikeride:"Vélo électrique",
  run:"Course à pied", virtualrun:"Course virtuelle", trailrun:"Trail", walk:"Marche", hike:"Randonnée", swim:"Natation",
  openwaterswim:"Natation en eau libre", poolswim:"Natation en piscine", weighttraining:"Musculation",
  strengthtraining:"Renforcement musculaire", crossfit:"CrossFit", workout:"Entraînement", yoga:"Yoga", pilates:"Pilates",
  rowing:"Aviron", indoorrowing:"Rameur", kayaking:"Kayak", canoeing:"Canoë", alpineski:"Ski alpin", nordicski:"Ski de fond",
  snowboard:"Snowboard", other:"Autre activité"
};
export function translateSportName(hass: HomeAssistant|undefined, value: unknown, fallback?: string): string {
  const text=String(value ?? "").trim(); if(!text) return fallback ?? t(hass,"activity");
  if(locale(hass)!=="fr") return text.replace(/[_-]+/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2");
  const key=text.replace(/[\s_-]+/g,"").toLowerCase();
  return SPORTS_FR[key] ?? text.replace(/[_-]+/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2");
}

export function relativeTimeLocalized(hass: HomeAssistant|undefined, iso?: string) {
  if(!iso) return {label:t(hass,"sync_unknown"),level:"danger" as const};
  const ts=new Date(iso).getTime(); if(!Number.isFinite(ts)) return {label:t(hass,"sync_unknown"),level:"danger" as const};
  const mins=Math.max(0,Math.floor((Date.now()-ts)/60000));
  if(mins<1) return {label:t(hass,"sync_now"),level:"good" as const};
  if(mins<60) return {label:t(hass,"sync_minutes",{value:mins}),level:(mins<5?"good":mins<=30?"warning":"danger") as "good"|"warning"|"danger"};
  const hours=Math.floor(mins/60); if(hours<24) return {label:t(hass,"sync_hours",{value:hours}),level:"danger" as const};
  return {label:t(hass,"sync_days",{value:Math.floor(hours/24)}),level:"danger" as const};
}
