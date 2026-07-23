# v2.0.0-beta7 — Pre-release

## 🌍 Frontend internationalization

The frontend now follows the language configured in Home Assistant. French and English are supported, with English used as the fallback.

### Main dashboard
- Localized Atlas Readiness and Atlas Coach headings.
- Localized fitness, fatigue, form, health, workout, records and last-activity sections.
- Localized synchronization status and refresh tooltip.

### Atlas values
- Localized readiness and training statuses such as `moderate`, `productive_load`, `maintaining`, `recovering` and `overreaching`.
- Localized coach recommendations such as `easy_session`, `rest_day`, `threshold`, `tempo`, `vo2max` and `anaerobic`.

### Statistics card
- Localized Overview, Sports, Records, Trends and Quality tabs.
- Localized metrics, sport names, empty states and data-quality labels.
- Localized dynamic insights, including period load comparisons and sport-mix summaries.

### Examples in French
- `30-day load 11% lower than the previous period` → `Charge sur 30 jours 11 % inférieure à la période précédente`
- `WeightTraining represents 36% of training time over the last 30 days` → `Musculation représente 36 % du temps d’entraînement sur les 30 derniers jours`

## 🧪 Testing requested
- Test with Home Assistant set to French.
- Test after switching Home Assistant to English.
- Verify Atlas status and coach recommendation translations.
- Verify all Statistics card tabs and dynamic insight sentences.

> This is a pre-release intended for testing.
