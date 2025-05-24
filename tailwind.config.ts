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
        'surface-secondary': 'var(--surface-secondary)',
      },
    },
  },
  darkMode: "class", // or 'media' or 'selector'
  plugins: [],
};
export default config; 