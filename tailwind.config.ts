import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        // Condensed display face for the stat-screen headings. The site's
        // Plus Jakarta Sans has no condensed cut, so Archivo Narrow is the
        // one family added for the new design.
        display: ['"Archivo Narrow"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        // Stat-screen palette. Fixed dark values — these two sections do not
        // follow the site's light/dark colour mode.
        stat: {
          ground: '#080c11',
          'ground-deep': '#06090d',
          'ground-lift': '#101822',
          panel: '#0d141c',
          'panel-end': '#0a1016',
          'panel-foot': '#0b1219',
          hairline: '#141d27',
          'hairline-strong': '#1a222c',
          'hairline-panel': '#1c2735',
          border: '#253241',
          track: '#161f29',
          'track-lg': '#18222d',
          accent: '#2f9bff',
          'accent-hi': '#5cb4ff',
          'accent-lo': '#1e86ec',
          'accent-deep': '#1a4d8f',
          'accent-deep-edge': '#2b6cbf',
          'accent-tint': '#8fb6dd',
          'accent-tint-hi': '#bcdcff',
          'badge-bg': '#0a1622',
          'badge-ring': '#0d1520',
          ink: '#e8eef5',
          'ink-2': '#dbe5ef',
          'ink-3': '#c6d3e1',
          'ink-4': '#c1cedb',
          'ink-dim': '#9dabba',
          'ink-dim-2': '#93a4b6',
          'ink-dim-3': '#8d9dad',
          'ink-mono': '#8b9dae',
          'ink-mono-2': '#8494a6',
          placeholder: '#6f8298',
          hover: '#3d4c5c',
          'row-hover': '#101922',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
