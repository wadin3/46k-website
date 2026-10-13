import { defineConfig } from 'astro/config';
export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://46k.com',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
});
