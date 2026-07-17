# v1.3.0-beta6

## Priority fix: official Intervals.icu statistics

- The wellness request now explicitly asks Intervals.icu for `ctl`, `atl`, `rampRate`, `ctlLoad`, `atlLoad` and `eftp`.
- Fitness, fatigue and form are therefore based on the official Intervals.icu wellness series instead of activity approximations.
- Added dedicated CTL Load, ATL Load, eFTP and sleep-score sensors.
- Seven-day and thirty-day comparisons now use the closest available previous wellness record when an exact date is missing.
- Dashboard attributes expose the official statistics and the date of the source wellness record.

This release deliberately prioritises reliable training statistics.
