# Accent Buttons and Accent Cards — Design Spec

> This is the Lux Swiss half of a two-repo design. Tri-Swiss's
> counterpart spec lives in `luxsolari/tri-swiss`
> (`docs/superpowers/specs/2026-07-07-accent-buttons-cards-and-hero-turquoise-design.md`)
> and additionally covers a dual-accent hover pattern and hero changes —
> neither applies here, since Lux Swiss has only one accent color and no
> "does the tertiary color register on load" problem (it has no
> tertiary color).

Status: approved
Date: 2026-07-07
Repo: `luxsolari/lux-swiss` (branch `feat/accent-buttons-and-cards`)

## 1. Purpose

Very little hover-color use exists on buttons today: of the four button
variants, only Destructive (added last round) uses Blood Red for its
border/hover — Ghost/Outlined/Filled all hover via ink/muted-foreground
only. Cards have no hover state at all. This spec adds two new
component patterns that use Blood Red more richly, without touching the
existing defaults.

## 2. Non-goals

- Not a redesign of the existing Ghost/Outlined/Filled buttons or the
  existing plain Card / Emphasis card — all unchanged, this is additive.
- No second accent color, no dual-accent hover pattern, no hero changes
  — those are Tri-Swiss-specific (see the note above).
- Not a second (or any additional) color. Ink, cream, and Blood Red
  remain the only three color tokens.

## 3. Accent button and Accent card

**Accent button** — a new, fifth button variant: `border-primary`,
background none at rest; hover fills solid (`bg-primary`,
`text-primary-foreground`). Same swap mechanism as the existing
Destructive button, but for general emphasis/non-destructive use — e.g.
a secondary call-to-action that wants more visual weight than Ghost but
isn't a destructive action. Named "Accent" (not "Primary") to avoid
confusion with the existing `--primary` token name and the Filled
button's already-established "primary action, rare" role.

**Accent card** — a new static card variant: a Blood-Red border plus a
subtle red-tinted background wash (e.g. `bg-primary/5`), stronger than
the existing plain-bordered "Emphasis card" (which uses a red border
alone, no wash). Since this system has only one accent, the
differentiation from Emphasis card is the added wash, not a new color.

## 4. Interactive card

A new clickable card pattern (an `<a>` or `<button>` wrapping card
content): ink border at rest, transitioning to Blood Red on hover — the
system's normal, single-accent hover hierarchy (Red is the only accent,
so it trivially carries this real hover signal, per the "Hover states"
section added last round). No new exception needed here, unlike
Tri-Swiss's dual-accent variant of the same pattern.

## 5. Files and page changes

- `skills/lux-swiss/SKILL.md` — add the Accent button variant (Buttons
  section) and the Accent card / Interactive card patterns (Philosophy
  or a new subsection).
- `skills/lux-swiss/references/components.md` — full HTML patterns for
  Accent button, Accent card, and Interactive card, including a
  Default/Hover swatch pair for each of the two hoverable ones.
- `docs/index.html` — new Accent button + Accent card + Interactive card
  demos in the Components section, with Default/Hover swatches.
- `docs/assets/*.png` — re-capture to show the new Components-section
  demos.
- `CHANGELOG.md` — new entries under `[Unreleased]` → `### Added`
  documenting the Accent button, Accent card, and Interactive card.
- `README.md` / `CONTRIBUTING.md` — reflect the new patterns in the
  aesthetic-summary / Design-changes paragraphs.

## 6. Rollout

Branch `feat/accent-buttons-and-cards` off `main`, following this
repo's own `AGENTS.md` conventions (Conventional Commits,
changelog-first, branch+PR only, no direct pushes to `main`).
