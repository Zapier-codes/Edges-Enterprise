/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'slate': '#94a3b8',
      // Edges Enterprise brand palette — futuristic corporate (electric blue / cyan on deep navy)
      'theme': '#0B63F6',     // primary brand blue
      'accent': '#00D1FF',    // cyan glow accent
      'midnight': '#060B17',  // near-black navy, hero/dark sections
      'graphite': '#111827',  // dark neutral surface
      'metal': '#7C8DB5',     // muted steel secondary text
      'silver': '#E7ECF5',    // light neutral surface
      'purple': '#6C5CE7',    // violet accent for gradients
    },
  },
  plugins: [],
}