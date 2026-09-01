import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm ivory / cream surfaces
        ivory: "#FAF6EC",
        cream: "#FFFDF7",
        paper: "#F2ECDD",
        // Text
        ink: "#1F1F1F",
        muted: "#6B7280",
        faint: "#9CA3AF",
        // Soft yellow accent scale
        gold: {
          50: "#FFFBEA",
          100: "#FFF4C9",
          200: "#FFE9A3",
          300: "#FCDE7A",
          400: "#F5D058",
          500: "#EAC24A",
          600: "#D3A93A",
        },
        line: "#EAE2D0",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 20px -8px rgba(60, 50, 20, 0.12)",
        card: "0 1px 2px rgba(60, 50, 20, 0.04), 0 8px 30px -18px rgba(60, 50, 20, 0.18)",
      },
      maxWidth: {
        app: "480px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        "grow-up": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-in-slow": "fade-in-slow 1s ease-out both",
        breathe: "breathe 8s ease-in-out infinite",
        "grow-up": "grow-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
