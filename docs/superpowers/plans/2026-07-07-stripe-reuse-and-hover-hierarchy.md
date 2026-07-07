# Segment Stripe Reuse and Hover-State Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the two-color segment stripe reusable at varying lengths, and add a Destructive button variant plus visible hover-state demonstrations, so Lux Swiss's documentation and showcase page match the rigor just added to its sibling Tri-Swiss — without introducing any second accent color.

**Architecture:** Pure documentation + static-page changes across `SKILL.md`, `references/components.md`, and `docs/index.html`. No build step, no new CSS tokens (Blood Red already has `--primary-foreground` for text-on-fill), no new capture-job entries (every change lands inside already-captured `#components`/`#charts` sections).

**Tech Stack:** Plain HTML/CSS (Tailwind 4 `@theme inline` tokens), Playwright (screenshot capture), Node.js (capture/verify scripts), Markdown.

## Global Constraints

- Ink, cream, and Blood Red remain the only three color tokens — no second or third accent introduced anywhere.
- No Turquoise-Structural-Block equivalent — there is no second accent color to give a smaller, secondary layout job to. Do not invent one.
- No "primary vs. secondary accent" hover hierarchy — Red is the only accent, so it trivially carries any real hover signal. Only the *visibility* problem (hover states aren't shown anywhere without a live pointer) is being fixed.
- The existing Ghost/Outlined/Filled buttons are unchanged — only a new Destructive variant is added alongside them.
- The segment stripe stays exactly two *equal* segments, ink then Blood Red — never reweighted, reordered, or expanded to a third color.
- `scripts/capture/verify-philosophy.mjs` must continue to print `PASS: philosophy compliance OK` after every task that touches `docs/index.html` (confirmed identical success message to Tri-Swiss's own verifier, though the two scripts' check logic is not assumed identical beyond that).
- Every commit follows this repo's `AGENTS.md` Conventional Commits + changelog-first discipline. This repo has a real tagged `v1.0.0` release, so any `CHANGELOG.md` entries land under `[Unreleased]`, not a new version section — but this specific change is **not** a breaking change (no rename, no removed public API), so no `BREAKING CHANGE` marker is needed, unlike the earlier rebrand work in this repo's history.
- No new capture-job entries are needed in `scripts/capture/capture.mjs` — confirm this repo's existing jobs (`#palette`, `#components`, `#charts`, plus fullViewport hero and `#social-card`) already cover every section this plan touches before skipping that step.

---

### Task 1: Stripe-reuse rule, hover states, and Destructive button in `SKILL.md` and `references/components.md`

**Files:**
- Modify: `skills/lux-swiss/SKILL.md`
- Modify: `skills/lux-swiss/references/components.md`

**Interfaces:**
- Produces: the documented rule text and HTML patterns that Task 2 implements on the live page (the `.btn-destructive`/`.demo-nav-link` CSS classes Task 2 defines are named to match the pattern shown here).

- [ ] **Step 1: Add the stripe-reuse rule to `SKILL.md`'s Philosophy section**

In `skills/lux-swiss/SKILL.md`, the Philosophy section currently reads
(around lines 58–69):

```
Blood red also has a third job beyond accent/destructive/ring: a
**Structural Block** — a solid-color sidebar/nav rail or hero band (pick
one per layout, capped at ~25% of viewport width/height), plus an
independent bold-word accent inside a heading that may combine with
either. This is not a second color — it is a new layout job for the one
accent this system already has. Outside that one block, ink and cream
continue to dominate every other surface exactly as before.

**Swiss-minimalist.** Borders are visible (1px solid, full ink or full cream). No
shadows — elevation comes from a background-color step (`--card` vs `--background`).
Whitespace is generous. Labels are uppercase monospace with wide letter-spacing.
Corners are mostly square.
```

Replace with:

```
Blood red also has a third job beyond accent/destructive/ring: a
**Structural Block** — a solid-color sidebar/nav rail or hero band (pick
one per layout, capped at ~25% of viewport width/height), plus an
independent bold-word accent inside a heading that may combine with
either. This is not a second color — it is a new layout job for the one
accent this system already has. Outside that one block, ink and cream
continue to dominate every other surface exactly as before.

The two-color segment stripe isn't limited to one instance: it may be
reused at any length as a decorative divider or spacer — a small marker
before a heading, a wider closing flourish — anywhere a purely
decorative rule would otherwise go, as long as it stays two *equal*
segments, ink then Blood Red, and is used selectively rather than
replacing the default `bg-border` divider throughout.

**Swiss-minimalist.** Borders are visible (1px solid, full ink or full cream). No
shadows — elevation comes from a background-color step (`--card` vs `--background`).
Whitespace is generous. Labels are uppercase monospace with wide letter-spacing.
Corners are mostly square.
```

- [ ] **Step 2: Add the Destructive button variant to `## Buttons`**

The `## Buttons` section currently reads (around lines 223–234):

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
```

Replace with:

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

- [ ] **Step 3: Add the `## Hover states` section**

Directly after the `## Buttons` section (which now ends with "**Disabled**
is always `opacity-40` — never a color change.") and before `## Tags /
pills`, insert:

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

- [ ] **Step 4: Update the "Two-color segment stripe" entry in `components.md`**

In `skills/lux-swiss/references/components.md`, the current entry reads
(around lines 148–156):

```
**Two-color segment stripe.** Two equal solid blocks — ink, Blood Red —
used as a static decorative bar (e.g. beneath a hero title):

```html
<div style="display:flex; gap:4px; width:64px;">
  <div style="height:3px; flex:1; background:var(--foreground);"></div>
  <div style="height:3px; flex:1; background:var(--primary);"></div>
</div>
```
```

Replace with:

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
```

- [ ] **Step 5: Add the Destructive-button and nav-link Default/Hover swatch patterns**

In `components.md`, the file currently has this content right after the
"Brand-moment device" entry, immediately before `## Iconography` (around
lines 158–166):

```
**Brand-moment device.** Exactly one element per page — the hero wordmark
— rendered at the heaviest real weight (700, same as every other heading)
combined with a deliberate size jump well beyond the normal type scale:

```html
<h1 style="font-size:4.5rem;">Page Title.</h1>
```

## Iconography (Lucide, restyled)
```

Insert the new patterns between the brand-moment example and `##
Iconography`:

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

## Iconography (Lucide, restyled)
```

- [ ] **Step 6: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK` (this script only reads
`docs/index.html`, which this task doesn't touch, so it must still pass
unchanged).

Run: `rtk grep -n "Destructive\|Hover states\|Two-color segment stripe" skills/lux-swiss/SKILL.md skills/lux-swiss/references/components.md`
Expected: matches for the new Destructive bullet, the new Hover states
section, and the updated stripe entry in both files.

- [ ] **Step 7: Commit**

```bash
git add skills/lux-swiss/SKILL.md skills/lux-swiss/references/components.md
git commit -m "feat: add stripe reuse rule, hover states section, and Destructive button"
```

---

### Task 2: `docs/index.html` — CSS, stripe instances, Destructive button, and hover swatches

**Files:**
- Modify: `docs/index.html`
- Modify: `docs/assets/*.png` (regenerated, not hand-edited)

**Interfaces:**
- Consumes: the rule text and patterns from Task 1.
- Produces: the `.btn-destructive` and `.demo-nav-link` CSS classes
  (with `:hover`/`.is-hover-demo` rules), used only within this task's
  own markup.

- [ ] **Step 1: Add the Destructive-button and nav-link-demo CSS rules**

The `<style>` block currently has this section (around lines 74–77):

```css
    .toggle button[aria-pressed="true"] { color:var(--foreground); }
    .toggle .mid { color:var(--muted-foreground); opacity:0.4; }
    /* Structural Block — sidebar layout */
```

Insert new rules between `.toggle .mid` and the `/* Structural Block —
sidebar layout */` comment:

```css
    .toggle button[aria-pressed="true"] { color:var(--foreground); }
    .toggle .mid { color:var(--muted-foreground); opacity:0.4; }

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

- [ ] **Step 2: Add the small tri-part stripe marker before the "Components" heading**

The Components section's divider currently reads (line 329):

```html
        <div class="divider"><h3>Components</h3><span class="rule"></span></div>
```

Replace with:

```html
        <div class="divider">
          <div style="display:flex; gap:3px; width:36px;" aria-hidden="true">
            <div style="height:3px; flex:1; background:var(--foreground);"></div>
            <div style="height:3px; flex:1; background:var(--primary);"></div>
          </div>
          <h3>Components</h3><span class="rule"></span>
        </div>
```

- [ ] **Step 3: Add the Destructive button to the existing Buttons demo card**

The Buttons demo card currently reads (around lines 332–345):

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
            </div>
          </div>
```

- [ ] **Step 4: Add the two Default/Hover swatch-pair demo cards**

The Components grid currently ends (around lines 397–409) with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Icons · Lucide — endorsed set</p>
            <div style="display:flex; flex-wrap:wrap; gap:18px; color:var(--foreground);">
              <svg class="icon" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg><!-- menu -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><!-- x -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg><!-- arrow-right -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg><!-- external-link -->
              <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg><!-- sun -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><!-- moon -->
            </div>
          </div>

        </div>
      </section>
```

Replace with:

```html
          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Icons · Lucide — endorsed set</p>
            <div style="display:flex; flex-wrap:wrap; gap:18px; color:var(--foreground);">
              <svg class="icon" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg><!-- menu -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><!-- x -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg><!-- arrow-right -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg><!-- external-link -->
              <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg><!-- sun -->
              <svg class="icon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><!-- moon -->
            </div>
          </div>

          <div style="border:1px solid var(--border); padding:20px;">
            <p class="label" style="margin-bottom:16px;">Hover — destructive button <span style="text-transform:none; letter-spacing:normal; color:var(--muted-foreground);">Red's real signal, made visible</span></p>
            <div style="display:flex; gap:24px; font-family:var(--font-mono);
                        text-transform:uppercase; letter-spacing:0.2em; font-size:0.7rem;">
              <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-size:0.65rem; letter-spacing:0.12em; color:var(--muted-foreground);">Default</span>
                <button class="btn-destructive" style="padding:8px 16px; font:inherit; letter-spacing:inherit; text-transform:inherit;">Delete</button>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
                <span style="font-size:0.65rem; letter-spacing:0.12em; color:var(--muted-foreground);">Hover</span>
                <button class="btn-destructive is-hover-demo" style="padding:8px 16px; font:inherit; letter-spacing:inherit; text-transform:inherit;">Delete</button>
              </div>
            </div>
          </div>

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

- [ ] **Step 5: Add the wider stripe divider inside the Charts section**

The Charts section's two-figure grid currently ends (around lines
414–436) with:

```html
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
          <figcaption class="label" style="margin-bottom:12px;">Observable Plot · endorsed chart library — restyled to the palette</figcaption>
          <div id="plot-mount"></div>
        </figure>
      </section>
```

Replace with:

```html
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

        <div style="display:flex; justify-content:center; padding:32px 0 0;">
          <div style="display:flex; gap:6px; width:140px;" aria-hidden="true">
            <div style="height:3px; flex:1; background:var(--foreground);"></div>
            <div style="height:3px; flex:1; background:var(--primary);"></div>
          </div>
        </div>

        <figure style="margin:32px 0 0;">
          <figcaption class="label" style="margin-bottom:12px;">Observable Plot · endorsed chart library — restyled to the palette</figcaption>
          <div id="plot-mount"></div>
        </figure>
      </section>
```

- [ ] **Step 6: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK`.

Run: `rtk grep -n "btn-destructive\|demo-nav-link" docs/index.html`
Expected: matches for the CSS class definitions and their uses in the
three new/modified elements (Destructive button, two swatch-pair cards).

- [ ] **Step 7: Regenerate screenshots**

Confirm no new capture-job entries are needed first: read
`scripts/capture/capture.mjs` and confirm its existing jobs
(`#palette`, `#components`, `#charts`, plus fullViewport hero and
`#social-card`) already cover every element this task changed (they
do — everything lands inside `#components` or `#charts`).

Run: `cd scripts/capture && npm install && node capture.mjs` (or, if
dependencies are already installed, just `node capture.mjs` from
`scripts/capture/`).

Expected output: one `wrote <file>.png` line per existing job, no
errors.

Read (view as an image) `docs/assets/components.png` and confirm it
shows the Destructive button in the Buttons card, plus the two new
Default/Hover swatch-pair cards (destructive button outline→red-fill,
nav-link opacity 0.75→1 on a red background).

Read `docs/assets/charts.png` and confirm the wider stripe divider
appears between the two chart figures and the Observable Plot figure.

- [ ] **Step 8: Commit**

```bash
git add docs/index.html docs/assets/
git commit -m "feat: add destructive button, hover swatches, and stripe divider to the showcase"
```

---

### Task 3: `CHANGELOG.md`, `README.md`, `CONTRIBUTING.md` sync

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`

**Interfaces:**
- Consumes: nothing new from Task 2 — no new screenshot filenames were
  introduced, so the existing `components.png`/`charts.png` embeds in
  README.md already point at the right files.

- [ ] **Step 1: Add the CHANGELOG entries**

`CHANGELOG.md`'s `[Unreleased]` → `### Added` list currently ends
(right before `### Changed`) with:

```markdown
- **Showcase page restructure** — `docs/index.html` now uses a persistent
  sidebar nav (wordmark, anchor nav, theme toggle, GitHub link,
  copyright), collapsing to a red top band with a hamburger toggle below
  the mobile breakpoint.

### Changed
```

Replace with:

```markdown
- **Showcase page restructure** — `docs/index.html` now uses a persistent
  sidebar nav (wordmark, anchor nav, theme toggle, GitHub link,
  copyright), collapsing to a red top band with a hamburger toggle below
  the mobile breakpoint.
- **Segment stripe reuse** — the two-color stripe is no longer a single
  fixed instance under the hero; it's now a general decorative
  divider/spacer reusable at any length, demonstrated at three different
  lengths on the showcase page (`SKILL.md`, `references/components.md`,
  `docs/index.html`).
- **Destructive button and hover-state visibility** — a new Destructive
  button variant (Red's already-named "destructive" job, now with a
  documented variant), plus two "Default / Hover" static swatch pairs
  (destructive button, nav link) so hover states are visible on the
  showcase page without a live pointer (`SKILL.md`,
  `references/components.md`, `docs/index.html`).

### Changed
```

Not a breaking change — nothing is renamed or removed, so no
`BREAKING CHANGE` marker.

- [ ] **Step 2: Update README.md's aesthetic-summary paragraph**

`README.md`'s "## The aesthetic" section currently reads:

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

Replace with:

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

- [ ] **Step 3: Update CONTRIBUTING.md's Design-changes paragraph**

`CONTRIBUTING.md`'s "Design changes" section currently reads:

```markdown
The design language lives in `skills/lux-swiss/`. Keep the two governing
rules intact — **duotone strict** (two colors + one accent, used more freely for
action/Structural-Block/brand-moment jobs, but never a second hue) and
**Swiss-minimalist** (visible borders, no shadows). Changes that add a color or a
shadow contradict the system and won't be accepted; express new states through
weight, size, spacing, and contrast instead.
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
two equal ink/Blood-Red segments regardless of length.
```

- [ ] **Step 4: Verify**

Run: `node scripts/capture/verify-philosophy.mjs` from the repo root.
Expected: `PASS: philosophy compliance OK` (this task doesn't touch
`docs/index.html`, so this is a sanity check that nothing upstream
regressed).

Run: `claude plugin validate .` from the repo root.
Expected: `✔ Validation passed with warnings`, with exactly one
pre-existing, unrelated warning about `CLAUDE.md` at the plugin root
not being loaded as project context (out of scope — do not fix it) —
confirm no *new* errors or warnings appear.

- [ ] **Step 5: Commit**

```bash
git add CHANGELOG.md README.md CONTRIBUTING.md
git commit -m "docs: sync CHANGELOG, README, and CONTRIBUTING with the stripe/hover work"
```
