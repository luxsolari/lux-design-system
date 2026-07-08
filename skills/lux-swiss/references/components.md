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
           fontFamily: "var(--font-mono)", fontSize: "11px" },
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

## Structural Block — sidebar, hero band, bold word, brand moment

A third job for Blood Red, on top of primary/destructive/ring. Three
forms — pick one block form per layout; the bold-word form is independent
and may combine with either.

**Sidebar / nav rail.** Full-height solid Blood Red panel, capped at ~25%
of viewport width (min 220px, max 280px), sticky/fixed. Holds wordmark,
in-page anchor nav, theme toggle, external link, copyright:

```html
<aside class="sidebar" style="width:22%; min-width:220px; max-width:280px;
  background:var(--primary); color:var(--primary-foreground);
  position:sticky; top:0; height:100vh; display:flex; flex-direction:column;
  justify-content:space-between; padding:32px 28px; box-sizing:border-box;">
  <div>
    <span style="font-family:var(--font-mono); font-weight:700; font-size:1.5rem;">Wordmark</span>
    <nav style="margin-top:40px; display:flex; flex-direction:column; gap:16px;
      font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em;">
      <a href="#section-one" style="color:var(--primary-foreground); text-decoration:none; opacity:0.75;">Section One</a>
    </nav>
  </div>
  <div style="font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase;
    letter-spacing:0.12em; opacity:0.75;">© Year Author</div>
</aside>
```

**Hero band.** Solid Blood Red horizontal block, used once — an
alternative to the sidebar, never combined with it:

```html
<div style="background:var(--primary); color:var(--primary-foreground); padding:64px 48px;">
  <h1 style="margin:0;">Hero title.</h1>
</div>
```

**Bold word/phrase accent.** One word inside a heading or paragraph in
Blood Red, at normal weight/size — independent of the two block forms,
may combine with either:

```html
<p>Two colors, one strong <span style="color:var(--primary);">accent</span>.</p>
```

**Two-color segment stripe.** Two equal solid blocks — ink, Blood Red —
used as a static decorative divider or spacer, at any length: a small
marker before a heading, a section divider, a wider closing flourish.
Always two *equal* segments in this exact order; static and decorative
only, never interactive or meaningful; used selectively (a handful of
times per page) rather than replacing the default `bg-border` divider
throughout.

```html
<!-- Small marker before a heading -->
<div style="display:flex; gap:3px; width:36px;">
  <div style="height:3px; flex:1; background:var(--foreground);"></div>
  <div style="height:3px; flex:1; background:var(--primary);"></div>
</div>

<!-- Wider closing flourish -->
<div style="display:flex; gap:6px; width:140px;">
  <div style="height:3px; flex:1; background:var(--foreground);"></div>
  <div style="height:3px; flex:1; background:var(--primary);"></div>
</div>
```

**Brand-moment device.** Exactly one element per page — the hero wordmark
— rendered at the heaviest real weight (700, same as every other heading)
combined with a deliberate size jump well beyond the normal type scale:

```html
<h1 style="font-size:4.5rem;">Page Title.</h1>
```

**Destructive button hover, Default vs. Hover.** Makes Red's real hover
signal visible without a live pointer:

```html
<button style="border:1px solid var(--primary); background:none;
  color:var(--primary); padding:8px 16px;">Delete</button>
<!-- :hover (or a static .is-hover-demo modifier class for illustration) -->
<button style="border:1px solid var(--primary); background:var(--primary);
  color:var(--primary-foreground); padding:8px 16px;">Delete</button>
```

**Nav-link hover, Default vs. Hover.** A plain opacity shift — no
decorative flourish exists here, unlike Tri-Swiss's turquoise-flourish
nav link, since this system has no second color to add one with:

```html
<a style="color:var(--primary-foreground); opacity:0.75;">Section</a>
<!-- :hover (or a static .is-hover-demo modifier class for illustration) -->
<a style="color:var(--primary-foreground); opacity:1;">Section</a>
```

**Accent button hover, Default vs. Hover.** Same mechanism as the
Destructive button above — a separate semantic name for general
emphasis, not a different visual treatment:

```html
<button style="border:1px solid var(--primary); background:none;
  color:var(--primary); padding:8px 16px;">Learn more</button>
<!-- :hover (or a static .is-hover-demo modifier class for illustration) -->
<button style="border:1px solid var(--primary); background:var(--primary);
  color:var(--primary-foreground); padding:8px 16px;">Learn more</button>
```

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

**Accent card.** A static, Red-bordered card with a subtle background
wash — more color than the plain card above:

```jsx
<div className="border border-primary p-6" style={{ background: "color-mix(in srgb, var(--primary) 8%, var(--card))" }}>
  <p className="font-mono font-bold">Accent card</p>
  <p className="text-sm text-muted-foreground">
    Red border + wash — more color on hover/borders.
  </p>
</div>
```

**Interactive card.** A clickable card (wrap in `<a>` or `<button>`)
with its own hover transition — ink border at rest, Red on hover, the
system's normal single-accent hover hierarchy:

```html
<a href="#" style="display:block; text-decoration:none; color:inherit;
  border:1px solid var(--border); padding:24px; transition:border-color 0.15s;">
  <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Interactive card</p>
  <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
    Ink border at rest, Red on hover — click anywhere on the card.
  </p>
</a>
<!-- :hover (or a static .is-hover-demo modifier class for illustration) -->
<a href="#" style="display:block; text-decoration:none; color:inherit;
  border:1px solid var(--primary); padding:24px;">
  <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Interactive card</p>
  <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
    Ink border at rest, Red on hover — click anywhere on the card.
  </p>
</a>
```

## Inputs

```
border border-border bg-input px-3 py-2 font-mono text-sm
placeholder: text-muted-foreground
focus: outline-none ring-1 ring-ring
```

Labels above inputs use the uppercase mono label pattern from `SKILL.md`.

## Lists / tables

**Unordered list.** A thin top-border divider between rows, no bullet
glyph, ink/muted-foreground only:

```jsx
<ul className="list-none m-0 p-0">
  <li className="border-t border-border py-3 first:border-t-0">First item</li>
  <li className="border-t border-border py-3">Second item</li>
  <li className="border-t border-border py-3">Third item</li>
</ul>
```

**Ordered list.** Tabular mono-font numbers followed by body-font item
text:

```jsx
<ol className="list-none m-0 p-0">
  <li className="border-t border-border py-3 first:border-t-0 flex gap-3">
    <span className="font-mono tabular-nums text-muted-foreground">01</span>
    <span>First step</span>
  </li>
  <li className="border-t border-border py-3 flex gap-3">
    <span className="font-mono tabular-nums text-muted-foreground">02</span>
    <span>Second step</span>
  </li>
</ol>
```

**Table.** Bold mono header row with a 2px bottom border, 1px rows,
tabular-nums right-aligned numeric columns, no zebra striping:

```jsx
<table className="w-full border-collapse text-sm">
  <thead>
    <tr className="font-mono font-bold uppercase text-xs tracking-[0.1em] border-b-2 border-border">
      <th className="text-left py-2">Metric</th>
      <th className="text-right py-2">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border">
      <td className="py-2">Sessions</td>
      <td className="py-2 text-right tabular-nums">1,209,384</td>
    </tr>
    <tr className="border-b border-border">
      <td className="py-2">Conversions</td>
      <td className="py-2 text-right tabular-nums">18,050</td>
    </tr>
  </tbody>
</table>
```

Markers, dividers, and header rules stay ink/muted-foreground only —
never Blood Red (see `SKILL.md`'s "Lists / tables" guardrail).

## Images

**Grid placement.** A bordered container at a consistent aspect ratio,
with a mono-label caption beneath:

```jsx
<figure className="m-0 border border-border" style={{ aspectRatio: "4 / 3" }}>
  <img src="/photo.jpg" alt=""
    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)" }} />
  <figcaption className="font-mono italic text-sm text-muted-foreground p-2 border-t border-border">
    Fig. 1 — grayscale, the default treatment.
  </figcaption>
</figure>
```

**Color treatment.** Default is grayscale/duotone (above). Full color is
a named, scoped exception — only when the photograph itself is the
primary content (blog photography, portfolio gallery, product shots),
never as decoration:

```jsx
<figure className="m-0 border border-border" style={{ aspectRatio: "4 / 3" }}>
  <img src="/photo.jpg" alt=""
    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  <figcaption className="font-mono italic text-sm text-muted-foreground p-2 border-t border-border">
    Fig. 2 — full color, because the photograph itself is the content.
  </figcaption>
</figure>
```
