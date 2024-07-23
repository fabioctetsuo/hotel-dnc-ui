import type { Config } from "tailwindcss";

const config: Config = {
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
      backgroundColor: {
        "snow-white": "#ebebeb",
        "main-brand-green-300": "#1dbb9e",
        "main-brand-green-400": "#1a9e86",
        "main-brand-green-500": "#116b5a",
        "main-brand-green-600": "#0e594b",
        "main-brand-green-700": "#02604f",
      },
      borderColor: {
        "light-grey-400": "#E7E4E4",
        "light-grey-500": "#bcbcbc",
        "light-grey-600": "#ABABAB",
      },
      colors: {
        "main-brand-green-500": "#116b5a",
      },
      ringColor: {
        "main-brand-green-300": "#1dbb9e",
      },
    },
  },
  plugins: [],
};
export default config;
