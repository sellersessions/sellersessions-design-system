/** @type {import('tailwindcss').Config} */
export default {
  important: '#root',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ss-purple': {
          DEFAULT: '#461499',
          light: '#753EF7',
          dark: '#0C0322',
        },
        'ss-accent': {
          DEFAULT: '#753EF7',
          light: '#9B6DFF',
          dark: '#3B0A99',
        },
        'ss-gold': {
          DEFAULT: '#FBBF24',
        },
        'ss-orange': {
          DEFAULT: '#F97316',
        },
        'ss-bg': {
          DEFAULT: '#0C0322',
          mid: '#130d2a',
          card: '#1a1a2e',
          hover: '#252040',
        },
        'ss-text': {
          DEFAULT: '#FAFAFC',
          secondary: '#D2D2D2',
          tertiary: '#9CA3AF',
        },
        'ss-border': {
          DEFAULT: '#1F1F1F',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        button: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(117, 62, 247, 0.3)',
        'glow-accent': '0 0 20px rgba(117, 62, 247, 0.4)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
