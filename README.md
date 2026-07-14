# ha-intervals-icu

![ha-intervals-icu](custom_components/ha_intervals_icu/brand/logo.png)

Home Assistant integration for **Intervals.icu**.

Connect your Intervals.icu account to Home Assistant and monitor your training data, recovery and performance metrics.

## Features

* Config Flow setup
* Athlete ID + API Key authentication
* Automatic updates
* HACS compatible
* Diagnostics support

## Sensors

### Training load

| Sensor  | Description                   |
| ------- | ----------------------------- |
| Fitness | Chronic Training Load (CTL)   |
| Fatigue | Acute Training Load (ATL)     |
| Form    | Training Stress Balance (TSB) |

### Athlete

| Sensor | Description            |
| ------ | ---------------------- |
| HRV    | Heart Rate Variability |
| Weight | Athlete weight         |

### Activities

| Sensor         | Description          |
| -------------- | -------------------- |
| Activity count | Number of activities |
| Last activity  | Latest activity name |

## Installation

### HACS

1. Open HACS
2. Select Integrations
3. Search for:

```
ha-intervals-icu
```

4. Install
5. Restart Home Assistant

## Configuration

Go to:

```
Settings → Devices & Services → Add Integration
```

Search:

```
ha-intervals-icu
```

Enter:

* Athlete ID
* API Key from Intervals.icu

## Requirements

* Home Assistant 2026.1+
* Intervals.icu account
* Intervals.icu API Key

## Support

GitHub:

https://github.com/pepka69/ha-intervals-icu/issues

## License

MIT License
