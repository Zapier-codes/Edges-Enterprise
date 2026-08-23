/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // U1CORE dark palette
        u1: {
          black:    '#090909',
          surface:  '#111111',
          elevated: '#1a1a1a',
          border:   '#222222',
          muted:    '#666666',
          silver:   '#a0a0a0',
          gold:     '#FED500',
          'gold-hover': '#e5c000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      slate: '#94a3b8',
      // Legacy alias for existing components that reference 'theme'
      theme: '#FED500',
    },
  },
  plugins: [],
}
