/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with class
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem", // Default padding for containers
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],  // Custom font for sans-serif
        mono: ["var(--font-geist-mono)"],  // Custom font for monospace
      },
      colors: {
        // Use CSS variables for colors
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
