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
        gameBoard: [
          "timeline timeline timeline",
          "score deadspace deadspace",
          "guess guess guess",
        ],
      },
      gridTemplateColumns: {
        gameBoard: `0px 1fr 0px`,
      },
      gridTemplateRows: {
        gameBoard: `minmax(150px, 1fr)
        minmax(80px, auto)
        2fr`,
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
export default config;
