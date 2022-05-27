const defaultTheme = require("tailwindcss/defaultTheme");

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
        button: {
          100: "#6D78D6",
        },
      },
      screens: {
        standalone: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [
    "tailwindcss",
    "postcss-preset-env",
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
