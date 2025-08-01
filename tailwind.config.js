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
        // Only used colors
        primary: "var(--color-primary)",
        sidebarBg: "var(--color-sidebar-bg)",
        iconsAccent: "var(--color-icons-accent)",
        backgroundGray: "var(--color-background-gray)",
        backgroundOffWhite: "var(--color-background-off-white)",
        backgroundLightGray: "var(--color-background-light-gray)",
        textPrimary: "var(--color-text-primary)",
        textDescription: "var(--color-text-description)",
        columnFarmer: "var(--color-column-farmer)",
        trainingHighlight: "var(--color-training-highlight)",
        reportsBg: "var(--color-reports-bg)",
        modalBg: "var(--color-modal-bg)",
        // Chart specific colors - Only used colors
        chartGray: "var(--color-chart-gray)",
        // Graph colors
        corn: "var(--color-corn)",
        rice: "var(--color-rice)",
        stem: "var(--color-stem)",
        snail: "var(--color-snail)",
        worm: "var(--color-worm)",
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
