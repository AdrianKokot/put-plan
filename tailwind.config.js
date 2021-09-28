const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.scss',
      './src/**/*.ts',
      './src/**/*.json',
    ],
    safelist: [
      'bg-rose-700',
      'bg-pink-700',
      'bg-fuchsia-700',
      'bg-purple-700',
      'bg-violet-700',
      'bg-indigo-700',
      'bg-blue-700',
      'bg-sky-700',
      'bg-cyan-700',
      'bg-teal-700',
      'bg-emerald-700',
      'bg-green-700',
      'bg-lime-700',
      'bg-yellow-700',
      'bg-amber-700',
      'bg-orange-700',
      'bg-red-700',
      'bg-gray-700',
    ]
  },
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
      gray: colors.coolGray
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
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
