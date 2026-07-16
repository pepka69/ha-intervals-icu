# Carte Lovelace

## Ressource

Ajoutez une seule fois :

```text
/ha_intervals_icu/ha-intervals-icu-card.js
```

Type :

```text
Module JavaScript
```

## Ajout de la carte

Dans l’éditeur du tableau de bord, recherchez :

```text
Intervals.icu Card
```

## Sections configurables

Vous pouvez afficher ou masquer :

- Fitness / Fatigue / Forme ;
- statistiques 7 jours ;
- historique ;
- entraînement du jour ;
- entraînement de demain ;
- records ;
- dernière activité ;
- santé ;
- état de synchronisation.

## Exemple YAML

```yaml
type: custom:ha-intervals-icu-card
title: Intervals.icu
layout: standard
show_metrics: true
show_weekly_stats: true
show_history: true
show_workout: false
show_tomorrow_workout: false
show_records: true
show_last_activity: true
show_health: true
show_sync_status: true
weight_entity: sensor.poids_alex
```

## Modes d’affichage

- Compact
- Standard
- Complet
