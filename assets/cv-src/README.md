# CV sources

`cv-en.html` / `cv-es.html` are the editable sources for the CV PDFs linked
from the site (`assets/Laura-Marcenaro-Software-Engineer-CV.pdf` and `...-CV-ES.pdf`).

Both are designed to fit **one A4 page**. The layout (fonts, spacing, accent
colour) lives in the `<style>` block at the top of each file; the accent colour
is the `--accent` / `--accent-ink` / `--tint` CSS variables (currently indigo).

## Regenerate the PDFs

```bash
npm i -D playwright        # once
node assets/cv-src/render.mjs
```

`render.mjs` uses headless Chromium with `preferCSSPageSize` so the `@page`
rule in each file (A4 + margins) is honoured. Plain `chrome --print-to-pdf`
adds its own margins and can push the last row onto a second page — use the
script.
