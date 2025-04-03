/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales de SAP Fiori
        "fiori-blue": "#0a6ed1",
        "fiori-dark-blue": "#0854a0",
        "fiori-shell": "#354a5f",
        "fiori-text": "#32363a",
        "fiori-light-gray": "#f7f7f7",
        "fiori-border": "#d9d9d9",
        "fiori-accent": "#0070f2",
        "fiori-negative": "#bb0000",
        "fiori-critical": "#e9730c",
        "fiori-positive": "#107e3e",
      },
      fontFamily: {
        fiori: ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}