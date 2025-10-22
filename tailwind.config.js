/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          light: '#E0E6F1',
          dark: '#0A0F1E',
          'dark-secondary': '#10162A'
        },
        primary: {
          DEFAULT: '#0A0F1E',
          light: '#10162A'
        },
        secondary: {
          DEFAULT: '#10162A',
          light: '#1e293b'
        },
        accent: {
          DEFAULT: '#22d3ee',
          light: '#67e8f9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-bg-patterns'),
  ],
  darkMode: 'class',
}