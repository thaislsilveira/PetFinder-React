import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: "#94443f" },
          background: { value: "#f79641" },
          error: { value: "#c53030" },
          white: { value: "#fff" },
          inputBackground: { value: "#ffe7d3" },
          textLight: { value: "#f7efe0" },
          highlight: { value: "#ffd666" },
          accent: { value: "#ff9000" },
          containerBackground: { value: "#f4ede8" },
          warning: { value: "#fbdd5a" },
          // Pre-computed polished `shade(0.2, <base>)` values — Panda has no
          // runtime color-math helper, so hover-darken tokens are stored
          // as fixed sibling tokens instead of computed at render time.
          warningHover: { value: "#c8b048" },
          containerBackgroundHover: { value: "#c3bdb9" },
          textLightHover: { value: "#c5bfb3" },
        },
      },
      keyframes: {
        modalEffect: {
          from: { opacity: 0, transform: "translateY(-60px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        appearFromRight: {
          from: { opacity: 0, transform: "translateX(50px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        appearFromLeft: {
          from: { opacity: 0, transform: "translateX(-50px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  // The JSX framework to use
  jsxFramework: "react",
});
