/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // لازم تكون class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // أو حسب مشروعك
  ],
  theme: {
    extend: {
      height: {
        "fill-available": "fill-available",
      },
    },
  },
  plugins: [],
};
