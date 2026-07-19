# v2.0.0-beta2 — Atlas Dashboard

This release makes Atlas immediately visible in Home Assistant through the official Lovelace card. The card now presents readiness, recovery, training status and the daily coaching recommendation in one responsive section.

No manual entity IDs are required when a device is selected: Atlas entities are discovered through the Home Assistant entity registry.

# v1.3.0-beta11

## Statistics & Performance Center

- Adds a second Lovelace card: `custom:ha-intervals-icu-statistics-card`.
- Adds a dedicated `Statistics Dashboard` entity with structured attributes.
- Adds 7, 30, 90 and 365-day summaries with previous-period comparisons.
- Adds per-sport statistics for every supported period.
- Adds wellness trends for CTL, ATL, Form, eFTP, weight, sleep, resting heart rate and HRV.
- Adds per-sport activity records and best week/month records.
- Adds deterministic training insights based on load, form, sleep and sport mix.
- Adds a data-quality view for API field completeness.
- Extends wellness and activity history to 365 days.
- Reuses a single 365-day activity request for dashboard and records to avoid a duplicate API request.
- Rebuilds the frontend bundle and prepares the integration for the 1.3.0 stable release.

## Lovelace

```yaml
type: custom:ha-intervals-icu-statistics-card
title: Intervals.icu Statistics
default_period: 30_days
```
