// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  purge: false,
  theme: {},
  variants: {
    borderColor: ["hover", "focus"],
  },
  plugins: [],
};
