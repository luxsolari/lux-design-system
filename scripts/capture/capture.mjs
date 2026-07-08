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
  await page.waitForSelector("#plot-mount svg", { timeout: 20000 }); // Plot chart rendered from CDN
  for (const j of jobs) {
    await page.evaluate((d) => document.documentElement.classList.toggle("dark", d), !!j.dark);
    await page.waitForTimeout(200);
    if (j.fullViewport) {
      // Sidebar + content together, not scoped to one section — the sidebar is a
      // sibling of every #section, so an element-scoped shot never shows it. A plain
      // page.screenshot() with no clip/fullPage captures exactly the loaded viewport.
      await page.screenshot({ path: path.join(outDir, j.file) });
      console.log("wrote", j.file);
      continue;
    }
    const el = await page.$(j.id);
    // #social-card is intentionally rendered off-canvas (left:-9999px) so it never
    // shows in the live page. Playwright's elementHandle.screenshot() cannot clip a
    // negative-x region correctly (the browser can't scroll to negative X, so the
    // clip falls back to the viewport origin and silently captures whatever else is
    // at (0,0) — verified by reproduction: it grabbed the hero section instead).
    // Fix: temporarily zero out the element's own inline offset for the capture only
    // (DOM-only, in the headless page — never touches docs/index.html on disk), then
    // restore it so the live page is unaffected.
    const box = await el.boundingBox();
    const offCanvas = box.x < 0 || box.y < 0;
    if (offCanvas) {
      await el.evaluate((node) => {
        node.dataset.captureLeft = node.style.left;
        node.dataset.captureTop = node.style.top;
        node.style.left = "0px";
        node.style.top = "0px";
      });
      await page.waitForTimeout(50);
    }
    const shotBox = await el.boundingBox();
    if (j.assert) {
      if (Math.round(shotBox.width) !== j.assert.w || Math.round(shotBox.height) !== j.assert.h)
        throw new Error(`${j.file}: expected ${j.assert.w}x${j.assert.h}, got ${Math.round(shotBox.width)}x${Math.round(shotBox.height)}`);
    }
    await el.screenshot({ path: path.join(outDir, j.file) });
    if (offCanvas) {
      await el.evaluate((node) => {
        node.style.left = node.dataset.captureLeft;
        node.style.top = node.dataset.captureTop;
        delete node.dataset.captureLeft;
        delete node.dataset.captureTop;
      });
    }
    console.log("wrote", j.file);
  }
  await browser.close();
}

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

// Social card — exact 1200x630 at 1x for OG.
await shoot({ dsr: 1, viewport: { width: 1280, height: 720 } }, [
  { id: "#social-card", file: "social-card.png", dark: false, assert: { w: 1200, h: 630 } },
]);
