# Intervals.icu Lovelace Card

## Resource

Add the following JavaScript module in **Settings → Dashboards → Resources**:

```text
/ha_intervals_icu/ha-intervals-icu-card.js?v=1.1.0-beta1
```

Resource type: **JavaScript module**.

Restart Home Assistant after installing or updating the integration, then refresh the browser cache.

## Add the card

The card is available from the dashboard card picker as **Intervals.icu Card**.

Minimal YAML configuration:

```yaml
type: custom:ha-intervals-icu-card
title: Intervals.icu
show_records: true
show_history: true
```

The card automatically detects the first Intervals.icu sensor for every supported value. For multiple athletes, use the visual editor to explicitly select the fitness, fatigue, form, FTP, weekly load and weekly activity entities.
