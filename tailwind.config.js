/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beef-red': '#dc2626',
        'beef-dark': '#991b1b',
        'beef-light': '#fef2f2',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 