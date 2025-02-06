import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: "#2e1c8d",
          DEFAULT: "#231473",
          dark: "#0f0638",
        },
        secondary: {
          light: "#7c4bdc",
          DEFAULT: "#6E3FCB",
          dark: "#50289d",
        },
        tertiary: {
          light: "#e1e2fc",
          DEFAULT: "#D7D8FD",
          dark: "#bfc1f3",
        },
        quaternary: {
          light: "#f5f5fa",
          DEFAULT: "#F3F3FF",
          dark: "#e2e2fc",
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
} satisfies Config;
