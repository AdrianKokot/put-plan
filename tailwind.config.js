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
      'bg-rose-600 dark:bg-rose-700',
      'bg-pink-600 dark:bg-pink-700',
      'bg-sky-600 dark:bg-sky-700',
      'bg-emerald-600 dark:bg-emerald-700',
      'bg-lime-600 dark:bg-lime-700',
      'bg-amber-600 dark:bg-amber-700',
      'bg-gray-600 dark:bg-gray-700',
      'bg-green-600 dark:bg-green-700',
      'bg-purple-600 dark:bg-purple-700',
      'bg-indigo-600 dark:bg-indigo-700',
      // 'bg-blue-600 dark:bg-blue-700',
      'bg-cyan-600 dark:bg-cyan-700',
      'bg-teal-600 dark:bg-teal-700',

      // 'bg-violet-600 dark:bg-violet-700',
      // 'bg-orange-600 dark:bg-orange-700',
      // 'bg-fuchsia-600 dark:bg-fuchsia-700',
      // 'bg-yellow-600 dark:bg-yellow-700',
      // 'bg-red-600 dark:bg-red-700',
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
