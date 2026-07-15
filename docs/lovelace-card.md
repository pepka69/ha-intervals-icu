# Intervals.icu Lovelace Card

## Ajouter la ressource

Dans Home Assistant : **Paramètres → Tableaux de bord → Ressources**.

- URL : `/ha_intervals_icu/ha-intervals-icu-card.js?v=1.1.0-beta1`
- Type : **Module JavaScript**

Redémarrez Home Assistant après l'installation ou la mise à jour de l'intégration, puis rechargez le navigateur.

## Ajouter la carte

Dans l'éditeur d'un tableau de bord, choisissez **Ajouter une carte**, puis **Intervals.icu Card**.

Configuration YAML minimale :

```yaml
type: custom:ha-intervals-icu-card
title: Intervals.icu
```

La carte détecte automatiquement les entités de l'intégration. L'éditeur visuel permet de sélectionner manuellement les capteurs et d'afficher ou masquer l'historique, les records, l'entraînement du jour et la dernière activité.

## Développement du frontend

```bash
cd frontend
npm ci
npm run check
npm run build
```

Le build TypeScript/Vite génère le fichier distribué dans `custom_components/ha_intervals_icu/frontend/ha-intervals-icu-card.js`.
