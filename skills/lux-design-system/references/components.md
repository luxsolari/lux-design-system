# Component Catalogue

Detailed patterns beyond the core set in `SKILL.md`. All snippets assume the theme
tokens from `assets/theme.css` are installed. Tailwind class names are shown; the
same tokens work as plain CSS custom properties on other stacks.

## Status pips (source / connection indicators)

Inline label with a leading dot whose color encodes state. State is expressed by the
dot color only — the text stays neutral.

```
inline-flex items-center gap-1.5
font-mono text-xs uppercase tracking-[0.15em]

dot: h-1.5 w-1.5 rounded-full
  connected:    bg-foreground
  warning:      bg-primary
  loading:      bg-muted-foreground/30 animate-pulse
  disconnected: bg-foreground/25
```

## Modal overlay

Backdrop dims the page with a translucent background (not a shadow). The panel is a
hard-bordered box.

```
overlay: fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-6
panel:   w-full max-w-[560px] border border-foreground bg-background p-6
         font-mono text-sm
```

## Toggle controls (theme, language, binary options)

Two (or more) inline options separated by a middot; the active option is
`text-foreground`, the rest are muted with a hover lift. No switch chrome, no pill —
just weight/contrast difference.

```jsx
<div className="flex items-baseline gap-1.5 font-mono text-xs uppercase tracking-[0.2em]">
  <button className={active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>
    Option A
  </button>
  <span className="text-muted-foreground/40">·</span>
  <button className={active ? "text-muted-foreground hover:text-foreground" : "text-foreground"}>
    Option B
  </button>
</div>
```

## SVG charts

All graphs are hand-rolled SVG. No chart library — Recharts / chart.js / victory
carry aesthetic opinions (rounded corners, default palettes, tooltips) that fight
this system. Palette is restricted to foreground / muted / primary.

Sizing: `width="100%"`, a fixed pixel height, and a `viewBox` computed from the data
range. No responsive charting library needed — the viewBox does the scaling.

Reference chart types from the original system:

- **Timeline strip** — a horizontal event bar. Discrete events (e.g. kills/deaths)
  render as dots along the bar; milestones/objectives as vertical tick marks.
- **Differential line** — a delta value over time (e.g. gold/xp lead) with a
  zero-crossing fill: `foreground` above the axis, `primary` below.
- **Paired curve** — two lines on the same axes, one solid (player) and one dashed
  (opponent), e.g. a CS-over-time curve.
- **Share bars** — horizontal stacked bars for proportional data (e.g. damage
  share); the highlighted slice is distinguished with an outline ring, not a
  different hue.

The through-line: encode categories and emphasis with fill opacity, stroke style
(solid vs dashed), and outline rings — never by introducing a new color.

### Observable Plot (the one sanctioned library)

Default to hand-rolled SVG. When a library is warranted, use Observable Plot and
restyle it — never its defaults:

```js
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const chart = Plot.plot({
  width: 640, height: 240,
  style: { background: "transparent", color: "var(--foreground)",
           fontFamily: "'Space Mono', monospace", fontSize: "11px" },
  x: { label: null }, y: { label: null },
  marks: [
    Plot.gridY({ stroke: "var(--muted-foreground)", strokeOpacity: 0.15 }),
    Plot.ruleY([0], { stroke: "var(--muted-foreground)", strokeOpacity: 0.4 }),
    Plot.lineY(data, { x: "t", y: "v", stroke: "var(--foreground)", strokeWidth: 1.5 }),
    Plot.lineY(data, { x: "t", y: "u", stroke: "var(--muted-foreground)",
                       strokeWidth: 1.5, strokeDasharray: "4 3" }),
  ],
});
document.querySelector("#mount").append(chart);
```

Rules: explicit palette colors per mark (no default scheme), no color legend,
square bars, muted grid, solid-vs-dashed for series, outline ring (not hue) for a
highlighted slice.

## Iconography (Lucide, restyled)

Lucide is the only sanctioned icon set. Drop in the raw Lucide inline SVG and add
`class="icon"`; the CSS restyle below overrides Lucide's round-cap / 2px defaults
(CSS beats SVG presentation attributes, so the paths are untouched).

```css
.icon { width: 20px; height: 20px; fill: none; stroke: currentColor;
  stroke-width: 1.5; stroke-linecap: square; stroke-linejoin: miter; }
```

```html
<span class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
  <svg class="icon" viewBox="0 0 24 24"><!-- lucide 'arrow-right' paths --></svg>
  Read more
</span>
```

Sizing 16–20px. Never let an icon replace the mono text label — it augments it.
For React use `lucide-react` and pass the same stroke props (or the `.icon` class).

## Cards

Elevation is a background step, never a shadow.

```
border border-border bg-card text-card-foreground p-6
```

Nest a section divider (see `SKILL.md`) inside for titled regions. Keep corners
square unless a `rounded-md` (0.5rem) genuinely helps.

## Inputs

```
border border-border bg-input px-3 py-2 font-mono text-sm
placeholder: text-muted-foreground
focus: outline-none ring-1 ring-ring
```

Labels above inputs use the uppercase mono label pattern from `SKILL.md`.
