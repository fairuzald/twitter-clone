import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-soft": "#1C1A17",
        black: "#000000",
        "twitter-white": "#E7E9EA",
        "twitter-blue": "#1D9BF0",
        "twitter-blue-disabled": "#0F4E78",
        "twitter-blue-hover": "#1A8CD8",
        "twitter-border": "#2F3336",
        "twitter-light-gray": "#71767B",
        "twitter-dark-gray": "#16181C",
      },
    },
  },
  plugins: [],
} satisfies Config;
