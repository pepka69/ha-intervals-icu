# ha-intervals-icu — État du projet

Dernière mise à jour : 27 juillet 2026

## Projet

- Dépôt : pepka69/ha-intervals-icu
- Branche de développement : develop
- Branche stable : main
- Environnement : GitHub Codespaces
- Backend : Python
- Frontend : TypeScript / Lit
- Distribution : HACS
- Home Assistant est séparé de Codespaces.

## Version actuelle

- Version actuelle : v2.0.0-beta17
- Build frontend : réussi
- Tests Python : 52 passed

## Dernière évolution

La bêta16 ajoute les statistiques Wellness à la carte Statistics :

- durée du sommeil ;
- score de sommeil ;
- HRV ;
- fréquence cardiaque au repos ;
- readiness ;
- VO2max ;
- moyennes ;
- minimums ;
- maximums ;
- onglet Bien-être.

## Fichiers concernés

- custom_components/ha_intervals_icu/frontend/ha-intervals-icu-card.js
- custom_components/ha_intervals_icu/sensor.py
- custom_components/ha_intervals_icu/wellness_statistics.py
- frontend/src/statistics-card.ts
- tests/test_statistics_wellness_beta16.py

## Point important

Codespaces ne contient pas Home Assistant.

Ne pas utiliser dans Codespaces :

- cp vers /config
- ha core restart

La validation doit être réalisée sur l'installation Home Assistant réelle, après installation de la version avec HACS.

## Workflow obligatoire

analyse → développement → tests → build → validation → commit → push → tag → pré-release → validation Home Assistant → release → merge vers main

## Règles

- Ne jamais simplifier le projet.
- Toujours analyser le code avant de le modifier.
- Préserver les fonctionnalités existantes.
- Fournir du code complet.
- Donner les commandes dans l'ordre.
- Ne pas créer de tag ou de release sans accord explicite.
- Ne pas merger vers main sans accord explicite.

## Commandes de reprise

Au début d'une nouvelle discussion, contrôler le dépôt avec :

    git branch --show-current
    git status --short
    git log -5 --oneline --decorate
    git tag --list "v2.0.0-beta*" --sort=-version:refname | head -10

## Prochaine étape

Contrôler l'état réel de la bêta16 afin de déterminer si elle est :

- commitée ;
- poussée sur develop ;
- taguée ;
- publiée en pré-release ;
- installée avec HACS ;
- validée dans Home Assistant.

Reprendre ensuite à la première étape non terminée.

## Prompt de reprise

Nous continuons le développement de ha-intervals-icu.

Lis docs/PROJECT_STATE.md et reprends exactement à la prochaine étape indiquée.

Respecte notre workflow habituel :
analyse → développement → tests → build → validation → commit → push.

Ne simplifie jamais le projet.

## v2.0.0-beta17 — Sports translations

- Ajout de la traduction `HighIntensityIntervalTraining` → `CrossFit`.
- Ajout et harmonisation des alias de sports français.
- `StrengthTraining` et `WeightTraining` affichés comme `Musculation`.
- `VirtualRow` et `VirtualRowing` affichés comme `Rameur virtuel`.
- `StairClimber` et `StairStepper` affichés comme `Stepper`.
- `translateDynamicText()` utilise désormais la traduction des sports.
- TypeScript validé.
- Build Vite validé.
- 52 tests Python réussis.
- Étape suivante : installation de la pré-release beta17 via HACS et validation dans Home Assistant.
