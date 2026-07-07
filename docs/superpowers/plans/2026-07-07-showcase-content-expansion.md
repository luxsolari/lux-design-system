# Showcase Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Lists, Tables, and Images-in-grid as new documented component patterns, and richen the showcase page's typography demonstration (fuller per-register examples plus a new text-length comparison) so the page and its reference docs serve as a genuine implementation reference.

**Architecture:** Pure documentation + static-page changes across `SKILL.md`, `references/components.md`, and `docs/index.html`, plus new `scripts/capture/capture.mjs` job entries. No new color tokens, no navigation restructuring — new content lands inside or alongside the existing single-page-scroll flow.

**Tech Stack:** Plain HTML/CSS (Tailwind 4 `@theme inline` tokens), Playwright (screenshot capture), Node.js (capture/verify scripts), Markdown.

## Global Constraints

- Ink, cream, and Blood Red remain the only three color tokens — no fourth color introduced anywhere.
- List markers/dividers and table borders/headers use ink/muted-foreground only — **never** the Blood Red accent token. This is a hard rule (see spec §3), not a style preference.
- Images default to a grayscale/duotone filter; full color is permitted **only** when the image itself is the primary content (blog photography, portfolio gallery, product photography) — a scoped, named exception, not a general license (see spec §4).
- No new rules for the three type registers — `SKILL.md`'s `## Typography` section is already complete and correct. The `#registers` section's richer examples and the new text-length section are content-only changes, no new prose rules.
- This repo has no separate "annotation" register (unlike Tri-Swiss) — only Body/sans and Serif/long-form get richer specimens; Display/mono stays as-is.
- `scripts/capture/verify-philosophy.mjs` must continue to print `PASS: philosophy compliance OK` after every task that touches `docs/index.html`. It hard-fails on ANY hex color or `rgb()`/`rgba()` literal outside the exact token palette — the images-in-grid demo must use only `var(--primary)`, `var(--foreground)` in `linear-gradient()` expressions, never a literal color or an `<img src>` pointing at a real photo.
- No page navigation/TOC restructuring — the existing sidebar nav list (`Palette`, `Typography`, `Components`, `Charts`) is unchanged; new sections (`#images`, `#text-length`) do NOT get their own nav link, consistent with `#registers` not having one either.
- Every commit follows this repo's `AGENTS.md` Conventional Commits + changelog-first discipline; `CHANGELOG.md` entries land under the existing `[Unreleased]` → new `### Added` section.

---

### Task 1: `SKILL.md` — Lists/tables and Images rules

**Files:**
- Modify: `skills/lux-swiss/SKILL.md`

**Interfaces:**
- Produces: the documented rules for Lists, Tables, and Images that Task 2 (components.md) and Task 3 (docs/index.html) implement.

- [ ] **Step 1: Insert `## Lists / tables` and `## Images` sections**

The file currently reads (around lines 266–284), ending with the
`## Tags / pills` section right before `## Iconography`:

```
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
```

Replace with:

```
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
```

- [ ] **Step 2: Add the two new `Do not` bullets**

The `## Do not` section currently reads in full (around lines 321–334):

```
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
```

Replace with:

```
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
```

- [ ] **Step 3: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK` (this task doesn't touch
`docs/index.html`, so it must still pass unchanged).

Run: `rtk grep -n "## Lists / tables\|## Images\|accent-colored list markers\|full-color images" skills/lux-swiss/SKILL.md`
Expected: matches for both new section headings and both new Do-not bullets.

- [ ] **Step 4: Commit**

```bash
git add skills/lux-swiss/SKILL.md
git commit -m "feat: add Lists/tables and Images rules to SKILL.md"
```

---

### Task 2: `references/components.md` — List, table, and image-in-grid patterns

**Files:**
- Modify: `skills/lux-swiss/references/components.md`

**Interfaces:**
- Consumes: the rule text from Task 1.
- Produces: the full HTML patterns Task 3 implements on the live page.

- [ ] **Step 1: Append new `## Lists / tables` and `## Images` sections after `## Inputs`**

The file currently ends (the last section) with:

```
## Inputs

```
border border-border bg-input px-3 py-2 font-mono text-sm
placeholder: text-muted-foreground
focus: outline-none ring-1 ring-ring
```

Labels above inputs use the uppercase mono label pattern from `SKILL.md`.
```

Replace with:

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
```

- [ ] **Step 2: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK`.

Run: `rtk grep -n "## Lists / tables\|## Images\|Unordered list\|primary content" skills/lux-swiss/references/components.md`
Expected: matches for both new section headings and the list/image patterns.

- [ ] **Step 3: Commit**

```bash
git add skills/lux-swiss/references/components.md
git commit -m "docs: add List, table, and image-in-grid patterns"
```

---

### Task 3: `docs/index.html` — CSS, Lists/Tables demo, and new Images section

**Files:**
- Modify: `docs/index.html`

**Interfaces:**
- Consumes: the patterns from Task 2.
- Produces: `.list-plain`, `table.data-table`, and `figure.img-grid` CSS classes, and a new `<section id="images">`.

- [ ] **Step 1: Add the list/table/image CSS rules**

The `<style>` block currently has this section (around lines 93–96),
right before the `/* Structural Block */` comment:

```css
    .card-interactive { display:block; text-decoration:none; color:inherit;
      border:1px solid var(--border); transition:border-color 0.15s; }
    .card-interactive:hover, .card-interactive.is-hover-demo { border-color:var(--primary); }
    /* Structural Block — sidebar layout */
```

Insert the new rules between `.card-interactive:hover` and the
`/* Structural Block */` comment:

```css
    .card-interactive { display:block; text-decoration:none; color:inherit;
      border:1px solid var(--border); transition:border-color 0.15s; }
    .card-interactive:hover, .card-interactive.is-hover-demo { border-color:var(--primary); }

    /* Lists, tables, images — new content components. Markers/borders
       stay neutral (ink/muted), never the accent color. */
    .list-plain { list-style:none; margin:0; padding:0; }
    .list-plain li { border-top:1px solid var(--border); padding:10px 0; }
    .list-plain li:first-child { border-top:none; }
    table.data-table { width:100%; border-collapse:collapse; font-size:0.85rem; }
    table.data-table th { font-family:var(--font-mono); font-weight:700; text-transform:uppercase;
      letter-spacing:0.1em; font-size:0.7rem; text-align:left; padding:8px 0;
      border-bottom:2px solid var(--border); }
    table.data-table td { padding:8px 0; border-bottom:1px solid var(--border); }
    table.data-table td.num { text-align:right; font-variant-numeric:tabular-nums; }
    figure.img-grid { margin:0; border:1px solid var(--border); }
    figure.img-grid figcaption { border-top:1px solid var(--border); }
    /* Structural Block — sidebar layout */
```

- [ ] **Step 2: Add List and Table tiles to the `#components` grid, after Input and before Card**

The Components grid currently reads (around lines 402–417), showing the
Input tile immediately followed by the Card tile:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Input</p>
            <label class="label" style="display:block; margin-bottom:8px;">Email</label>
            <input placeholder="you@example.com" style="width:100%; border:1px solid var(--border);
              background:var(--input); padding:8px 12px; font-family:var(--font-mono);
              font-size:0.85rem; color:var(--foreground);" />
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Card</p>
            <div style="border:1px solid var(--border); background:var(--card); padding:16px;">
              <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Elevated surface</p>
              <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
                Depth is a background step, never a shadow.</p>
            </div>
          </div>
```

Replace with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Input</p>
            <label class="label" style="display:block; margin-bottom:8px;">Email</label>
            <input placeholder="you@example.com" style="width:100%; border:1px solid var(--border);
              background:var(--input); padding:8px 12px; font-family:var(--font-mono);
              font-size:0.85rem; color:var(--foreground);" />
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">List <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">— divider, not a bullet</span></p>
            <ul class="list-plain" style="font-size:0.9rem;">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Table <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">— tabular-nums, no zebra striping</span></p>
            <table class="data-table">
              <thead>
                <tr><th>Metric</th><th style="text-align:right;">Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Sessions</td><td class="num">1,209,384</td></tr>
                <tr><td>Conversions</td><td class="num">18,050</td></tr>
                <tr><td>Rate</td><td class="num">1.4931%</td></tr>
              </tbody>
            </table>
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Card</p>
            <div style="border:1px solid var(--border); background:var(--card); padding:16px;">
              <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Elevated surface</p>
              <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
                Depth is a background step, never a shadow.</p>
            </div>
          </div>
```

- [ ] **Step 3: Add a new `#images` section after `#components` and before `#charts`**

The page currently reads (around lines 494–505), showing the end of
the Components grid immediately followed by `<section id="charts">`:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Interactive card <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">— hover to try</span></p>
            <a href="#components" class="card-interactive" style="padding:16px;" onclick="return false;">
              <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Click anywhere</p>
              <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
                Ink border at rest, Red on hover.</p>
            </a>
          </div>

        </div>
      </section>
      <section id="charts">
```

Replace with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Interactive card <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">— hover to try</span></p>
            <a href="#components" class="card-interactive" style="padding:16px;" onclick="return false;">
              <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Click anywhere</p>
              <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
                Ink border at rest, Red on hover.</p>
            </a>
          </div>

        </div>
      </section>
      <section id="images">
        <div class="divider"><h3>Images in the grid</h3><span class="rule"></span></div>
        <p class="label" style="margin:-8px 0 24px;">Grayscale/duotone by default · full color only when the photo is the content</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px;">
          <figure class="img-grid" style="aspect-ratio:4/3;">
            <div style="width:100%; height:75%; background:linear-gradient(135deg, var(--primary) 0%, var(--foreground) 100%); filter:grayscale(1);"></div>
            <p style="font-family:var(--font-mono); font-style:italic; font-size:0.85rem; color:var(--muted-foreground); margin:0; padding:10px 12px;">
              Fig. 1 — grayscale, the default treatment. Keeps the three-token palette intact.
            </p>
          </figure>
          <figure class="img-grid" style="aspect-ratio:4/3;">
            <div style="width:100%; height:75%; background:linear-gradient(135deg, var(--primary) 0%, var(--foreground) 100%);"></div>
            <p style="font-family:var(--font-mono); font-style:italic; font-size:0.85rem; color:var(--muted-foreground); margin:0; padding:10px 12px;">
              Fig. 2 — full color, because the photograph itself is the content — a named, scoped exception.
            </p>
          </figure>
        </div>
      </section>
      <section id="charts">
```

- [ ] **Step 4: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK` — the images demo uses only
`var(--primary)`/`var(--foreground)` inside `linear-gradient()`, no
literal hex/rgb, no real `<img src>`.

Run: `rtk grep -n "list-plain\|data-table\|img-grid\|section id=\"images\"" docs/index.html`
Expected: matches for the CSS class definitions, the List/Table demo
tiles, and the new `#images` section.

- [ ] **Step 5: Commit**

```bash
git add docs/index.html
git commit -m "feat: add lists/tables demo and images-in-grid section"
```

---

### Task 4: `docs/index.html` — richer `#registers` specimens and new `#text-length` section

**Files:**
- Modify: `docs/index.html`

**Interfaces:**
- None beyond this task — purely content changes to existing/new sections.

- [ ] **Step 1: Replace the Body/Serif one-liners in `#registers` with fuller examples**

The `#registers` section currently reads in full (around lines 326–349):

```html
      <section id="registers">
        <div class="divider"><h3>Three type registers</h3><span class="rule"></span></div>
        <p class="label" style="margin:-8px 0 24px;">Core duotone + one sanctioned register</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:32px;">
          <div>
            <p class="label" style="margin-bottom:12px;">Display / mono</p>
            <p style="font-family:var(--font-mono); font-size:1.7rem; font-weight:700; letter-spacing:-0.02em; margin:0;">Lux Swiss</p>
            <p class="label" style="margin-top:10px;">Space Mono</p>
          </div>
          <div>
            <p class="label" style="margin-bottom:12px;">Body / sans</p>
            <p style="font-family:var(--font-sans); font-size:1.05rem; margin:0;">The primary reading, UI, and dense-data voice.</p>
            <p class="label" style="margin-top:10px;">Space Grotesk</p>
          </div>
          <div>
            <p class="label" style="margin-bottom:12px;">Serif / long-form</p>
            <p style="font-family:var(--font-serif); font-size:1.15rem; line-height:1.5; margin:0;">For editorial body and pull-quotes — the comfortable reading register.</p>
            <p class="label" style="margin-top:10px;">Zilla Slab</p>
          </div>
        </div>
        <blockquote style="font-family:var(--font-serif); font-style:italic; font-size:1.5rem; line-height:1.45; border-left:2px solid var(--border); margin:40px 0 0; padding:2px 0 2px 24px; max-width:62ch;">
          &ldquo;Difference is expressed through weight, space, and contrast — never by adding a color.&rdquo;
        </blockquote>
      </section>
```

Replace with:

```html
      <section id="registers">
        <div class="divider"><h3>Three type registers</h3><span class="rule"></span></div>
        <p class="label" style="margin:-8px 0 24px;">Core duotone + one sanctioned register</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:32px;">
          <div>
            <p class="label" style="margin-bottom:12px;">Display / mono</p>
            <p style="font-family:var(--font-mono); font-size:1.7rem; font-weight:700; letter-spacing:-0.02em; margin:0;">Lux Swiss</p>
            <p class="label" style="margin-top:10px;">Space Mono</p>
          </div>
          <div>
            <p class="label" style="margin-bottom:12px;">Body / sans</p>
            <p style="font-family:var(--font-sans); font-size:1.05rem; margin:0;">Every element earns its place or is removed — the same body voice
              carries a landing-page lead, a dashboard's dense stat block, and a
              settings page's fine print, no separate voice for any of them, just
              the weight axis already established.</p>
            <p class="label" style="margin-top:10px;">Space Grotesk</p>
          </div>
          <div>
            <p class="label" style="margin-bottom:12px;">Serif / long-form</p>
            <p style="font-family:var(--font-serif); font-size:1.15rem; line-height:1.5; margin:0;">Restraint isn't a limitation — it's a decision that scales. A
              designer who inherits this system doesn't need a judgment call
              every time a new element shows up; the rule already tells them
              what to do with it.</p>
            <p class="label" style="margin-top:10px;">Zilla Slab</p>
          </div>
        </div>
        <blockquote style="font-family:var(--font-serif); font-style:italic; font-size:1.5rem; line-height:1.45; border-left:2px solid var(--border); margin:40px 0 0; padding:2px 0 2px 24px; max-width:62ch;">
          &ldquo;Difference is expressed through weight, space, and contrast — never by adding a color.&rdquo;
        </blockquote>
      </section>
```

- [ ] **Step 2: Add a new `#text-length` section after `#registers` and before `#components`**

The page currently reads (around lines 348–350), showing the end of
`#registers` immediately followed by `<section id="components">`:

```html
        <blockquote style="font-family:var(--font-serif); font-style:italic; font-size:1.5rem; line-height:1.45; border-left:2px solid var(--border); margin:40px 0 0; padding:2px 0 2px 24px; max-width:62ch;">
          &ldquo;Difference is expressed through weight, space, and contrast — never by adding a color.&rdquo;
        </blockquote>
      </section>
      <section id="components">
```

Replace with:

```html
        <blockquote style="font-family:var(--font-serif); font-style:italic; font-size:1.5rem; line-height:1.45; border-left:2px solid var(--border); margin:40px 0 0; padding:2px 0 2px 24px; max-width:62ch;">
          &ldquo;Difference is expressed through weight, space, and contrast — never by adding a color.&rdquo;
        </blockquote>
      </section>
      <section id="text-length">
        <div class="divider"><h3>Content at any length</h3><span class="rule"></span></div>
        <p class="label" style="margin:-8px 0 24px;">Same body voice, same measure — spacing holds regardless of length</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:32px; align-items:start;">
          <div>
            <p class="label" style="margin-bottom:12px;">Short</p>
            <p style="font-size:0.85rem; color:var(--muted-foreground); margin:0;">Updated 3 hours ago.</p>
          </div>
          <div>
            <p class="label" style="margin-bottom:12px;">Medium</p>
            <p style="margin:0; max-width:42ch;">A single paragraph reads the same whether it's a card's supporting
              copy or a page's lead — same measure, same line-height, no
              separate rule for "short body text."</p>
          </div>
          <div>
            <p class="label" style="margin-bottom:12px;">Long-form</p>
            <div style="max-width:60ch;">
              <p style="margin:0;">Restraint scales. A single line of UI copy and a full article both
                draw from the same weight axis and the same measure — nothing
                about going longer asks for a new typographic idea.</p>
              <p style="margin:14px 0 0;">What changes is paragraph spacing, not the voice: each paragraph
                gets the same top margin as the body rhythm established
                elsewhere on this page, so a long-form block reads as more of
                the same system, not a different one.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="components">
```

- [ ] **Step 3: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK`.

Run: `rtk grep -n "Every element earns its place or is removed\|Restraint isn't a limitation\|section id=\"text-length\"" docs/index.html`
Expected: matches for the richer Body specimen, the richer Serif
specimen, and the new text-length section.

- [ ] **Step 4: Commit**

```bash
git add docs/index.html
git commit -m "feat: richen registers specimens and add text-length section"
```

---

### Task 5: `scripts/capture/capture.mjs` and screenshot regeneration

**Files:**
- Modify: `scripts/capture/capture.mjs`
- Modify: `docs/assets/*.png` (regenerated, not hand-edited)

**Interfaces:**
- Consumes: the final page state from Tasks 3–4.
- Produces: three new capture jobs — `type-registers.png` (this repo
  never captured `#registers` before), `images.png`, and
  `text-length.png`.

- [ ] **Step 1: Add three new capture job entries**

`scripts/capture/capture.mjs` currently has this job list:

```js
// Section shots — crisp 2x.
await shoot({ dsr: 2, viewport: { width: 1180, height: 1000 } }, [
  { fullViewport: true, file: "hero-light.png", dark: false },
  { fullViewport: true, file: "hero-dark.png", dark: true },
  { id: "#palette", file: "palette.png", dark: false },
  { id: "#components", file: "components.png", dark: false },
  { id: "#charts", file: "charts.png", dark: false },
]);
```

Replace with:

```js
// Section shots — crisp 2x.
await shoot({ dsr: 2, viewport: { width: 1180, height: 1000 } }, [
  { fullViewport: true, file: "hero-light.png", dark: false },
  { fullViewport: true, file: "hero-dark.png", dark: true },
  { id: "#palette", file: "palette.png", dark: false },
  { id: "#registers", file: "type-registers.png", dark: false },
  { id: "#components", file: "components.png", dark: false },
  { id: "#images", file: "images.png", dark: false },
  { id: "#text-length", file: "text-length.png", dark: false },
  { id: "#charts", file: "charts.png", dark: false },
]);
```

Note: `#registers` is placed in the job list to match its position in
the page (before `#components`), even though its capture was previously
missing entirely — this task closes that gap since `#registers` is
getting materially richer content in Task 4.

- [ ] **Step 2: Regenerate all screenshots**

Run: `cd scripts/capture && node capture.mjs` (run `npm install` first
if `node_modules` isn't already present).

Expected output: 9 `wrote <file>.png` lines, no errors.

- [ ] **Step 3: Visually confirm the changes**

Read (view as an image) `docs/assets/components.png` and confirm it
shows: a "List" tile (three items separated by thin top-border dividers,
no bullet glyphs) and a "Table" tile (bold mono header row, tabular-nums
right-aligned values, no zebra striping) inserted between the Input and
Card tiles.

Read `docs/assets/images.png` and confirm it shows two figures side by
side: the left one visibly desaturated/grayscale, the right one showing
the same Red-to-ink gradient in full color, each with a caption below.

Read `docs/assets/type-registers.png` (new capture) and confirm the
Body and Serif specimens show full sentences (not the old one-line
placeholders), and the Display specimen and blockquote are unchanged.

Read `docs/assets/text-length.png` and confirm it shows three columns:
a short one-line label, a medium paragraph, and a longer two-paragraph
block, all in the same body typeface.

- [ ] **Step 4: Commit**

```bash
git add scripts/capture/capture.mjs docs/assets/
git commit -m "feat: add capture jobs and regenerate screenshots for showcase content expansion"
```

---

### Task 6: `CHANGELOG.md`, `README.md`, `CONTRIBUTING.md` sync

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`

**Interfaces:**
- None — this is the final, documentation-only task.

- [ ] **Step 1: Add the CHANGELOG entry**

This repo's `CHANGELOG.md` `[Unreleased]` section currently already has
content from the just-merged accent-buttons/cards work (the last tagged
release was `v2.0.0`), reading:

```markdown
## [Unreleased]

### Added
- **Accent button** — a fifth button variant (Red-bordered, general
  emphasis rather than destructive) using the same mechanism as the
  existing Destructive button — a separate semantic name, not a
  different visual treatment (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Accent card and Interactive card** — a new static Red-bordered card
  with a background wash, and a new clickable card with an ink-to-Red
  hover transition — more color on hover/borders across cards, not just
  buttons (`SKILL.md`, `references/components.md`, `docs/index.html`).

## [2.0.0] — 2026-07-07
```

Replace with (appending three new bullets to the existing `### Added`
list — do NOT remove the two bullets already there):

```markdown
## [Unreleased]

### Added
- **Accent button** — a fifth button variant (Red-bordered, general
  emphasis rather than destructive) using the same mechanism as the
  existing Destructive button — a separate semantic name, not a
  different visual treatment (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Accent card and Interactive card** — a new static Red-bordered card
  with a background wash, and a new clickable card with an ink-to-Red
  hover transition — more color on hover/borders across cards, not just
  buttons (`SKILL.md`, `references/components.md`, `docs/index.html`).
- **Lists and tables** — new component patterns: an unordered/ordered
  list treatment (thin top-border dividers, no bullet glyphs, tabular
  mono-font numbers) and a data table (bold mono header, tabular-nums,
  no zebra striping) — markers and borders stay ink/muted-foreground
  only, never the accent color (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Images in the grid** — new guidance for the first time: grid-aligned
  placement with a bordered container and mono-label caption, defaulting
  to a grayscale/duotone color treatment with full color permitted only
  as a scoped, named exception when the photograph itself is the
  primary content (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Richer typography demonstrations** — the `#registers` section's
  Body and Serif specimens now show full realistic examples instead of
  one-line placeholders, and a new "Content at any length" section
  demonstrates short/medium/long-form body copy at the same measure
  (`docs/index.html`).

## [2.0.0] — 2026-07-07
```

- [ ] **Step 2: Update README.md's aesthetic-summary paragraph**

`README.md`'s "## The aesthetic" section currently reads:

```markdown
**Duotone strict, Swiss-minimalist.** Two functional colors — ink (`#0a0a0a`) and
warm cream (`#f5efe0`) — plus a single blood-red accent (`#8b2e2e`) that now also
marks a genuine Structural Block (a solid-color sidebar/hero band, capped at ~25%
of viewport, or a bold word inside a heading), one governed brand-moment
element per page (larger and bolder than any other heading), and hover-state
feedback wherever an accent signals interactivity. The two-color segment
stripe — ink then Blood Red — is reusable at any length as a decorative
divider, not a one-off. A new Accent button and Accent card put more color
on hover/borders, and a new Interactive card carries the same ink-to-Red
hover transition onto a clickable card. No success green, no info blue, no
second accent. Win/loss, active/inactive, emphasis, and error are all
expressed through **typography weight, spacing, and contrast — never by
adding a color.**
```

Replace with:

```markdown
**Duotone strict, Swiss-minimalist.** Two functional colors — ink (`#0a0a0a`) and
warm cream (`#f5efe0`) — plus a single blood-red accent (`#8b2e2e`) that now also
marks a genuine Structural Block (a solid-color sidebar/hero band, capped at ~25%
of viewport, or a bold word inside a heading), one governed brand-moment
element per page (larger and bolder than any other heading), and hover-state
feedback wherever an accent signals interactivity. The two-color segment
stripe — ink then Blood Red — is reusable at any length as a decorative
divider, not a one-off. A new Accent button and Accent card put more color
on hover/borders, and a new Interactive card carries the same ink-to-Red
hover transition onto a clickable card. Lists, tables, and images are now
documented patterns too — list/table borders and markers stay
ink/muted-foreground only, and images default to a grayscale/duotone
filter with full color as a scoped exception for photography that is
itself the content. No success green, no info blue, no second accent.
Win/loss, active/inactive, emphasis, and error are all expressed through
**typography weight, spacing, and contrast — never by adding a color.**
```

- [ ] **Step 3: Update CONTRIBUTING.md's Design-changes paragraph**

`CONTRIBUTING.md`'s "Design changes" section currently reads:

```markdown
The design language lives in `skills/lux-swiss/`. Keep the two governing
rules intact — **duotone strict** (two colors + one accent, used more freely for
action/Structural-Block/brand-moment/hover-signal jobs, but never a second hue) and
**Swiss-minimalist** (visible borders, no shadows). Changes that add a color or a
shadow contradict the system and won't be accepted; express new states through
weight, size, spacing, and contrast instead. The segment stripe (§ SKILL.md
Philosophy section) is reusable at any length, not a fixed one-off — keep it
two equal ink/Blood-Red segments regardless of length. The Accent button
reuses the Destructive button's exact visual mechanism under a different
semantic name — don't invent a second visual treatment for it.
```

Replace with:

```markdown
The design language lives in `skills/lux-swiss/`. Keep the two governing
rules intact — **duotone strict** (two colors + one accent, used more freely for
action/Structural-Block/brand-moment/hover-signal jobs, but never a second hue) and
**Swiss-minimalist** (visible borders, no shadows). Changes that add a color or a
shadow contradict the system and won't be accepted; express new states through
weight, size, spacing, and contrast instead. The segment stripe (§ SKILL.md
Philosophy section) is reusable at any length, not a fixed one-off — keep it
two equal ink/Blood-Red segments regardless of length. The Accent button
reuses the Destructive button's exact visual mechanism under a different
semantic name — don't invent a second visual treatment for it. List/table
markers and borders stay ink/muted-foreground only; images default to
grayscale/duotone, with full color reserved for the one named exception
(§ SKILL.md "Images") where the photograph itself is the content.
```

- [ ] **Step 4: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK` (this task doesn't touch
`docs/index.html`, so this is a sanity check that nothing upstream
regressed).

Run: `claude plugin validate .` from the repo root.
Expected: `✔ Validation passed with warnings`, with exactly one
pre-existing, unrelated warning about `CLAUDE.md` at the plugin root
not being loaded as project context — confirm no *new* errors or
warnings appear.

- [ ] **Step 5: Commit**

```bash
git add CHANGELOG.md README.md CONTRIBUTING.md
git commit -m "docs: sync CHANGELOG, README, and CONTRIBUTING with the showcase content expansion"
```
