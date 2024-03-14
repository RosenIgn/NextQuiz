/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      colors: {
        'bone-white': '#E0E1DD',
        'main-white': '#E9EAE5',
        'main-blue': '#1B67C9',
        'light-blue': '#E9F0FA',
        'dark-blue': '#172152',
      },
      fontFamily: {
        'main': ['Poppins', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [require("daisyui")],
};
