# Duotone Swiss Showcase & Design-System Amendments — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a self-contained GitHub Pages landing page that sells the Duotone
Swiss design system, derive README/social/gallery images from it, and amend the
system to endorse restyled Lucide icons and restyled Observable Plot charts.

**Architecture:** One static `docs/index.html` (inlined theme tokens, Google
Fonts, working light/dark toggle) is the single source of truth. A committed
Playwright script screenshots labelled sections into `docs/assets/*.png`. A
committed verifier asserts palette/icon/chart philosophy compliance. The skill
docs (`SKILL.md`, `components.md`) gain the two amendments; README + CHANGELOG +
`docs/PROMOTION.md` are updated for discoverability.

**Tech Stack:** Static HTML/CSS/vanilla JS; Google Fonts (Space Mono / Space
Grotesk); Lucide (inline SVG, CSS-restyled); Observable Plot (ESM CDN); Playwright
(dev-only, headless Chromium) for capture; Node for the verifier.

## Global Constraints

- **Palette only** — every color is one of: `--background`, `--foreground`,
  `--card`, `--card-foreground`, `--primary`, `--primary-foreground`,
  `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`,
  `--border`, `--input`, `--ring`. Raw hexes permitted ONLY inside the inlined
  `:root`/`.dark` token blocks. Light hexes: `#f5efe0 #0a0a0a #faf6ec #8b2e2e
  #ebe5d5 #4a4a48`; dark hexes add `#161616 #c04545 #1f1f1f #a8a8a0`. No greens,
  blues, or any second accent.
- **No shadows.** No `box-shadow`/`drop-shadow`. Elevation = `--card` on
  `--background`.
- **No `rounded-full` on containers** — dots/pips only. Corners mostly square.
- **Typography:** Space Mono for headings/data/tags/nav/labels; Space Grotesk for
  body. Label pattern = mono, `uppercase`, letter-spacing `0.2em`, `text-xs`.
- **Icons:** restyled **Lucide only** — `stroke-width:1.5`, `stroke-linecap:square`,
  `stroke-linejoin:miter`, `fill:none`, `currentColor`. No icon fonts, no emoji.
- **Charts:** hand-rolled SVG is the default; **Observable Plot only** when a lib
  is warranted, restyled to `--foreground`/`--muted-foreground`/`--primary`,
  square, no default palette/tooltips.
- **Process (AGENTS.md):** Conventional Commit subjects; work on branch
  `feat/showcase-landing-page` (already checked out); no direct push to `main`;
  every user-facing change gets a `## [Unreleased]` CHANGELOG entry. Version
  numbers are NEVER hand-edited (git tags are the source of truth).
- **Pages path bases (do not confuse):** Pages serves from `/docs`, so `/docs` is
  the web root. In `index.html`, image `src="assets/…"`. Absolute `og:image` =
  `https://luxsolari.github.io/lux-design-system/assets/social-card.png`. In
  `README.md` (rendered on github.com), images use `docs/assets/…`.

---

## File Structure

- Create `skills/lux-design-system/` edits (Task 1) — the two amendments.
- Create `docs/index.html` (Tasks 2–7) — the landing page, one focused file.
- Create `scripts/capture/package.json`, `scripts/capture/capture.mjs`,
  `scripts/capture/verify-philosophy.mjs`, `scripts/capture/.gitignore`
  (Tasks 8–9) — dev-only tooling, isolated so `npm install` never touches repo root.
- Create `docs/assets/*.png` (Task 9) — generated, committed.
- Create `docs/PROMOTION.md` (Task 11) — launch checklist + drafted repo metadata.
- Modify `README.md` (Task 10), `CHANGELOG.md` (Tasks 1, 10, 11).

---

## Task 1: Design-system amendments (Iconography + Charts)

**Files:**
- Modify: `skills/lux-design-system/SKILL.md`
- Modify: `skills/lux-design-system/references/components.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Produces: the canonical restyle rules the landing page must obey — icons
  (`stroke-width:1.5; stroke-linecap:square; stroke-linejoin:miter; fill:none;
  currentColor`) and Plot (palette-only marks, explicit grid marks, no default
  color scheme). Tasks 5, 6, 8 consume these.

- [ ] **Step 1: Add the Iconography section to `SKILL.md`.** Insert after the
  "Tags / pills" section, before "Charts":

```markdown
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

​```css
.icon { width: 20px; height: 20px; fill: none; stroke: currentColor;
  stroke-width: 1.5; stroke-linecap: square; stroke-linejoin: miter; }
​```

Icons are 16–20px, `currentColor` (inherit `foreground`/`muted-foreground`;
`primary` only for the destructive/accent cases already reserved for it), and
**augment** the uppercase-mono labels — never replace them.
```

- [ ] **Step 2: Rewrite the "Charts" section of `SKILL.md`.** Replace the current
  Charts paragraph with:

```markdown
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
```

- [ ] **Step 3: Update the "Do not" list in `SKILL.md`.** Change the two lines:

```markdown
- **No chart libraries except restyled Observable Plot.** Hand-rolled SVG is the
  default; reach for Plot only when complexity earns it, restyled to the palette.
- **Icons: restyled Lucide only.** Monoline, `currentColor`, square caps. No icon
  fonts. **No emoji** in UI text unless explicitly requested.
```

(Keep the other "Do not" bullets — no success green, no shadows, no `rounded-full`
on containers, no raw hex in markup.)

- [ ] **Step 4: Add the Iconography entry to `references/components.md`.** Append:

```markdown
## Iconography (Lucide, restyled)

Lucide is the only sanctioned icon set. Drop in the raw Lucide inline SVG and add
`class="icon"`; the CSS restyle below overrides Lucide's round-cap / 2px defaults
(CSS beats SVG presentation attributes, so the paths are untouched).

​```css
.icon { width: 20px; height: 20px; fill: none; stroke: currentColor;
  stroke-width: 1.5; stroke-linecap: square; stroke-linejoin: miter; }
​```

​```html
<span class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
  <svg class="icon" viewBox="0 0 24 24"><!-- lucide 'arrow-right' paths --></svg>
  Read more
</span>
​```

Sizing 16–20px. Never let an icon replace the mono text label — it augments it.
For React use `lucide-react` and pass the same stroke props (or the `.icon` class).
```

- [ ] **Step 5: Expand the "SVG charts" entry in `references/components.md`.**
  After the existing chart-types list, append the Plot pattern:

```markdown
### Observable Plot (the one sanctioned library)

Default to hand-rolled SVG. When a library is warranted, use Observable Plot and
restyle it — never its defaults:

​```js
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
​```

Rules: explicit palette colors per mark (no default scheme), no color legend,
square bars, muted grid, solid-vs-dashed for series, outline ring (not hue) for a
highlighted slice.
```

- [ ] **Step 6: Add the CHANGELOG `[Unreleased]` entries.** Under the empty
  `## [Unreleased]` line in `CHANGELOG.md`, add:

```markdown
## [Unreleased]

### Added
- **Iconography** guidance — Lucide endorsed as the sole icon set, with the
  monoline / `currentColor` / square-cap restyle rules (`SKILL.md`,
  `references/components.md`).

### Changed
- **Charts** rule relaxed — hand-rolled SVG stays the default, but Observable Plot
  is now the one sanctioned chart library when a lib is warranted, restyled to the
  palette (`SKILL.md`, `references/components.md`).
```

- [ ] **Step 7: Verify the amendments are present and consistent.**

Run:
```bash
grep -c "Observable Plot" skills/lux-design-system/SKILL.md skills/lux-design-system/references/components.md
grep -q "stroke-linecap: square" skills/lux-design-system/SKILL.md && echo "ICON OK"
grep -q "Lucide only" skills/lux-design-system/SKILL.md && echo "DONOT OK"
```
Expected: non-zero counts for both files, `ICON OK`, `DONOT OK`.

- [ ] **Step 8: Commit.**

```bash
git add skills/lux-design-system/SKILL.md skills/lux-design-system/references/components.md CHANGELOG.md
git commit -m "feat: endorse restyled Lucide icons and Observable Plot charts"
```

---

## Task 2: `index.html` foundation — head, tokens, fonts, base styles, nav, theme toggle

**Files:**
- Create: `docs/index.html`

**Interfaces:**
- Produces: `<html>` with a `.dark` toggle driven by `data-theme-btn` buttons and
  persisted to `localStorage` key `theme`; the `.icon` CSS class; base element
  styles (`h1`–`h6`, body, `.label`, `.divider`). Tasks 3–7 append `<section
  id="…">` blocks into `<main>`. Task 8 (capture) toggles `.dark` via
  `document.documentElement.classList` and relies on section IDs.

- [ ] **Step 1: Create `docs/index.html` with the head + inlined tokens + base
  styles.** Write the document skeleton exactly:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Duotone Swiss — a strict two-color design system for Claude Code</title>
  <meta name="description" content="Two colors, one accent, no shadows. A strict Swiss-minimalist design system that gives every Claude Code project one consistent, opinionated aesthetic." />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Duotone Swiss — a strict two-color design system" />
  <meta property="og:description" content="Two colors, one accent, no shadows. One install, one opinionated aesthetic across every Claude Code project." />
  <meta property="og:url" content="https://luxsolari.github.io/lux-design-system/" />
  <meta property="og:image" content="https://luxsolari.github.io/lux-design-system/assets/social-card.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Duotone Swiss — a strict two-color design system" />
  <meta name="twitter:description" content="Two colors, one accent, no shadows. One opinionated aesthetic across every Claude Code project." />
  <meta name="twitter:image" content="https://luxsolari.github.io/lux-design-system/assets/social-card.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

  <style>
    :root {
      --background:#f5efe0; --foreground:#0a0a0a; --card:#faf6ec; --card-foreground:#0a0a0a;
      --primary:#8b2e2e; --primary-foreground:#f5efe0; --secondary:#0a0a0a; --secondary-foreground:#f5efe0;
      --muted:#ebe5d5; --muted-foreground:#4a4a48; --border:#0a0a0a; --input:#faf6ec; --ring:#8b2e2e;
    }
    .dark {
      --background:#0a0a0a; --foreground:#f5efe0; --card:#161616; --card-foreground:#f5efe0;
      --primary:#c04545; --primary-foreground:#f5efe0; --secondary:#f5efe0; --secondary-foreground:#0a0a0a;
      --muted:#1f1f1f; --muted-foreground:#a8a8a0; --border:#f5efe0; --input:#161616; --ring:#c04545;
    }
    * { box-sizing: border-box; }
    body { margin:0; background:var(--background); color:var(--foreground);
      font-family:"Space Grotesk",system-ui,sans-serif; line-height:1.65;
      -webkit-font-smoothing:antialiased; font-feature-settings:"kern","liga","calt"; }
    .wrap { max-width:1100px; margin:0 auto; padding:0 24px; }
    h1,h2,h3,h4,h5,h6 { font-family:"Space Mono",ui-monospace,monospace; font-weight:700; margin:0; }
    h1 { font-size:3rem; letter-spacing:-0.02em; line-height:1.1; }
    h2 { font-size:2.25rem; letter-spacing:-0.02em; line-height:1.15; }
    h3 { font-size:1.5rem; line-height:1.3; }
    .label { font-family:"Space Mono",monospace; font-size:0.75rem; text-transform:uppercase;
      letter-spacing:0.2em; color:var(--muted-foreground); }
    .divider { display:flex; align-items:baseline; gap:12px; margin:0 0 24px; }
    .divider .rule { height:1px; flex:1; background:var(--border); }
    section { padding:64px 0; border-top:1px solid var(--border); }
    a { color:inherit; }
    .icon { width:20px; height:20px; fill:none; stroke:currentColor;
      stroke-width:1.5; stroke-linecap:square; stroke-linejoin:miter; }
    /* nav */
    nav { display:flex; align-items:center; justify-content:space-between;
      padding:20px 0; border-bottom:1px solid var(--border); }
    .wordmark { font-family:"Space Mono",monospace; font-weight:700; letter-spacing:0.15em;
      text-transform:uppercase; font-size:0.8rem; }
    .toggle { display:flex; align-items:baseline; gap:6px; font-family:"Space Mono",monospace;
      font-size:0.75rem; text-transform:uppercase; letter-spacing:0.2em; }
    .toggle button { background:none; border:none; padding:0; cursor:pointer;
      font:inherit; letter-spacing:inherit; text-transform:inherit; color:var(--muted-foreground); }
    .toggle button[aria-pressed="true"] { color:var(--foreground); }
    .toggle .mid { color:var(--muted-foreground); opacity:0.4; }
  </style>
</head>
<body>
  <div class="wrap">
    <nav>
      <span class="wordmark">Lux / Design System</span>
      <div class="toggle" role="group" aria-label="Color theme">
        <button data-theme-btn="light" aria-pressed="true">Light</button>
        <span class="mid">·</span>
        <button data-theme-btn="dark" aria-pressed="false">Dark</button>
      </div>
    </nav>
    <main>
      <!-- sections appended in Tasks 3–7 -->
    </main>
  </div>
  <script>
    (function () {
      var root = document.documentElement;
      var saved = localStorage.getItem("theme");
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      apply(saved ? saved === "dark" : !!prefersDark);
      function apply(dark) {
        root.classList.toggle("dark", dark);
        document.querySelectorAll("[data-theme-btn]").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b.dataset.themeBtn === (dark ? "dark" : "light")));
        });
      }
      document.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-theme-btn]");
        if (!btn) return;
        var dark = btn.dataset.themeBtn === "dark";
        localStorage.setItem("theme", dark ? "dark" : "light");
        apply(dark);
      });
    })();
  </script>
</body>
</html>
```

- [ ] **Step 2: Smoke-test the page loads and toggles.** Open the file in the
  Playwright MCP browser (`browser_navigate` to the `file://` path) or any browser.
  Verify: the wordmark and Light·Dark toggle render; clicking **Dark** flips the
  page to near-black with cream text; reloading preserves the choice.

Expected: theme toggle works and persists (`localStorage.theme` set).

- [ ] **Step 3: Commit.**

```bash
git add docs/index.html
git commit -m "docs: scaffold showcase landing page (head, tokens, nav, theme toggle)"
```

---

## Task 3: Hero + "two rules" + social-card sections

**Files:**
- Modify: `docs/index.html` (append to `<main>`)

**Interfaces:**
- Consumes: `.wrap`, `.label`, base heading styles, `.icon` from Task 2.
- Produces: `<section id="hero">`, `<section id="rules">`, and a
  `<div id="social-card">` sized **exactly 1200×630**. Task 8 element-screenshots
  `#hero` (light+dark) and `#social-card` (light, DSR 1).

- [ ] **Step 1: Append the hero section.** Pain-first copy; credit NOT here. Insert
  as the first child of `<main>`:

```html
<section id="hero" style="border-top:none;">
  <p class="label">Claude Code plugin · Duotone Swiss</p>
  <h1 style="margin:20px 0 0; max-width:16ch;">Stop shipping UIs that look untouched.</h1>
  <p style="font-size:1.15rem; max-width:52ch; margin:24px 0 0; color:var(--foreground);">
    One install gives every Claude Code project the same opinionated aesthetic:
    two colors, one accent, hard borders, no shadows. Everything else is weight,
    space, and contrast.
  </p>
  <div style="display:flex; gap:16px; margin-top:32px; font-family:'Space Mono',monospace;
              text-transform:uppercase; letter-spacing:0.2em; font-size:0.75rem;">
    <a href="#components" style="border:1px solid var(--foreground); background:var(--foreground);
       color:var(--background); padding:12px 20px; text-decoration:none;">See the components</a>
    <a href="https://github.com/luxsolari/lux-design-system"
       style="border:1px solid var(--foreground); padding:12px 20px; text-decoration:none;
       display:inline-flex; align-items:center; gap:8px;">
      View on GitHub
      <svg class="icon" viewBox="0 0 24 24" width="16" height="16"><!-- lucide arrow-up-right -->
        <path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
    </a>
  </div>
</section>
```

- [ ] **Step 2: Append the "two rules" section:**

```html
<section id="rules">
  <div class="divider"><h3>Two rules govern everything</h3><span class="rule"></span></div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
    <div style="border:1px solid var(--border); background:var(--card); padding:24px;">
      <p class="label">01 — Duotone strict</p>
      <p style="margin:12px 0 0;">Ink and cream are the two functional colors; blood
        red is the lone accent. No success green, no info blue. Win/loss, active,
        emphasis, error — all weight, size, spacing, contrast.</p>
    </div>
    <div style="border:1px solid var(--border); background:var(--card); padding:24px;">
      <p class="label">02 — Swiss-minimalist</p>
      <p style="margin:12px 0 0;">Visible 1px borders, no shadows — elevation is a
        background step. Generous whitespace, square corners, uppercase monospace
        labels with wide letter-spacing.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append the off-canvas social-card element** (exact OG dimensions;
  positioned off-screen so it renders for capture but doesn't disturb the page).
  Insert just before `</main>`:

```html
<div id="social-card" aria-hidden="true" style="position:absolute; left:-9999px; top:0;
     width:1200px; height:630px; background:var(--background); color:var(--foreground);
     padding:80px; display:flex; flex-direction:column; justify-content:space-between;
     border:1px solid var(--border);">
  <p class="label">Claude Code plugin</p>
  <div>
    <h1 style="font-size:4.5rem; line-height:1.05; margin:0;">Duotone Swiss.</h1>
    <p style="font-family:'Space Mono',monospace; font-size:1.25rem; margin:20px 0 0;
       color:var(--muted-foreground);">Two colors. One accent. No shadows.</p>
  </div>
  <p style="font-family:'Space Mono',monospace; font-size:1rem; letter-spacing:0.1em;
     margin:0;">/plugin install lux-design-system</p>
</div>
```

- [ ] **Step 4: Verify sections render in both themes.** Reload in the browser;
  confirm `#hero` copy leads with the problem (no author name), the two rule cards
  sit side by side with visible borders and no shadow, and toggling to dark keeps
  contrast. Confirm `#social-card` is present in the DOM (it is off-screen).

Expected: hero + rules visible; `document.querySelector('#social-card')` non-null.

- [ ] **Step 5: Commit.**

```bash
git add docs/index.html
git commit -m "docs: add hero, two-rules, and social-card sections"
```

---

## Task 4: Palette + Typography specimen sections

**Files:**
- Modify: `docs/index.html` (append to `<main>`, after `#rules`)

**Interfaces:**
- Consumes: `.label`, `.divider`, heading styles.
- Produces: `<section id="palette">`, `<section id="typography">`. Task 8
  screenshots `#palette` (light).

- [ ] **Step 1: Append the palette section.** Render swatch chips from the tokens
  (a chip = a bordered box filled with the token + a mono caption). Provide a small
  grid; each chip uses the CSS var as its background so it is theme-correct:

```html
<section id="palette">
  <div class="divider"><h3>Palette</h3><span class="rule"></span></div>
  <p class="label" style="margin:-8px 0 20px;">Semantic tokens — never a raw hex in markup</p>
  <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:16px;">
    <!-- Repeat this chip for each token below, swapping var() and captions -->
    <figure style="margin:0; border:1px solid var(--border);">
      <div style="height:72px; background:var(--background);"></div>
      <figcaption style="border-top:1px solid var(--border); padding:8px 10px;">
        <span class="label" style="display:block;">background</span>
        <span style="font-family:'Space Mono',monospace; font-size:0.7rem; color:var(--muted-foreground);">page</span>
      </figcaption>
    </figure>
  </div>
</section>
```

  Tokens to include as chips (in order): `--background` (page), `--card`
  (surface), `--foreground` (ink/text), `--muted` (subtle), `--muted-foreground`
  (metadata), `--primary` (accent), `--border` (borders). For `--foreground`/
  `--primary` chips, that's fine — the swatch shows the color; the caption stays
  neutral. Do NOT introduce any color outside the tokens.

- [ ] **Step 2: Append the typography specimen section:**

```html
<section id="typography">
  <div class="divider"><h3>Typography</h3><span class="rule"></span></div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start;">
    <div>
      <p class="label" style="margin-bottom:16px;">Space Mono — headings &amp; data</p>
      <p style="font-family:'Space Mono',monospace; font-weight:700; font-size:3rem; margin:0; letter-spacing:-0.02em;">Aa</p>
      <h1 style="margin:16px 0 0;">Heading one</h1>
      <h2 style="margin:8px 0 0;">Heading two</h2>
      <h3 style="margin:8px 0 0;">Heading three</h3>
    </div>
    <div>
      <p class="label" style="margin-bottom:16px;">Space Grotesk — body</p>
      <p style="margin:0;">The whole point is restraint: every element earns its place
        or is removed. Difference is expressed through typography, spacing, and
        contrast — never by adding a color. Borders are visible, shadows are absent,
        and whitespace does the heavy lifting.</p>
      <p class="label" style="margin-top:24px;">Uppercase mono label · tracking 0.2em</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify.** Reload; confirm the swatch grid shows the palette with
  captions and the type specimen shows the mono/grotesk split. Toggle dark — swatch
  fills update because they use `var()`.

Expected: both sections render; swatches recolor on theme toggle.

- [ ] **Step 4: Commit.**

```bash
git add docs/index.html
git commit -m "docs: add palette swatches and typography specimen"
```

---

## Task 5: Component gallery (incl. restyled Lucide iconography cell)

**Files:**
- Modify: `docs/index.html` (append `<section id="components">`)

**Interfaces:**
- Consumes: `.icon`, `.label`, `.divider`.
- Produces: `<section id="components">` containing button, tag, pip, input, card,
  toggle, and icon cells. Task 8 screenshots `#components`; Task 10 embeds it.
  Every inline `<svg>` icon uses `class="icon"` and Lucide paths (no per-element
  `stroke-linecap`).

- [ ] **Step 1: Append the gallery shell + buttons cell.** Each cell is a bordered
  box with a mono caption:

```html
<section id="components">
  <div class="divider"><h3>Components</h3><span class="rule"></span></div>
  <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px;">

    <div style="border:1px solid var(--border); padding:20px;">
      <p class="label" style="margin-bottom:16px;">Buttons</p>
      <div style="display:flex; flex-wrap:wrap; gap:10px; font-family:'Space Mono',monospace;
                  text-transform:uppercase; letter-spacing:0.2em; font-size:0.7rem;">
        <button style="border:1px solid var(--foreground); background:var(--foreground);
          color:var(--background); padding:8px 14px;">Filled</button>
        <button style="border:1px solid var(--foreground); background:none;
          color:var(--foreground); padding:8px 14px;">Outlined</button>
        <button style="border:none; background:none; color:var(--muted-foreground);
          padding:8px 14px;">Ghost</button>
        <button style="border:1px solid var(--foreground); background:none; padding:8px 14px;
          opacity:0.4;" disabled>Disabled</button>
      </div>
    </div>
    <!-- further cells appended in following steps -->
  </div>
</section>
```

- [ ] **Step 2: Append the tags + status-pips cells** (inside the same grid, before
  the closing `</div>` of the grid):

```html
    <div style="border:1px solid var(--border); padding:20px;">
      <p class="label" style="margin-bottom:16px;">Tags</p>
      <div style="display:flex; flex-wrap:wrap; gap:8px; font-family:'Space Mono',monospace;
                  font-size:0.65rem; text-transform:uppercase; letter-spacing:0.12em;">
        <span style="color:var(--muted-foreground); padding:2px 8px;">Neutral</span>
        <span style="background:var(--foreground); color:var(--background); padding:2px 8px;">Signal</span>
        <span style="border:1px dashed rgba(128,128,128,0.5); padding:2px 8px;">Outlined</span>
      </div>
    </div>

    <div style="border:1px solid var(--border); padding:20px;">
      <p class="label" style="margin-bottom:16px;">Status pips</p>
      <div style="display:flex; flex-direction:column; gap:10px; font-family:'Space Mono',monospace;
                  font-size:0.7rem; text-transform:uppercase; letter-spacing:0.15em;">
        <span style="display:inline-flex; align-items:center; gap:8px;">
          <span style="width:6px;height:6px;border-radius:9999px;background:var(--foreground);"></span>Connected</span>
        <span style="display:inline-flex; align-items:center; gap:8px;">
          <span style="width:6px;height:6px;border-radius:9999px;background:var(--primary);"></span>Warning</span>
        <span style="display:inline-flex; align-items:center; gap:8px;">
          <span style="width:6px;height:6px;border-radius:9999px;background:rgba(128,128,128,0.4);"></span>Disconnected</span>
      </div>
    </div>
```

Note: `border-radius:9999px` here is on a 6px **dot**, which is the one sanctioned
use of full-round (pips/dots) — not a container. Do not use it on any box.

- [ ] **Step 3: Append the input + card + toggle cells:**

```html
    <div style="border:1px solid var(--border); padding:20px;">
      <p class="label" style="margin-bottom:16px;">Input</p>
      <label class="label" style="display:block; margin-bottom:8px;">Email</label>
      <input placeholder="you@example.com" style="width:100%; border:1px solid var(--border);
        background:var(--input); padding:8px 12px; font-family:'Space Mono',monospace;
        font-size:0.85rem; color:var(--foreground);" />
    </div>

    <div style="border:1px solid var(--border); padding:20px;">
      <p class="label" style="margin-bottom:16px;">Card</p>
      <div style="border:1px solid var(--border); background:var(--card); padding:16px;">
        <p style="margin:0; font-family:'Space Mono',monospace; font-weight:700;">Elevated surface</p>
        <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
          Depth is a background step, never a shadow.</p>
      </div>
    </div>

    <div style="border:1px solid var(--border); padding:20px;">
      <p class="label" style="margin-bottom:16px;">Toggle</p>
      <div style="display:flex; gap:8px; font-family:'Space Mono',monospace; font-size:0.75rem;
                  text-transform:uppercase; letter-spacing:0.2em;">
        <span style="color:var(--foreground);">EN</span>
        <span style="color:var(--muted-foreground); opacity:0.4;">·</span>
        <span style="color:var(--muted-foreground);">ES</span>
      </div>
    </div>
```

- [ ] **Step 4: Append the iconography cell** — 6 restyled Lucide glyphs. Use the
  real Lucide paths; the `.icon` class supplies the square-cap restyle:

```html
    <div style="border:1px solid var(--border); padding:20px;">
      <p class="label" style="margin-bottom:16px;">Icons — Lucide, restyled</p>
      <div style="display:flex; flex-wrap:wrap; gap:18px; color:var(--foreground);">
        <svg class="icon" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg><!-- menu -->
        <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><!-- x -->
        <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg><!-- arrow-right -->
        <svg class="icon" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg><!-- external-link -->
        <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg><!-- sun -->
        <svg class="icon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><!-- moon -->
      </div>
    </div>
```

- [ ] **Step 5: Verify icon restyle compliance.** Confirm every gallery `<svg>` uses
  `class="icon"` and no element carries `stroke-linecap="round"`:

Run:
```bash
grep -o 'stroke-linecap="round"' docs/index.html | wc -l
```
Expected: `0`. Also visually confirm icon corners look square, not rounded.

- [ ] **Step 6: Commit.**

```bash
git add docs/index.html
git commit -m "docs: add component gallery with restyled Lucide iconography cell"
```

---

## Task 6: Charts section — hand-rolled SVG + one restyled Observable Plot chart

**Files:**
- Modify: `docs/index.html` (append `<section id="charts">` + an ESM `<script type="module">`)

**Interfaces:**
- Consumes: palette vars, `.divider`.
- Produces: `<section id="charts">` with at least two hand-rolled SVG charts and
  one `#plot-mount` populated by Observable Plot. Task 8 waits for `#charts svg`
  before screenshotting and captures `#charts`.

- [ ] **Step 1: Append the charts section with two hand-rolled SVGs** (share bars +
  a differential line with zero-crossing fill). Colors are palette-only:

```html
<section id="charts">
  <div class="divider"><h3>Charts</h3><span class="rule"></span></div>
  <p class="label" style="margin:-8px 0 24px;">Hand-rolled SVG by default · Observable Plot when a lib is warranted</p>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start;">

    <figure style="margin:0;">
      <figcaption class="label" style="margin-bottom:12px;">Share bars — outline ring marks the highlight</figcaption>
      <svg width="100%" height="120" viewBox="0 0 320 120">
        <rect x="0" y="10" width="240" height="18" fill="var(--foreground)"/>
        <rect x="0" y="40" width="150" height="18" fill="var(--muted-foreground)"/>
        <rect x="0" y="70" width="90"  height="18" fill="var(--muted-foreground)"/>
        <rect x="0" y="10" width="240" height="18" fill="none" stroke="var(--primary)" stroke-width="1.5"/>
      </svg>
    </figure>

    <figure style="margin:0;">
      <figcaption class="label" style="margin-bottom:12px;">Differential — foreground above, primary below zero</figcaption>
      <svg width="100%" height="120" viewBox="0 0 320 120">
        <line x1="0" y1="60" x2="320" y2="60" stroke="var(--muted-foreground)" stroke-opacity="0.4"/>
        <polyline fill="none" stroke="var(--foreground)" stroke-width="1.5"
          points="0,60 40,40 80,30 120,45 160,55"/>
        <polyline fill="none" stroke="var(--primary)" stroke-width="1.5"
          points="160,55 200,75 240,90 280,80 320,70"/>
      </svg>
    </figure>
  </div>

  <figure style="margin:32px 0 0;">
    <figcaption class="label" style="margin-bottom:12px;">Observable Plot — restyled to the palette (endorsed library)</figcaption>
    <div id="plot-mount"></div>
  </figure>
</section>
```

- [ ] **Step 2: Append the ESM module that mounts the restyled Plot chart.** Place
  just before the existing theme `<script>` at the end of `<body>`:

```html
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
  const data = [0,1,3,2,4,6,5,7,6,8].map((v,i) => ({ t:i, v, u: Math.max(0, v-2) }));
  const chart = Plot.plot({
    width: 900, height: 220, marginLeft: 28, marginBottom: 24,
    style: { background:"transparent", color:"var(--foreground)",
             fontFamily:"'Space Mono', monospace", fontSize:"11px" },
    x: { label:null }, y: { label:null },
    marks: [
      Plot.gridY({ stroke:"var(--muted-foreground)", strokeOpacity:0.15 }),
      Plot.lineY(data, { x:"t", y:"v", stroke:"var(--foreground)", strokeWidth:1.5 }),
      Plot.lineY(data, { x:"t", y:"u", stroke:"var(--muted-foreground)", strokeWidth:1.5, strokeDasharray:"4 3" }),
    ],
  });
  document.querySelector("#plot-mount").append(chart);
</script>
```

- [ ] **Step 3: Verify the Plot chart renders and stays on-palette.** Load the page
  with a network connection; confirm `#plot-mount svg` exists, the solid line is
  ink and the dashed line is muted-grey, gridlines are faint, and there is no
  colored legend and no rounded corners.

Run (in the Playwright MCP or devtools console):
```js
document.querySelector("#plot-mount svg") !== null
```
Expected: `true`.

- [ ] **Step 4: Commit.**

```bash
git add docs/index.html
git commit -m "docs: add charts section — hand-rolled SVG plus restyled Observable Plot"
```

---

## Task 7: Footer (install snippet, license, links, author credit)

**Files:**
- Modify: `docs/index.html`

**Interfaces:**
- Consumes: `.label`, `.icon`.
- Produces: `<footer>` — the only place the author is named.

- [ ] **Step 1: Append the footer** just before `</main>` closes (before the
  `#social-card` element is fine — order within `<main>` does not matter for it):

```html
<footer style="border-top:1px solid var(--border); padding:48px 0; margin-top:0;">
  <p class="label" style="margin-bottom:12px;">Install</p>
  <pre style="border:1px solid var(--border); background:var(--muted); padding:16px;
       font-family:'Space Mono',monospace; font-size:0.85rem; overflow:auto; margin:0;">/plugin marketplace add luxsolari/lux-solari-plugins
/plugin install lux-design-system</pre>
  <div style="display:flex; justify-content:space-between; align-items:baseline;
       flex-wrap:wrap; gap:16px; margin-top:24px; font-family:'Space Mono',monospace;
       font-size:0.75rem; text-transform:uppercase; letter-spacing:0.15em;">
    <span style="color:var(--muted-foreground);">MIT © 2026 Lux Solari (Luciano Laje)</span>
    <a href="https://github.com/luxsolari/lux-design-system" style="display:inline-flex;
       align-items:center; gap:8px; text-decoration:none;">GitHub
      <svg class="icon" viewBox="0 0 24 24" width="16" height="16"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
    </a>
  </div>
</footer>
```

- [ ] **Step 2: Verify.** Reload; confirm the footer shows the install snippet, MIT
  credit (author appears here and nowhere above the footer), and a GitHub link with
  a restyled external-link icon.

Run:
```bash
grep -c "Lux Solari" docs/index.html
```
Expected: `1` (author named once, in the footer).

- [ ] **Step 3: Commit.**

```bash
git add docs/index.html
git commit -m "docs: add footer with install snippet, license, and author credit"
```

---

## Task 8: Philosophy-compliance verifier

**Files:**
- Create: `scripts/capture/verify-philosophy.mjs`
- Create: `scripts/capture/.gitignore`

**Interfaces:**
- Consumes: the finished `docs/index.html`.
- Produces: `node scripts/capture/verify-philosophy.mjs` exits 0 when compliant,
  non-zero with a printed reason otherwise. Task 9 relies on this passing.

- [ ] **Step 1: Create `scripts/capture/.gitignore`:**

```gitignore
node_modules/
```

- [ ] **Step 2: Write the verifier `scripts/capture/verify-philosophy.mjs`:**

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.resolve(here, "../../docs/index.html"), "utf8");

const PALETTE = new Set([
  "#f5efe0","#0a0a0a","#faf6ec","#8b2e2e","#ebe5d5","#4a4a48",
  "#161616","#c04545","#1f1f1f","#a8a8a0",
]);

const fail = (msg) => { console.error("FAIL:", msg); process.exitCode = 1; };

// 1. Palette purity — no hex outside the token set anywhere in the file.
const hexes = [...html.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0].toLowerCase());
const rogue = [...new Set(hexes)].filter((h) => !PALETTE.has(h));
if (rogue.length) fail("rogue hex color(s): " + rogue.join(", "));

// 2. No shadows.
if (/box-shadow|drop-shadow/i.test(html)) fail("shadow found (elevation must be a background step)");

// 3. Icons: no rounded caps left un-restyled.
if (/stroke-linecap="round"/.test(html)) fail('icon with stroke-linecap="round" (must be square)');

// 4. Required social/OG meta tags present.
for (const needle of ['property="og:image"', 'property="og:title"', 'name="twitter:card"',
                       'name="description"']) {
  if (!html.includes(needle)) fail("missing meta: " + needle);
}

// 5. og:image must be an absolute Pages URL (no /docs/ segment).
if (!html.includes("https://luxsolari.github.io/lux-design-system/assets/social-card.png"))
  fail("og:image is not the absolute Pages asset URL");

// 6. Author named only in the footer region (once).
if ((html.match(/Lux Solari/g) || []).length !== 1) fail("author should be named exactly once");

if (!process.exitCode) console.log("PASS: philosophy compliance OK");
```

- [ ] **Step 3: Run the verifier and confirm it passes.**

Run:
```bash
node scripts/capture/verify-philosophy.mjs
```
Expected: `PASS: philosophy compliance OK` and exit code 0. If it fails, fix
`docs/index.html` (e.g. replace a rogue hex with a token) and re-run until green.

- [ ] **Step 4: Commit.**

```bash
git add scripts/capture/verify-philosophy.mjs scripts/capture/.gitignore
git commit -m "build: add philosophy-compliance verifier for the showcase page"
```

---

## Task 9: Capture tooling — generate `docs/assets/*.png`

**Files:**
- Create: `scripts/capture/package.json`
- Create: `scripts/capture/capture.mjs`
- Create (generated): `docs/assets/hero-light.png`, `hero-dark.png`, `palette.png`,
  `components.png`, `charts.png`, `social-card.png`

**Interfaces:**
- Consumes: section IDs `#hero #palette #components #charts #social-card` from the
  page; the `.dark` toggle on `<html>`.
- Produces: six PNGs at the paths above. `social-card.png` is exactly 1200×630.

- [ ] **Step 1: Create `scripts/capture/package.json`:**

```json
{
  "name": "lux-capture",
  "private": true,
  "type": "module",
  "scripts": { "capture": "node capture.mjs", "verify": "node verify-philosophy.mjs" },
  "devDependencies": { "playwright": "^1.48.0" }
}
```

- [ ] **Step 2: Write `scripts/capture/capture.mjs`.** Two passes: crisp 2× DPR for
  section shots, exact 1× for the 1200×630 social card:

```js
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const fileUrl = "file://" + path.resolve(here, "../../docs/index.html").replace(/\\/g, "/");
const outDir = path.resolve(here, "../../docs/assets");
fs.mkdirSync(outDir, { recursive: true });

async function shoot({ dsr, viewport }, jobs) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: dsr, viewport });
  const page = await ctx.newPage();
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForSelector("#charts svg", { timeout: 20000 }); // Plot rendered
  for (const j of jobs) {
    await page.evaluate((d) => document.documentElement.classList.toggle("dark", d), !!j.dark);
    await page.waitForTimeout(200);
    const el = await page.$(j.id);
    if (j.assert) {
      const box = await el.boundingBox();
      if (Math.round(box.width) !== j.assert.w || Math.round(box.height) !== j.assert.h)
        throw new Error(`${j.file}: expected ${j.assert.w}x${j.assert.h}, got ${Math.round(box.width)}x${Math.round(box.height)}`);
    }
    await el.screenshot({ path: path.join(outDir, j.file) });
    console.log("wrote", j.file);
  }
  await browser.close();
}

// Section shots — crisp 2x.
await shoot({ dsr: 2, viewport: { width: 1180, height: 1000 } }, [
  { id: "#hero", file: "hero-light.png", dark: false },
  { id: "#hero", file: "hero-dark.png", dark: true },
  { id: "#palette", file: "palette.png", dark: false },
  { id: "#components", file: "components.png", dark: false },
  { id: "#charts", file: "charts.png", dark: false },
]);

// Social card — exact 1200x630 at 1x for OG.
await shoot({ dsr: 1, viewport: { width: 1280, height: 720 } }, [
  { id: "#social-card", file: "social-card.png", dark: false, assert: { w: 1200, h: 630 } },
]);
```

- [ ] **Step 3: Install Playwright and its Chromium, then capture.**

Run:
```bash
cd scripts/capture && npm install && npx playwright install chromium && node capture.mjs
```
Expected: six `wrote …` lines, no dimension-assertion error.

> **Fallback if npm/Playwright is unavailable in the environment:** drive the same
> steps with the Playwright MCP tools — `browser_navigate` to the `file://` URL,
> `browser_evaluate` to toggle `.dark` and check `document.fonts.ready`,
> `browser_take_screenshot` with an `element` ref per section. Save to the same six
> paths. The committed `capture.mjs` remains the reproducible source of record.

- [ ] **Step 4: Verify the six assets exist and the card is correctly sized.**

Run:
```bash
ls -1 docs/assets && node -e "import('node:fs').then(async fs=>{const b=fs.readFileSync('docs/assets/social-card.png');const w=b.readUInt32BE(16),h=b.readUInt32BE(20);console.log('social-card',w+'x'+h);if(w!==1200||h!==630)process.exit(1);})"
```
Expected: the six filenames listed and `social-card 1200x630`.

- [ ] **Step 5: Commit tooling + generated assets.**

```bash
git add scripts/capture/package.json scripts/capture/capture.mjs docs/assets
git commit -m "build: add screenshot capture script and generate showcase assets"
```

---

## Task 10: README integration

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: the six PNGs (referenced as `docs/assets/…` for github.com rendering).

- [ ] **Step 1: Add a hero image + live-demo link directly under the title.** Insert
  after the two badge lines, before "A Claude Code plugin that teaches…":

```markdown
<p align="center">
  <a href="https://luxsolari.github.io/lux-design-system/">
    <img src="docs/assets/hero-light.png" alt="Duotone Swiss — strict two-color design system" width="900" />
  </a>
</p>

<p align="center"><strong><a href="https://luxsolari.github.io/lux-design-system/">View the live demo →</a></strong></p>
```

- [ ] **Step 2: Add a light/dark pair + components strip.** Insert a new section
  after "## The aesthetic" (before "## What it does"):

```markdown
## See it

Light and dark are the same two-color system inverted — difference by contrast,
never by a new hue:

| Light | Dark |
|-------|------|
| ![Light mode hero](docs/assets/hero-light.png) | ![Dark mode hero](docs/assets/hero-dark.png) |

The component library, palette, and hand-rolled + Observable Plot charts:

![Component gallery](docs/assets/components.png)
![Charts](docs/assets/charts.png)
```

- [ ] **Step 3: Verify image links resolve to real files.**

Run:
```bash
for f in $(grep -o 'docs/assets/[a-z-]*\.png' README.md | sort -u); do test -f "$f" && echo "OK $f" || echo "MISSING $f"; done
```
Expected: every referenced path prints `OK` (no `MISSING`).

- [ ] **Step 4: Add the CHANGELOG entry for the demo.** Under `### Added` in
  `[Unreleased]`, append:

```markdown
- **Showcase landing page** (`docs/index.html`) served on GitHub Pages, plus
  README screenshots, a 1200×630 social-preview card, and a reproducible Playwright
  capture script.
```

- [ ] **Step 5: Commit.**

```bash
git add README.md CHANGELOG.md
git commit -m "docs: embed showcase screenshots and live-demo link in README"
```

---

## Task 11: Promotion checklist + drafted repo metadata

**Files:**
- Create: `docs/PROMOTION.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Produces: a checklist the author executes; the repo-metadata draft they paste.

- [ ] **Step 1: Write `docs/PROMOTION.md`:**

```markdown
# Promotion & Launch Checklist

Assets the build ships (see `docs/assets/`) are the ammunition; the posting below
is manual. Ordered by audience intent.

## One-time repo setup (GitHub Settings — author only, cannot be scripted here)
- [ ] **Settings → Pages → Source: `main` / `/docs`.** Live at
      https://luxsolari.github.io/lux-design-system/
- [ ] **Settings → General → Social preview:** upload `docs/assets/social-card.png`.
- [ ] **Description (About):** `Duotone Swiss — a strict two-color design system as
      a Claude Code plugin. One install, one opinionated aesthetic everywhere.`
- [ ] **Topics:** `claude-code`, `claude-code-plugin`, `design-system`,
      `swiss-design`, `duotone`, `tailwindcss`, `design-tokens`.

## Tier 1 — highest intent (Claude Code users)
- [ ] Submit to community `awesome-claude-code` lists / plugin marketplaces.
- [ ] Post in the Claude Developers Discord + r/ClaudeAI / r/ClaudeCode with the
      social card and the live-demo link.

## Tier 2 — design / dev communities (after the page is polished)
- [ ] Bluesky / X thread led by the social card (light+dark + components + a chart).
- [ ] Show HN: "Show HN: Duotone Swiss — a strict two-color design system as a
      Claude Code plugin" (weekday morning ET).
- [ ] r/web_design, r/Frontend, r/SideProject.
- [ ] Product Hunt (the live page clears the bar).

## Tier 3 — evergreen / SEO
- [ ] Submit to component.gallery, designsystems.surf, Awesome Design Systems.
- [ ] Cross-post a write-up to dev.to / Hashnode with `canonical_url` pointing at
      the future personal blog post (SEO credit transfers on publish).

The eventual blog posts become the hub linking all of the above.
```

- [ ] **Step 2: Add the CHANGELOG entry.** Under `### Added` in `[Unreleased]`:

```markdown
- **`docs/PROMOTION.md`** — launch checklist and drafted repo topics/description.
```

- [ ] **Step 3: Verify.**

Run:
```bash
test -f docs/PROMOTION.md && grep -q "claude-code-plugin" docs/PROMOTION.md && echo OK
```
Expected: `OK`.

- [ ] **Step 4: Commit.**

```bash
git add docs/PROMOTION.md CHANGELOG.md
git commit -m "docs: add promotion checklist and drafted repo metadata"
```

---

## Task 12: Final review, push, and open PR

**Files:** none (integration).

- [ ] **Step 1: Re-run both gates against the final page.**

Run:
```bash
node scripts/capture/verify-philosophy.mjs
for f in $(grep -o 'docs/assets/[a-z-]*\.png' README.md | sort -u); do test -f "$f" || echo "MISSING $f"; done
```
Expected: `PASS: philosophy compliance OK` and no `MISSING` lines.

- [ ] **Step 2: Confirm the changelog captures every user-facing change.** Open
  `CHANGELOG.md`; confirm `[Unreleased]` has the Iconography (Added), Charts
  (Changed), showcase page, and PROMOTION entries.

- [ ] **Step 3: Push the branch and open the PR** (never push to `main`):

```bash
git push -u origin feat/showcase-landing-page
gh pr create --title "feat: showcase landing page + Lucide/Observable Plot amendments" \
  --body "Adds a self-contained GitHub Pages landing page (docs/index.html) that demonstrates Duotone Swiss, with derived README screenshots, a 1200x630 social card, and a reproducible Playwright capture script. Amends the design system to endorse restyled Lucide icons and restyled Observable Plot charts. Includes docs/PROMOTION.md.

Author follow-ups after merge: enable Pages (main /docs), upload the social preview, set repo topics/description (see docs/PROMOTION.md)."
```

- [ ] **Step 4: Report the PR URL** and the author follow-up list (enable Pages,
  upload social preview, set topics/description) to the user.

---

## Self-Review

**Spec coverage:**
- Live demo landing page → Tasks 2–7. ✓
- README images (hero light/dark, palette, components, charts) → Tasks 9–10. ✓
- Social preview card (1200×630, OG) → Tasks 3 (`#social-card`), 9 (capture), 2 (og
  tags). ✓
- In-repo asset gallery (`docs/assets/`) → Task 9. ✓
- Iconography amendment (Lucide, restyle, SKILL.md + components.md) → Task 1;
  demonstrated Task 5. ✓
- Charts amendment (Observable Plot, hand-rolled default) → Task 1; demonstrated
  Task 6. ✓
- Pain-first hero + credit in footer → Tasks 3, 7. ✓
- OG/Twitter meta → Task 2; verified Task 8. ✓
- GitHub topics/description draft → Task 11. ✓
- `docs/PROMOTION.md` → Task 11. ✓
- CHANGELOG `[Unreleased]` (feat for amendments, docs for demo) → Tasks 1, 10, 11. ✓
- Branch + PR, no push to main, no hand-edited version → Task 12. ✓
- GitHub Pages from `/docs`, path bases → Global Constraints + Task 2 og:image +
  Task 10 README paths. ✓

**Placeholder scan:** No TBD/TODO; every code step carries full markup/JS. The
repetitive palette chips (Task 4) and gallery cells (Task 5) show one complete
exemplar plus the explicit token/variant list to repeat — not a "similar to above"
reference.

**Type/selector consistency:** Section IDs are defined once (Task 2 shell; Tasks
3–7 append `#hero #rules #palette #typography #components #charts` + `#social-card`)
and consumed with the same names by `capture.mjs` (Task 9) and the verifier
(Task 8). The `.icon` class, `data-theme-btn` hook, and `localStorage` key `theme`
match across Tasks 2, 5, 7, 9. The six asset filenames match between Task 9
(producer) and Task 10 (consumer).
