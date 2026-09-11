# Executive Leadership

Digital edition of the annual review of the Executive Ed.D. in Higher Education at Boston College.
Live at https://chrisrglass.github.io/executive-leadership/

## How it is built

- One-page Astro site (`src/pages/index.astro`), static output, deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.
- Text is not edited here. The canonical text lives in the InDesign edition in the annual-review workspace and its two markdown mirrors (`informational-sections.md`, `synthesized-document-final.md`). `npm run sync` copies those files, the images, the fonts, and the print PDF into `src/content/`, `src/assets/`, and `public/`.
- Editorial furniture that InDesign holds outside the body text (cover teasers, decks, opener images, inline figures, captions, credits) is in `src/lib/content-map.ts`.
- `src/lib/markdown.ts` parses the markdown into sections (H1) and blocks; `src/components/Body.astro` renders them and places inline figures.
- Design tokens follow the Boston College design system: maroon `#8A100B`, dark maroon `#501315`, gold `#B29D6C`, cream, pale sage, on a paper ground. Type is Source Serif 4 and Open Sans, self-hosted.

## Commands

```
npm install
npm run sync      # pull content, images, fonts, and PDF from the workspace
npm run dev       # local preview at http://localhost:4321/executive-leadership/
npm run build     # static build in dist/
npm run preview
```
