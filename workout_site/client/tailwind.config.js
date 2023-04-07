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
      'dg-200': '#222',
      'dg-300': '#343434',
      'white':'#fff',
      'black':'#000',
      'transparent':'rgba(0,0,0,0)'
    },
    extend: {
    },
    screens: {
      'sm': '600px',
      'md': '1024px',
      'lg': '1440px'
    },
    gridTemplateColumns: {
      '2': '1fr 1fr',
      '1': 'auto',
      '23': '2fr 1fr',
    }
  },
  plugins: [],
}

