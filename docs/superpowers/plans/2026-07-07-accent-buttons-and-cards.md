# Accent Buttons and Accent Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Accent button, an Accent card, and an Interactive card — more color on hover/borders, using Blood Red more richly, without any second accent color or hero changes (neither applies here — see the spec's Non-goals).

**Architecture:** Pure documentation + static-page changes across `SKILL.md`, `references/components.md`, and `docs/index.html`. No new CSS tokens, no new capture-job entries (every change lands inside the already-captured `#components` region).

**Tech Stack:** Plain HTML/CSS (Tailwind 4 `@theme inline` tokens), Playwright (screenshot capture), Node.js (capture/verify scripts), Markdown.

## Global Constraints

- Ink, cream, and Blood Red remain the only three color tokens — no second color introduced anywhere.
- The Accent button uses the *exact same* visual mechanism as the existing Destructive button (`border-primary` at rest, fills solid on hover) — the distinction is semantic naming (general emphasis vs. destructive action), not a different color treatment. This system has only one accent to draw on.
- The Interactive card uses the system's normal single-accent hover hierarchy: ink border at rest, Red border on hover. No dual-accent pattern exists here (that's Tri-Swiss-only, since it requires a second accent color).
- The existing Ghost/Outlined/Filled/Destructive buttons and the existing plain Card are unchanged — Accent button, Accent card, and Interactive card are additive new variants.
- `scripts/capture/verify-philosophy.mjs` must continue to print `PASS: philosophy compliance OK` after every task that touches `docs/index.html`. No new hex values are introduced (only `var(--primary)`, `var(--primary-foreground)`, and `color-mix(in srgb, var(--primary) N%, var(--card))` expressions, both already-sanctioned patterns in this file).
- No new capture-job entries are needed in `scripts/capture/capture.mjs` — confirm this repo's existing jobs (`hero-light`/`hero-dark` fullViewport, `#palette`, `#components`, `#charts`, `#social-card`) already cover every section this plan touches before skipping that step.
- Every commit follows this repo's `AGENTS.md` Conventional Commits + changelog-first discipline; `CHANGELOG.md` entries land under the existing `[Unreleased]` → new `### Added` section (this repo tagged `v2.0.0` already, so `[Unreleased]` is currently empty). Not a breaking change — nothing is renamed or removed.

---

### Task 1: `SKILL.md` — Accent button variant

**Files:**
- Modify: `skills/lux-swiss/SKILL.md`

**Interfaces:**
- Produces: the documented Accent button variant, which Task 2
  (components.md) and Task 3 (docs/index.html) implement. The exact
  class names `.btn-accent` and `.card-interactive` are introduced in
  Task 3, not here.

- [ ] **Step 1: Add the Accent button variant to `## Buttons`**

The `## Buttons` section currently reads (around lines 230–244):

```
## Buttons

All buttons: `font-mono uppercase tracking-[0.2em] text-xs`. Four variants:

- **Ghost / nav** (most common): `text-muted-foreground hover:text-foreground
  transition-colors`, no border.
- **Outlined:** `border border-foreground px-4 py-2 hover:bg-foreground
  hover:text-background`.
- **Filled** (primary action, rare): `border border-foreground bg-foreground px-4
  py-2 text-background hover:bg-foreground/90`.
- **Destructive:** `border border-primary text-primary px-4 py-2
  hover:bg-primary hover:text-primary-foreground` — Red's already-named
  "destructive" job (see Philosophy), now with a documented variant.

**Disabled** is always `opacity-40` — never a color change.
```

Replace with:

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
```

- [ ] **Step 2: Note the Accent button and Interactive card in `## Hover states`**

The `## Hover states` section currently reads in full (around lines
246–254):

```
## Hover states

Red is the only accent this system has, so it trivially carries any
real hover-state signal wherever an accent color participates in a
hover — there's no second color to subordinate. The gap this closes is
visibility, not governance: hover states weren't demonstrated anywhere
on the showcase page without an actual pointer. The new Destructive
button above, and a static "Default / Hover" swatch pair for it and for
the sidebar nav link, now show what was already true.
```

Replace with:

```
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
```

- [ ] **Step 3: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK` (this task doesn't touch
`docs/index.html`, so it must still pass unchanged).

Run: `rtk grep -n "Accent:\|Interactive card" skills/lux-swiss/SKILL.md`
Expected: matches for the new Accent button bullet and the Hover states
addition.

- [ ] **Step 4: Commit**

```bash
git add skills/lux-swiss/SKILL.md
git commit -m "feat: add Accent button variant to SKILL.md"
```

---

### Task 2: `references/components.md` — Accent button, Accent card, Interactive card

**Files:**
- Modify: `skills/lux-swiss/references/components.md`

**Interfaces:**
- Consumes: the rule text from Task 1.
- Produces: the full HTML patterns Task 3 implements on the live page.

- [ ] **Step 1: Add the Accent button Default/Hover swatch pattern**

The file currently has this content right after the "Nav-link hover,
Default vs. Hover" pattern, immediately before `## Iconography` (around
lines 189–199):

```
**Nav-link hover, Default vs. Hover.** A plain opacity shift — no
decorative flourish exists here, unlike Tri-Swiss's turquoise-flourish
nav link, since this system has no second color to add one with:

```html
<a style="color:var(--primary-foreground); opacity:0.75;">Section</a>
<!-- :hover (or a static .is-hover-demo modifier class for illustration) -->
<a style="color:var(--primary-foreground); opacity:1;">Section</a>
```

## Iconography (Lucide, restyled)
```

Insert a new pattern between the nav-link swatch and `## Iconography`:

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
```

- [ ] **Step 2: Add the Accent card and Interactive card patterns to `## Cards`**

The `## Cards` section currently reads in full (around lines 220–229):

```
## Cards

Elevation is a background step, never a shadow.

```
border border-border bg-card text-card-foreground p-6
```

Nest a section divider (see `SKILL.md`) inside for titled regions. Keep corners
square unless a `rounded-md` (0.5rem) genuinely helps.
```

Replace with:

```
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
```

- [ ] **Step 3: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK`.

Run: `rtk grep -n "Accent card\|Interactive card\|Accent button hover" skills/lux-swiss/references/components.md`
Expected: matches for all three new pattern headings.

- [ ] **Step 4: Commit**

```bash
git add skills/lux-swiss/references/components.md
git commit -m "docs: add Accent button, Accent card, and Interactive card patterns"
```

---

### Task 3: `docs/index.html` — CSS and Components-section demos

**Files:**
- Modify: `docs/index.html`

**Interfaces:**
- Consumes: the patterns from Task 2.
- Produces: the `.btn-accent` and `.card-interactive` CSS classes (with
  `:hover`/`.is-hover-demo` rules).

- [ ] **Step 1: Add the `.btn-accent` and `.card-interactive` CSS rules**

The `<style>` block currently has this section (around lines 77–87):

```css
    /* Hover-state visibility demos. .is-hover-demo mirrors the :hover
       rule's exact declarations as a static class, so the state is
       visible in a screenshot as well as to a live pointer. */
    .btn-destructive { border:1px solid var(--primary); background:none; color:var(--primary);
      transition:background-color 0.15s, color 0.15s; }
    .btn-destructive:hover, .btn-destructive.is-hover-demo { background:var(--primary); color:var(--primary-foreground); }
    .demo-nav-link { color:var(--primary-foreground); text-decoration:none; opacity:0.75;
      font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em;
      transition:opacity 0.15s; }
    .demo-nav-link:hover, .demo-nav-link.is-hover-demo { opacity:1; }
    /* Structural Block — sidebar layout */
```

Insert the new rules between `.demo-nav-link:hover` and the
`/* Structural Block */` comment:

```css
    /* Hover-state visibility demos. .is-hover-demo mirrors the :hover
       rule's exact declarations as a static class, so the state is
       visible in a screenshot as well as to a live pointer. */
    .btn-destructive { border:1px solid var(--primary); background:none; color:var(--primary);
      transition:background-color 0.15s, color 0.15s; }
    .btn-destructive:hover, .btn-destructive.is-hover-demo { background:var(--primary); color:var(--primary-foreground); }
    .demo-nav-link { color:var(--primary-foreground); text-decoration:none; opacity:0.75;
      font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em;
      transition:opacity 0.15s; }
    .demo-nav-link:hover, .demo-nav-link.is-hover-demo { opacity:1; }

    /* More color on hover/borders — Accent button (same mechanism as
       Destructive, different semantic use) and Interactive card. */
    .btn-accent { border:1px solid var(--primary); background:none; color:var(--primary);
      transition:background-color 0.15s, color 0.15s; }
    .btn-accent:hover, .btn-accent.is-hover-demo { background:var(--primary); color:var(--primary-foreground); }
    .card-interactive { display:block; text-decoration:none; color:inherit;
      border:1px solid var(--border); transition:border-color 0.15s; }
    .card-interactive:hover, .card-interactive.is-hover-demo { border-color:var(--primary); }
    /* Structural Block — sidebar layout */
```

- [ ] **Step 2: Add the Accent button to the existing Buttons demo card**

The Buttons demo card currently reads (around lines 351–366):

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Buttons</p>
            <div style="display:flex; flex-wrap:wrap; gap:10px; font-family:var(--font-mono);
                        text-transform:uppercase; letter-spacing:0.2em; font-size:0.7rem;">
              <button style="border:1px solid var(--foreground); background:var(--foreground);
                color:var(--background); padding:8px 14px;">Filled</button>
              <button style="border:1px solid var(--foreground); background:none;
                color:var(--foreground); padding:8px 14px;">Outlined</button>
              <button style="border:none; background:none; color:var(--muted-foreground);
                padding:8px 14px;">Ghost</button>
              <button style="border:1px solid var(--foreground); background:none; padding:8px 14px;
                opacity:0.4;" disabled>Disabled</button>
              <button class="btn-destructive" style="padding:8px 14px; font:inherit;
                letter-spacing:inherit; text-transform:inherit;">Destructive</button>
            </div>
          </div>
```

Replace with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Buttons</p>
            <div style="display:flex; flex-wrap:wrap; gap:10px; font-family:var(--font-mono);
                        text-transform:uppercase; letter-spacing:0.2em; font-size:0.7rem;">
              <button style="border:1px solid var(--foreground); background:var(--foreground);
                color:var(--background); padding:8px 14px;">Filled</button>
              <button style="border:1px solid var(--foreground); background:none;
                color:var(--foreground); padding:8px 14px;">Outlined</button>
              <button style="border:none; background:none; color:var(--muted-foreground);
                padding:8px 14px;">Ghost</button>
              <button style="border:1px solid var(--foreground); background:none; padding:8px 14px;
                opacity:0.4;" disabled>Disabled</button>
              <button class="btn-destructive" style="padding:8px 14px; font:inherit;
                letter-spacing:inherit; text-transform:inherit;">Destructive</button>
              <button class="btn-accent" style="padding:8px 14px; font:inherit;
                letter-spacing:inherit; text-transform:inherit;">Accent</button>
            </div>
          </div>
```

- [ ] **Step 3: Add the Accent card demo after the plain Card demo**

The Card demo currently reads (around lines 399–406):

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Card</p>
            <div style="border:1px solid var(--border); background:var(--card); padding:16px;">
              <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Elevated surface</p>
              <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
                Depth is a background step, never a shadow.</p>
            </div>
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Toggle</p>
```

Replace with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Card</p>
            <div style="border:1px solid var(--border); background:var(--card); padding:16px;">
              <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Elevated surface</p>
              <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
                Depth is a background step, never a shadow.</p>
            </div>
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Accent card <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">— Red border + wash</span></p>
            <div style="border:1px solid var(--primary); background:color-mix(in srgb, var(--primary) 8%, var(--card)); padding:16px;">
              <p style="margin:0; font-family:var(--font-mono); font-weight:700;">Accent card</p>
              <p style="margin:8px 0 0; font-size:0.85rem; color:var(--muted-foreground);">
                Red border + wash — more color on hover/borders.</p>
            </div>
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Toggle</p>
```

- [ ] **Step 4: Add the Interactive card demo and Accent-button Default/Hover swatch pair**

The Components grid currently ends (around lines 445–457) with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Hover — nav link <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">Plain opacity shift, no second color</span></p>
            <div style="display:flex; gap:0; background:var(--primary); padding:16px;">
              <div style="flex:1; display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-family:var(--font-mono); font-size:0.65rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--primary-foreground); opacity:0.7;">Default</span>
                <a href="#components" class="demo-nav-link" onclick="return false;">Section</a>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-family:var(--font-mono); font-size:0.65rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--primary-foreground); opacity:0.7;">Hover</span>
                <a href="#components" class="demo-nav-link is-hover-demo" onclick="return false;">Section</a>
              </div>
            </div>
          </div>

        </div>
      </section>
```

Replace with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Hover — nav link <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">Plain opacity shift, no second color</span></p>
            <div style="display:flex; gap:0; background:var(--primary); padding:16px;">
              <div style="flex:1; display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-family:var(--font-mono); font-size:0.65rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--primary-foreground); opacity:0.7;">Default</span>
                <a href="#components" class="demo-nav-link" onclick="return false;">Section</a>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-family:var(--font-mono); font-size:0.65rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--primary-foreground); opacity:0.7;">Hover</span>
                <a href="#components" class="demo-nav-link is-hover-demo" onclick="return false;">Section</a>
              </div>
            </div>
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Hover — accent button <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">Same mechanism as Destructive</span></p>
            <div style="display:flex; gap:24px; font-family:var(--font-mono);
                        text-transform:uppercase; letter-spacing:0.2em; font-size:0.7rem;">
              <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-size:0.65rem; letter-spacing:0.12em; color:var(--muted-foreground);">Default</span>
                <button class="btn-accent" style="padding:8px 16px; font:inherit; letter-spacing:inherit; text-transform:inherit;">Learn more</button>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-size:0.65rem; letter-spacing:0.12em; color:var(--muted-foreground);">Hover</span>
                <button class="btn-accent is-hover-demo" style="padding:8px 16px; font:inherit; letter-spacing:inherit; text-transform:inherit;">Learn more</button>
              </div>
            </div>
          </div>

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
```

- [ ] **Step 5: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK`.

Run: `rtk grep -n "btn-accent\|card-interactive" docs/index.html`
Expected: matches for the CSS class definitions plus usage sites (Buttons
demo, hover swatch pair ×2 for `.btn-accent`; Interactive card demo for
`.card-interactive`).

- [ ] **Step 6: Commit**

```bash
git add docs/index.html
git commit -m "feat: add accent button, accent card, and interactive card demos"
```

---

### Task 4: Screenshot regeneration

**Files:**
- Modify: `docs/assets/*.png` (regenerated, not hand-edited)

**Interfaces:**
- Consumes: the final page state from Task 3.

- [ ] **Step 1: Confirm no new capture-job entries are needed**

Read `scripts/capture/capture.mjs` and confirm its existing jobs
(`hero-light`/`hero-dark` fullViewport, `#palette`, `#components`,
`#charts`, `#social-card`) already cover every element this task
changed — they do: every new demo card lands inside the already-captured
`#components` job.

- [ ] **Step 2: Regenerate all screenshots**

Run: `cd scripts/capture && node capture.mjs` (run `npm install` first
if `node_modules` isn't already present).

Expected output: 6 `wrote <file>.png` lines, no errors.

- [ ] **Step 3: Visually confirm the changes**

Read (view as an image) `docs/assets/components.png` and confirm it
shows: an "Accent" button in the Buttons card (visually matching
Destructive's Red-bordered rest style), a new "Accent card" (Red border
+ a subtle tinted background, visually distinct from the plain Card next
to it), a new "Interactive card" demo, and a new "Hover — accent button"
Default/Hover swatch pair (Default: Red border; Hover: solid Red fill
with cream text).

- [ ] **Step 4: Commit**

```bash
git add docs/assets/
git commit -m "feat: regenerate screenshots for accent buttons and cards"
```

---

### Task 5: `CHANGELOG.md`, `README.md`, `CONTRIBUTING.md` sync

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`

**Interfaces:**
- None — this is the final, documentation-only task.

- [ ] **Step 1: Add the CHANGELOG entry**

This repo is tagged `v2.0.0`, so `CHANGELOG.md`'s `[Unreleased]` section
is currently empty. It reads:

```markdown
## [Unreleased]

## [2.0.0] — 2026-07-07
```

Replace with:

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
divider, not a one-off. No success green, no info blue, no second accent.
Win/loss, active/inactive, emphasis, and error are all expressed through
**typography weight, spacing, and contrast — never by adding a color.**
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
hover transition onto a clickable card. No success green, no info blue, no
second accent. Win/loss, active/inactive, emphasis, and error are all
expressed through **typography weight, spacing, and contrast — never by
adding a color.**
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
two equal ink/Blood-Red segments regardless of length.
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
semantic name — don't invent a second visual treatment for it.
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
git commit -m "docs: sync CHANGELOG, README, and CONTRIBUTING with the accent-buttons work"
```
