/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dramatic-header": ["Playfair Display", "serif"],
        "dramatic-body": ["Merriweather", "serif"],
        "dramatic-body-user": ["Crimson Text", "serif"],
        "dramatic-header-user": ["Cormorant Garamond", "serif"],
        "dramatic-subtitle": ["Lora", "serif"],
        "sidebar-heading": ["Poppins", "sans-serif"],
        "sidebar-menu": ["Roboto", "sans-serif"],
        "sidebar-submenu": ["Open Sans", "sans-serif"],
        "sidebar-menu-admin": ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
