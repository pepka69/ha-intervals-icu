# v2.0.0-beta17a — Sports translations

## Objectif

Cette pré-version améliore la traduction française des noms de sports dans la carte Statistics.

## Corrections

- `HighIntensityIntervalTraining` → **CrossFit**
- `HIIT` → **CrossFit**
- `StrengthTraining` → **Musculation**
- `WeightTraining` → **Musculation**
- `VirtualRow` → **Rameur virtuel**
- `VirtualRowing` → **Rameur virtuel**
- `StairClimber` → **Stepper**
- `StairStepper` → **Stepper**

La traduction des sports est maintenant également utilisée par le traitement des textes dynamiques de la carte Statistics.

## Validation technique

- `npm run check` : réussi
- `npm run build` : réussi
- `python3 -m pytest` : 52 tests réussis

## Validation Home Assistant

Après installation de cette pré-release via HACS :

1. redémarrer Home Assistant ;
2. actualiser le navigateur avec `Ctrl+F5` ;
3. vérifier que **High Intensity Interval Training** apparaît comme **CrossFit**.

Cette version reste une pré-release destinée à la validation dans Home Assistant.
