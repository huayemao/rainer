/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    data: {
      // https://tailwindcss.com/docs/hover-focus-and-other-states
      checked: 'data-state="checked"',
    },
  },
  plugins: [],
}
