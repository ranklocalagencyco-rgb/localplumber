import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  site: 'https://www.localplumber.co.uk',
  vite: {
    plugins: [tailwindcss()],
  },
});
