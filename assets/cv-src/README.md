# CV sources

`cv-en.html` / `cv-es.html` are the editable sources for the CV PDFs linked
from the site (`assets/Laura-Marcenaro-CV.pdf` and `...-CV-ES.pdf`).

To regenerate after editing (headless Chrome):

```bash
chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="assets/Laura-Marcenaro-CV.pdf" "assets/cv-src/cv-en.html"
chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="assets/Laura-Marcenaro-CV-ES.pdf" "assets/cv-src/cv-es.html"
```
