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
        menuItem: '#797979'
      },
    },
  },
  plugins: [],
}

