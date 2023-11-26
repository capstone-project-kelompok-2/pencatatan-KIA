/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-up': '#7CE495',
        'gradient-down': '#2B2A4C',
        'font-bg-primary' : '2B2A4C',
        'login-bg' : '#7CE495',
        'bg-navbar' : "#72D793"
      },
    },
  },
  plugins: [],
}