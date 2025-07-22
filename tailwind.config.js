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
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        dark: "var(--color-dark)",
        light: "var(--color-light)",
        sidebarBg: "var(--color-sidebar-bg)",
        iconsAccent: "var(--color-icons-accent)",
        backgroundGray: "var(--color-background-gray)",
        backgroundWhite: "var(--color-background-white)",
        backgroundOffWhite: "var(--color-background-off-white)",
        backgroundLightGray: "var(--color-background-light-gray)",
        textPrimary: "var(--color-text-primary)",
        columnPests: "var(--color-column-pests)",
        columnFarmer: "var(--color-column-farmer)",
        trainingHighlight: "var(--color-training-highlight)",
        calendarHighlight: "var(--color-calendar-highlight)",
        reportsBg: "var(--color-reports-bg)",
        // Chart specific colors
        chartGrid: "var(--color-chart-grid)",
        chartPurple: "var(--color-chart-purple)",
        chartCyan: "var(--color-chart-cyan)",
        chartRed: "var(--color-chart-red)",
        chartGray: "var(--color-chart-gray)",
        chartText: "var(--color-chart-text)",
        chartGreen: "var(--color-chart-green)",
        chartBlue: "var(--color-chart-blue)",
        chartOrange: "var(--color-chart-orange)",
        chartYellow: "var(--color-chart-yellow)",
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
