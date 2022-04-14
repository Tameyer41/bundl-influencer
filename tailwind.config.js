module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        layout: {
          100: "#FBFBFB",
          200: "#EFF1F4",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
