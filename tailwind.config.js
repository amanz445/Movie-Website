/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#EEF0EF',
      'black': '#0F0F0F',
      'grey': '#808080',
      'red': '#E50914',
      'yellow': '#FDCC0D'
    }
  },
  plugins: [],
}