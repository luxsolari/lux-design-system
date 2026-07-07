# Structural Block Pattern (Tri-Swiss + Duotone Swiss) — Design Spec

> This is a copy of the spec from `luxsolari/tri-swiss` — the design decision
> spans both sibling systems. See that repo's
> `docs/superpowers/specs/2026-07-06-structural-block-and-duotone-weight-highlight-design.md`
> for the canonical version and any future amendments; this copy is kept for
> local discoverability in this repo's own implementation history.

Status: approved
Date: 2026-07-06
Repos: `luxsolari/tri-swiss` (branch `feat/expand-accents-drop-jost`) and
`luxsolari/lux-design-system` (this repo, branch
`feat/structural-block-and-weight-highlight`, off `main` @ `v1.0.0`)

## 1. Purpose

Give the primary accent in both house design systems a genuine structural
layout role — a solid color-block panel — and restructure each system's
showcase page to actually use it. Additionally, give Duotone Swiss the
functional equivalent of what Pastel Turquoise does in Tri-Swiss (a
governed "one special moment" device), expressed through typography
instead of a new color, so Duotone Swiss's two-color identity stays
literally true.

## 2. Non-goals

- Not a new color token. Ink, cream, and blood red remain the only three
  CSS custom properties for color; the brand-moment device is 100%
  typographic.
- Not a loosening of "no second accent" for anything other than the one
  new Structural Block job — tags, buttons, status pips, links are
  unaffected.
- Not a redesign of component semantics beyond what's needed to host the
  new sidebar nav.
- Not a rewrite of chart-series differentiation — the existing dash/
  opacity/outline-ring approach already covers that job.

## 3. The Structural Block pattern

A new, third job for Blood Red, on top of primary/destructive/ring. Three
forms:

1. **Sidebar / nav rail** — solid Blood Red panel, full viewport height,
   capped at ~25% of viewport width. Holds wordmark, in-page anchor nav,
   theme toggle, external link, copyright. Sticky/fixed.
2. **Hero band** — solid Blood Red horizontal block, used once. Alternative
   to the sidebar, never combined with it.
3. **Bold word/phrase accent** — one word inside a heading in Blood Red at
   normal weight/size. Independent of the two block forms, may combine
   with either.

**Guardrail update:** "duotone strict, no second accent" gets one explicit
carve-out: at most one Structural Block per layout, capped at ~25%
viewport width/height. Outside that block, ink/cream dominate every other
surface exactly as before.

## 4. The brand-moment device (Duotone Swiss's equivalent of Turquoise's "one moment" job)

Exactly one element per page — the hero wordmark — renders larger and
bolder than anything else on the page: Duotone Swiss's typographic
equivalent of Tri-Swiss's turquoise "one brand moment."

**Resolved during planning:** neither Space Grotesk nor Space Mono
actually ships a weight past 700 (verified directly against Google
Fonts — a `wght@300..900` request for Space Grotesk returns HTTP 400, and
Space Mono only serves 400/700). Since 700 is already every heading's
weight, a pure weight-only device would be indistinguishable from a normal
heading. This device combines the heaviest real weight (700, same as
headings) with a deliberate size jump — the brand-moment element is
dramatically larger than the type scale otherwise allows. Zero new color.
No Google Fonts `<link>` change needed (900 was never actually servable).

There is no Duotone Swiss equivalent of Tri-Swiss's turquoise hover-
flourish or tri-part segment stripe as three-color devices — Duotone Swiss
has only two structural colors plus the one accent, so its segment stripe
(§5 below) is two-color (ink, Blood Red), and there is no hover-flourish
mechanism since there's no second color to use for it.

## 5. Files and page restructure

- `skills/lux-design-system/SKILL.md` — add the Structural Block job and
  guardrail carve-out to the Philosophy section; add a new "brand-moment
  device" subsection; add a Do-not clarification that neither new device
  is a second color.
- `skills/lux-design-system/references/components.md` — new patterns:
  sidebar/nav rail, hero band, bold-word accent, the two-color segment
  stripe, and the weight+size brand-moment device.
- `docs/index.html` — full layout restructure: persistent sidebar
  (wordmark, anchor nav to Palette/Typography/Components/Charts, theme
  toggle, GitHub link, copyright), collapsing to a red top band with a
  hamburger toggle below the mobile breakpoint. Hero `<h1>` gets the
  weight+size brand-moment treatment. A new two-color segment stripe is
  added beneath it — **this repo's showcase page currently has no hero
  underline device at all** (confirmed by reading the file directly), so
  this is a pure addition, not a replacement.
- `docs/assets/*.png` — full re-capture (6 files: hero-light, hero-dark,
  palette, components, charts, social-card — this repo's capture script
  has no `type-registers.png` job, unlike Tri-Swiss's).
- `CHANGELOG.md` — this repo is already tagged `v1.0.0`, so this is a
  **new** `### Added` entry under a fresh `[Unreleased]` section, not an
  in-place edit.
- `README.md` / `CONTRIBUTING.md` — reflect the new pattern in the
  aesthetic-summary and Design-changes paragraphs.

## 6. Rollout

Branch `feat/structural-block-and-weight-highlight` off `main` (`v1.0.0`),
following this repo's own AGENTS.md conventions (Conventional Commits,
changelog-first, branch+PR only, no direct pushes to `main`).
