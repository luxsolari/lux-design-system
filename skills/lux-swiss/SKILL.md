---
name: lux-swiss
description: >
  Lux Swiss (formerly Duotone Swiss) — Lux Solari's house design system. A
  strict two-color visual language (ink + warm cream) with a single blood-red
  accent, Swiss-minimalist layout, visible borders, no shadows, and Space Mono
  / Space Grotesk typography. Use this skill whenever building, styling, or
  restyling ANY user interface: React/Next/Svelte/Vue components, HTML pages,
  landing pages, dashboards, buttons, cards, forms, navigation, modals, tags,
  charts, or Tailwind/CSS themes — even when the user does not name the design
  system explicitly. Apply it by default so every project shares the same
  aesthetic. Also trigger on phrases like "make this look good", "style this",
  "apply my design system", "duotone", "lux swiss", "swiss", "give it a
  theme", or when starting a new frontend from scratch. When another design
  language is explicitly requested (Material, shadcn defaults untouched, a
  client's brand kit), defer to that instead.
---

# Lux Swiss — Design System

A strict, minimalist visual language. Two functional colors plus one accent, hard
borders, generous whitespace, monospace labels. The whole point is restraint: every
element earns its place or is removed, and **difference is expressed through
typography, spacing, and contrast — never by adding a color.**

Lux Swiss is one of Lux Solari's two house-mark design systems — the
personal brand identity carried into every project built with them. Its
sibling, [Tri-Swiss](https://github.com/luxsolari/tri-swiss), applies the
same governance philosophy through a tri-tone palette with a governed
Pastel Turquoise highlight; see `HOUSE-MARK.md` for how the two relate.

## When you apply this

Whenever you build or restyle UI, reach for these tokens and patterns by default
instead of inventing ad-hoc colors or leaning on a component library's stock look.
Three setup moves come first on any new project:

1. **Ask which font flavor to use.** Before applying the system, ask the
   user: **Space** or **Geist**? Both share the same three roles (mono,
   sans, serif) and differ only in the mono/sans pair — Space Mono +
   Space Grotesk vs. Geist Mono + Geist Sans; Zilla Slab is shared by
   both (see [Typography](#typography)). **Default to Space** if they
   have no preference. Apply Geist by adding the `.geist` class to
   `<html>` (it composes with `.dark`, exactly like the theme).
2. **Install the theme.** Copy [`assets/theme.css`](assets/theme.css) into the
   project's global stylesheet (e.g. `app/globals.css`). It defines every CSS
   variable for light + dark mode, both font flavors, and the optional Jost
   heading accent, and wires them to Tailwind 4 via `@theme inline`.
   For non-Tailwind stacks the same `:root` / `.dark` / `.geist` / `.jost`
   variables work as plain CSS custom properties.
3. **Load the fonts.** Add the Google Fonts link for the chosen flavor
   (below) or the framework equivalent (`next/font`, etc.) — just that
   flavor's families, not both, unless the project needs a live toggle.
   Add Jost's link separately only if you're using the [heading
   accent](#heading-accent--jost-governed-optional) — it's opt-in,
   not part of the base setup.

Then compose UI from the patterns in this file. For the full component library
(status pips, modals, toggles, SVG charts) see
[`references/components.md`](references/components.md).

## Philosophy — two rules that govern everything

**Duotone strict.** Ink and cream are the two functional colors; blood red is the
lone accent. No success green, no info blue, no second accent. Win/loss,
active/inactive, emphasis, error — all differentiated by weight, size, spacing, and
contrast. If you feel the urge to add a color, add a `font-bold`, a size step, or
whitespace instead.

Blood red also has a third job beyond accent/destructive/ring: a
**Structural Block** — a solid-color sidebar/nav rail or hero band (pick
one per layout, capped at ~25% of viewport width/height), plus an
independent bold-word accent inside a heading that may combine with
either. This is not a second color — it is a new layout job for the one
accent this system already has. Outside that one block, ink and cream
continue to dominate every other surface exactly as before.

The two-color segment stripe isn't limited to one instance: it may be
reused at any length as a decorative divider or spacer — a small marker
before a heading, a wider closing flourish — anywhere a purely
decorative rule would otherwise go, as long as it stays two *equal*
segments, ink then Blood Red, and is used selectively rather than
replacing the default `bg-border` divider throughout.

**Swiss-minimalist.** Borders are visible (1px solid, full ink or full cream). No
shadows — elevation comes from a background-color step (`--card` vs `--background`).
Whitespace is generous. Labels are uppercase monospace with wide letter-spacing.
Corners are mostly square.

## Palette

Use the semantic token, never a raw hex. `bg-background`, `text-foreground`,
`border-border`, `text-muted-foreground`, `bg-primary`, etc.

### Light mode
| Token | Hex | Role |
|-------|-----|------|
| `--background` | `#f5efe0` | Page background — warm cream |
| `--foreground` | `#0a0a0a` | Body text, active controls, borders |
| `--card` | `#faf6ec` | Elevated surface — card, popover |
| `--card-foreground` | `#0a0a0a` | Text on card surfaces |
| `--primary` | `#8b2e2e` | Blood red — accent, destructive, ring |
| `--primary-foreground` | `#f5efe0` | Text on primary |
| `--secondary` | `#0a0a0a` | Secondary action background |
| `--secondary-foreground` | `#f5efe0` | Text on secondary |
| `--muted` | `#ebe5d5` | Subtle backgrounds — hover, code blocks |
| `--muted-foreground` | `#4a4a48` | Subdued labels, metadata, placeholders |
| `--border` | `#0a0a0a` | All borders — full ink for structural clarity |
| `--input` | `#faf6ec` | Input field background |
| `--ring` | `#8b2e2e` | Focus ring |

### Dark mode
| Token | Hex | Role |
|-------|-----|------|
| `--background` | `#0a0a0a` | Near-black |
| `--foreground` | `#f5efe0` | Cream text |
| `--card` | `#161616` | Slightly lifted surface |
| `--primary` | `#c04545` | Red lifted for dark contrast |
| `--secondary` | `#f5efe0` | Inverted |
| `--secondary-foreground` | `#0a0a0a` | — |
| `--muted` | `#1f1f1f` | Subtle dark surface |
| `--muted-foreground` | `#a8a8a0` | Warm grey — readable but recessed |
| `--border` | `#f5efe0` | Full cream — maintains structural clarity |
| `--input` | `#161616` | — |
| `--ring` | `#c04545` | — |

Dark mode is the `.dark` class on `<html>`. Toggle with
`document.documentElement.classList.toggle("dark", isDark)` and persist under a
`theme` key in `localStorage`. In Tailwind 4 the variant is
`@custom-variant dark (&:is(.dark *));` (already in `theme.css`).

### The brand-moment device — read this before using it

Lux Swiss has no second color, so it needs a different way to express
Tri-Swiss's "one governed brand moment" job (that system uses a rare
highlight color for it). Here it's typographic: **exactly one element per
page** — the hero wordmark — renders larger and bolder than anything else
on the page. Neither Space Grotesk nor Space Mono actually ships a weight
past 700 (already every heading's weight), so this device combines the
heaviest real weight (700) with a deliberate size jump — dramatically
larger than the type scale otherwise allows. Zero new color, used exactly
once per page; every other heading keeps the normal type scale.

## Typography

Three roles, strictly separated by function, in **two font flavors** that
share the same serif and swap only the mono/sans pair. Never swap a
role's job, and never run a third flavor.

| Role | Space (default) | Geist (flavor) | Use |
|------|------|------|-----|
| Display / mono (`font-mono`) | **Space Mono** | **Geist Mono** | Data values, tags, nav, labels — functional UI text, not headings |
| Body / sans (`font-sans`) | **Space Grotesk** | **Geist Sans** | Body copy, UI text, prose, and dense-data/utility text (tables, fine print) at smaller size with tabular figures |
| Serif / long-form (`font-serif`) | **Zilla Slab** | **Zilla Slab** (shared) | Long-form editorial body and pull-quotes. Never UI. |

Headings (`h1`–`h6`) render through a fourth, dependent role,
`font-display`, which defaults to `font-mono` — see [Heading accent —
Jost](#heading-accent--jost-governed-optional) below.

Space Grotesk is the proportional cousin of Space Mono (it was drawn from
it) — a *duotone of one skeleton*, mirroring the two-color rule. Zilla
Slab is a slab serif derived from a monospace (Fira Mono), echoing the
same lineage, which is why it stays identical across both flavors.

Drive every font through three role variables; a `.geist` class swaps
the flavor exactly like `.dark` swaps the theme:

```css
:root { --font-mono:'Space Mono',ui-monospace,monospace; --font-sans:'Space Grotesk',system-ui,sans-serif;
        --font-serif:'Zilla Slab',Georgia,serif; }
.geist { --font-mono:'Geist Mono',ui-monospace,monospace; --font-sans:'Geist',system-ui,sans-serif; }
```

Load only the chosen flavor's two families plus Zilla Slab — three
families, not five, unless the project needs a live toggle:

```html
<!-- Space flavor (default) -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Zilla+Slab:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
<!-- Geist flavor -->
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;700&family=Geist+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Zilla+Slab:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
```

Both sans faces load as **variable fonts**, requested at just the four
weights actually used (300/400/500/700) rather than their full axis;
both mono faces load regular + bold, roman + italic; Zilla Slab loads
its usual four cuts.

**Range comes from weight, not more typefaces.** Exactly as difference is expressed
through weight/space/contrast rather than a new color, hierarchy is expressed
through the weight axis rather than a new face. Sans weight scale (same four
stops in either flavor):

| Weight | Use |
|--------|-----|
| **300** Light | Large display sub-decks, lead paragraphs |
| **400** Regular | Body copy |
| **500** Medium | UI emphasis, active labels, small headings in prose |
| **700** Bold | Strong emphasis — sparing; prefer 500 |

**Heading scale** — `font-display` (mono by default, Jost when toggled),
weight 700: `h1` 3rem/−0.02em/1.1 · `h2` 2.25rem/−0.02em/1.15 ·
`h3` 1.875rem/−0.01em/1.2 · `h4` 1.5rem/1.3 · `h5` 1.25rem/1.3 ·
`h6` 1.125rem/1.3.

**Body** — sans, weight 400, 1rem base, line-height 1.65, `kern`/`liga`/`calt`
on, antialiased.

**Label pattern** (pervasive — nav, metadata, section headers): mono,
`text-xs`, `uppercase`, `tracking-[0.2em]`, weight 400 inactive / 700 active,
`text-muted-foreground` inactive → `text-foreground` active.

**Tabular figures for data.** Numerals in a column, table, chart axis, or stat
block get `font-variant-numeric: tabular-nums` (`font-feature-settings: "tnum" 1`)
so digits share one width and align to the grid — the typographic equivalent of
the system's hard borders. Prose numerals stay proportional (the default).

**Mono italic** is reserved for one structural job: **inline annotations and
figure captions** (e.g. a `<figcaption>` or a marginal note) — Space Mono
italic in the Space flavor, Geist Mono italic in the Geist flavor. It is
never used for emphasis — emphasis is always weight. Treat it as a
distinct voice for asides, not a highlighter.

### Heading accent — Jost (governed, optional)

A fourth typeface, driven through a single dependent role variable,
`--font-display`, not a third flavor. **Every heading** (`h1`–`h6`) —
plus the hero title/wordmark and long-form section/chapter dividers,
which are styled as headings — renders through `--font-display`. It
defaults to `var(--mono)` (no visible change from the active flavor)
until the `.jost` class is applied, at which point Jost takes over
every heading site-wide, giving it real protagonism rather than a
single narrow appearance. Labels, nav, tags, table headers, and data
values stay on `--font-mono` directly — those are functional UI text,
not headings, and keep the monospace-label identity this system shares
with Tri-Swiss.

Unlike `.geist`, `.jost` is **not** a flavor: it composes independently
with either flavor and with `.dark`, exactly like `.dark` composes with
`.geist`. There's no natural monospace cousin of Jost the way Space
Grotesk/Mono or Geist Sans/Mono share DNA, so it never touches `--mono`
or `--sans` directly — only headings move, through `--font-display`.

```css
:root { --display: var(--mono); }
.jost { --display: "Jost", ui-sans-serif, system-ui, sans-serif; }
```

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@700&display=swap" rel="stylesheet" />
```

Jost loads at a single weight (700) — every heading is already weight
700 per the heading scale above, so it never needs a weight axis of its
own.

```jsx
<h1 className="font-display">Page Title.</h1>
<h2 className="font-display">Section Title.</h2>

{/* Hero title/wordmark and editorial chapter dividers are styled as
    headings, not marked up as <h1>-<h6> — they use font-display directly: */}
<div className="font-display" style={{ fontSize: "4.5rem", fontWeight: 700 }}>
  Lux Swiss.
</div>

<div className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
  02 — Chapter Title
</div>
```

## Spacing & layout

- **Max content width:** 1000–1200px centered, `px-6` gutters.
- **Radius:** restrained — `0.5rem` base, rarely used. Most corners are square.
- **Borders:** 1px solid `--border` everywhere. **No shadows** — elevation is a
  background step (`--card` on `--background`).
- **Section header:** uppercase mono label with a full-width rule beside it.

```jsx
<div className="mb-4 flex items-baseline gap-3">
  <h5>Section title</h5>
  <span className="h-px flex-1 bg-border" />
</div>
```

## Buttons

All buttons: `font-mono uppercase tracking-[0.2em] text-xs`. Five variants:

- **Ghost / nav** (most common): `text-muted-foreground hover:text-foreground
  transition-colors`, no border.
- **Outlined:** `border border-foreground px-4 py-2 hover:bg-foreground
  hover:text-background`.
- **Filled** (primary action, rare): `border border-foreground bg-foreground px-4
  py-2 text-background hover:bg-foreground/90`.
- **Destructive:** `border border-primary text-primary px-4 py-2
  hover:bg-primary hover:text-primary-foreground` — Red's already-named
  "destructive" job (see Philosophy), now with a documented variant.
- **Accent:** `border border-primary text-primary px-4 py-2
  hover:bg-primary hover:text-primary-foreground` — general emphasis,
  not destructive. Same swap mechanism as Destructive — a separate
  semantic name for a different use, not a different visual treatment
  (this system has only one accent to draw on).

**Disabled** is always `opacity-40` — never a color change.

## Hover states

Red is the only accent this system has, so it trivially carries any
real hover-state signal wherever an accent color participates in a
hover — there's no second color to subordinate. The gap this closes is
visibility, not governance: hover states weren't demonstrated anywhere
on the showcase page without an actual pointer. The new Destructive
button above, and a static "Default / Hover" swatch pair for it and for
the sidebar nav link, now show what was already true.

The new Accent button and Interactive card (see
`references/components.md`) are further demonstrations of the same
rule — more color on hover/borders, using the one accent this system
has, not a new pattern.

## Tags / pills

Small inline badges: `font-mono text-[0.65rem] px-2 py-0.5 uppercase
tracking-[0.12em]`.

- **Neutral:** plain text, `text-muted-foreground`.
- **Signal** (latest / highlight): `bg-foreground text-background`.
- **Outlined:** `border border-dashed border-foreground/50 text-foreground/80`, 4px
  dot prefix.
- **Saved:** `border border-foreground/30 text-foreground/50`, 4px dot prefix.

`rounded-full` is reserved for dot indicators only — never on containers or pills.

## Lists / tables

**Lists.** No default round bullet glyphs. Unordered list items get a
thin top-border divider between rows (`border-top:1px solid
var(--border)`) instead of a bullet mark. Ordered list items use
tabular mono-font numbers (`font-mono`, Space Mono) followed by
body-font (`font-sans`, Space Grotesk) item text.

**Tables.** Bold mono-font (`font-mono`) header row with a 2px bottom
border (matching the `.rule`/divider style used throughout this page),
1px `border-border` between body rows, `tabular-nums` right-aligned for
numeric columns. No zebra striping — kept consistent with the existing
"no invented decoration" pattern.

**Guardrail: markers and borders stay neutral.** List dividers and
table borders/headers use ink/muted-foreground only — **never** the
Blood Red accent. Using the accent as a decorative list/table marker
would be a new, unsanctioned use of a color reserved for its named jobs
(action, emphasis, hover). This is a hard rule, not a style preference.

## Images

Neither the theme nor the component library had an opinion on images
until now.

**Grid placement.** An image sits inside a bordered container (1px
`border-border`, matching the existing card border style) spanning a
defined number of grid columns, at a consistent aspect ratio (e.g. 4:3
or 16:9) rather than an arbitrary crop, with a mono-label caption
beneath it (reusing the existing `.label` caption convention already
used elsewhere on the page).

**Color treatment.** The **default and recommended** treatment is a
grayscale or duotone filter (`filter: grayscale(1)` or a duotone
technique mapped toward ink+cream) — this keeps the "only three color
tokens, ever" invariant airtight and matches the historical
Swiss/International Typographic Style tradition of black-and-white
photography. **Full color is permitted specifically when the image
itself is the primary content** — e.g. a blog post's photography, a
portfolio gallery, product photography — not as a general license for
decorative images sprinkled through UI chrome. This is a scoped, named
exception, not an open "designer's choice."

## Iconography

Icons are permitted but strictly constrained so they obey the same rules as the
rest of the system. **Lucide is the single sanctioned icon set** — mirroring the
two-font rule, no other icon library, no icon fonts, no emoji.

Restyle Lucide's three off-identity defaults; keep everything else:

| Attribute | Lucide default | Lux Swiss |
|-----------|---------------|---------------|
| `stroke-width` | `2` | `1.5` |
| `stroke-linecap` | `round` | `square` |
| `stroke-linejoin` | `round` | `miter` |

Apply via one CSS rule (CSS overrides SVG presentation attributes, so the raw
Lucide markup needs no editing):

```css
.icon { width: 20px; height: 20px; fill: none; stroke: currentColor;
  stroke-width: 1.5; stroke-linecap: square; stroke-linejoin: miter; }
```

Icons are 16–20px, `currentColor` (inherit `foreground`/`muted-foreground`;
`primary` only for the destructive/accent cases already reserved for it), and
**augment** the uppercase-mono labels — never replace them.

## Charts

Hand-rolled SVG is the default — the simple charts (timeline strip, share bars,
single differential line) are ~20 lines of raw SVG. Colors are foreground / muted
/ primary only; `width="100%"`, fixed height, `viewBox` from the data range.

When scales / axes / many-series / interaction genuinely warrant a library, the
**single sanctioned choice is [Observable Plot](https://observablehq.com/plot)**
(framework-agnostic SVG — no other chart library, no canvas libs). Restyle it to
the palette: set mark `fill`/`stroke` to `--foreground`/`--muted-foreground`/
`--primary` explicitly (never Plot's default color scheme), disable the color
legend, keep bars square, use explicit muted grid marks, and restyle axes to the
mono label pattern. Encode categories/emphasis with solid-vs-dashed strokes,
fill-opacity, and outline rings — never a new color. See
[`references/components.md`](references/components.md) for the full pattern.

## Do not

- **No success green / info blue / second accent.** Weight, size, or layout instead.
- **The Structural Block and brand-moment device are not new colors.**
  They're a new layout job for the one accent this system already has
  (Structural Block) and a typographic-only device (brand moment) —
  neither adds a second hue.
- **No shadows.** Depth is border presence + background steps.
- **No chart libraries except restyled Observable Plot.** Hand-rolled SVG is the
  default; reach for Plot only when complexity earns it, restyled to the palette.
- **No `rounded-full` on containers.** Dots only.
- **No raw hex in markup.** Always the semantic token.
- **Icons: restyled Lucide only.** Monoline, `currentColor`, square caps. No icon
  fonts. **No emoji** in UI text unless explicitly requested.
- **No accent-colored list markers or table borders.** Dividers, numbers,
  and header rules stay ink/muted-foreground — Blood Red is reserved for
  its named jobs, not decoration in a list or table.
- **No full-color images outside the named photography-content
  exception.** Default to grayscale/duotone; full color is only for
  images that are themselves the primary content (see "Images").
