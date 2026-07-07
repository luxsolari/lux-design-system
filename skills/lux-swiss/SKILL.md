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
Two setup moves come first on any new project:

1. **Install the theme.** Copy [`assets/theme.css`](assets/theme.css) into the
   project's global stylesheet (e.g. `app/globals.css`). It defines every CSS
   variable for light + dark mode, and wires them to Tailwind 4 via
   `@theme inline`. For non-Tailwind stacks the same `:root` / `.dark` variables
   work as plain CSS custom properties.
2. **Load the fonts.** Add the Google Fonts link (below) or the framework
   equivalent (`next/font`, etc.).

Then compose UI from the patterns in this file. For the full component library
(status pips, modals, toggles, SVG charts) see
[`references/components.md`](references/components.md).

## Philosophy — two rules that govern everything

**Duotone strict.** Ink and cream are the two functional colors; blood red is the
lone accent. No success green, no info blue, no second accent. Win/loss,
active/inactive, emphasis, error — all differentiated by weight, size, spacing, and
contrast. If you feel the urge to add a color, add a `font-bold`, a size step, or
whitespace instead.

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

## Typography

Two fonts form the core, strictly separated by function — and they already share
DNA: **Space Grotesk is the proportional cousin of Space Mono** (it was drawn from
it). The pairing is a *duotone of one skeleton*, mirroring the two-color rule.
Never swap their roles.

| Font | Use |
|------|-----|
| **Space Grotesk** (`font-sans`) | Body copy, UI text, prose, and dense-data/utility text (tables, fine print) at smaller size with tabular figures |
| **Space Mono** (`font-mono`) | Headings, display, data values, tags, nav, labels |

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
```

Space Grotesk loads as a **variable font** (continuous `300..700` axis); Space Mono
loads its two weights plus **italics**.

**Range comes from weight, not more typefaces.** Exactly as difference is expressed
through weight/space/contrast rather than a new color, hierarchy is expressed
through the weight axis rather than a new face. Space Grotesk weight scale:

| Weight | Use |
|--------|-----|
| **300** Light | Large display sub-decks, lead paragraphs |
| **400** Regular | Body copy |
| **500** Medium | UI emphasis, active labels, small headings in prose |
| **700** Bold | Strong emphasis — sparing; prefer 500 |

**Heading scale** — Space Mono, weight 700: `h1` 3rem/−0.02em/1.1 ·
`h2` 2.25rem/−0.02em/1.15 · `h3` 1.875rem/−0.01em/1.2 · `h4` 1.5rem/1.3 ·
`h5` 1.25rem/1.3 · `h6` 1.125rem/1.3.

**Body** — Space Grotesk 400, 1rem base, line-height 1.65, `kern`/`liga`/`calt`
on, antialiased.

**Label pattern** (pervasive — nav, metadata, section headers): Space Mono,
`text-xs`, `uppercase`, `tracking-[0.2em]`, weight 400 inactive / 700 active,
`text-muted-foreground` inactive → `text-foreground` active.

**Tabular figures for data.** Numerals in a column, table, chart axis, or stat
block get `font-variant-numeric: tabular-nums` (`font-feature-settings: "tnum" 1`)
so digits share one width and align to the grid — the typographic equivalent of
the system's hard borders. Prose numerals stay proportional (the default).

**Space Mono italic** is reserved for one structural job: **inline annotations and
figure captions** (e.g. a `<figcaption>` or a marginal note). It is never used for
emphasis — emphasis is always weight. Treat it as a distinct voice for asides, not
a highlighter.

### Optional registers (governed)

The mono + sans core is canonical. One **sanctioned optional register** extends it
for projects that need it — governed as strictly as Lucide and Observable Plot,
with exactly one role:

| Register | Font (MAIN) | Role — nothing else |
|----------|-------------|---------------------|
| Serif | **Zilla Slab** | Long-form editorial body and pull-quotes. Never UI. |

Zilla Slab is a slab serif *derived from a monospace* (Fira Mono) — echoing how
Space Grotesk was drawn from Space Mono.

Drive every font through three role variables:

| Role | Font |
|------|------|
| Display / mono (`--font-mono`) | Space Mono |
| Body / sans (`--font-sans`) | Space Grotesk |
| Serif / long-form (`--font-serif`) | Zilla Slab |

```css
:root { --font-mono:'Space Mono',ui-monospace,monospace; --font-sans:'Space Grotesk',system-ui,sans-serif;
        --font-serif:'Zilla Slab',Georgia,serif; }
```

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Zilla+Slab:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
```

Never mix a register outside its role.

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

All buttons: `font-mono uppercase tracking-[0.2em] text-xs`. Three variants:

- **Ghost / nav** (most common): `text-muted-foreground hover:text-foreground
  transition-colors`, no border.
- **Outlined:** `border border-foreground px-4 py-2 hover:bg-foreground
  hover:text-background`.
- **Filled** (primary action, rare): `border border-foreground bg-foreground px-4
  py-2 text-background hover:bg-foreground/90`.

**Disabled** is always `opacity-40` — never a color change.

## Tags / pills

Small inline badges: `font-mono text-[0.65rem] px-2 py-0.5 uppercase
tracking-[0.12em]`.

- **Neutral:** plain text, `text-muted-foreground`.
- **Signal** (latest / highlight): `bg-foreground text-background`.
- **Outlined:** `border border-dashed border-foreground/50 text-foreground/80`, 4px
  dot prefix.
- **Saved:** `border border-foreground/30 text-foreground/50`, 4px dot prefix.

`rounded-full` is reserved for dot indicators only — never on containers or pills.

## Iconography

Icons are permitted but strictly constrained so they obey the same rules as the
rest of the system. **Lucide is the single sanctioned icon set** — mirroring the
two-font rule, no other icon library, no icon fonts, no emoji.

Restyle Lucide's three off-identity defaults; keep everything else:

| Attribute | Lucide default | Duotone Swiss |
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
- **No shadows.** Depth is border presence + background steps.
- **No chart libraries except restyled Observable Plot.** Hand-rolled SVG is the
  default; reach for Plot only when complexity earns it, restyled to the palette.
- **No `rounded-full` on containers.** Dots only.
- **No raw hex in markup.** Always the semantic token.
- **Icons: restyled Lucide only.** Monoline, `currentColor`, square caps. No icon
  fonts. **No emoji** in UI text unless explicitly requested.
