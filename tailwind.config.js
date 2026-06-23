/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#1D9E75',
          dark: '#0F6E56',
          deep: '#085041',
          light: '#E1F5EE',
          mid: '#9FE1CB',
        },
        gray: {
          50: '#FAFAF8',
          100: '#F4F3EF',
          200: '#E0DDD6',
          300: '#D3D1C7',
          400: '#B4B2A9',
          500: '#888780',
          600: '#5F5E5A',
          700: '#444441',
          900: '#111110',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
