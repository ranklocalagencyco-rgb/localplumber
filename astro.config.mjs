import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap()],
  site: 'https://www.localplumber.co.uk',
  vite: {
    plugins: [tailwindcss()],
  },
});
