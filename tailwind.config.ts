/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.vue",
    "./src/**/*.ts",
    // You might also want to add paths for any other files that contain Tailwind class names
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#151718",
        green: "#3DD26A",
        red: "#F00",
        purple: "#4A00D5",
        dark: {
          100: "#0E0E0E",
          200: "#101010",
        },
        grey: {
          100: "#F9F9F9",
          200: "#BFBFBF",
          300: "#747475",
          400: "#CFCFCF",
          500: "#444444",
        },
      },
    },
  },
  plugins: [],
};
