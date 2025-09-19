/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        status: {
          applied: '#06310bff', // light gray for light mode
          interviewed: '#6b7280', // gray
          rejected: '#374151' // dark gray
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
