import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "50s": ["var(--font-lobster)"],
        sans: ["var(--font-bebas-neue)"],
        mono: ["var(--font-roboto-mono)"],
      },
      gridTemplateAreas: {
        lg_gameBoard: ["score timeline current-card", "score timeline guess"],
        gameBoard: [
          "timeline timeline timeline",
          "current-card current-card current-card",
          "score guess deadspace",
        ],
      },
      gridTemplateColumns: {
        lg_gameBoard: `200px 1fr 1fr`,
        gameBoard: `0px 1fr 0px`,
      },
      gridTemplateRows: {
        gameBoard: `3fr
        1fr`,
        lg_gameBoard: `1fr
        1fr`,
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
export default config;
