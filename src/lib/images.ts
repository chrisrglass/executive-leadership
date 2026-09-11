import type { ImageMetadata } from 'astro';

// Every image under src/assets/images, keyed by file name, so the content map can
// refer to files by name and Astro can still optimize them at build time.
const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpg,jpeg,png,webp}', { eager: true });

export const images: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);
