import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-soft": "#1C1A17",
        black: "#000000",
        "twitter-white": "#E7E9EA",
        "twitter-blue": "#308CD8",
        "twitter-border": "#2F3336",
        "twitter-light-gray": "#71767B",
        "twitter-dark-gray": "#17181C",
        red: "#EF1B27",
        vermillion: "#FF2B06",
        yellow: "#FECC4E",
        gray: "#D7D2D0",
        "yellow-pale": "#FFDB80",
        "red-pale": "#F56870",
        green: "#3FB160",
        gold: "#FEB20E",
        blue: "#046EE7",
        purple: "#7B61FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
