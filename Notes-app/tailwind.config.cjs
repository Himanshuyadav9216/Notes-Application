/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all your React components for Tailwind classes
  ],
  theme: {
    extend: {
      fontFamily: {
        // This makes the `font-inter` class work
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // For truncating text (used in NoteCard)
    require('@tailwindcss/forms'), // For better default form styles (used in Modal)
  ],
};