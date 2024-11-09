import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      "light", // Default light theme
      {
        black: {
          "background": "#000000", // Custom black background
          "primary": "rgb(29, 155, 240)", // Custom Twitter blue
          "secondary": "rgb(24, 24, 24)", // Custom gray (dark)
          "accent": "#1DA1F2", // Accent color (same as primary)
          "neutral": "#2a2a2a", // Neutral color
          "base-100": "#000000", // Set base background to black
        },
      },
    ],
  },
};
