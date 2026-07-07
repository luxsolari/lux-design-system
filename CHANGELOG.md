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
- **`docs/PROMOTION.md`** — launch checklist and drafted repo topics/description.
- **Type-system depth** — Space Grotesk variable weight axis (300–700), tabular
  figures for data, and a reserved Space Mono italic for annotations/captions.
- **Optional type register** — Zilla Slab (serif, long-form/pull-quotes),
  governed with a strict role.
- **Structural Block pattern** for Blood Red — a solid-color sidebar/nav
  rail or hero band (capped at ~25% of viewport, pick one per layout),
  plus an independent bold word/phrase accent that may combine with
  either (`SKILL.md`, `references/components.md`).
- **Brand-moment device** — a governed, typographic-only equivalent of
  Tri-Swiss's turquoise "one brand moment" job: exactly one element per
  page (the hero wordmark) rendered at the heaviest available weight (700)
  combined with a deliberate size jump, since neither Space Grotesk nor
  Space Mono ships past weight 700 (`SKILL.md`, `references/components.md`).
- **Two-color segment stripe** (ink, Blood Red) — a static decorative bar
  pattern, demonstrated beneath the showcase page's hero title
  (`references/components.md`, `docs/index.html`).
- **Showcase page restructure** — `docs/index.html` now uses a persistent
  sidebar nav (wordmark, anchor nav, theme toggle, GitHub link,
  copyright), collapsing to a red top band with a hamburger toggle below
  the mobile breakpoint.

### Changed
- **BREAKING CHANGE: renamed Duotone Swiss to Lux Swiss.** The plugin slug
  changes from `lux-design-system` to `lux-swiss`; the GitHub repo, the
  skill directory, and every install command follow. Anyone who has
  already run `/plugin install lux-design-system@lux-solari-plugins` needs
  to reinstall as `/plugin install lux-swiss@lux-solari-plugins`.
  "Duotone" survives as a descriptive tagline, not the name.
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
