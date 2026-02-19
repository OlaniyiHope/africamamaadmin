/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8FF15F",
        secondary: "#1A4D00",
        background: "#F6FCEB",
      },
    },
  },
  plugins: [],
};
