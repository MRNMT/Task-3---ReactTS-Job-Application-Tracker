/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        status: {
          applied: '#FBBF24', // Yellow
          interviewed: '#22C55E', // Green
          rejected: '#EF4444' // Red
        }
      },
      screens: {
        'xs': '320px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
      }
    },
  },
  plugins: [],
}
