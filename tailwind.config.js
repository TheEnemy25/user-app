/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        widest: "0.25em",
        wider: "0.15em",
        wide: "0.1em",
      },
      fontFamily: {
        karla: ["Karla", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      fontWeight: {
        medium: 500,
        bold: 700,
        light: 300,
        regular: 400,
      },
    },
  },
  plugins: [],
};
