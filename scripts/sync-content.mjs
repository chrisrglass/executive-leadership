#!/usr/bin/env node
// Copies the canonical magazine content from the annual-review workspace into this site.
// Source of truth for text: the InDesign edition; the markdown mirrors it (see
// ../digital-magazine/public/content/*.md and production/indesign/extract-stories.jsx).
// Run: npm run sync
import { cpSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');
const workspace = resolve(site, '..');
const magazine = join(workspace, 'digital-magazine');

const jobs = [
  { from: join(magazine, 'public/content/informational-sections.md'), to: join(site, 'src/content/informational-sections.md') },
  { from: join(magazine, 'public/content/synthesized-document-final.md'), to: join(site, 'src/content/articles.md') },
];

const imageDir = join(magazine, 'public/images');
const fontDir = join(magazine, 'public/fonts/indesign-static');
const pdfCandidates = [
  join(workspace, 'production/indesign/Executive-Leadership-2026.pdf'),
  join(workspace, 'production/indesign/Executive-Leadership-2026-proof.pdf'),
];

for (const { from, to } of jobs) {
  if (!existsSync(from)) { console.error('missing', from); process.exit(1); }
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log('synced', to.replace(site + '/', ''));
}

mkdirSync(join(site, 'src/assets/images'), { recursive: true });
for (const f of readdirSync(imageDir)) {
  if (/\.(jpe?g|png|webp)$/i.test(f)) copyFileSync(join(imageDir, f), join(site, 'src/assets/images', f));
}
console.log('synced images');

mkdirSync(join(site, 'src/assets/fonts'), { recursive: true });
for (const f of readdirSync(fontDir)) {
  if (/\.ttf$/i.test(f)) copyFileSync(join(fontDir, f), join(site, 'src/assets/fonts', f));
}
console.log('synced fonts');

const pdf = pdfCandidates.find((p) => existsSync(p));
if (pdf) {
  mkdirSync(join(site, 'public'), { recursive: true });
  copyFileSync(pdf, join(site, 'public/executive-leadership-2026.pdf'));
  console.log('synced print PDF from', pdf.replace(workspace + '/', ''));
} else {
  console.log('no print PDF found; download link will be hidden');
}
