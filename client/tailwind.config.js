/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /// bg-color
        color1: "black",
        /// text-color
        color2: "white",
        color3: "#0F172A",
        color4: "#192232",
        color5: "gray",
        ////hover color
        redColor: "#CD292E",
      },
    },
  },
  plugins: [],
};
