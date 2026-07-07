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

// 1b. No raw rgb()/rgba() or 3-digit hex — use a token or color-mix over a token.
if (/\brgba?\(/i.test(html)) fail("raw rgb()/rgba() literal — use a token or color-mix(var(--token), transparent)");
if (/#[0-9a-fA-F]{3}\b/.test(html)) fail("3-digit hex literal found — use a full token hex or var()");

// 2. No shadows.
if (/box-shadow|drop-shadow/i.test(html)) fail("shadow found (elevation must be a background step)");

// 3. Icons: no rounded caps left un-restyled (catches both the SVG attribute
// form `stroke-linecap="round"` and the CSS form `stroke-linecap:round`).
if (/stroke-linecap\s*[:=]\s*["']?round\b/i.test(html)) fail('icon stroke-linecap:round found (must be square)');

// 4. Required social/OG meta tags present.
for (const needle of ['property="og:image"', 'property="og:title"', 'name="twitter:card"',
                       'name="description"']) {
  if (!html.includes(needle)) fail("missing meta: " + needle);
}

// 5. og:image must be an absolute Pages URL (no /docs/ segment). Anchored to
// the og:image meta tag's content attribute specifically — a whole-file
// substring search would also match the twitter:image tag and miss a
// regression that broke only og:image.
if (!/property="og:image"\s+content="https:\/\/luxsolari\.github\.io\/lux-swiss\/assets\/social-card\.png"/.test(html))
  fail("og:image is not the absolute Pages asset URL");

// 6. Author is credited somewhere (hero and/or footer name the house).
if ((html.match(/Lux Solari/g) || []).length < 1) fail("author should be credited at least once");

if (!process.exitCode) console.log("PASS: philosophy compliance OK");
