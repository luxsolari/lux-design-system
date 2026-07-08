# Showcase Content Expansion — Design Spec

> This is the Lux Swiss half of a two-repo design. Tri-Swiss's
> counterpart spec lives in `luxsolari/tri-swiss`
> (`docs/superpowers/specs/2026-07-07-showcase-content-expansion-design.md`).
> The grid/border/caption mechanics for lists, tables, and images are
> shared between the two repos; only the exact tokens (three color
> tokens here vs. four there, three type registers here vs. four there)
> differ.

Status: approved
Date: 2026-07-07
Repo: `luxsolari/lux-swiss` (branch `feat/showcase-content-expansion`)

## 1. Purpose

The showcase page demonstrates the design system, but several content
types a real implementation would need are entirely absent (lists,
tables, images) or under-demonstrated (the three type registers are each
a single generic sentence, and there's no way to see how the system
handles short vs. long-form content). This is a content-only pass: no
new page navigation, no restructuring of the existing
hero→install→rules→palette→typography→registers→components→charts flow
— new content lands inside or alongside existing sections.

The goal is a showcase page (and the `SKILL.md`/`components.md` reference
docs behind it) rich enough to serve as a genuine implementation
reference — "here's a full sentence of what a data table looks like in
this system," not just "here are four buttons."

## 2. Non-goals

- No page navigation/TOC restructuring — single-page scroll stays as-is.
- No new rules for the three type registers themselves — `SKILL.md`'s
  `## Typography` section is already complete and correct; the
  `#registers` section on the page just needs richer, more realistic
  per-register examples, not new prose rules.
- No new SKILL.md rule for the new text-length section — it demonstrates
  that existing spacing/measure rules hold at any content length; it
  isn't introducing a new rule of its own.
- Not a redesign of any existing section (palette, existing buttons/cards,
  charts) — this is additive only.
- Not a fourth color token, not a fourth type register — Lists/Tables and
  Images-in-grid reuse the existing three color tokens and three type
  registers; they don't introduce new ones.
- No dual-accent complexity, no second accent color anywhere in this
  work — this repo has only Blood Red (see Tri-Swiss's spec for where
  that diverges).

## 3. Lists and tables (new components)

**Lists.** No default round bullet glyphs. Unordered list items get a
thin top-border divider between rows (`border-top:1px solid
var(--border)`), matching the existing "visible border, no shadow"
convention rather than a bullet mark. Ordered list items use tabular
mono-font numbers (`--font-mono`, Space Mono) followed by body-font
(`--font-sans`, Space Grotesk) item text.

**Tables.** A data table with a bold mono-font (`--font-mono`) header row
and a 2px bottom border on the header (matching the existing
`.rule`/divider style used throughout the page), a 1px `var(--border)`
line between body rows, and `font-variant-numeric:tabular-nums`,
right-aligned for numeric columns. No zebra striping — kept consistent
with the system's existing "no invented decoration" pattern.

**Guardrail:** list markers/dividers and table borders/headers stay in
ink/muted-foreground only — **never** the Blood Red accent token. Using
the accent as a decorative list/table marker would be a new,
unsanctioned use of a color reserved for its named jobs (action,
emphasis, hover). This is a hard rule, not a style preference.

## 4. Images in the grid (new guidance — nothing exists today)

Neither `SKILL.md` nor the showcase page currently has any opinion on
images. This spec adds:

- **Grid placement:** an image sits inside a bordered container (1px
  `var(--border)`, matching the existing card border style) that spans a
  defined number of grid columns, at a consistent aspect ratio (e.g. 4:3
  or 16:9) rather than an arbitrary crop, with a mono-label caption
  beneath it (reusing the existing `.label` caption convention already
  used elsewhere on the page).
- **Color treatment:** the **default and recommended** treatment is a
  grayscale or duotone filter (CSS `filter: grayscale(1)` or a duotone
  technique mapped toward ink+cream) — this keeps the system's "only
  three color tokens, ever" invariant airtight and matches the historical
  Swiss/International Typographic Style tradition of black-and-white
  photography. **Full color is permitted specifically when the image
  itself is the primary content** — e.g. a blog post's photography, a
  portfolio gallery, product photography — not as a general license for
  decorative images sprinkled through UI chrome. This is a scoped, named
  exception, not an open "designer's choice."

## 5. `#registers` section — richer per-register examples

Each of the three existing one-line specimens becomes a fuller,
realistic example demonstrating what that register is actually for,
replacing the generic placeholder sentence with real content:

- **Display / Space Mono** — already reasonably demonstrated (the
  wordmark-style sample); no change needed beyond what exists.
- **Body / Space Grotesk** — the current one-liner ("The primary
  reading, UI, and dense-data voice") becomes a short realistic UI
  paragraph, similar in register to the existing hero body copy.
- **Serif / long-form / Zilla Slab** — the current one-liner becomes an
  actual short article-excerpt paragraph (2-3 sentences of real editorial
  prose), not a description of what the register is for.

The existing blockquote pattern (Zilla Slab, italic, left border) is
unchanged. Unlike Tri-Swiss, this repo has no separate annotation
register (Space Mono covers display; there's no italic-annotation
register here) — nothing to add for that.

## 6. New text-length section

A new section (placed near `#registers`, since it's about typography)
demonstrating that the system's spacing/measure rules hold at any
content length — independent of which register is used, all set in the
primary body voice (`--font-sans`, Space Grotesk):

- **Short** — a one-line label or caption.
- **Medium** — a standard body paragraph (3-4 sentences), matching the
  measure already used elsewhere (`max-width:60ch`-ish).
- **Long-form** — a 3-4 paragraph excerpt, same measure, demonstrating
  paragraph spacing at length.

## 7. Files and page changes

- `skills/lux-swiss/SKILL.md` — new `## Lists / tables` section (rules +
  the accent-color guardrail from §3); new `## Images` section (grid
  placement + color-treatment rule from §4). No changes to `## Typography`
  (already correct).
- `skills/lux-swiss/references/components.md` — full HTML patterns for
  the list, table, and image-in-grid components.
- `docs/index.html` — new Lists/Tables demo (likely inside or alongside
  `#components`), new Images-in-grid demo (new small section), richer
  `#registers` specimens, and the new text-length section.
- `docs/assets/*.png` — re-capture to reflect all new/changed sections.
- `CHANGELOG.md` — new entries under `[Unreleased]` → `### Added`.
- `README.md` / `CONTRIBUTING.md` — reflect the new components/guidance
  in the aesthetic-summary / Design-changes paragraphs.

## 8. Rollout

Branch `feat/showcase-content-expansion` off `main`, following this
repo's own `AGENTS.md` conventions (Conventional Commits, changelog-first,
branch+PR only, no direct pushes to `main`).
