import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080C14",
        surface: {
          DEFAULT: "#0F1626",
          light: "#172238",
          dark: "#0A0F1B",
          border: "#1E2C48",
        },
        electric: {
          amber: {
            DEFAULT: "#F59E0B",
            hover: "#D97706",
            light: "#FCD34D",
            glow: "rgba(245, 158, 11, 0.25)",
          },
          cyan: {
            DEFAULT: "#06B6D4",
            hover: "#0891B2",
            light: "#67E8F9",
            glow: "rgba(6, 182, 212, 0.25)",
          },
          volt: {
            DEFAULT: "#10B981",
            hover: "#059669",
            light: "#6EE7B7",
            glow: "rgba(16, 185, 129, 0.25)",
          },
          danger: {
            DEFAULT: "#EF4444",
            hover: "#DC2626",
            glow: "rgba(239, 68, 68, 0.25)",
          }
        },
      },
      boxShadow: {
        "glow-amber": "0 0 20px -3px rgba(245, 158, 11, 0.35)",
        "glow-cyan": "0 0 20px -3px rgba(6, 182, 212, 0.35)",
        "glow-volt": "0 0 20px -3px rgba(16, 185, 129, 0.35)",
        "card-industrial": "0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": "radial-gradient(circle, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
