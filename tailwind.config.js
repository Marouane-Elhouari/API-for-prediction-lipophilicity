/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ember: {
          50: "#FFF7ED",
          100: "#FFEDD9",
          200: "#FED7AA",
          400: "#FB923C",
          500: "#F0650F",
          600: "#DA560A",
          700: "#B3430A",
          900: "#7C2D0E",
        },
        ink: "#241C16",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(20px, -30px) rotate(8deg)" },
        },
        driftSlow: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(-25px, 25px) rotate(-6deg)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: 0.15 },
          "50%": { opacity: 0.4 },
        },
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
        "drift-slow": "driftSlow 19s ease-in-out infinite",
        "drift-slower": "driftSlow 26s ease-in-out infinite",
        "pulse-line": "pulseLine 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
