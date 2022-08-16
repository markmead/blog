let defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
