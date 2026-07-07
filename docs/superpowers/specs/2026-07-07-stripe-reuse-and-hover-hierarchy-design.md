# Segment Stripe Reuse and Hover-State Visibility — Design Spec

> This is the Lux Swiss counterpart to a sibling spec in `luxsolari/tri-swiss`
> (`docs/superpowers/specs/2026-07-07-turquoise-structural-block-and-hover-hierarchy-design.md`).
> That repo's spec has three parts: a Turquoise Structural Block, a
> reusable tri-part stripe, and a Red/Turquoise hover hierarchy. Only two
> of those three parts have a duotone-strict equivalent here — see §2.

Status: approved
Date: 2026-07-07
Repo: `luxsolari/lux-swiss` (branch `feat/stripe-reuse-and-hover-hierarchy`)

## 1. Purpose

Tri-Swiss's sibling spec addressed Tri-Swiss looking too similar to Lux
Swiss by giving Tri-Swiss's third color (Pastel Turquoise) real
structural presence. Lux Swiss has no third color, so that specific
problem doesn't apply here — but two smaller gaps do, and fixing them
keeps the two systems' documentation quality and demonstrated behavior
in step with each other:

1. The two-color segment stripe (ink, Blood Red) is a single fixed-width
   instance under the hero, not documented as reusable.
2. Hover states aren't visibly demonstrated anywhere on the showcase
   page — the same problem Tri-Swiss had before its own fix. Red is
   already named as carrying a "destructive" job in the Philosophy
   section, but no button variant or visible hover demonstration
   exists.

## 2. Non-goals — and why they don't apply here

- **No Turquoise-Structural-Block equivalent.** That feature exists
  because Tri-Swiss has a *second* accent color that needed its own,
  smaller layout job, kept clearly secondary to Red's block. Lux Swiss
  has one accent (Blood Red). Giving Red a second Structural Block
  instance would violate its own existing rule — sidebar or hero band,
  pick one, used once per page — not "loosen" duotone, but actually
  break an unrelated rule. This isn't a scoped-down version of the
  feature; the feature has no object to attach to here.
- **No "Red primary, X secondary" hover hierarchy.** That rule exists to
  arbitrate between two accent colors in a hover state. With one accent,
  there's nothing to arbitrate — Red trivially carries any real
  hover-state signal because it's the only accent that exists. What
  *does* carry over is making that already-true fact visible (see §4).
- **No fourth (or third) color.** Ink, cream, and Blood Red remain the
  only three color tokens.
- **No change to the existing Ghost/Outlined/Filled buttons.** They
  keep hovering via ink/muted-foreground shifts only — a new
  Destructive variant is added alongside them, nothing existing changes.
- **No change to the Structural Block, brand-moment device, or their
  guardrails** — those are unchanged, this spec is additive.

## 3. Segment stripe reuse

Today the two-color segment stripe (ink, Blood Red, two equal solid
blocks) is documented and shown as a single fixed-width (64px) bar under
the hero. This spec makes it a general decorative divider/spacer,
reusable at any length — mirroring Tri-Swiss's identical change to its
own (three-color) stripe.

**Rule:** the stripe may be used at any length as a decorative divider
or spacer — a small marker before a heading, a section divider, a wider
closing flourish — anywhere a purely decorative rule would otherwise go.
Height/thickness stays thin and consistent with the existing convention
(the two segments always equal width to each other, always ink then
Blood Red); only the overall length varies by context.

**Guardrails (unchanged from today, now stated explicitly for reuse):**

- Always two *equal* segments, ink then Blood Red — never reweighted,
  reordered, or expanded to a third color.
- Static and decorative only — never interactive, never a
  progress/status indicator, never carrying meaning.
- Used selectively (a handful of times per page) rather than replacing
  the default `bg-border` divider throughout.

## 4. Hover-state visibility

Red already carries a "destructive" job in name (Philosophy section:
"Structural Block... on top of primary/destructive/ring") but has no
documented button variant, and no hover state anywhere on the showcase
page is visible without an actual mouse — the same gap Tri-Swiss had.

**New Destructive button variant:** `border-primary text-primary`,
hover fills with `bg-primary`/`text-primary-foreground` — identical
mechanism to Tri-Swiss's own Destructive button, just without a second
color layered on top (there's nothing to layer).

**Two "Default / Hover" static swatch pairs** — a resting-state element
beside a second element carrying the exact same hover CSS applied via a
static modifier class, so the state is visible in a screenshot as well
as to a live pointer:

1. **Destructive button** — default vs. red hover fill.
2. **Nav link** — default (opacity 0.75) vs. hover (opacity 1). Unlike
   Tri-Swiss's nav-link swatch, there's no decorative flourish to add —
   the duotone system's nav-link hover is, and stays, a plain opacity
   shift.

## 5. Files and page changes

- `skills/lux-swiss/SKILL.md` — state the segment-stripe reuse rule in
  the Philosophy section (near the existing Structural Block
  discussion); add a new Destructive button variant to `## Buttons`; add
  a new `## Hover states` section noting Red already carries any real
  hover signal (trivially, being the only accent) and pointing at the
  new Destructive button and the nav-link swatch as the visible
  demonstration.
- `skills/lux-swiss/references/components.md` — update the "Two-color
  segment stripe" entry to show it at more than one length and state the
  reuse guardrails; add a Destructive-button Default/Hover swatch
  pattern and a nav-link Default/Hover swatch pattern.
- `docs/index.html` — add a small stripe marker before the "Components"
  heading (mirroring Tri-Swiss exactly) and a wider stripe divider
  within the Charts section, between the two existing chart figures (in
  addition to the existing hero instance); add a Destructive button to
  the existing Buttons demo; add the two Default/Hover swatch-pair demo
  cards. Both new stripe instances and both new demo cards land inside
  the already-captured `#components`/`#charts` sections — no new
  section IDs are introduced.
- `docs/assets/*.png` — re-capture to show the new stripe instances and
  swatches. No new capture-job entries are needed: `capture.mjs`'s
  existing jobs are `#palette`, `#components`, `#charts` (plus
  fullViewport hero and `#social-card`) — every change in this spec
  lands inside `#components` or `#charts`, both already captured.
- `CHANGELOG.md` — new entries under `[Unreleased]` → `### Added`
  documenting the stripe-reuse rule, the Destructive button variant, and
  the hover-visibility swatches.
- `README.md` / `CONTRIBUTING.md` — reflect the new patterns in the
  aesthetic-summary / Design-changes paragraphs.

## 6. Rollout

Branch `feat/stripe-reuse-and-hover-hierarchy` off `main`, following
this repo's own `AGENTS.md` conventions (Conventional Commits,
changelog-first, branch+PR only, no direct pushes to `main`).
