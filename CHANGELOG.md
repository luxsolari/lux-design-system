# Changelog

All notable changes to this plugin are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/); this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.0] — 2026-07-10

### Added
- **Jost heading accent** — a governed, optional fourth typeface that
  gives **every heading** (`h1`–`h6`), plus the hero title/wordmark and
  long-form editorial chapter dividers (styled as headings), real
  protagonism when toggled — via a new `--font-display` role (defaults
  to `--font-mono`, no separate face, until the `.jost` class is
  applied). Labels, nav, tags, and data values stay on `--font-mono`
  directly — functional UI text, not headings. Unlike `.geist`, `.jost`
  is not a flavor — it never touches `--font-mono`/`--font-sans`
  directly, so it composes independently with either flavor and with
  `.dark`, exactly like `.dark` composes with `.geist`. The showcase
  page gets a third, independent sidebar toggle ("Hero display": Mono ·
  Jost) that reskins every heading on the page, including a live
  "02 — Chapter Title" example demonstrating the editorial-divider job,
  and `scripts/capture/capture.mjs` can screenshot any flavor/accent
  combination.

## [2.2.0] — 2026-07-10

### Added
- **Geist font flavor** — a `.geist` class (composes with `.dark`, exactly
  like the theme) that swaps `--font-mono`/`--font-sans` from Space
  Mono/Space Grotesk to Geist Mono/Geist Sans; `--font-serif` (Zilla
  Slab) is shared by both flavors and never overridden. `SKILL.md`'s
  setup steps ask which flavor to apply (default: Space), each with its
  own 3-family Google Fonts link (down from the old 4-role/6-family
  MAIN/ALT variant this replaces — 2 roles ever swap, not 4). The
  showcase page (`docs/index.html`) gets a live Space·Geist toggle next
  to the Light·Dark one, and `scripts/capture/capture.mjs` can screenshot
  either flavor.
- **Serif promoted from an optional register to a core role** —
  `SKILL.md`'s Typography section now documents mono/sans/serif as one
  three-role table instead of a two-font core plus a separately-governed
  "optional register."

## [2.1.0] — 2026-07-08

### Added
- **Accent button** — a fifth button variant (Red-bordered, general
  emphasis rather than destructive) using the same mechanism as the
  existing Destructive button — a separate semantic name, not a
  different visual treatment (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Accent card and Interactive card** — a new static Red-bordered card
  with a background wash, and a new clickable card with an ink-to-Red
  hover transition — more color on hover/borders across cards, not just
  buttons (`SKILL.md`, `references/components.md`, `docs/index.html`).
- **Lists and tables** — new component patterns: an unordered/ordered
  list treatment (thin top-border dividers, no bullet glyphs, tabular
  mono-font numbers) and a data table (bold mono header, tabular-nums,
  no zebra striping) — markers and borders stay ink/muted-foreground
  only, never the accent color (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Images in the grid** — new guidance for the first time: grid-aligned
  placement with a bordered container and mono-label caption, defaulting
  to a grayscale/duotone color treatment with full color permitted only
  as a scoped, named exception when the photograph itself is the
  primary content (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Richer typography demonstrations** — the `#registers` section's
  Body and Serif specimens now show full realistic examples instead of
  one-line placeholders, and a new "Content at any length" section
  demonstrates short/medium/long-form body copy at the same measure
  (`docs/index.html`).

### Fixed
- **Stray hardcoded font name in the Observable Plot reference snippet**
  — `references/components.md`'s chart example set `fontFamily` to a
  literal `'Space Mono', monospace` instead of `var(--font-mono)`, the
  only place in the system that bypassed the font role variables (the
  shipped `docs/index.html` chart already used the token correctly).

## [2.0.0] — 2026-07-07

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
- **Two-color segment stripe** (ink, Blood Red) — a static decorative
  divider/spacer pattern, reusable at any length rather than a single
  fixed instance, demonstrated at three different lengths on the
  showcase page (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Showcase page restructure** — `docs/index.html` now uses a persistent
  sidebar nav (wordmark, anchor nav, theme toggle, GitHub link,
  copyright), collapsing to a red top band with a hamburger toggle below
  the mobile breakpoint.
- **Destructive button and hover-state visibility** — a new Destructive
  button variant (Red's already-named "destructive" job, now with a
  documented variant), plus two "Default / Hover" static swatch pairs
  (destructive button, nav link) so hover states are visible on the
  showcase page without a live pointer (`SKILL.md`,
  `references/components.md`, `docs/index.html`).

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
- **BREAKING CHANGE: dual-licensed the repo.** The design system itself
  (`skills/lux-swiss/`, `docs/index.html`, `docs/assets/`,
  `HOUSE-MARK.md`) is now licensed under CC BY-SA 4.0 instead of
  MIT/X11 — still free to use and adapt, including commercially, but now
  requiring attribution and that derivatives stay open under the same
  terms. Anyone relying on the previous MIT/X11 terms for this content
  should review `LICENSE-DESIGN`. Tooling and scripts remain MIT/X11.

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
