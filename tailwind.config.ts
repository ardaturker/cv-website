import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./components/**/*.{vue,js,ts}', './app.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
} satisfies Config
