import { defineConfig } from 'astro/config';

// Executive Leadership, digital edition. Static build served by GitHub Pages
// at https://chrisrglass.github.io/executive-leadership/
export default defineConfig({
  site: 'https://chrisrglass.github.io',
  base: '/executive-leadership',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
