<p align="center">
  <img src="https://raw.githubusercontent.com/pepka69/ha-intervals-icu/main/custom_components/ha_intervals_icu/brand/banner.png" alt="Intervals.icu pour Home Assistant">
</p>

<h1 align="center">Intervals.icu pour Home Assistant</h1>

<p align="center">
Retrouvez vos entraînements, votre récupération, vos records et vos données de santé Intervals.icu directement dans Home Assistant.
</p>

<p align="center">

![Version](https://img.shields.io/github/v/release/pepka69/ha-intervals-icu?include_prereleases&label=version)
![Validation](https://github.com/pepka69/ha-intervals-icu/actions/workflows/validate.yml/badge.svg?branch=develop)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.1%2B-41BDF5?logo=homeassistant&logoColor=white)
![HACS](https://img.shields.io/badge/HACS-Dépôt%20personnalisé-orange)
![Licence](https://img.shields.io/github/license/pepka69/ha-intervals-icu)

</p>

---

## Ce guide est fait pour les débutants

Vous n’avez jamais utilisé une clé API ? Vous ne savez pas où trouver l’identifiant d’athlète ? Ce n’est pas un problème.

La documentation explique pas à pas :

1. la création du compte Intervals.icu ;
2. la synchronisation de vos activités ;
3. la récupération de l’identifiant d’athlète ;
4. la création de la clé API ;
5. l’installation dans HACS ;
6. la configuration dans Home Assistant ;
7. l’ajout et la personnalisation de la carte.

Temps moyen : **10 à 15 minutes**.

---

## Fonctionnalités

| Entraînement | Activité | Santé | Home Assistant |
|---|---|---|---|
| Fitness, Fatigue et Forme | Dernière activité | Poids | Configuration graphique |
| FTP | Durée lisible | Composition corporelle | Plusieurs athlètes |
| Statistiques 7 et 30 jours | Sports traduits | FC au repos | Diagnostics |
| Séances planifiées | Records personnels | HRV et sommeil | Action d’actualisation |
| Historique | Charge d’entraînement | Capteurs externes | Carte Lovelace |

L’intégration crée aussi un **capteur Dashboard** qui regroupe les informations principales dans ses attributs.

---

## Installation HACS

L’intégration s’installe actuellement comme dépôt personnalisé.

Dans HACS :

1. ouvrez **Intégrations** ;
2. ouvrez le menu avec les trois points ;
3. choisissez **Dépôts personnalisés** ;
4. ajoutez :

```text
https://github.com/pepka69/ha-intervals-icu
```

5. choisissez la catégorie :

```text
Integration
```

6. installez **Intervals.icu for Home Assistant** ;
7. redémarrez Home Assistant.

Ensuite :

```text
Paramètres → Appareils et services → Ajouter une intégration
```

Recherchez :

```text
Intervals.icu
```

Vous devrez saisir :

- votre identifiant d’athlète ;
- votre clé API.

Le guide détaillé se trouve ici :

- [Installation pas à pas](https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/fr/installation.md)

---

## Ressource de la carte

Ajoutez une seule fois :

```text
/ha_intervals_icu/ha-intervals-icu-card.js
```

Type :

```text
Module JavaScript
```

Il n’est plus nécessaire de changer le suffixe de version à chaque mise à jour.

---

## Carte Lovelace

La carte permet d’afficher ou de masquer :

- Fitness, Fatigue et Forme ;
- FTP et statistiques 7 jours ;
- graphique d’évolution ;
- entraînement du jour ;
- entraînement de demain ;
- records ;
- dernière activité ;
- santé ;
- état de synchronisation.

Elle prend en charge plusieurs athlètes. Le choix se fait avec **Athlète / appareil** dans l’éditeur visuel.

Guide :

- [Installer et configurer la carte](https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/fr/lovelace.md)

---

## Capteurs de santé externes

Vous pouvez utiliser n’importe quel capteur Home Assistant, même s’il ne vient pas de Garmin ou d’Intervals.icu.

Exemples :

- balance connectée ;
- Withings ;
- Xiaomi ;
- Garmin ;
- capteur Template ;
- autre intégration de santé.

Données prévues ou disponibles :

- poids ;
- graisse corporelle ;
- masse musculaire ;
- masse osseuse ;
- eau corporelle ;
- graisse viscérale ;
- IMC ;
- âge métabolique ;
- fréquence cardiaque au repos ;
- HRV ;
- sommeil ;
- VO₂max ;
- SpO₂ ;
- fréquence respiratoire ;
- température corporelle ;
- stress ;
- calories quotidiennes.

Lorsqu’un capteur manuel est choisi, il devient prioritaire sur la valeur Intervals.icu.

---

## Plusieurs athlètes

Ajoutez une entrée d’intégration pour chaque compte Intervals.icu.

Exemple :

- Alexandre ;
- Katia.

Chaque entrée possède son appareil et ses entités. Dans la carte, sélectionnez le bon appareil. Le champ du nom affiché ne sélectionne pas les capteurs.

---

## Documentation

- [Installation](https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/fr/installation.md)
- [Configuration](https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/fr/configuration.md)
- [Carte Lovelace](https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/fr/lovelace.md)
- [FAQ](https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/fr/faq.md)
- [Dépannage](https://github.com/pepka69/ha-intervals-icu/blob/develop/docs/fr/depannage.md)
- [Roadmap](https://github.com/pepka69/ha-intervals-icu/blob/develop/ROADMAP.md)
- [Vision du projet](https://github.com/pepka69/ha-intervals-icu/blob/develop/VISION.md)

---

## Captures d’écran

Les emplacements et noms attendus sont préparés dans :

```text
.github/assets/screenshots/
```

Le fichier d’instructions précise les captures à ajouter pour GitHub et HACS.

---

## Assistance

Pour signaler un problème, indiquez :

- la version de Home Assistant ;
- la version de l’intégration ;
- les étapes permettant de reproduire le problème ;
- les logs utiles ;
- les diagnostics si nécessaire.

Ne publiez jamais votre clé API.

---

## Licence

Licence MIT.

<p align="center">
Développé avec ❤️ pour les communautés Home Assistant et Intervals.icu.
</p>

---

## Soutenir le projet

<p align="center">
  <a href="https://buymeacoffee.com/pep_ka">
    <img src="https://raw.githubusercontent.com/pepka69/ha-intervals-icu/develop/.github/assets/buy-me-a-beer-yellow.png" width="320" alt="Soutenir le projet">
  </a>
</p>
