import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Site Wave Brand Colors
        "ocean-blue": {
          DEFAULT: "hsl(206 100% 35%)", // #0077B6
          50: "hsl(206 100% 95%)",
          100: "hsl(206 100% 90%)",
          200: "hsl(206 100% 80%)",
          300: "hsl(206 100% 70%)",
          400: "hsl(206 100% 60%)",
          500: "hsl(206 100% 50%)",
          600: "hsl(206 100% 35%)", // Primary
          700: "hsl(206 100% 25%)",
          800: "hsl(206 100% 15%)",
          900: "hsl(206 100% 10%)",
        },
        "coral-orange": {
          DEFAULT: "hsl(14 100% 60%)", // #FF6B35
          50: "hsl(14 100% 95%)",
          100: "hsl(14 100% 90%)",
          200: "hsl(14 100% 80%)",
          300: "hsl(14 100% 70%)",
          400: "hsl(14 100% 65%)",
          500: "hsl(14 100% 60%)", // Primary
          600: "hsl(14 100% 50%)",
          700: "hsl(14 100% 40%)",
          800: "hsl(14 100% 30%)",
          900: "hsl(14 100% 20%)",
        },
        "soft-sand": {
          DEFAULT: "hsl(51 44% 92%)", // #F4F1DE
          50: "hsl(51 44% 98%)",
          100: "hsl(51 44% 95%)",
          200: "hsl(51 44% 92%)", // Primary
          300: "hsl(51 44% 85%)",
          400: "hsl(51 44% 78%)",
          500: "hsl(51 44% 70%)",
          600: "hsl(51 44% 60%)",
          700: "hsl(51 44% 50%)",
          800: "hsl(51 44% 40%)",
          900: "hsl(51 44% 30%)",
        },
        "deep-navy": {
          DEFAULT: "hsl(198 94% 15%)", // #023047
          50: "hsl(198 94% 95%)",
          100: "hsl(198 94% 85%)",
          200: "hsl(198 94% 75%)",
          300: "hsl(198 94% 65%)",
          400: "hsl(198 94% 45%)",
          500: "hsl(198 94% 35%)",
          600: "hsl(198 94% 25%)",
          700: "hsl(198 94% 20%)",
          800: "hsl(198 94% 15%)", // Primary
          900: "hsl(198 94% 10%)",
        },
        // Default system colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Site Wave custom animations
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0px) rotate(0deg)" },
          "33%": { transform: "translateX(10px) rotate(1deg)" },
          "66%": { transform: "translateX(-10px) rotate(-1deg)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        wave: "wave 3s ease-in-out infinite",
        gradient: "gradient 3s ease infinite",
      },
      backgroundImage: {
        "coastal-gradient":
          "linear-gradient(135deg, hsl(206 100% 35%) 0%, hsl(14 100% 60%) 50%, hsl(51 44% 92%) 100%)",
        "ocean-gradient":
          "linear-gradient(135deg, hsl(206 100% 35%) 0%, hsl(206 100% 25%) 100%)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
