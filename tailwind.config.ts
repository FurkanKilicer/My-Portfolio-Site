import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#f97316",
          hover: "#ea580c",
          muted: "rgba(249, 115, 22, 0.14)",
        },
        ink: {
          bg: "#0a0a0a",
          card: "#141414",
          elevated: "#1a1a1a",
          border: "#262626",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px rgba(0,0,0,0.35)",
        glow: "0 0 28px rgba(249, 115, 22, 0.45)",
        "glow-lg": "0 0 60px rgba(249, 115, 22, 0.28)",
        "glow-soft": "0 0 0 1px rgba(249, 115, 22, 0.18), 0 0 42px rgba(249, 115, 22, 0.16)",
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(ellipse at center, rgba(249,115,22,0.28), transparent 70%)",
      },
    },
  },
};

export default config;
