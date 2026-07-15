<p align="center">
  <img src="brand/banner.png" alt="ha-intervals-icu">
</p>

<h1 align="center">ha-intervals-icu</h1>

<p align="center">
  Home Assistant custom integration for <strong>Intervals.icu</strong>.
</p>

<p align="center">

![Version](https://img.shields.io/github/v/release/pepka69/ha-intervals-icu)
![License](https://img.shields.io/github/license/pepka69/ha-intervals-icu)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-41BDF5)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)

</p>

---

## Overview

**ha-intervals-icu** connects your Home Assistant instance to your **Intervals.icu** account and exposes your training metrics as Home Assistant entities.

Monitor your fitness, fatigue, form and wellness directly from your dashboards, automations and voice assistants.

---

## Features

Current features:

- ✅ Fitness (CTL)
- ✅ Fatigue (ATL)
- ✅ Form (TSB)
- ✅ FTP
- ✅ Activities count
- ✅ Resting Heart Rate
- ✅ Sleep
- ✅ Binary sensor: Positive Form
- ✅ Binary sensor: High Fatigue

Coming soon:

- 🔄 Last activity details
- 🔄 Weekly load
- 🔄 Monthly load
- 🔄 Planned workouts
- 🔄 Personal records
- 🔄 Training dashboard

---

## Installation

### HACS

1. Open **HACS**
2. Integrations
3. Three dots (**⋮**)
4. **Custom repositories**
5. Add:

```
https://github.com/pepka69/ha-intervals-icu
```

Category:

```
Integration
```

Install **ha-intervals-icu**.

Restart Home Assistant.

---

## Configuration

Go to:

**Settings → Devices & Services → Add Integration**

Enter:

- Athlete ID
- API Key

Your API Key can be generated in:

**Intervals.icu → Settings → Developer Settings**

---

## Available Entities

| Entity | Description |
|---------|-------------|
| Fitness | CTL |
| Fatigue | ATL |
| Form | TSB |
| FTP | Functional Threshold Power |
| Activities | Number of recent activities |
| Resting HR | Resting heart rate |
| Sleep | Sleep duration |
| Positive Form | Binary sensor |
| High Fatigue | Binary sensor |

---

## Screenshots

Coming soon.

---

## Roadmap

- Last activity sensors
- Weekly statistics
- Monthly statistics
- Recovery metrics
- Planned workouts
- Dashboard cards
- Energy sensors
- Personal records

---

## Requirements

- Home Assistant 2025.7+
- Intervals.icu account
- API Key

---

## Support

Issues and feature requests are welcome.

Please use:

https://github.com/pepka69/ha-intervals-icu/issues

---

## Contributing

Contributions are welcome.

Feel free to submit issues, feature requests and pull requests.

---

## License

This project is released under the **MIT License**.

---

<p align="center">
Made with ❤️ for the Home Assistant and Intervals.icu communities.
</p>
