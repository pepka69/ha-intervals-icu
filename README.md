<p align="center">
  <img src="https://raw.githubusercontent.com/pepka69/ha-intervals-icu/main/custom_components/ha_intervals_icu/brand/banner.png" alt="Intervals.icu for Home Assistant">
</p>

<h1 align="center">Intervals.icu for Home Assistant</h1>

<p align="center">
Bring Intervals.icu training, recovery and health data into Home Assistant.
</p>

<p align="center">

![Version](https://img.shields.io/github/v/release/pepka69/ha-intervals-icu)
![License](https://img.shields.io/github/license/pepka69/ha-intervals-icu)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-41BDF5?logo=homeassistant)
![HACS](https://img.shields.io/badge/HACS-Custom-orange)

</p>

---

## Features

- Fitness, Fatigue and Form
- FTP
- Weekly and monthly statistics
- Latest activity
- Planned workouts
- Personal records
- Health and body-composition metrics
- Custom Home Assistant health entities
- Multi-athlete support
- Dashboard sensor
- Configurable Lovelace card
- French sport names and human-readable durations
- HACS installation
- Diagnostics and manual refresh service

---

## Installation

### HACS

Add this repository as a custom integration repository:

```text
https://github.com/pepka69/ha-intervals-icu
```

Install the integration, restart Home Assistant, then add **Intervals.icu** from:

```text
Settings → Devices & services → Add integration
```

You will need:

- your Intervals.icu Athlete ID;
- your Intervals.icu API key.

---

## Lovelace resource

Add this JavaScript module once:

```text
/ha_intervals_icu/ha-intervals-icu-card.js
```

Then add **Intervals.icu Card** from the dashboard editor.

---

## Documentation

- [Guide français complet](README.fr.md)
- [Installation en français](docs/fr/installation.md)
- [Configuration en français](docs/fr/configuration.md)
- [Carte Lovelace](docs/fr/lovelace.md)
- [FAQ](docs/fr/faq.md)
- [Dépannage](docs/fr/depannage.md)

---

## Multiple athletes

Each configuration entry represents one athlete. The Lovelace card can select the corresponding Home Assistant device and automatically use only that athlete’s entities.

---

## Custom health sensors

Health values can come from Intervals.icu or from any Home Assistant sensor, including connected scales and other health integrations.

Supported examples include:

- weight;
- body fat;
- muscle mass;
- bone mass;
- body water;
- visceral fat;
- BMI;
- metabolic age;
- resting heart rate;
- HRV;
- sleep;
- VO₂max;
- SpO₂;
- respiratory rate;
- body temperature;
- stress;
- daily calories.

---

## Support

Report bugs and request features through GitHub Issues.

Please include:

- Home Assistant version;
- integration version;
- reproduction steps;
- relevant logs;
- diagnostics when appropriate.

---

## License

MIT License.

---

<p align="center">
Made with ❤️ for the Home Assistant and Intervals.icu communities.
</p>
