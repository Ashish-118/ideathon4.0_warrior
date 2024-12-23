/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        MenuBg: '#dddddd',
        Custompurple: '#801aa4',
        bodyBg: '#ededed',
        filterBG: '#dddddd',
        menuItem: '#797979',
        Login: '#8f8f8f'
      },
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
      },
    },
  },
  plugins: [],
}

