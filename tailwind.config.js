/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "tw-",
  theme: {
    colors: {
      'orange': '#f67942',
      'white': '#ffffff',
      'black': '#292929',
      'pink': '#e2147a',
      'light-pink': '#f8e8ea',
      'beige': '#f8f8f8',
      'purple': '#785dda',
      'blue': '#227cf4',
      'green': '#28b9b7',
      'red': '#c62a2e',
      'gray': '#b6b5b6',
      'light-gray': '#f0f0f1',
      'lila': '#ece9f5',
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [require("tailwindcss-animate")],
}