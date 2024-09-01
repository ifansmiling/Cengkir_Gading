/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Path ke file yang akan menggunakan Tailwind CSS
  theme: {
    extend: {
      fontFamily: {
        'dramatic-header': ['Playfair Display', 'serif'], // Font untuk header
        'dramatic-body': ['Merriweather', 'serif'], // Font untuk body text
      },
    },
  },
  plugins: [],
};
