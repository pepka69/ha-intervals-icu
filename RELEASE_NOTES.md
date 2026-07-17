# v1.3.0-beta7

## Priority 1: statistics

- Wellness history increased to 90 days.
- Added a dedicated official-statistics layer based on Intervals.icu Wellness data.
- Added CTL, ATL, Form, Ramp Rate, CTL Load, ATL Load and eFTP histories and trends.
- Added 7-day and 30-day averages, changes, minimums and maximums.
- Added Wellness field inventory so diagnostics show exactly what the account API exposes.
- Added HR and power time-in-zone aggregation when those fields are present in activity summaries.
- Added official statistics and zone arrays to the dashboard entity attributes.
- No fitness value is fabricated: missing API values remain unavailable.
