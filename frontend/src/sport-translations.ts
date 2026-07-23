const SPORT_TRANSLATIONS: Record<string, string> = {
  Ride: "Vélo",
  VirtualRide: "Vélo virtuel",
  MountainBikeRide: "VTT",
  GravelRide: "Gravel",
  EBikeRide: "Vélo électrique",
  EMountainBikeRide: "VTT électrique",
  Handcycle: "Handbike",
  Velomobile: "Vélomobile",
  Run: "Course à pied",
  VirtualRun: "Course virtuelle",
  TrailRun: "Trail",
  Treadmill: "Tapis de course",
  Walk: "Marche",
  Hike: "Randonnée",
  Swim: "Natation",
  OpenWaterSwim: "Natation en eau libre",
  PoolSwim: "Natation en piscine",
  WeightTraining: "Musculation",
  StrengthTraining: "Renforcement musculaire",
  Crossfit: "CrossFit",
  CrossFit: "CrossFit",
  Workout: "Entraînement",
  Yoga: "Yoga",
  Pilates: "Pilates",
  Elliptical: "Vélo elliptique",
  StairStepper: "Stepper",
  Rowing: "Aviron",
  IndoorRowing: "Rameur",
  Kayaking: "Kayak",
  Canoeing: "Canoë",
  StandUpPaddling: "Stand-up paddle",
  Surfing: "Surf",
  Windsurf: "Planche à voile",
  Kitesurf: "Kitesurf",
  AlpineSki: "Ski alpin",
  BackcountrySki: "Ski de randonnée",
  NordicSki: "Ski de fond",
  Snowboard: "Snowboard",
  Snowshoe: "Raquettes",
  IceSkate: "Patinage",
  RollerSki: "Ski-roues",
  InlineSkate: "Roller",
  Golf: "Golf",
  Tennis: "Tennis",
  Badminton: "Badminton",
  Squash: "Squash",
  Soccer: "Football",
  Football: "Football américain",
  Basketball: "Basket-ball",
  Volleyball: "Volley-ball",
  Rugby: "Rugby",
  Boxing: "Boxe",
  MartialArts: "Arts martiaux",
  Dancing: "Danse",
  Sailing: "Voile",
  HorsebackRiding: "Équitation",
  Wheelchair: "Fauteuil roulant",
  Other: "Autre activité",
};

function normalizeSportKey(value: string): string {
  return value.trim().replace(/[\s_-]+/g, "").toLowerCase();
}

const NORMALIZED_TRANSLATIONS = Object.fromEntries(
  Object.entries(SPORT_TRANSLATIONS).map(([key, label]) => [
    normalizeSportKey(key),
    label,
  ]),
);

export function translateSportType(
  value: unknown,
  fallback = "Activité",
): string {
  if (value === null || value === undefined) return fallback;

  const text = String(value).trim();
  if (!text || ["unknown", "unavailable", "none", "null"].includes(text.toLowerCase())) {
    return fallback;
  }

  return NORMALIZED_TRANSLATIONS[normalizeSportKey(text)] ?? text;
}
