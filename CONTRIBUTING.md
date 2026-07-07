# Contributing

Contributions welcome! Here's how:

## Design changes
The design language lives in `skills/lux-swiss/`. Keep the two governing
rules intact — **duotone strict** (two colors + one accent, used more freely for
action/Structural-Block/brand-moment jobs, but never a second hue) and
**Swiss-minimalist** (visible borders, no shadows). Changes that add a color or a
shadow contradict the system and won't be accepted; express new states through
weight, size, spacing, and contrast instead.

- Palette / token changes: update both `SKILL.md`'s tables and `assets/theme.css`
  so they never drift apart.
- New component patterns: add them to `references/components.md`, and only surface
  the most common ones in `SKILL.md` to keep it lean.

## Bug reports
Open an issue describing: what you expected, what happened, and your Claude Code
version.

## Plugin development
1. Clone the repo.
2. `claude plugin validate .` to verify structure.
3. Test locally: install from the local directory and try it on a real UI task.
4. Bump the version in `.claude-plugin/plugin.json` and add a `CHANGELOG.md` entry
   following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) + SemVer.
5. Submit a PR with a clear description.

## License
This repo is dual-licensed (see [README.md](README.md#license)):
contributions to `skills/lux-swiss/`, `docs/index.html`, `docs/assets/`,
or `HOUSE-MARK.md` are accepted under CC BY-SA 4.0; contributions to
`scripts/` or other tooling are accepted under MIT/X11.

## Code of conduct
Be kind. Be constructive.
