/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        lime: {
          DEFAULT: "var(--lime)",
          bright: "var(--lime-bright)",
          deep: "var(--lime-deep)",
        },
        olive: "var(--olive)",
        "deep-green": "var(--deep-green)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
        },
        "on-lime": "var(--on-lime)",
      },
      borderRadius: {
        sm: "var(--radius-sm, 8px)",
        md: "var(--radius-md, 12px)",
        lg: "var(--radius-lg, 18px)",
        xl: "var(--radius-xl, 24px)",
      },
      boxShadow: {
        "glow-lime": "var(--glow-lime)",
        "glow-lime-bright": "var(--glow-lime-bright)",
        "glow-lime-subtle": "var(--glow-lime-subtle)",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
