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

### Success criteria

- A visitor to the GitHub repo sees the aesthetic within the first screen of the
  README, in both light and dark mode.
- The live page renders faithfully (correct Space Mono / Space Grotesk
  typography, hard 1px borders, working light/dark toggle) and is copy-paste
  usable as a reference implementation.
- Every raster asset is reproducible from `docs/index.html` via a scripted
  screenshot pass — a design tweak + re-run regenerates all assets.
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

That rule governs *products built with* the system at runtime. For *marketing
assets about* the system, screenshots (raster) are chosen deliberately so exact
type and borders survive GitHub's font sanitization. The user has also relaxed
SVG/icon purity slightly to ease chart creation, provided charts stay strongly
aligned with the philosophy (foreground / muted / primary only, no new colors).

## The landing page — section design

Top to bottom, all built with the design system's own tokens and patterns:

1. **Top nav** — mono uppercase wordmark `LUX / DESIGN SYSTEM`, nav labels, and a
   working **light/dark toggle** using the middot toggle component (doubles as a
   live demo of that component).
2. **Hero** — Space Mono H1 (`Duotone Swiss.`), a Space Grotesk sub-deck ("Two
   colors. One accent. Everything else is weight, space, and contrast."), and two
   buttons (filled + outlined variants). This crop becomes the social card.
3. **The two rules** — side-by-side cards: "Duotone strict" / "Swiss-minimalist",
   each with a one-line manifesto.
4. **Palette** — the light + dark token tables rendered as actual swatch chips
   with hex + role labels.
5. **Typography specimen** — the heading scale, a body sample, and the
   uppercase-mono label pattern, shown live.
6. **Component gallery** — buttons (3 variants + disabled), tags/pills (4 kinds),
   status pips (4 states), an input, a card, and the middot toggle — each in its
   own bordered cell with a mono caption.
7. **Charts** — 2–3 hand-rolled SVG charts (differential line with zero-crossing
   fill, share bars, timeline strip) on neutral sample data, proving the
   no-library chart approach.
8. **Footer** — install snippet (`/plugin install lux-design-system`), MIT
   license, links.

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
    social-card.png     # 1280x640 hero crop -> repo social preview
README.md               # updated: embed images + "View the live demo ->" link
```

### Capture workflow

Render `docs/index.html` in headless Playwright at 2× device-pixel-ratio for
crisp text. Screenshot each section in both light and dark by toggling the
`.dark` class on `<html>`. Capture the social card at a fixed 1280×640 viewport
against the hero. Reproducible — re-running after a design tweak regenerates
every asset.

### README integration

A hero image under the title, a light/dark pair, a components strip, and a
"**View the live demo →**" link to the GitHub Pages URL
(`https://luxsolari.github.io/lux-design-system`). Images use repo-relative paths
(`docs/assets/…`) so they render on GitHub even before Pages is enabled.

### Hosting

**GitHub Pages**, served from `/docs`. The HTML is a single self-contained static
file with no build step, so hosting is host-agnostic; Pages is chosen as the
idiomatic in-repo home. User flips Settings → Pages → source `/docs` after merge.

## Constraints & process (per AGENTS.md)

- Land via a branch + pull request; **no direct pushes to `main`**.
- Add a `## [Unreleased]` entry to `CHANGELOG.md` in the same PR.
- Conventional Commit subject lines.

## Out of scope

- Vercel deployment (host-agnostic file makes it a later option if wanted).
- Custom domain.
- Any change to the plugin skill content itself (`SKILL.md`, `theme.css`,
  `components.md`) — this effort only *demonstrates* the existing system.
- Automated CI regeneration of screenshots (manual re-run of the capture pass is
  sufficient for now).
