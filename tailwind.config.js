const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        custom: "#3E6AE0",
        secondary: "#dfe5f7",
        light: "rgba(0,0,0,0.6)",
      },
      fontFamily: {
        ibm: ['"IBM Plex Sans"'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
