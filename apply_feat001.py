#!/usr/bin/env python3
from pathlib import Path

CARD = Path("frontend/src/card.ts")

if not CARD.exists():
    raise SystemExit("ERREUR : lance ce script depuis la racine du dépôt.")

text = CARD.read_text(encoding="utf-8")

import_line = 'import { translateSportType } from "./sport-translations";'
if import_line not in text:
    marker = 'import { gauge, historyChart } from "./graph";'
    if marker not in text:
        raise SystemExit("ERREUR : import graph introuvable dans frontend/src/card.ts")
    text = text.replace(marker, marker + "\n" + import_line, 1)

old = 'const lastTypeText = formatState(hass, lastType, "Activité");'
new = 'const lastTypeText = translateSportType(formatState(hass, lastType, "Activité"));'
if old in text:
    text = text.replace(old, new, 1)
elif new not in text:
    raise SystemExit("ERREUR : ligne lastTypeText introuvable.")

old = '${formatState(hass, workoutSport, "Entraînement")}'
new = '${translateSportType(formatState(hass, workoutSport, "Entraînement"), "Entraînement")}'
if old in text:
    text = text.replace(old, new, 1)
elif new not in text:
    raise SystemExit("ERREUR : affichage workoutSport introuvable.")

CARD.write_text(text, encoding="utf-8")
print("OK : traductions sport ajoutées dans frontend/src/card.ts")
