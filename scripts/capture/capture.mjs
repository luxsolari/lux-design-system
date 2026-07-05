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
