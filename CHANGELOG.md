# Changelog

## v2.0.0-beta2

- Added the Atlas dashboard section to the official Lovelace card.
- Added automatic discovery of Training Status, Readiness and Atlas Coach entities.
- Added a visual readiness summary, recovery estimate and daily coaching recommendation.
- Added a `show_atlas` card option, enabled by default.
- Updated French and English Lovelace documentation.

## 1.3.0-beta11

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

# Changelog

## [1.3.0-beta10] - 2026-07-17

### Added

- 90-day activity statistics and 13-week trend history.
- Activity API field inventory and metric coverage diagnostics.
- Heart-rate and power zone percentages and dominant zones.
- Six new Home Assistant statistics sensors.

### Changed

- Dashboard activity window increased from 60 to 90 days.
- Dashboard attributes expose 90-day statistics and API coverage.

## [1.3.0-beta9] - 2026-07-17

### Fixed

- Separated the French and English support logos.
- Displayed only the English support logo in Home Assistant and the English README.
- Displayed only the French support logo in the French README.


## [1.3.0-beta8] - 2026-07-17

### Fixed

- Read the About panel version from the installed integration manifest through the Dashboard entity.
- Removed the stale hard-coded `1.3.0-beta1` card version.
- Fixed French documentation links that incorrectly targeted `main`.
- Updated Lovelace card metadata to use the valid development documentation path.


## [1.3.0-beta7] - 2026-07-17

### Added

- Official Wellness statistics layer with a 90-day history.
- CTL, ATL, Form, Ramp Rate, load and eFTP trends.
- Wellness API field inventory.
- HR and power time-in-zone aggregation when exposed by activity data.


## [1.3.0-beta6] - 2026-07-17

### Fixed

- Explicitly request official CTL, ATL, ramp rate, CTL load, ATL load and eFTP fields from the Intervals.icu wellness endpoint.
- Use the nearest available historical wellness record for 7-day and 30-day comparisons.

### Added

- CTL Load, ATL Load, eFTP and sleep-score sensors.


## [1.3.0-beta5] - 2026-07-17

### Added

- Current versus previous 30-day training comparisons.
- HRSS and TRIMP statistics over 7 and 42 days.
- Seven-day and 30-day load trends.
- Distinct sport count over 42 days.
- Peak-power records for 5 s, 1 min, 5 min, 20 min and 1 h.

### Changed

- Activity statistics retrieval now covers 60 days.


## [1.3.0-beta4] - 2026-07-17

### Added

- Detailed current and previous seven-day statistics.
- Full 42-day distance, duration, load, calories and elevation metrics.
- Acute/chronic load ratio and seven-day comparison percentages.
- Training averages, streaks, training days and rest days.
- Main-sport and per-sport dashboard statistics.

### Fixed

- Replaced the support logo with a yellow transparent version.
- Removed the duplicated support text from HACS documentation.


## [1.3.0-beta2] - 2026-07-17

### Added

- HRV and recovery score sensors when available.
- Ramp rate and 42-day training metrics.
- Training streak sensor.
- General next planned workout sensors.
- Dashboard attributes for performance and recovery.

### Fixed

- Buy Me a Coffee logo display in GitHub and HACS.
- Clickable French and English support sections.
- Removed the obsolete QR-code asset and caption.


All notable changes to this project are documented here.

## [1.3.0-beta1] - 2026-07-17

### Added

- New premium Lovelace card design with improved dark-mode rendering.
- Manual refresh button calling the integration refresh service.
- Compact display mode in the visual editor.
- Sport-aware icon for the latest activity.

### Changed

- Redesigned fitness, fatigue, form, weekly statistics, health, workout, records, and latest-activity sections.
- Improved mobile responsiveness and card spacing.
- Updated frontend and integration versions.

## [1.2.0-beta9] - 2026-07-17

### Changed

- Added a clickable Buy Me a Coffee brand logo.
- Updated the French support wording to **Offre-moi une bière**.
- Removed the obsolete QR-code image and caption.
- Completed the contributing guide.
- Restored useful changelog content.
- Added release notes for the beta release.
- Updated the integration manifest version.

## [1.2.0-beta8]

### Changed

- Added the My Home Assistant HACS repository button.
- Improved English and French documentation.
- Added project roadmap and vision documents.
- Fixed documentation links displayed by HACS.
- Improved repository presentation and support information.

## [1.2.0-beta7]

### Changed

- Improved HACS README rendering and documentation navigation.
- Rebuilt the Lovelace frontend bundle.

## Earlier beta releases

Earlier beta releases introduced the Intervals.icu coordinator, sensors, binary sensors, activity history, records, dashboard data, translations, diagnostics, services, repairs support, and the custom Lovelace card.
