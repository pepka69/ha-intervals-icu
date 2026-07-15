# Intervals.icu Lovelace Card

## Register the resource

After installing the integration files and restarting Home Assistant:

1. Open **Settings → Dashboards**.
2. Open the menu in the top-right corner and select **Resources**.
3. Add a JavaScript module resource with this URL:

```text
/ha_intervals_icu/ha-intervals-icu-card.js?v=1.1.0
```

4. Select resource type **JavaScript Module**.
5. Refresh the browser or the Home Assistant application.

## Add the card

Open a dashboard, select **Edit dashboard → Add card**, then choose
**Intervals.icu Card**.

The card tries to discover the integration entities automatically. The visual
editor also lets you select or enter every entity manually.

## Minimal YAML

```yaml
type: custom:ha-intervals-icu-card
title: Intervals.icu
show_history: true
show_records: true
```

## Explicit entity configuration

Entity IDs depend on the athlete/device name and the Home Assistant language.
Use the visual editor whenever automatic discovery does not find an entity.

```yaml
type: custom:ha-intervals-icu-card
title: Alexandre · Intervals.icu
fitness_entity: sensor.alexandre_perez_fitness
fatigue_entity: sensor.alexandre_perez_fatigue
form_entity: sensor.alexandre_perez_forme
ftp_entity: sensor.alexandre_perez_ftp
weeklyLoad_entity: sensor.alexandre_perez_charge_sur_7_jours
weeklyActivities_entity: sensor.alexandre_perez_activites_sur_7_jours
plannedToday_entity: sensor.alexandre_perez_entrainement_planifie_aujourdhui
lastActivity_entity: sensor.alexandre_perez_derniere_activite
recordDistance_entity: sensor.alexandre_perez_record_distance_365_jours
recordElevation_entity: sensor.alexandre_perez_record_denivele_365_jours
recordPower_entity: sensor.alexandre_perez_record_puissance_maximale_365_jours
show_history: true
show_records: true
```
