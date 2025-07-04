/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#F3F4F6",
        accent: "#D1D5DB",
        dark: "#111827",
        light: "#F9FAFB",
        sidebar:"#292929",
        icons:"#BDFFAF",
        bg: "#F3F3F3",
        columnPests: "var(--column-pests)",
        columFarmer: "var(--column-farmer)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
