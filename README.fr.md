<p align="center">
  <img src="https://raw.githubusercontent.com/pepka69/ha-intervals-icu/main/custom_components/ha_intervals_icu/brand/banner.png" alt="Intervals.icu pour Home Assistant">
</p>

<h1 align="center">Intervals.icu pour Home Assistant</h1>

<p align="center">
Intégrez vos données d’entraînement, de récupération et de santé Intervals.icu directement dans Home Assistant.
</p>

<p align="center">

![Version](https://img.shields.io/github/v/release/pepka69/ha-intervals-icu)
![Licence](https://img.shields.io/github/license/pepka69/ha-intervals-icu)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-41BDF5?logo=homeassistant)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)

</p>

---

## Pour qui est ce guide ?

Ce guide est conçu pour une personne qui découvre :

- Intervals.icu ;
- HACS ;
- les identifiants d’athlète ;
- les clés API ;
- les cartes Lovelace.

Aucune connaissance en programmation n’est nécessaire.

Temps estimé pour une première installation : **10 à 15 minutes**.

---

## Ce que l’intégration affiche

- Fitness (CTL)
- Fatigue (ATL)
- Forme (TSB)
- FTP
- Charge et activités sur 7 et 30 jours
- Dernière activité
- Durée lisible des activités
- Types de sport traduits en français
- Records personnels
- Séances prévues
- Poids, sommeil et fréquence cardiaque au repos
- Capteurs de santé Home Assistant personnalisés
- Plusieurs athlètes dans la même installation
- Carte Lovelace dédiée

---

## Installation rapide

### 1. Créer un compte Intervals.icu

Rendez-vous sur le site Intervals.icu et créez votre compte.

Une fois connecté, vérifiez que vos activités Garmin, Strava, Zwift ou autres remontent correctement dans Intervals.icu avant de poursuivre.

### 2. Trouver l’identifiant d’athlète

Dans Intervals.icu :

1. ouvrez les paramètres ;
2. recherchez la partie consacrée au compte ou aux développeurs ;
3. repérez votre identifiant d’athlète.

Il commence généralement par la lettre `i`, par exemple :

```text
i641230
```

Ne confondez pas cet identifiant avec votre nom affiché ou votre adresse e-mail.

### 3. Créer une clé API

Dans Intervals.icu :

1. ouvrez **Settings** ;
2. allez dans **Developer Settings** ;
3. créez ou copiez votre clé API ;
4. conservez-la dans un endroit sûr.

Cette clé est personnelle. Ne la publiez jamais dans une capture d’écran, un forum ou une issue GitHub.

### 4. Installer l’intégration avec HACS

Dans Home Assistant :

1. ouvrez **HACS** ;
2. ouvrez **Intégrations** ;
3. ouvrez le menu avec les trois points ;
4. choisissez **Dépôts personnalisés** ;
5. ajoutez :

```text
https://github.com/pepka69/ha-intervals-icu
```

Catégorie :

```text
Integration
```

Installez ensuite **ha-intervals-icu**, puis redémarrez Home Assistant.

### 5. Ajouter l’intégration

Dans Home Assistant :

1. ouvrez **Paramètres** ;
2. ouvrez **Appareils et services** ;
3. cliquez sur **Ajouter une intégration** ;
4. recherchez `Intervals.icu` ;
5. saisissez votre identifiant d’athlète ;
6. saisissez votre clé API ;
7. validez.

Un appareil Home Assistant est créé pour chaque athlète configuré.

---

## Ajouter la carte Lovelace

Dans Home Assistant :

1. ouvrez **Paramètres** ;
2. ouvrez **Tableaux de bord** ;
3. ouvrez **Ressources** ;
4. ajoutez :

```text
/ha_intervals_icu/ha-intervals-icu-card.js
```

Type :

```text
Module JavaScript
```

Ensuite :

1. ouvrez votre tableau de bord ;
2. cliquez sur **Modifier le tableau de bord** ;
3. cliquez sur **Ajouter une carte** ;
4. recherchez **Intervals.icu Card** ;
5. choisissez l’athlète ;
6. activez uniquement les sections utiles.

Exemple minimal :

```yaml
type: custom:ha-intervals-icu-card
title: Intervals.icu
show_history: true
show_records: true
show_workout: false
show_last_activity: true
show_sync_status: true
```

---

## Capteurs de santé personnalisés

La carte peut utiliser des capteurs Home Assistant qui ne viennent pas d’Intervals.icu.

Exemple pour une balance connectée :

```yaml
weight_entity: sensor.poids_alex
```

Les données personnalisables peuvent inclure :

- poids ;
- masse grasse ;
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

Le capteur choisi manuellement est prioritaire sur la valeur Intervals.icu.

---

## Plusieurs athlètes

L’intégration prend en charge plusieurs comptes Intervals.icu dans la même installation Home Assistant.

Exemple :

- Alexandre ;
- Katia.

Dans l’éditeur de la carte, sélectionnez l’appareil correspondant à l’athlète. La carte utilisera alors uniquement les entités rattachées à cet appareil.

Le champ « nom affiché » ne sert qu’au titre de la carte. Il ne sélectionne pas les capteurs.

---

## Mettre à jour l’intégration

Dans HACS :

1. ouvrez l’intégration ;
2. choisissez **Retélécharger** ou **Mettre à jour** ;
3. choisissez la version souhaitée ;
4. redémarrez Home Assistant.

La ressource Lovelace conserve désormais la même adresse :

```text
/ha_intervals_icu/ha-intervals-icu-card.js
```

Après une mise à jour importante, un rechargement complet du navigateur peut rester utile :

```text
Ctrl + F5
```

---

## Vérifier que tout fonctionne

Dans **Outils de développement → États**, recherchez :

```text
dashboard
```

Vous devriez trouver une entité ressemblant à :

```text
sensor.sport_alex_alex_dashboard
```

Son état doit être :

```text
ready
```

Ses attributs contiennent notamment :

- `summary`
- `history`
- `weekly`
- `monthly`
- `health`
- `records`
- `last_activity`
- `planned_today`
- `planned_tomorrow`

---

## Dépannage rapide

### La dernière activité est ancienne

Lancez l’action :

```text
ha_intervals_icu.refresh
```

Puis attendez quelques secondes.

Vérifiez également que l’activité est bien visible dans Intervals.icu.

### La carte affiche une autre personne

Éditez la carte et sélectionnez le bon appareil dans **Athlète / appareil**.

### Le poids ne s’affiche pas

Vérifiez que :

- le bloc Santé est activé ;
- l’affichage du poids est activé ;
- l’entité choisie existe ;
- son état est numérique ;
- elle n’est ni `unknown` ni `unavailable`.

### La carte n’apparaît pas dans la liste

Vérifiez la ressource :

```text
/ha_intervals_icu/ha-intervals-icu-card.js
```

Type :

```text
Module JavaScript
```

Puis rechargez complètement le navigateur.

### La clé API est refusée

Vérifiez :

- l’identifiant d’athlète ;
- l’absence d’espace avant ou après la clé ;
- que la clé est toujours active ;
- que l’identifiant commence bien par `i` lorsque c’est le format utilisé par votre compte.

---

## Documentation détaillée

- [Installation pas à pas](docs/fr/installation.md)
- [Configuration](docs/fr/configuration.md)
- [Carte Lovelace](docs/fr/lovelace.md)
- [FAQ](docs/fr/faq.md)
- [Dépannage](docs/fr/depannage.md)

---

## Aide et signalement de bug

Avant d’ouvrir une issue, préparez :

- la version de Home Assistant ;
- la version de l’intégration ;
- le type d’installation Home Assistant ;
- les logs liés à `ha_intervals_icu` ;
- une description précise du problème ;
- les étapes permettant de le reproduire.

Dépôt GitHub :

```text
https://github.com/pepka69/ha-intervals-icu
```

---

## Licence

Ce projet est publié sous licence MIT.

---

<p align="center">
Développé avec ❤️ pour les communautés Home Assistant et Intervals.icu.
</p>
