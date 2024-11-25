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
        foreground: "hsl(var(--foreground))" /* Stone-50 */,
        secondaryForeground: "hsl(var(--secondary-foreground))" /* Stone-400 */,
        card: {
          DEFAULT: "hsl(var(--card))" /* Brighter card background */,
          foreground: "hsl(var(--card-foreground))" /* Stone-50 */,
        },
        primary: {
          DEFAULT: "hsl(var(--primary))" /* Gray-800 */,
          foreground: "hsl(var(--primary-foreground))" /* Stone-50 */,
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))" /* Violet-500 */,
          foreground: "hsl(var(--secondary-foreground))" /* Stone-50 */,
        },
        muted: {
          DEFAULT: "hsl(var(--muted))" /* Stone-400 */,
          foreground: "hsl(var(--muted-foreground))" /* Stone-50 */,
        },
        accent: {
          DEFAULT: "hsl(var(--accent))" /* Amber-500 */,
          foreground: "hsl(var(--accent-foreground))" /* Stone-50 */,
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))" /* Red-700 */,
          foreground: "hsl(var(--destructive-foreground))" /* Stone-50 */,
        },
        border: "hsl(var(--border))" /* Gray-800 */,
        input: "hsl(var(--input))" /* Gray-800 */,
        ring: "hsl(var(--ring))" /* Violet-500 */,
        violet: "hsl(var(--violet))" /* Violet-500 */,
        amber: "hsl(var(--amber))" /* Amber-500 */,
        green: "hsl(var(--green))" /* Green-400 */,
        red: "hsl(var(--red))" /* Red-700 */,
        cyan: "hsl(var(--cyan))" /* Cyan-400 */,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
