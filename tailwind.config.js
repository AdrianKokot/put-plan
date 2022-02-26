const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.scss',
    './src/**/*.ts',
    './src/**/*.json',
  ],
  safelist: [
    {
      pattern: /bg-(rose|pink|sky|emerald|lime|amber|gray|green|purple|indigo|cyan|teal|fuchsia|yellow)-600/
    },
    {
      pattern: /bg-(rose|pink|sky|emerald|lime|amber|gray|green|purple|indigo|cyan|teal|fuchsia|yellow)-700/,
      variants: ['dark']
    }
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      rose: colors.rose,
      pink: colors.pink,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      violet: colors.violet,
      indigo: colors.indigo,
      blue: colors.blue,
      sky: colors.sky,
      cyan: colors.cyan,
      teal: colors.teal,
      emerald: colors.emerald,
      green: colors.green,
      lime: colors.lime,
      yellow: colors.yellow,
      amber: colors.amber,
      orange: colors.orange,
      red: colors.red,
      gray: colors.gray
    },
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto sans"',
          'sans-serif'
        ]
      }
    },
  }
};
