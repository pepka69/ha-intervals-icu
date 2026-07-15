# Intervals.icu Lovelace Card

## Ajouter la ressource

Dans Home Assistant :

1. **Paramètres → Tableaux de bord**.
2. Ouvrir le menu **⋮ → Ressources**.
3. Ajouter cette URL :

```text
/ha_intervals_icu/ha-intervals-icu-card.js?v=1.1.0-beta2
```

Type : **Module JavaScript**.

Redémarrer Home Assistant après installation ou mise à jour de l’intégration, puis actualiser complètement le navigateur.

## Ajouter la carte

La carte apparaît dans le sélecteur sous le nom **Intervals.icu Card**.

Configuration YAML minimale :

```yaml
type: custom:ha-intervals-icu-card
title: Intervals.icu
show_records: true
show_history: true
show_workout: true
show_last_activity: true
```

La carte détecte automatiquement les entités Intervals.icu. Avec plusieurs athlètes, utiliser l’éditeur visuel pour sélectionner explicitement les entités Fitness, Fatigue, Forme, FTP, Charge 7 jours et Activités 7 jours.
