import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06111f",
        mist: "#daf1ff",
        brand: {
          50: "#eef8ff",
          100: "#d8f0ff",
          200: "#b8e5ff",
          300: "#7fd2ff",
          400: "#35b4ff",
          500: "#1395ff",
          600: "#0d74dd",
          700: "#0f5cb1",
          800: "#134c8f",
          900: "#173f75"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(154, 216, 255, 0.12), 0 20px 80px rgba(14, 165, 233, 0.16)"
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at 20% 20%, rgba(20,184,166,0.22), transparent 32%), radial-gradient(circle at 80% 0%, rgba(59,130,246,0.2), transparent 28%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.12), transparent 24%)"
      },
      fontFamily: {
        sans: ["Avenir Next", "Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "Avenir Next", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        pulseSoft: "pulseSoft 4s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
