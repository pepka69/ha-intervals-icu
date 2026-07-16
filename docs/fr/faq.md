# FAQ

## Ai-je besoin d’un abonnement Intervals.icu payant ?

L’intégration utilise l’API disponible pour votre compte. Certaines données peuvent dépendre des fonctions disponibles sur votre offre Intervals.icu.

## Puis-je utiliser plusieurs athlètes ?

Oui. Ajoutez une entrée d’intégration par athlète, puis sélectionnez le bon appareil dans la carte.

## Puis-je utiliser une balance non Garmin ?

Oui. Choisissez directement le capteur Home Assistant de votre balance.

## Pourquoi certains records sont vides ?

La donnée doit être présente dans les activités renvoyées par Intervals.icu. Certaines activités ne contiennent pas de puissance, de fréquence cardiaque ou d’autres métriques.

## Pourquoi aucune séance prévue n’apparaît ?

La carte n’affiche une séance que si elle est présente dans le calendrier Intervals.icu pour la date concernée.

## Dois-je modifier la ressource à chaque mise à jour ?

Non. Utilisez toujours :

```text
/ha_intervals_icu/ha-intervals-icu-card.js
```
