import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enforce dark mode globally
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))" /* Neutral-900 */,
        foreground: "hsl(var(--foreground))" /* Light Violet */,
        secondaryForeground:
          "hsl(var(--secondary-foreground))" /* Muted text */,
        card: {
          DEFAULT: "hsl(var(--card))" /* Card background */,
          foreground: "hsl(var(--card-foreground))" /* Light Violet */,
        },
        primary: {
          DEFAULT: "hsl(var(--primary))" /* Light Violet accent */,
          foreground: "hsl(var(--primary-foreground))" /* White */,
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))" /* Muted dark background */,
          foreground: "hsl(var(--foreground))" /* Light Violet */,
        },
        muted: {
          DEFAULT: "hsl(var(--muted))" /* Muted section background */,
          foreground: "hsl(var(--muted-foreground))" /* Light Violet */,
        },
        accent: {
          DEFAULT: "hsl(var(--accent))" /* Light Violet */,
          foreground: "hsl(var(--accent-foreground))" /* White */,
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))" /* Red */,
          foreground: "hsl(var(--destructive-foreground))" /* White */,
        },
        border: "hsl(var(--border))" /* Subtle border color */,
        input: "hsl(var(--input))" /* Input field background */,
        ring: "hsl(var(--ring))" /* Light Violet */,
        success: {
          DEFAULT: "hsl(var(--success))" /* Green */,
          foreground: "hsl(var(--success-foreground))" /* White */,
        },
        neutral: "hsl(var(--neutral))" /* Neutral dark */,
        lightGray: "hsl(var(--light-gray))" /* Mid gray for muted text */,
        white: "hsl(var(--white))" /* Pure white */,
        transparent: "hsl(var(--transparent))" /* Transparent */,
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
