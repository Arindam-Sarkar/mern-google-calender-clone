/** @type {import('tailwindcss').Config} */
const taskColor = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
]

module.exports = {

  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  safelist: [
    ...taskColor.map(color => `bg-${color}-200`),
    ...taskColor.map(color => `bg-${color}-400`),
    ...taskColor.map(color => `bg-${color}-500`),
  ],
  theme: {
    extend: {
      colors: {
        colorIcons: 'blue',
      },
    }
  },
  plugins: [require("@tailwindcss/forms")],
}
