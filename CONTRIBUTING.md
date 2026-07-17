# Contributing

Thank you for helping improve **Intervals.icu for Home Assistant**.

## Before opening an issue

Please check that:

- Home Assistant is up to date;
- the latest integration release is installed;
- the issue is not already reported;
- your Intervals.icu Athlete ID and API key are valid.

Never publish API keys, access tokens, or private diagnostics.

## Bug reports

Include:

- Home Assistant version;
- integration version;
- installation method;
- clear reproduction steps;
- expected and actual behaviour;
- relevant logs;
- redacted diagnostics when useful.

## Feature requests

Describe the use case first, then the desired behaviour. Screenshots or examples are welcome.

## Development

1. Fork the repository.
2. Create a branch from `develop`.
3. Keep changes focused.
4. Add or update tests when applicable.
5. Run the validation suite.
6. Open a pull request against `develop`.

Typical checks:

```bash
python -m pytest
python -m ruff check .
```

For frontend changes:

```bash
cd frontend
npm ci
npm run build
```

Commit the generated Lovelace JavaScript file when the frontend source changes.

## Translations and documentation

Update both English and French content when a change affects user-facing text or behaviour.

## Licence

By contributing, you agree that your contribution is distributed under the MIT licence.
