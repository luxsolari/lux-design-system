# Structural Block Pattern (Duotone Swiss) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Blood Red a new "Structural Block" job (sidebar/hero-band/bold-word), restructure the Duotone Swiss showcase page around a persistent sidebar nav, and add a weight+size "brand-moment" device as this system's typographic equivalent of Tri-Swiss's turquoise "one brand moment" job.

**Architecture:** New branch `feat/structural-block-and-weight-highlight`, created off `main` at `v1.0.0` (already checked out, spec committed as `92371f6`). Plain HTML/CSS/vanilla-JS, no build step, matching the existing showcase page's stack.

**Tech Stack:** Same as the rest of this repo — Tailwind 4 `@theme inline` tokens in `theme.css` (not touched by this plan), plain CSS custom properties + inline styles in `docs/index.html`, Node.js capture/verify scripts.

## Global Constraints

- Branch: `feat/structural-block-and-weight-highlight`, off `main` @ `v1.0.0`.
- Structural Block cap: sidebar ≤ ~25% viewport width (min 220px, max 280px).
- Sidebar/hero-band forms are mutually exclusive per layout; the bold-word accent is independent and may combine with either. This plan's showcase page uses the **sidebar** form.
- No new CSS custom properties for color. Only `--primary`, `--foreground`, `--background`, `--primary-foreground` are used.
- Neither Space Grotesk nor Space Mono ships past weight 700 (verified against Google Fonts directly — see spec §4). The brand-moment device is weight 700 (already the heading weight) + a deliberate size jump — do not attempt to request or reference a 900 weight anywhere in this plan's edits.
- `scripts/capture/verify-philosophy.mjs` is not modified by this plan.
- This repo is already tagged `v1.0.0` — `CHANGELOG.md` gets a **new** `[Unreleased]` section with `### Added` entries, not an in-place edit of anything already released.
- Conventional Commits on every commit subject; changelog-first (Task 7 covers `CHANGELOG.md`).

---

### Task 1: `SKILL.md` — Structural Block job, guardrail carve-out, and the brand-moment device

**Files:**
- Modify: `skills/lux-design-system/SKILL.md` (Philosophy section, a new subsection after Palette, and the Do-not list)

**Interfaces:** N/A — documentation only.

- [ ] **Step 1: Add the Structural Block job to the Philosophy section**

Find this exact paragraph:

```markdown
**Duotone strict.** Ink and cream are the two functional colors; blood red is the
lone accent. No success green, no info blue, no second accent. Win/loss,
active/inactive, emphasis, error — all differentiated by weight, size, spacing, and
contrast. If you feel the urge to add a color, add a `font-bold`, a size step, or
whitespace instead.
```

Immediately after it (still inside the Philosophy section, before "**Swiss-minimalist.**"), insert:

```markdown

Blood red also has a third job beyond accent/destructive/ring: a
**Structural Block** — a solid-color sidebar/nav rail or hero band (pick
one per layout, capped at ~25% of viewport width/height), plus an
independent bold-word accent inside a heading that may combine with
either. This is not a second color — it is a new layout job for the one
accent this system already has. Outside that one block, ink and cream
continue to dominate every other surface exactly as before.
```

- [ ] **Step 2: Add the new "brand-moment device" subsection**

Find this exact paragraph (the dark-mode explanation, immediately before `## Typography`):

```markdown
Dark mode is the `.dark` class on `<html>`. Toggle with
`document.documentElement.classList.toggle("dark", isDark)` and persist under a
`theme` key in `localStorage`. In Tailwind 4 the variant is
`@custom-variant dark (&:is(.dark *));` (already in `theme.css`).
```

Immediately after it, before `## Typography`, insert:

```markdown

### The brand-moment device — read this before using it

Duotone Swiss has no second color, so it needs a different way to express
Tri-Swiss's "one governed brand moment" job (that system uses a rare
highlight color for it). Here it's typographic: **exactly one element per
page** — the hero wordmark — renders larger and bolder than anything else
on the page. Neither Space Grotesk nor Space Mono actually ships a weight
past 700 (already every heading's weight), so this device combines the
heaviest real weight (700) with a deliberate size jump — dramatically
larger than the type scale otherwise allows. Zero new color, used exactly
once per page; every other heading keeps the normal type scale.
```

- [ ] **Step 3: Add a Do-not clarification**

Find this exact bullet in the Do-not list:

```markdown
- **No success green / info blue / second accent.** Weight, size, or layout instead.
```

Immediately after it, insert:

```markdown
- **The Structural Block and brand-moment device are not new colors.**
  They're a new layout job for the one accent this system already has
  (Structural Block) and a typographic-only device (brand moment) —
  neither adds a second hue.
```

- [ ] **Step 4: Verify the edits landed**

Run: `rtk grep -n "Structural Block\|brand-moment device" skills/lux-design-system/SKILL.md`
Expected: at least 4 matches (Philosophy paragraph, subsection heading, subsection body, Do-not bullet).

- [ ] **Step 5: Commit**

```bash
rtk git add skills/lux-design-system/SKILL.md
rtk git commit -m "feat(skill): add Structural Block job and brand-moment device"
```

---

### Task 2: `components.md` — new patterns for the sidebar, hero band, bold word, segment stripe, and brand moment

**Files:**
- Modify: `skills/lux-design-system/references/components.md`

**Interfaces:** N/A.

- [ ] **Step 1: Insert the new "Structural Block" section**

Insert this new section immediately after the existing "### Observable Plot (the one sanctioned library)" subsection ends (after the line `Rules: explicit palette colors per mark (no default scheme), no color legend,` / `square bars, muted grid, solid-vs-dashed for series, outline ring (not hue) for a` / `highlighted slice.` — i.e., right before `## Iconography (Lucide, restyled)`):

```markdown
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
used as a static decorative bar (e.g. beneath a hero title):

```html
<div style="display:flex; gap:4px; width:64px;">
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
```

- [ ] **Step 2: Verify the section was inserted in the right place**

Run: `rtk grep -n "^## " skills/lux-design-system/references/components.md`
Expected: "## Structural Block — sidebar, hero band, bold word, brand moment" appears directly between "### Observable Plot (the one sanctioned library)"'s parent section and "## Iconography (Lucide, restyled)".

- [ ] **Step 3: Commit**

```bash
rtk git add skills/lux-design-system/references/components.md
rtk git commit -m "feat(components): add Structural Block and brand-moment patterns"
```

---

### Task 3: `docs/index.html` — sidebar layout CSS and hamburger toggle script

**Files:**
- Modify: `docs/index.html` (the `<style>` block and the scripts near the end of `<body>`)

**Interfaces:**
- Produces: CSS classes `.layout`, `.sidebar`, `.sidebar-wordmark`,
  `.sidebar-nav`, `.sidebar-bottom`, `.content`, `.content-inner`,
  `.hamburger` — Task 4 (HTML restructure) consumes these exact class names.
- Produces: a `data-nav-toggle` button attribute and `data-nav-list` nav
  attribute, wired by this task's new script — Task 4 uses these same
  attribute names on its markup.

- [ ] **Step 1: Add the sidebar/content layout CSS**

Find this existing rule in the `<style>` block:

```css
    .toggle .mid { color:var(--muted-foreground); opacity:0.4; }
```

Immediately after it (still inside the `<style>` block, before the closing
`</style>`), add:

```css
    /* Structural Block — sidebar layout */
    .layout { display:flex; min-height:100vh; }
    .sidebar { width:22%; min-width:220px; max-width:280px; flex-shrink:0;
      background:var(--primary); color:var(--primary-foreground);
      position:sticky; top:0; height:100vh; overflow-y:auto;
      display:flex; flex-direction:column; justify-content:space-between;
      padding:32px 28px; box-sizing:border-box; }
    .sidebar-wordmark { font-family:var(--font-mono); font-weight:700;
      font-size:1.4rem; line-height:1.2; }
    .sidebar-nav { margin-top:40px; display:flex; flex-direction:column; gap:16px;
      font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase;
      letter-spacing:0.15em; }
    .sidebar-nav a { color:var(--primary-foreground); text-decoration:none;
      opacity:0.75; transition:opacity 0.15s; width:max-content; }
    .sidebar-nav a:hover { opacity:1; }
    .sidebar-bottom { display:flex; flex-direction:column; gap:16px;
      font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase;
      letter-spacing:0.12em; }
    .sidebar-bottom a { color:var(--primary-foreground); text-decoration:none;
      opacity:0.85; display:inline-flex; align-items:center; gap:6px; }
    .sidebar-bottom .toggle button { color:var(--primary-foreground); opacity:0.6; }
    .sidebar-bottom .toggle button[aria-pressed="true"] { opacity:1; }
    .sidebar-bottom .toggle .mid { color:var(--primary-foreground); opacity:0.4; }
    .hamburger { display:none; background:none; border:none;
      color:var(--primary-foreground); cursor:pointer; padding:4px; }
    .content { flex:1; min-width:0; }
    .content-inner { max-width:900px; margin:0 auto; padding:0 32px; }
    @media (max-width: 860px) {
      .layout { flex-direction:column; }
      .sidebar { width:100%; max-width:none; height:auto; position:sticky;
        top:0; z-index:10; flex-direction:row; align-items:center;
        justify-content:space-between; padding:16px 20px; }
      .sidebar-nav { display:none; margin-top:0; position:absolute; top:100%;
        left:0; right:0; background:var(--primary); padding:20px;
        flex-direction:column; gap:16px; }
      .sidebar-nav.open { display:flex; }
      .sidebar-bottom { display:none; }
      .hamburger { display:block; }
    }
```

- [ ] **Step 2: Add the hamburger toggle script**

Find the last `<script>` block in the file (the theme-toggle script, ending
with `})();` right before `</script></body></html>`). Immediately after
that script's closing `</script>` tag, add:

```html
  <script>
    (function () {
      var btn = document.querySelector("[data-nav-toggle]");
      var list = document.querySelector("[data-nav-list]");
      if (!btn || !list) return;
      btn.addEventListener("click", function () {
        var open = list.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
    })();
  </script>
```

- [ ] **Step 3: Verify the CSS and script were added**

Run: `rtk grep -n "\.sidebar \{" docs/index.html`
Expected: exactly one match, inside the `<style>` block.

Run: `rtk grep -n "data-nav-toggle" docs/index.html`
Expected: one match here (the script's `querySelector` call) — Task 4 adds the matching HTML attribute.

- [ ] **Step 4: Commit**

```bash
rtk git add docs/index.html
rtk git commit -m "feat(showcase): add sidebar layout CSS and mobile nav toggle script"
```

---

### Task 4: `docs/index.html` — restructure the page around the sidebar

**Files:**
- Modify: `docs/index.html` (the `<body>` markup)

**Interfaces:**
- Consumes: `.layout`/`.sidebar`/`.content`/`.content-inner`/`.hamburger`
  classes and `data-nav-toggle`/`data-nav-list` attributes from Task 3.

- [ ] **Step 1: Replace the old nav + wrap opening with the sidebar + content structure**

Find this exact block:

```html
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
```

Replace it with:

```html
<body>
  <div class="layout">
    <aside class="sidebar">
      <div>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span class="sidebar-wordmark">Duotone</span>
          <button class="hamburger" aria-label="Toggle navigation" aria-expanded="false" data-nav-toggle>
            <svg class="icon" viewBox="0 0 24 24" style="color:var(--primary-foreground);">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>
        <nav class="sidebar-nav" data-nav-list>
          <a href="#palette">Palette</a>
          <a href="#typography">Typography</a>
          <a href="#components">Components</a>
          <a href="#charts">Charts</a>
        </nav>
      </div>
      <div class="sidebar-bottom">
        <div class="toggle" role="group" aria-label="Color theme">
          <button data-theme-btn="light" aria-pressed="true">Light</button>
          <span class="mid">·</span>
          <button data-theme-btn="dark" aria-pressed="false">Dark</button>
        </div>
        <a href="https://github.com/luxsolari/lux-design-system">
          GitHub
          <svg class="icon" viewBox="0 0 24 24" width="14" height="14" style="color:var(--primary-foreground);">
            <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          </svg>
        </a>
        <span>© 2026 Lux Solari</span>
      </div>
    </aside>
    <div class="content">
      <div class="content-inner">
    <main>
      <!-- sections appended in Tasks 3–7 -->
```

Note the indentation shift: everything from the original `<main>` onward
(all existing `<section>` elements, the `#social-card` div, and the
`<footer>`) stays **completely unchanged** — only the opening wrapper
above it changes. Do not edit any section content in this step.

- [ ] **Step 2: Replace the old closing `</main></div>` with the new closing tags**

Find this exact block, near the end of `<body>` (immediately after the
`</footer>` closing tag and before the first `<script type="module">`):

```html
    </main>
  </div>
  <script type="module">
```

Replace it with:

```html
    </main>
      </div>
    </div>
  </div>
  <script type="module">
```

- [ ] **Step 3: Remove the now-unused top-level `nav`/`.wordmark` CSS rules**

Find and delete this rule (the old top-nav bar, now replaced by the
sidebar):

```css
    /* nav */
    nav { display:flex; align-items:center; justify-content:space-between;
      padding:20px 0; border-bottom:1px solid var(--border); }
    .wordmark { font-family:var(--font-mono); font-weight:700; letter-spacing:0.15em;
      text-transform:uppercase; font-size:0.8rem; }
```

Delete this whole rule. Leave `.toggle`, `.toggle button`, `.toggle
button[aria-pressed="true"]`, `.toggle .mid` in place — they're reused by
`.sidebar-bottom .toggle` in Task 3's CSS.

- [ ] **Step 4: Visually verify the page loads without console errors**

Open `docs/index.html` directly in a browser and confirm: a red sidebar
renders on the left holding the wordmark, nav links, theme toggle, GitHub
link, and copyright; the rest of the page's existing sections render
unchanged in the remaining width; no JS console errors. Resize the
viewport below ~860px and confirm the sidebar collapses to a top red band
with a working hamburger toggle.

- [ ] **Step 5: Run the philosophy verifier**

Run: `cd scripts/capture && npm run verify`
Expected: `PASS: philosophy compliance OK`.

- [ ] **Step 6: Commit**

```bash
rtk git add docs/index.html
rtk git commit -m "feat(showcase): restructure page around a persistent sidebar nav"
```

---

### Task 5: `docs/index.html` — brand-moment hero treatment, segment stripe, and bold-word accent

**Files:**
- Modify: `docs/index.html` (hero section)

**Interfaces:** N/A.

- [ ] **Step 1: Apply the brand-moment size jump to the hero wordmark**

Find this exact line in the `#hero` section:

```html
        <h1 style="margin:20px 0 0;">Duotone Swiss.</h1>
```

Replace it with:

```html
        <h1 style="margin:20px 0 0; font-size:4.5rem;">Duotone Swiss.</h1>
```

- [ ] **Step 2: Add the two-color segment stripe beneath it**

Immediately after that `<h1>` line (this repo's hero has no existing
underline element — this is a pure addition, not a replacement), insert:

```html
        <div style="display:flex; gap:4px; width:64px; margin-top:16px;" aria-hidden="true">
          <div style="height:3px; flex:1; background:var(--foreground);"></div>
          <div style="height:3px; flex:1; background:var(--primary);"></div>
        </div>
```

- [ ] **Step 3: Add the bold-word accent to the hero subhead**

Find this exact paragraph in the `#hero` section:

```html
          Lux Solari's house design language — Swiss-minimalist, duotone-strict. Two
          colors, one accent; everything else is weight, space, and contrast.
```

Replace it with:

```html
          Lux Solari's house design language — Swiss-minimalist, duotone-strict. Two
          colors, one strong <span style="color:var(--primary);">accent</span>;
          everything else is weight, space, and contrast.
```

- [ ] **Step 4: Run the philosophy verifier**

Run: `cd scripts/capture && npm run verify`
Expected: `PASS: philosophy compliance OK`.

- [ ] **Step 5: Commit**

```bash
rtk git add docs/index.html
rtk git commit -m "feat(showcase): brand-moment hero, segment stripe, and bold-word accent"
```

---

### Task 6: `README.md` and `CONTRIBUTING.md` — reflect the Structural Block pattern

**Files:**
- Modify: `README.md` (aesthetic-summary paragraph)
- Modify: `CONTRIBUTING.md` (Design changes paragraph)

**Interfaces:** N/A.

- [ ] **Step 1: Extend README's aesthetic-summary paragraph**

Find this exact paragraph:

```markdown
**Duotone strict, Swiss-minimalist.** Two functional colors — ink (`#0a0a0a`) and
warm cream (`#f5efe0`) — plus a single blood-red accent (`#8b2e2e`). No success
green, no info blue, no second accent. Win/loss, active/inactive, emphasis, and
error are all expressed through **typography weight, spacing, and contrast — never
by adding a color.**
```

Replace it with:

```markdown
**Duotone strict, Swiss-minimalist.** Two functional colors — ink (`#0a0a0a`) and
warm cream (`#f5efe0`) — plus a single blood-red accent (`#8b2e2e`) that now also
marks a genuine Structural Block (a solid-color sidebar/hero band, capped at ~25%
of viewport, or a bold word inside a heading) and one governed brand-moment
element per page (larger and bolder than any other heading). No success
green, no info blue, no second accent. Win/loss, active/inactive, emphasis, and
error are all expressed through **typography weight, spacing, and contrast — never
by adding a color.**
```

- [ ] **Step 2: Update CONTRIBUTING.md's Design changes paragraph**

Find this exact paragraph:

```markdown
## Design changes
The design language lives in `skills/lux-design-system/`. Keep the two governing
rules intact — **duotone strict** (two colors + one accent, no exceptions) and
**Swiss-minimalist** (visible borders, no shadows). Changes that add a color or a
shadow contradict the system and won't be accepted; express new states through
weight, size, spacing, and contrast instead.
```

Replace it with:

```markdown
## Design changes
The design language lives in `skills/lux-design-system/`. Keep the two governing
rules intact — **duotone strict** (two colors + one accent, used more freely for
action/Structural-Block/brand-moment jobs, but never a second hue) and
**Swiss-minimalist** (visible borders, no shadows). Changes that add a color or a
shadow contradict the system and won't be accepted; express new states through
weight, size, spacing, and contrast instead.
```

- [ ] **Step 3: Verify both edits landed**

Run: `rtk grep -n "Structural Block\|Structural-Block" README.md CONTRIBUTING.md`
Expected: at least one match in each file.

- [ ] **Step 4: Commit**

```bash
rtk git add README.md CONTRIBUTING.md
rtk git commit -m "docs: reflect Structural Block pattern in README and CONTRIBUTING"
```

---

### Task 7: `CHANGELOG.md` — new entry for the Structural Block pattern

**Files:**
- Modify: `CHANGELOG.md`

**Interfaces:** N/A.

- [ ] **Step 1: Append to the existing `[Unreleased]` → `Added` list**

Confirmed: this repo already has an `## [Unreleased]` section with a
populated `### Added` list, sitting above the `## [1.0.0]` entry. Find
this exact bullet (the last one in that list, immediately before
`### Changed`):

```markdown
- **Optional type register** — Zilla Slab (serif, long-form/pull-quotes),
  governed with a strict role.

### Changed
```

Replace it with:

```markdown
- **Optional type register** — Zilla Slab (serif, long-form/pull-quotes),
  governed with a strict role.
- **Structural Block pattern** for Blood Red — a solid-color sidebar/nav
  rail or hero band (capped at ~25% of viewport, pick one per layout),
  plus an independent bold word/phrase accent that may combine with
  either (`SKILL.md`, `references/components.md`).
- **Brand-moment device** — a governed, typographic-only equivalent of
  Tri-Swiss's turquoise "one brand moment" job: exactly one element per
  page (the hero wordmark) rendered at the heaviest available weight (700)
  combined with a deliberate size jump, since neither Space Grotesk nor
  Space Mono ships past weight 700 (`SKILL.md`, `references/components.md`).
- **Two-color segment stripe** (ink, Blood Red) — a static decorative bar
  pattern, demonstrated beneath the showcase page's hero title
  (`references/components.md`, `docs/index.html`).
- **Showcase page restructure** — `docs/index.html` now uses a persistent
  sidebar nav (wordmark, anchor nav, theme toggle, GitHub link,
  copyright), collapsing to a red top band with a hamburger toggle below
  the mobile breakpoint.

### Changed
```

- [ ] **Step 2: Verify the entry landed**

Run: `rtk grep -n "Structural Block pattern" CHANGELOG.md`
Expected: one match, inside an `### Added` list under `## [Unreleased]`.

- [ ] **Step 3: Commit**

```bash
rtk git add CHANGELOG.md
rtk git commit -m "docs: add changelog entry for the Structural Block pattern"
```

---

### Task 8: Regenerate screenshots

**Files:**
- Modify (binary, regenerated): all 6 files in `docs/assets/` (`hero-light.png`, `hero-dark.png`, `palette.png`, `components.png`, `charts.png`, `social-card.png`)

**Interfaces:** N/A.

- [ ] **Step 1: Run the capture script**

Run: `cd scripts/capture && npm run capture` (run `npm install` first in
that directory if `node_modules` is missing — check with `ls node_modules`
before assuming it needs installing)
Expected: 6 lines of `wrote <filename>.png`, no thrown errors.

- [ ] **Step 2: Visually confirm the sidebar layout and new patterns render correctly**

Open `docs/assets/hero-light.png` and confirm: the red sidebar appears on
the left, the hero wordmark "Duotone Swiss." renders noticeably larger
than the surrounding body text, the two-color (ink/red) segment stripe
appears beneath it, and the word "accent" in the hero subhead renders in
red.

- [ ] **Step 3: Re-run the philosophy verifier**

Run: `cd scripts/capture && npm run verify`
Expected: `PASS: philosophy compliance OK`.

- [ ] **Step 4: Commit**

```bash
rtk git add docs/assets/
rtk git commit -m "chore(showcase): regenerate screenshots for the Structural Block pattern"
```

---

### Task 9: Push branch and open the PR

**Files:** None (git/gh operations only).

**Interfaces:** N/A.

- [ ] **Step 1: Confirm the full commit history since `main`**

Run: `rtk git log main..HEAD --oneline`
Expected: 9 commits (spec + Tasks 1-8), all Conventional Commits.

- [ ] **Step 2: Push the branch**

Run: `rtk git push -u origin feat/structural-block-and-weight-highlight`
Expected: branch created on `origin`.

- [ ] **Step 3: Open the PR**

```bash
gh pr create --title "feat: Structural Block pattern and brand-moment device" --body "$(cat <<'EOF'
## Summary
- Adds the Structural Block pattern (docs/superpowers/specs/2026-07-06-structural-block-and-duotone-weight-highlight-design.md): a sidebar/hero-band/bold-word job for Blood Red, restructuring the showcase page around a persistent sidebar nav.
- Adds a governed, typographic-only "brand-moment device" — this system's equivalent of Tri-Swiss's turquoise "one brand moment" job, since Duotone Swiss keeps its two-color identity (no new color token). Neither Space Grotesk nor Space Mono ships past weight 700, so the device combines that weight with a deliberate size jump.
- Adds a two-color (ink/Blood Red) segment-stripe pattern, demonstrated beneath the showcase page's hero title.
- Showcase page, component catalogue, README, CONTRIBUTING, and CHANGELOG all updated to match; screenshots regenerated.

## Test plan
- [x] `scripts/capture/verify-philosophy.mjs` passes
- [ ] Visual check of the sidebar layout (desktop + mobile collapse) and regenerated `docs/assets/*.png` on the PR itself
EOF
)"
```

Expected: PR URL printed; note it for the user.
