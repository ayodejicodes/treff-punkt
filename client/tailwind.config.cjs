/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      colors: {
        primaryColor: "#fb8500",
        secondaryColor: "#023047",
        whiteColor: "rgba(255, 255, 255, 0.85)",
        reject: "rgba(255, 0, 0, 0.65)",
        blackColor: "#000000",
        notificationRed: "#e63946",
        onlineGreen: "#0ead69",
        offlineGray: "#6c757d",
      },
    },
  },
  plugins: [],
};
