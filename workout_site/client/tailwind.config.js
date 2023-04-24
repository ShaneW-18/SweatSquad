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
      'primary-h2':'#168e5d',
      'dg-100': '#121212',
      'dg-200': '#222',
      'dg-300': '#343434',
      'dg-400': '#454545',
      'white':'#fff',
      'black':'#000',
      'transparent':'rgba(0,0,0,0)',
      'red':'#e64040',
      'red-h': '#b83939',
      'blue': '#5caaed',
      'msg-mine':'#4a75e0',
    },
    extend: {
    },
    screens: {
      'xs': '0px',
      'sm': '600px',
      'md': '1024px',
      'lg': '1440px'
    },
    gridTemplateColumns: {
      '2': '1fr 1fr',
      '1': 'auto',
      '23': '2fr 1fr',
      '13': '1fr 2fr',
      '3': '1fr 1fr 1fr',
      '4': '1fr 1fr 1fr 1fr',
    }
  },
  plugins: [],
}

