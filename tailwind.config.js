/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d13",
        panel: "#141823",
        panel2: "#1c2130",
        paper: "#eceef5",
        muted: "#98a1b6",
        gold: { DEFAULT: "#f2c14e", hover: "#ffd469", ink: "#1a1405" },
        rose: { DEFAULT: "#e05f7a" },
        line: "rgba(255,255,255,0.09)",
        lineStrong: "rgba(255,255,255,0.18)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "Georgia", "serif"],
        body: ['"Inter Tight"', "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "1200px" },
      boxShadow: { modal: "0 24px 60px rgba(0,0,0,0.45)" },
      keyframes: {
        rise: {
          from: { transform: "translateY(12px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          from: { backgroundPosition: "100% 0" },
          to: { backgroundPosition: "-100% 0" },
        },
      },
      animation: {
        rise: "rise 0.18s cubic-bezier(0.22,0.61,0.36,1)",
        shimmer: "shimmer 1.4s ease infinite",
      },
    },
  },
  plugins: [],
};
