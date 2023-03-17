/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      colors: {
        primaryColor: "#fb8500",
        secondaryColor: "#023047",
        whiteColor: "#ffffff",
        onlineGreen: "#0ead69",
      },
    },
  },
  plugins: [],
};
