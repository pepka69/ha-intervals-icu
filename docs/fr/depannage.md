# Dépannage

## Authentification incorrecte

Vérifiez :

- l’identifiant d’athlète ;
- la clé API ;
- l’absence d’espace ;
- que la clé n’a pas été révoquée.

## Entités indisponibles

Redémarrez Home Assistant, puis rechargez l’intégration.

Vous pouvez également lancer :

```text
ha_intervals_icu.refresh
```

## Activité récente absente

Vérifiez d’abord Intervals.icu. Si l’activité n’y apparaît pas, l’intégration Home Assistant ne pourra pas la récupérer.

## Carte inexistante

Vérifiez la ressource Lovelace et son type `Module JavaScript`.

## Ancienne version de la carte

Redémarrez Home Assistant puis effectuez un rechargement complet du navigateur avec `Ctrl + F5`.

## Diagnostic

Dans la page de l’intégration, téléchargez les diagnostics avant d’ouvrir une issue. Vérifiez toutefois qu’aucune information sensible n’est incluse avant de les publier.
