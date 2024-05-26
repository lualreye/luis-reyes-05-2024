/** @type {import('tailwindcss').Config} */
export default {
  // tree-shake unused styles in production, TODO: Check in production
  purge: ["index.html", "./src/**/*.{vue,js,ts}"],
  content: ["index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
