// Renders cv-en.html / cv-es.html to the CV PDFs the site links to.
//   npm i -D playwright   (once)
//   node assets/cv-src/render.mjs
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const assets = join(here, "..");

const jobs = [
  ["cv-en.html", "Laura-Marcenaro-Software-Engineer-CV.pdf"],
  ["cv-es.html", "Laura-Marcenaro-Software-Engineer-CV-ES.pdf"],
];

const browser = await chromium.launch();
for (const [src, out] of jobs) {
  const page = await browser.newPage();
  await page.setContent(readFileSync(join(here, src), "utf8"), { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  // preferCSSPageSize honours the @page rule in the file (A4 + margins)
  await page.pdf({ path: join(assets, out), preferCSSPageSize: true, printBackground: true });
  await page.close();
  console.log("wrote", out);
}
await browser.close();
