/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'primary': '#37cd92',
      'primary-h':'#2ea978',
      'dg-100': '#121212',
      'white':'#fff',
      'black':'#000'
    },
    extend: {
    },
  },
  plugins: [],
}

