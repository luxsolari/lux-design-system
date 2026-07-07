# Rebrand: Duotone Swiss → Lux Swiss Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename "Duotone Swiss" to "Lux Swiss" and the repo/plugin slug from `lux-design-system` to `lux-swiss` everywhere — GitHub repo, skill directory, plugin manifest, all docs and the showcase page — and add house-mark framing identifying Tri-Swiss and Lux Swiss as Lux Solari's two sibling personal-brand design systems.

**Architecture:** New tasks on the existing branch `feat/structural-block-and-weight-highlight` (already created, only the spec + Structural Block plan committed so far), executed **before** that branch's own Structural Block tasks — same branch, one continuous commit sequence, one eventual PR. A repo rename (via `gh repo rename`) plus a mechanical, exhaustive find-replace across every file that names the old system, plus new house-mark prose.

**Tech Stack:** Same as the rest of this repo — plain HTML/CSS, Markdown, Node.js verify script, `gh` CLI for the repo rename.

## Global Constraints

- Branch: `feat/structural-block-and-weight-highlight`. Continue committing here.
- "Duotone" survives as a tagline/descriptor ("Lux Swiss — a duotone design system"), not the name itself.
- This is a **breaking change** for anyone who's already run `/plugin install lux-design-system@lux-solari-plugins` — `CHANGELOG.md` gets a `BREAKING CHANGE` entry and the version bumps per whiting's discipline (derived from `scripts/suggest_version_bump.py`, never hand-picked).
- Historical spec/plan docs from *before* this rebrand (`docs/superpowers/plans/2026-07-05-showcase-landing-page.md`, `docs/superpowers/specs/2026-07-05-showcase-landing-page-design.md`) are **not** touched — they're a point-in-time record of what was true when written, same convention already established on the Tri-Swiss side of this session. Only this rebrand's own docs and the already-written Structural Block plan/spec get patched (Task 9).
- `.remember/` and `.superpowers/sdd/` are git-ignored scratch — not touched.
- Conventional Commits on every commit subject.

---

### Task 1: Rename the GitHub repository

**Files:** None (git/gh operations only).

**Interfaces:** N/A.

- [ ] **Step 1: Rename the repo**

Run: `gh repo rename lux-swiss --repo luxsolari/lux-design-system --yes`
Expected: confirmation that the repo is renamed; `gh` also updates this
local clone's `origin` remote URL automatically.

- [ ] **Step 2: Verify the local remote updated**

Run: `git remote get-url origin`
Expected: `https://github.com/luxsolari/lux-swiss.git` (or the SSH
equivalent, whichever this clone already used).

- [ ] **Step 3: Verify GitHub Pages still resolves**

Run: `gh api repos/luxsolari/lux-swiss/pages --jq '.html_url'`
Expected: `https://luxsolari.github.io/lux-swiss/` — confirms Pages
followed the rename (GitHub Pages sites tied to the default `github.io`
domain, not a custom domain, always follow a repo rename automatically).

No commit for this task — it's a GitHub-side operation, not a file change.

---

### Task 2: Rename the skill directory and update its content

**Files:**
- Rename (via `git mv`): `skills/lux-design-system/` → `skills/lux-swiss/`
- Modify: `skills/lux-swiss/SKILL.md` (frontmatter, headings, body)
- Modify: `skills/lux-swiss/assets/theme.css:1` (top comment)

**Interfaces:** N/A.

- [ ] **Step 1: Rename the directory, preserving git history**

Run: `git mv skills/lux-design-system skills/lux-swiss`

- [ ] **Step 2: Update SKILL.md's frontmatter**

Find this exact block:

```yaml
---
name: lux-design-system
description: >
  Duotone Swiss — Lux Solari's house design system. A strict two-color visual
  language (ink + warm cream) with a single blood-red accent, Swiss-minimalist
  layout, visible borders, no shadows, and Space Mono / Space Grotesk typography.
  Use this skill whenever building, styling, or restyling ANY user interface:
  React/Next/Svelte/Vue components, HTML pages, landing pages, dashboards,
  buttons, cards, forms, navigation, modals, tags, charts, or Tailwind/CSS
  themes — even when the user does not name the design system explicitly. Apply
  it by default so every project shares the same aesthetic. Also trigger on
  phrases like "make this look good", "style this", "apply my design system",
  "duotone", "swiss", "give it a theme", or when starting a new frontend from
  scratch. When another design language is explicitly requested (Material,
  shadcn defaults untouched, a client's brand kit), defer to that instead.
---
```

Replace it with:

```yaml
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
```

- [ ] **Step 3: Update the top-level heading and overview paragraph**

Find this exact block:

```markdown
# Duotone Swiss — Design System

A strict, minimalist visual language. Two functional colors plus one accent, hard
borders, generous whitespace, monospace labels. The whole point is restraint: every
element earns its place or is removed, and **difference is expressed through
typography, spacing, and contrast — never by adding a color.**
```

Replace it with:

```markdown
# Lux Swiss — Design System

A strict, minimalist visual language. Two functional colors plus one accent, hard
borders, generous whitespace, monospace labels. The whole point is restraint: every
element earns its place or is removed, and **difference is expressed through
typography, spacing, and contrast — never by adding a color.**
```

- [ ] **Step 4: Update the "install the theme" step's file reference language**

Find this exact sentence:

```markdown
1. **Install the theme.** Copy [`assets/theme.css`](assets/theme.css) into the
   project's global stylesheet (e.g. `app/globals.css`). It defines every CSS
   variable for light + dark mode, and wires them to Tailwind 4 via
   `@theme inline`. For non-Tailwind stacks the same `:root` / `.dark` variables
   work as plain CSS custom properties.
```

No change needed here — this sentence never named the system, only its own
relative file path. Confirm by reading it; do not edit.

- [ ] **Step 5: Update `theme.css`'s top comment**

Find this exact line:

```css
/* Duotone Swiss — theme tokens for Tailwind 4.
```

Replace it with:

```css
/* Lux Swiss (formerly Duotone Swiss) — theme tokens for Tailwind 4.
```

- [ ] **Step 6: Verify no stale "Duotone Swiss" heading/frontmatter remains**

Run: `rtk grep -rn "^name: lux-design-system\|# Duotone Swiss" skills/lux-swiss/`
Expected: no output (exit code 1 — no matches).

- [ ] **Step 7: Commit**

```bash
rtk git add skills/lux-swiss/ skills/lux-design-system/ -A
rtk git commit -m "feat(skill): rename Duotone Swiss to Lux Swiss"
```

(`-A` in the `add` command ensures `git` records the directory rename as a
rename, not a delete+add, for a cleaner history — `git mv` already staged
it, but the subsequent content edits need adding too.)

---

### Task 3: `.claude-plugin/plugin.json` — rename the plugin manifest

**Files:**
- Modify: `.claude-plugin/plugin.json`

**Interfaces:** N/A.

- [ ] **Step 1: Update name, description, and repository fields**

Find this exact block:

```json
{
  "name": "lux-design-system",
  "version": "1.0.0",
  "description": "Duotone Swiss — a strict two-color (ink + cream) plus single blood-red accent, Swiss-minimalist design system. Applies a consistent house aesthetic across any stack.",
  "author": {
    "name": "Lux Solari",
    "email": "luxsolari@outlook.com",
    "url": "https://github.com/luxsolari"
  },
  "repository": "https://github.com/luxsolari/lux-design-system",
  "license": "MIT",
  "keywords": [
    "design-system",
    "duotone",
    "swiss-minimalist",
    "tailwind",
    "ui",
    "frontend",
    "theming",
    "space-mono",
    "space-grotesk"
  ],
  "skills": "./skills/"
}
```

Replace it with:

```json
{
  "name": "lux-swiss",
  "version": "1.0.0",
  "description": "Lux Swiss (formerly Duotone Swiss) — a strict two-color (ink + cream) plus single blood-red accent, Swiss-minimalist design system. Applies a consistent house aesthetic across any stack.",
  "author": {
    "name": "Lux Solari",
    "email": "luxsolari@outlook.com",
    "url": "https://github.com/luxsolari"
  },
  "repository": "https://github.com/luxsolari/lux-swiss",
  "license": "MIT",
  "keywords": [
    "design-system",
    "duotone",
    "swiss-minimalist",
    "tailwind",
    "ui",
    "frontend",
    "theming",
    "space-mono",
    "space-grotesk"
  ],
  "skills": "./skills/"
}
```

(`"version"` stays `1.0.0` here — Task 5 handles the actual version bump
via `scripts/suggest_version_bump.py`, deriving it from commit history
rather than hand-editing it in this task.)

- [ ] **Step 2: Verify `claude plugin validate .` still passes**

Run: `claude plugin validate .`
Expected: validation passes (confirms the manifest is still well-formed
JSON with a valid skills path after the rename).

- [ ] **Step 3: Commit**

```bash
rtk git add .claude-plugin/plugin.json
rtk git commit -m "feat: rename plugin manifest to lux-swiss"
```

---

### Task 4: `README.md`, `CONTRIBUTING.md`, and `docs/PROMOTION.md` — rename supporting docs

**Files:**
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`
- Modify: `docs/PROMOTION.md`

**Interfaces:** N/A.

- [ ] **Step 1: Update README.md's badges and hero links**

Find this exact block:

```markdown
[![Version](https://img.shields.io/github/v/release/luxsolari/lux-design-system)](https://github.com/luxsolari/lux-design-system/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

<p align="center">
  <a href="https://luxsolari.github.io/lux-design-system/">
    <img src="docs/assets/hero-light.png" alt="Duotone Swiss — strict two-color design system" width="900" />
  </a>
</p>

<p align="center"><strong><a href="https://luxsolari.github.io/lux-design-system/">View the live demo →</a></strong></p>

A Claude Code plugin that teaches Claude **Duotone Swiss** — Lux Solari's house
design language — so every project you build shares one consistent, opinionated
aesthetic.
```

Replace it with:

```markdown
[![Version](https://img.shields.io/github/v/release/luxsolari/lux-swiss)](https://github.com/luxsolari/lux-swiss/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

<p align="center">
  <a href="https://luxsolari.github.io/lux-swiss/">
    <img src="docs/assets/hero-light.png" alt="Lux Swiss — strict two-color design system" width="900" />
  </a>
</p>

<p align="center"><strong><a href="https://luxsolari.github.io/lux-swiss/">View the live demo →</a></strong></p>

A Claude Code plugin that teaches Claude **Lux Swiss** (formerly Duotone
Swiss) — Lux Solari's house design language — so every project you build
shares one consistent, opinionated aesthetic.
```

- [ ] **Step 2: Update the aesthetic-summary paragraph's intro word**

Find this exact line:

```markdown
**Duotone strict, Swiss-minimalist.** Two functional colors — ink (`#0a0a0a`) and
```

Replace it with:

```markdown
**Duotone strict, Swiss-minimalist.** Two functional colors — ink (`#0a0a0a`) and
```

No change needed — "Duotone strict" here is the *tagline descriptor* (per
the Global Constraints: "duotone" survives as a tagline), not the system's
name. Confirm by reading it; do not edit.

- [ ] **Step 3: Update the "What it does" section and install command**

Find this exact block:

```markdown
Once installed, the `lux-design-system` skill activates automatically whenever
Claude builds or restyles UI — components, pages, forms, dashboards, Tailwind/CSS
themes — and applies these tokens and patterns by default, even if you don't name
the design system. You can also invoke it explicitly ("apply my design system",
"make this duotone swiss").
```

Replace it with:

```markdown
Once installed, the `lux-swiss` skill activates automatically whenever
Claude builds or restyles UI — components, pages, forms, dashboards, Tailwind/CSS
themes — and applies these tokens and patterns by default, even if you don't name
the design system. You can also invoke it explicitly ("apply my design system",
"make this lux swiss", "make this duotone swiss").
```

Find this exact block:

```markdown
/plugin marketplace add luxsolari/lux-solari-plugins
/plugin install lux-design-system
```

Replace it with:

```markdown
/plugin marketplace add luxsolari/lux-solari-plugins
/plugin install lux-swiss
```

- [ ] **Step 4: Update CONTRIBUTING.md's skill path reference**

Find this exact line:

```markdown
The design language lives in `skills/lux-design-system/`. Keep the two governing
```

Replace it with:

```markdown
The design language lives in `skills/lux-swiss/`. Keep the two governing
```

- [ ] **Step 5: Update `docs/PROMOTION.md`**

Find this exact block:

```markdown
- [ ] **Settings → Pages → Source: `main` / `/docs`.** Live at
      https://luxsolari.github.io/lux-design-system/
- [ ] **Settings → General → Social preview:** upload `docs/assets/social-card.png`.
- [ ] **Description (About):** `Duotone Swiss — a strict two-color design system as
      a Claude Code plugin. One install, one opinionated aesthetic everywhere.`
```

Replace it with:

```markdown
- [ ] **Settings → Pages → Source: `main` / `/docs`.** Live at
      https://luxsolari.github.io/lux-swiss/
- [ ] **Settings → General → Social preview:** upload `docs/assets/social-card.png`.
- [ ] **Description (About):** `Lux Swiss (formerly Duotone Swiss) — a strict
      two-color design system as a Claude Code plugin. One install, one
      opinionated aesthetic everywhere.`
```

Find this exact line:

```markdown
- [ ] Show HN: "Show HN: Duotone Swiss — a strict two-color design system as a
```

Replace it with:

```markdown
- [ ] Show HN: "Show HN: Lux Swiss — a strict two-color design system as a
```

- [ ] **Step 6: Verify the edits landed**

Run: `rtk grep -rn "lux-design-system" README.md CONTRIBUTING.md docs/PROMOTION.md`
Expected: no output (exit code 1 — no matches).

- [ ] **Step 7: Commit**

```bash
rtk git add README.md CONTRIBUTING.md docs/PROMOTION.md
rtk git commit -m "docs: rename Duotone Swiss to Lux Swiss in README, CONTRIBUTING, PROMOTION"
```

---

### Task 5: `CHANGELOG.md` — breaking-change entry and version bump

**Files:**
- Modify: `CHANGELOG.md`

**Interfaces:** N/A.

- [ ] **Step 1: Add a new `[Unreleased]` → `### Changed` breaking-change bullet**

Find this exact block (the existing `[Unreleased]` section's `### Changed`
heading, right after the `### Added` list ending with "Optional type
register"):

```markdown
### Changed
- **Charts** rule relaxed — hand-rolled SVG stays the default, but Observable Plot
  is now the one sanctioned chart library when a lib is warranted, restyled to the
  palette (`SKILL.md`, `references/components.md`).
```

Replace it with:

```markdown
### Changed
- **BREAKING CHANGE: renamed Duotone Swiss to Lux Swiss.** The plugin slug
  changes from `lux-design-system` to `lux-swiss`; the GitHub repo, the
  skill directory, and every install command follow. Anyone who has
  already run `/plugin install lux-design-system@lux-solari-plugins` needs
  to reinstall as `/plugin install lux-swiss@lux-solari-plugins`.
  "Duotone" survives as a descriptive tagline, not the name.
- **Charts** rule relaxed — hand-rolled SVG stays the default, but Observable Plot
  is now the one sanctioned chart library when a lib is warranted, restyled to the
  palette (`SKILL.md`, `references/components.md`).
```

- [ ] **Step 2: Derive the next version and record it**

Run: `python scripts/suggest_version_bump.py` (from the repo root; if
`python` isn't on PATH, try `python3` or `py`)
Expected: the script inspects commits since the last tag (`v1.0.0`) and
recommends a **major** bump (`2.0.0`) — a breaking change was just
recorded. If the script's output differs, trust the script's derivation
over this expectation and use what it reports; version numbers are never
hand-picked per this repo's own `AGENTS.md` convention.

- [ ] **Step 3: Verify the edit landed**

Run: `rtk grep -n "BREAKING CHANGE" CHANGELOG.md`
Expected: one match.

- [ ] **Step 4: Commit**

```bash
rtk git add CHANGELOG.md
rtk git commit -m "docs: record the Duotone Swiss to Lux Swiss rename as a breaking change"
```

---

### Task 6: `docs/index.html` — rename the showcase page

**Files:**
- Modify: `docs/index.html`

**Interfaces:** N/A.

- [ ] **Step 1: Update the title and meta tags**

Find this exact block:

```html
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
```

Replace it with:

```html
  <title>Lux Swiss — a strict two-color design system for Claude Code</title>
  <meta name="description" content="Two colors, one accent, no shadows. A strict Swiss-minimalist design system that gives every Claude Code project one consistent, opinionated aesthetic." />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Lux Swiss — a strict two-color design system" />
  <meta property="og:description" content="Two colors, one accent, no shadows. One install, one opinionated aesthetic across every Claude Code project." />
  <meta property="og:url" content="https://luxsolari.github.io/lux-swiss/" />
  <meta property="og:image" content="https://luxsolari.github.io/lux-swiss/assets/social-card.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Lux Swiss — a strict two-color design system" />
  <meta name="twitter:description" content="Two colors, one accent, no shadows. One opinionated aesthetic across every Claude Code project." />
  <meta name="twitter:image" content="https://luxsolari.github.io/lux-swiss/assets/social-card.png" />
```

- [ ] **Step 2: Update the hero title**

Find this exact line:

```html
        <h1 style="margin:20px 0 0;">Duotone Swiss.</h1>
```

Replace it with:

```html
        <h1 style="margin:20px 0 0;">Lux Swiss.</h1>
```

(Note: if the Structural Block plan's Task 5 has already run by the time
you reach this step, this line will instead read `<h1 style="margin:20px
0 0; font-size:4.5rem;">Duotone Swiss.</h1>` — since this rebrand plan
runs *before* Structural Block per this branch's task order, that
shouldn't happen; but if you find the larger version, replace `Duotone
Swiss.` with `Lux Swiss.` within it instead, keeping the `font-size`
style intact.)

- [ ] **Step 3: Update the two GitHub links and the install command in the hero/install sections**

Find this exact line (appears twice, in the hero section and the install
section — use `replace_all: true`):

```html
          <a href="https://github.com/luxsolari/lux-design-system"
```

Replace all occurrences with:

```html
          <a href="https://github.com/luxsolari/lux-swiss"
```

Find this exact line:

```html
/plugin install lux-design-system</pre>
```

Replace it with:

```html
/plugin install lux-swiss</pre>
```

- [ ] **Step 4: Update the "01 — Duotone strict" rule label**

Find this exact line:

```html
            <p class="label">01 — Duotone strict</p>
```

No change needed here — "Duotone strict" is the governing-rule name
(the palette philosophy), not the system's name. Confirm by reading it;
do not edit.

- [ ] **Step 5: Update the type-registers "Duotone" display sample**

Find this exact line:

```html
            <p style="font-family:var(--font-mono); font-size:1.7rem; font-weight:700; letter-spacing:-0.02em; margin:0;">Duotone</p>
```

Replace it with:

```html
            <p style="font-family:var(--font-mono); font-size:1.7rem; font-weight:700; letter-spacing:-0.02em; margin:0;">Lux Swiss</p>
```

- [ ] **Step 6: Update the social card**

Find this exact block:

```html
          <h1 style="font-size:4.5rem; line-height:1.05; margin:0;">Duotone Swiss.</h1>
          <p style="font-family:var(--font-mono); font-size:1.25rem; margin:20px 0 0;
             color:var(--muted-foreground);">Two colors. One accent. No shadows.</p>
        </div>
        <p style="font-family:var(--font-mono); font-size:1rem; letter-spacing:0.1em;
           margin:0;">/plugin install lux-design-system</p>
```

Replace it with:

```html
          <h1 style="font-size:4.5rem; line-height:1.05; margin:0;">Lux Swiss.</h1>
          <p style="font-family:var(--font-mono); font-size:1.25rem; margin:20px 0 0;
             color:var(--muted-foreground);">Two colors. One accent. No shadows.</p>
        </div>
        <p style="font-family:var(--font-mono); font-size:1rem; letter-spacing:0.1em;
           margin:0;">/plugin install lux-swiss</p>
```

- [ ] **Step 7: Update the footer's GitHub link**

Find this exact line:

```html
          <a href="https://github.com/luxsolari/lux-design-system" style="display:inline-flex;
```

Replace it with:

```html
          <a href="https://github.com/luxsolari/lux-swiss" style="display:inline-flex;
```

- [ ] **Step 8: Verify no stale references remain**

Run: `rtk grep -in "duotone swiss\|lux-design-system" docs/index.html`
Expected: no output (exit code 1 — no matches). ("Duotone strict" from
Step 4 should NOT match this pattern since it's `duotone swiss` two words
together, not present in that label.)

- [ ] **Step 9: Commit**

```bash
rtk git add docs/index.html
rtk git commit -m "feat(showcase): rename Duotone Swiss to Lux Swiss"
```

---

### Task 7: `scripts/capture/verify-philosophy.mjs` — update the og:image URL check

**Files:**
- Modify: `scripts/capture/verify-philosophy.mjs:41`

**Interfaces:** N/A.

- [ ] **Step 1: Update the regex**

Find this exact line:

```js
if (!/property="og:image"\s+content="https:\/\/luxsolari\.github\.io\/lux-design-system\/assets\/social-card\.png"/.test(html))
```

Replace it with:

```js
if (!/property="og:image"\s+content="https:\/\/luxsolari\.github\.io\/lux-swiss\/assets\/social-card\.png"/.test(html))
```

- [ ] **Step 2: Run the philosophy verifier**

Run: `cd scripts/capture && npm run verify`
Expected: `PASS: philosophy compliance OK` — confirms `docs/index.html`
(already updated in Task 6) now matches this updated URL check.

- [ ] **Step 3: Commit**

```bash
rtk git add scripts/capture/verify-philosophy.mjs
rtk git commit -m "test(verify): update og:image URL check for the lux-swiss rename"
```

---

### Task 8: House-mark framing — `README.md`, `SKILL.md`, and `HOUSE-MARK.md`

**Files:**
- Modify: `README.md`
- Modify: `skills/lux-swiss/SKILL.md`
- Create: `HOUSE-MARK.md`

**Interfaces:** N/A.

- [ ] **Step 1: Add the house-mark paragraph to README.md**

Find the paragraph you edited in Task 4 Step 1 (the intro, now reading
"A Claude Code plugin that teaches Claude **Lux Swiss** (formerly Duotone
Swiss) — Lux Solari's house design language — so every project you build
shares one consistent, opinionated aesthetic."). Immediately after it,
before `## The aesthetic`, insert:

```markdown

Lux Swiss and its sibling, [Tri-Swiss](https://github.com/luxsolari/tri-swiss),
are the two house-mark design systems that carry Lux Solari's personal
brand identity into every project built with them — related governance,
distinct palettes. See [HOUSE-MARK.md](HOUSE-MARK.md) for how the two
relate.
```

- [ ] **Step 2: Add the house-mark sentence to SKILL.md's opening overview**

Find the paragraph you edited in Task 2 Step 3 (now reading "# Lux Swiss —
Design System" followed by the "A strict, minimalist visual language..."
paragraph). Immediately after that paragraph, before `## When you apply
this`, insert:

```markdown

Lux Swiss is one of Lux Solari's two house-mark design systems — the
personal brand identity carried into every project built with them. Its
sibling, [Tri-Swiss](https://github.com/luxsolari/tri-swiss), applies the
same governance philosophy through a tri-tone palette with a governed
Pastel Turquoise highlight; see `HOUSE-MARK.md` for how the two relate.
```

- [ ] **Step 3: Create `HOUSE-MARK.md`**

Create `HOUSE-MARK.md` at the repo root with this exact content:

```markdown
# House Mark

Tri-Swiss and Lux Swiss are Lux Solari's two house-mark design systems —
not two variations of one system, but two related, independently governed
languages that both carry the same personal brand identity into whatever
project they're applied to. A house mark, in the traditional sense, is the
imprint a publisher or maker stamps across everything they produce so it
reads as theirs regardless of the specific title — that's the role these
two systems play here.

## What they share

- The same two structural pillars: visible 1px borders, no shadows
  (elevation is a background-color step), generous whitespace, uppercase
  monospace labels, square corners.
- The same governance discipline: every color, every optional type
  register, every icon set is explicitly sanctioned and scoped — nothing
  ad hoc.
- The same warm cream base (`#f5efe0` light / near-black dark, ink)
  underneath everything.

## What's different

| | Tri-Swiss | Lux Swiss |
|---|---|---|
| Palette | Tri-tone — ink/cream + Swiss Red + a governed Pastel Turquoise highlight | Strict duotone — ink/cream + Blood Red, no third color |
| Typography | Geist family (Sans/Mono) + Space Mono italic + Zilla Slab | Space Grotesk/Mono + Zilla Slab |
| Icons | `geist-icons` | Lucide |
| Structural Block | Sidebar/hero-band/bold-word for Swiss Red, plus a tri-part ink/red/turquoise segment stripe | Sidebar/hero-band/bold-word for Blood Red, plus a two-color ink/red segment stripe and a typographic brand-moment device (since there's no third color to spare) |

## Picking one

Use Tri-Swiss when a project wants a bit more chromatic range (the
governed Turquoise highlight, used decoratively). Use Lux Swiss when a
project wants the starkest possible two-color statement. Both apply the
same Swiss-minimalist structural rules underneath — picking one is a
palette decision, not a governance one.
```

- [ ] **Step 4: Verify all three edits landed**

Run: `rtk grep -n "house-mark\|House Mark" README.md skills/lux-swiss/SKILL.md HOUSE-MARK.md`
Expected: at least one match in each of the three files.

- [ ] **Step 5: Commit**

```bash
rtk git add README.md skills/lux-swiss/SKILL.md HOUSE-MARK.md
rtk git commit -m "docs: add house-mark framing and HOUSE-MARK.md"
```

---

### Task 9: Patch this repo's own Structural Block plan and spec copy

**Files:**
- Modify: `docs/superpowers/plans/2026-07-06-structural-block-duotone-swiss.md`
- Modify: `docs/superpowers/specs/2026-07-06-structural-block-and-duotone-weight-highlight-design.md`

**Interfaces:** N/A.

- [ ] **Step 1: Rename the plan file and update its content**

Run: `git mv docs/superpowers/plans/2026-07-06-structural-block-duotone-swiss.md docs/superpowers/plans/2026-07-06-structural-block-lux-swiss.md`

Then, using the Edit tool with `replace_all: true` on the renamed file,
replace every occurrence of `Duotone Swiss` with `Lux Swiss`, every
occurrence of `lux-design-system` with `lux-swiss`, and every occurrence
of `github.com/luxsolari/lux-design-system` /
`luxsolari.github.io/lux-design-system` with the `lux-swiss` equivalents
(these should already be caught by the broader `lux-design-system` →
`lux-swiss` replacement, but double-check the URL forms specifically since
they're embedded in longer strings).

- [ ] **Step 2: Update the spec copy**

In `docs/superpowers/specs/2026-07-06-structural-block-and-duotone-weight-highlight-design.md`,
using the Edit tool with `replace_all: true`, replace every occurrence of
`Duotone Swiss` with `Lux Swiss` and every occurrence of
`lux-design-system` with `lux-swiss`.

- [ ] **Step 3: Verify no stale references remain in either file**

Run: `rtk grep -in "duotone swiss\|lux-design-system" docs/superpowers/plans/2026-07-06-structural-block-lux-swiss.md docs/superpowers/specs/2026-07-06-structural-block-and-duotone-weight-highlight-design.md`
Expected: no output (exit code 1 — no matches).

- [ ] **Step 4: Commit**

```bash
rtk git add docs/superpowers/plans/ docs/superpowers/specs/
rtk git commit -m "docs: rename Duotone Swiss to Lux Swiss in the Structural Block plan and spec"
```

---

### Task 10: Final sanity sweep

**Files:** None (verification only).

**Interfaces:** N/A.

- [ ] **Step 1: Repo-wide grep for anything missed**

Run: `rtk grep -rln "lux-design-system" --glob '!.git' --glob '!.remember' --glob '!.superpowers' .`
Expected: no output, or only matches inside historical, pre-rebrand docs
explicitly excluded by this plan's Global Constraints
(`2026-07-05-showcase-landing-page*.md`) — read any hits and confirm each
is one of those two files before treating this as passing.

- [ ] **Step 2: Re-run the philosophy verifier**

Run: `cd scripts/capture && npm run verify`
Expected: `PASS: philosophy compliance OK`.

- [ ] **Step 3: Re-validate the plugin manifest**

Run: `claude plugin validate .`
Expected: validation passes.

- [ ] **Step 4: No commit needed — this task is verification only**

Proceed to the renamed Structural Block plan
(`docs/superpowers/plans/2026-07-06-structural-block-lux-swiss.md`) next.
