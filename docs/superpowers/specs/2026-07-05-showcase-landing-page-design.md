# Design — Duotone Swiss Showcase Landing Page & Demo Assets

**Date:** 2026-07-05
**Status:** Approved (brainstorming), pending spec review
**Topic:** Visual/graphical demo assets that illustrate the `lux-design-system`
plugin for repo visitors and prospective users.

## Problem

`lux-design-system` is a Claude Code plugin that teaches Claude the **Duotone
Swiss** design language. Today the repo is entirely text — markdown, one
`theme.css`, and a component catalogue. A first-time visitor lands on a *design*
system with **nothing to look at**. There are no screenshots, no live demo, no
social preview. We need demo assets that show the aesthetic immediately and
convincingly.

## Goal

Produce a coherent set of visual assets, all derived from a single source of
truth:

1. **A live demo page** — a self-contained HTML landing page that *sells* Duotone
   Swiss by *being* Duotone Swiss, hosted on GitHub Pages.
2. **README images** — rendered PNGs embedded in `README.md` so the aesthetic is
   visible without leaving GitHub.
3. **A social preview card** — a 1280×640 hero image for link shares.
4. **An in-repo asset gallery** — the section crops, reusable by README and any
   future site.

Additionally, this effort makes **two philosophically-aligned amendments to the
design system itself**, both demonstrated live on the landing page:

- **Iconography** — permit minimal icons, endorsing restyled **Lucide** as the
  sole set (see the Iconography section below).
- **Charts** — relax the chart-library ban, endorsing restyled **Observable
  Plot** as the sole library while keeping hand-rolled SVG the default (see the
  Charts section below).

### Success criteria

- A visitor to the GitHub repo sees the aesthetic within the first screen of the
  README, in both light and dark mode.
- The live page renders faithfully (correct Space Mono / Space Grotesk
  typography, hard 1px borders, working light/dark toggle) and is copy-paste
  usable as a reference implementation.
- Every raster asset is reproducible from `docs/index.html` via a scripted
  screenshot pass — a design tweak + re-run regenerates all assets.
- A shared link to the demo renders a social preview card (OG/Twitter tags), and
  the hero copy sells the system to a visitor who knows nothing about the author.
- The change lands via a branch + PR with a `CHANGELOG.md` `[Unreleased]` entry,
  per `AGENTS.md`.

## Chosen approach

**One self-contained HTML landing page → automated screenshots.**

Build a single `docs/index.html` (inlined `theme.css` tokens, Google Fonts link,
working light/dark toggle), then render it headlessly (Playwright, 2× DPR) and
capture section crops in light and dark, plus a fixed 1280×640 social card.

### Why this over alternatives

- **vs. hand-authored standalone SVGs:** GitHub's markdown renderer *sanitizes*
  SVG and will not load Google Fonts, so a pure-SVG README asset would misrender
  the typography — a core pillar of the system. A rasterized screenshot of a real
  browser render is the honest representation. One HTML file also yields the live
  demo, README images, social card, and gallery from a single codebase — no
  parallel assets to keep in sync.
- **Trade-off accepted:** README/social images are raster PNG (captured at 2× DPR
  for crispness, which is standard). The live page itself stays vector-sharp.

### Note on the system's "SVG-only, no chart library" rule

That rule is itself being amended (see the Charts amendment below) and, for the
demo's *marketing assets*, screenshots (raster) are chosen deliberately so exact
type and borders survive GitHub's font sanitization. Charts stay strongly aligned
with the philosophy either way (foreground / muted / primary only, no new colors).

## Design-system amendment — Iconography (in scope)

This effort also amends the design system itself to **permit icons**, which the
current system implicitly discourages. Icons are allowed *only* within
constraints that make them obey the same rules the rest of the system already
enforces, so identity is preserved:

- **Monoline, stroked — never filled.** Stroke width `1.5px` (echoing the 1px
  border language). No solid or duotone glyphs.
- **`currentColor` only.** Icons inherit `foreground` / `muted-foreground` like
  text; `primary` (red) only for the destructive/accent cases the system already
  reserves it for. Never multicolor.
- **Square caps & miter joins**, geometric construction, minimal rounding —
  matching "mostly square corners." (Lucide defaults to *round* caps; we restyle
  them square. This is the biggest identity tell.)
- **Small and sparing.** 16–20px, augmenting the uppercase-mono text labels,
  never replacing them. The mono label stays the primary signifier.
- **No icon fonts, no emoji.** Inline SVG only, so `currentColor` and stroke
  width stay controllable. The emoji ban is unchanged.

**Source — Lucide, and only Lucide.** [Lucide](https://lucide.dev) is the single
sanctioned icon set of the design system, mirroring how the system already names
exactly two fonts and forbids the rest. No other icon library, no icon fonts, no
mixing sets. Lucide is chosen because it is monoline-native, `currentColor`-
native, on a consistent 24px grid, broad in coverage, and tree-shakeable.

**The restyle is three surgical overrides** of Lucide's defaults, which carry the
only off-identity opinions:

| Attribute | Lucide default | Duotone Swiss |
|-----------|---------------|---------------|
| `stroke-width` | `2` | `1.5` |
| `stroke-linecap` | `round` | `square` |
| `stroke-linejoin` | `round` | `miter` |

Everything else (the paths, the `currentColor` stroke, the 24px viewBox) is kept
as-is. Applied globally via a CSS rule on the icon class, or per-usage on inline
SVG / `lucide-react` props.

**Integration.** Projects pull icons from `lucide` / `lucide-react` (or copy the
raw inline SVG) and apply the restyle. The system ships no vendored icons; the
demo copies a few Lucide glyphs inline (menu, x, arrow-right, external-link,
sun/moon) restyled to spec, as living examples.

**Files changed by this amendment:**

- `skills/lux-design-system/SKILL.md` — soften the implicit no-icon stance; add a
  short **Iconography** subsection and update the "Do not" list (keep "no emoji").
- `skills/lux-design-system/references/components.md` — add an **Iconography**
  entry with the concrete restyling pattern and a compliant inline-SVG example.
- `theme.css` is **not** touched — icons use existing `currentColor` semantics.

## Design-system amendment — Charts (in scope)

The current system bans chart libraries outright ("No chart libraries. SVG
only."). This amendment relaxes that to the same shape as iconography: endorse
**one** library, restyled to obey the palette. The original *reason* for the ban
is preserved as the endorsement test — a library is only acceptable to the degree
its default aesthetic (palettes, rounded corners, tooltips, gridlines) can be
stripped to duotone.

- **Hand-rolled SVG stays the default.** The simple charts (timeline strip, share
  bars, single differential line) are ~20 lines of raw SVG; they should stay
  hand-rolled. The library is the sanctioned tool for when scales / axes /
  many-series / interaction complexity genuinely earns a dependency.
- **Source — Observable Plot, and only Observable Plot.**
  [Observable Plot](https://observablehq.com/plot) is the single sanctioned chart
  library. Chosen because it is framework-agnostic (vanilla JS SVG node that drops
  into React / Svelte / Vue / plain HTML — preserving the system's multi-framework
  promise, which React-only libs like visx/Recharts would break), SVG-native, and
  concise. No other chart library; canvas-based libs (Chart.js, ECharts, uPlot)
  are excluded outright since they break the SVG/border crispness.

**Restyle rules — theme Plot's defaults down to duotone:**

- **Palette: `foreground` / `muted-foreground` / `primary` only.** Set colors
  explicitly per mark (`fill` / `stroke` = a CSS var); never use Plot's default
  categorical color scheme. Disable the color legend.
- **Encode categories & emphasis without new colors** — solid vs `stroke-dasharray`
  dashed lines (the "paired curve" pattern), fill-opacity steps, and an outline
  ring for the highlighted slice (the "share bars" pattern). Same rule as the rest
  of the system.
- **Square everything.** No rounded bar corners; `rect`/`barY` are square by
  default in Plot — keep them that way.
- **Strip chrome.** Gridlines off or `muted` at low opacity; axis ticks/labels
  restyled to the uppercase-mono label pattern via `className` + CSS; no default
  tooltips (or a hard-bordered, mono, no-shadow custom one matching the modal
  pattern).
- **Transparent background**, `color: var(--foreground)`, inherits the page.

**Integration.** `@observablehq/plot`; `Plot.plot({ marks, x, y, color, style })`
returns an SVG node appended to the DOM — works in any framework. Load via ESM in
plain HTML.

**Files changed by this amendment:**

- `skills/lux-design-system/SKILL.md` — rewrite the **Charts** section: keep
  hand-rolled SVG as default, add the endorsed-library allowance; update the "Do
  not" list ("No chart libraries" → "Only Observable Plot, restyled; hand-rolled
  SVG preferred for simple charts").
- `skills/lux-design-system/references/components.md` — expand the **SVG charts**
  entry with the Plot restyling rules and a compliant example.

## The landing page — section design

Top to bottom, all built with the design system's own tokens and patterns:

1. **Top nav** — mono uppercase wordmark `LUX / DESIGN SYSTEM`, nav labels, and a
   working **light/dark toggle** using the middot toggle component (doubles as a
   live demo of that component).
2. **Hero** — **pain-first copy that sells the system to a cold visitor who knows
   nothing about the author.** Lead with the problem it solves, not the pedigree
   (e.g. "Stop shipping Claude Code UIs that look like untouched shadcn. One
   install, one opinionated aesthetic, every project."), Space Mono H1
   (`Duotone Swiss.`), a Space Grotesk sub-deck, and two buttons (filled +
   outlined). Author/credit lives in the footer, **not** here. This crop becomes
   the social card.
3. **The two rules** — side-by-side cards: "Duotone strict" / "Swiss-minimalist",
   each with a one-line manifesto.
4. **Palette** — the light + dark token tables rendered as actual swatch chips
   with hex + role labels.
5. **Typography specimen** — the heading scale, a body sample, and the
   uppercase-mono label pattern, shown live.
6. **Component gallery** — buttons (3 variants + disabled), tags/pills (4 kinds),
   status pips (4 states), an input, a card, the middot toggle, and an
   **iconography** cell showing 4–6 restyled Lucide icons — each in its own
   bordered cell with a mono caption. Icons also appear tastefully in the nav
   (menu/toggle) and footer (external-link) to demonstrate the new allowance in
   context.
7. **Charts** — 2–3 hand-rolled SVG charts (differential line with zero-crossing
   fill, share bars, timeline strip) on neutral sample data, proving the
   hand-rolled default, **plus one Observable Plot chart** restyled to duotone
   (captioned as such) demonstrating the endorsed-library amendment. Plot loads
   via ESM CDN; the screenshot pass waits for it to render.
8. **Footer** — install snippet (`/plugin install lux-design-system`), MIT
   license, repo/live-demo links, and the author credit (Lux Solari) — the "who
   made this" that was deliberately kept out of the hero.

## Derived assets, file layout & capture workflow

### File layout

```
docs/
  index.html            # the landing page — canonical, served at Pages root
  assets/
    hero-light.png      # hero section, light mode  -> README top
    hero-dark.png       # hero section, dark mode    -> README (proves dual-mode)
    palette.png         # swatch grid
    components.png      # component gallery
    charts.png          # SVG charts section
    social-card.png     # 1200x630 hero crop -> OG image + repo social preview
  PROMOTION.md          # launch/submission checklist (channels to reach people)
README.md               # updated: embed images + "View the live demo ->" link
```

### Capture workflow

Render `docs/index.html` in headless Playwright at 2× device-pixel-ratio for
crisp text. Screenshot each section in both light and dark by toggling the
`.dark` class on `<html>`. Capture the social card at a fixed **1200×630**
viewport (the OG/Twitter standard) against the hero. Reproducible — re-running
after a design tweak regenerates every asset.

### README integration

A hero image under the title, a light/dark pair, a components strip, and a
"**View the live demo →**" link to the GitHub Pages URL
(`https://luxsolari.github.io/lux-design-system`). Images use repo-relative paths
(`docs/assets/…`) so they render on GitHub even before Pages is enabled.

### Hosting

**GitHub Pages**, served from `/docs`. The HTML is a single self-contained static
file with no build step, so hosting is host-agnostic; Pages is chosen as the
idiomatic in-repo home. User flips Settings → Pages → source `/docs` after merge.

## Discoverability & distribution

A cold visitor (designer, prospective dev) who knows nothing about the author
almost never arrives at the README first — they arrive via a *shared link*. The
build must produce assets that convert that link, independent of the author being
present to explain it. (The marketing legwork itself — actually posting to
channels — is the author's to do; this section covers only what the build ships.)

### Open Graph / social meta tags (in `index.html`)

Add to `<head>` so any paste of the Pages URL into Slack / Discord / X / Bluesky /
iMessage renders a preview card:

- `og:title`, `og:description`, `og:type=website`, `og:url`
- `og:image` = the **absolute** URL of the social card
  (`https://luxsolari.github.io/lux-design-system/docs/assets/social-card.png`)
- `twitter:card=summary_large_image`, `twitter:title/description/image`
- a plain `<meta name="description">` + a keyword-aware `<title>` (e.g. "Duotone
  Swiss — a strict two-color design system for Claude Code") for SEO.

The social card is therefore not an extra — it is the payload every share channel
displays, so it is built early and retuned to the 1200×630 OG standard.

### GitHub-native inbound (author applies; I draft)

I cannot change repo metadata from this session, so the build produces a draft the
author pastes into **Settings → General**:

- **Topics:** `claude-code`, `claude-code-plugin`, `design-system`,
  `swiss-design`, `duotone`, `tailwindcss`, `design-tokens` (final list drafted at
  build time).
- **Description:** one sharp line leading with the value proposition.
- **Social preview:** upload `social-card.png` under Settings → Social preview.

### `docs/PROMOTION.md` — launch checklist

A checklist file so the author can work through distribution systematically,
ordered by audience intent:

- **Tier 1 (highest intent — Claude Code users):** community `awesome-claude-code`
  lists & plugin marketplaces; Claude Developers Discord, r/ClaudeAI / r/ClaudeCode;
  GitHub topics.
- **Tier 2 (design/dev communities):** Bluesky/X thread led by the social card;
  Show HN; r/web_design, r/Frontend, r/SideProject; Product Hunt (once the live
  page is polished).
- **Tier 3 (evergreen/SEO):** design-system aggregators (component.gallery,
  designsystems.surf, Awesome Design Systems); dev.to / Hashnode cross-post with
  `canonical_url` pointing at the future personal blog post so SEO credit transfers.

The author's eventual blog posts become the hub linking these together; none of
the above needs to wait for them.

## Constraints & process (per AGENTS.md)

- Land via a branch + pull request; **no direct pushes to `main`**.
- Add a `## [Unreleased]` entry to `CHANGELOG.md` in the same PR. The iconography
  and charts amendments are user-facing new capability → `feat` (minor bump under
  the repo's semver discipline); the demo page/assets are `docs`.
- Conventional Commit subject lines.

## Out of scope

- Vercel deployment (host-agnostic file makes it a later option if wanted).
- Custom domain.
- Changes to `theme.css` or the palette/typography rules — the iconography
  amendment reuses existing `currentColor` semantics and adds no tokens.
- A bespoke or vendored icon set — Lucide is endorsed as the sole set and the
  system documents the restyling rules only; the demo carries a few inline
  Lucide glyphs as examples.
- Automated CI regeneration of screenshots (manual re-run of the capture pass is
  sufficient for now).

Note: unlike the original draft, edits to `SKILL.md` and `components.md` (the
iconography amendment) are now **in scope**.
