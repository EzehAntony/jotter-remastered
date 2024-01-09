import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        darkOne: "#0A0A0A",
        darkTwo: "#141414",
        darkThree: "#202020",
        lightOne: "#BFBFC0",
        lightTwo: "#D9D9D9",
        lightThree: "#F2F2F2",
        icons: "#FF79C6",
      },
      textColor: {
        icons: "#FF79C6",
      },
    },
  },
  plugins: [],
};
export default config;
