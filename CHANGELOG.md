# Changelog

All notable changes to this plugin are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/); this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Iconography** guidance — Lucide endorsed as the sole icon set, with the
  monoline / `currentColor` / square-cap restyle rules (`SKILL.md`,
  `references/components.md`).
- **Showcase landing page** (`docs/index.html`) served on GitHub Pages, plus
  README screenshots, a 1200×630 social-preview card, and a reproducible Playwright
  capture script.

### Changed
- **Charts** rule relaxed — hand-rolled SVG stays the default, but Observable Plot
  is now the one sanctioned chart library when a lib is warranted, restyled to the
  palette (`SKILL.md`, `references/components.md`).

## [1.0.0] — 2026-07-04

### Added
- Initial release of the **Duotone Swiss** design-system skill (`lux-design-system`).
- **`SKILL.md`** — philosophy (duotone strict, Swiss-minimalist), full light/dark
  palette token tables, typography rules (Space Mono / Space Grotesk), spacing and
  layout, and core component patterns (buttons, tags, section dividers).
- **`assets/theme.css`** — ready-to-paste Tailwind 4 theme with every CSS variable
  for light and dark mode, wired to Tailwind via `@theme inline`; also usable as
  plain CSS custom properties on non-Tailwind stacks.
- **`references/components.md`** — extended component catalogue: status pips, modal
  overlay, toggle controls, cards, inputs, and the hand-rolled SVG chart patterns.
- Pushy trigger description so the skill applies the house aesthetic by default on
  any UI/frontend work across projects.
