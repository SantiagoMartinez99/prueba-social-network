/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"], 
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Habilita solo el tema 'light'
  },
};
