# Installation pas à pas

## Prérequis

Vous avez besoin de :

- Home Assistant ;
- HACS ;
- un compte Intervals.icu ;
- votre identifiant d’athlète ;
- une clé API Intervals.icu.

## 1. Vérifier Intervals.icu

Avant d’installer l’intégration, connectez-vous à Intervals.icu et vérifiez qu’au moins une activité récente est visible.

## 2. Identifiant d’athlète

Votre identifiant est différent de votre nom affiché.

Exemple :

```text
i641230
```

Copiez-le exactement, sans espace.

## 3. Clé API

Dans Intervals.icu, ouvrez les paramètres développeur et copiez votre clé API.

Ne partagez jamais cette clé.

## 4. Installation HACS

Ajoutez le dépôt personnalisé :

```text
https://github.com/pepka69/ha-intervals-icu
```

Catégorie :

```text
Integration
```

Installez l’intégration puis redémarrez Home Assistant.

## 5. Configuration Home Assistant

Chemin :

```text
Paramètres → Appareils et services → Ajouter une intégration
```

Recherchez :

```text
Intervals.icu
```

Saisissez l’identifiant d’athlète et la clé API.

## 6. Vérification

Dans les États, recherchez :

```text
dashboard
```

L’entité Dashboard doit être disponible et avoir l’état `ready`.
