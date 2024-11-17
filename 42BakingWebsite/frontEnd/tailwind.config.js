/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

module.exports = {
  content: [
    "./index.html",                             
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          1: "#f2ccc3",
          2: "#e78f8e",
          3: "#ffe6e8",
          4: "#acd8aa",
          5: "#f48498",
          6: "#330f0a",
          7: "#6ec46a"
        }
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        titan: "var(--font-titan)",
      }
    },
  },
  plugins: [
    plugin(function({addComponents}){
      addComponents({
        ".button": {
          "@apply rounded-full": {},
        },
      }); 
    })     
  ],
}

