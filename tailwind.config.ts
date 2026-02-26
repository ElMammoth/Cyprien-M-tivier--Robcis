import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        black: "#0A0A0A",
        red: "#E63329",
        orange: "#E8732A",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        micro: "10px",
        label: "11px",
        caption: "13px",
        hero: "5.5rem",
      },
      letterSpacing: {
        ultra: "0.2em",
        super: "0.25em",
        extreme: "0.3em",
      },
      lineHeight: {
        heading: "0.95",
        title: "1.05",
        body: "1.7",
        prose: "1.75",
        reading: "1.8",
      },
    },
  },
  plugins: [],
};
export default config;
