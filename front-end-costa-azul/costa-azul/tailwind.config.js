/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-deep': '#090E18',
        'azul-card': '#111727',
        'azul-accent': '#00A3FF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0AEC0',
      },
    },
  },
  plugins: [],
}