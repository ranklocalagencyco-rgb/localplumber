/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-canvas': '#FFFFFF',
        'brand-navy':   '#0A192F',
        'brand-hydro':  '#0077B6',
        'brand-coral':  '#00B4D8',
        'brand-ice':    '#F0F9FF',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
