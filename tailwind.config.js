/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
