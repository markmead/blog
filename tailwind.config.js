const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
