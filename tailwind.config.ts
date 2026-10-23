import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
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
        navy: "#062653",
        "deep-navy": "#032047",
        "dark-navy": "#04152E",
        "primary-orange": "#FF6900",
        "orange-hover": "#E85B00",
        orange: "#FF6900",
        white: "#FFFFFF",
        "main-background": "#F3F7FB",
        "secondary-background": "#EAF1F8",
        "primary-text": "#092B59",
        "secondary-text": "#647B99",
        "light-grey": "#F1F3F5",
        borders: "#DCE5EF",
        border: "#DCE5EF",
        success: "#16A36A",
        warning: "#F59E0B",
        error: "#DC2626",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "14px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "sans-serif"],
        condensed: ["'Barlow Condensed'", "Oswald", "sans-serif"],
        barlow: ["'Barlow Condensed'", "Oswald", "sans-serif"],
      },
      fontSize: {
        "hero-desktop": ["52px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-mobile": ["36px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "page-heading": ["32px", { lineHeight: "1.15", fontWeight: "700" }],
        "section-heading": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-title": ["16px", { lineHeight: "1.3", fontWeight: "600" }],
        "body": ["15px", { lineHeight: "1.6" }],
        "meta": ["13px", { lineHeight: "1.5" }],
        "label": ["13px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      spacing: {
        "card-grid-gap": "1.25rem",
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pin-settle": {
          "0%": { transform: "scale(0.9) translateY(10px)", opacity: "0" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hero-bg-crossfade": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "hover-lift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 500ms ease-out forwards",
        "fade-in-up": "fade-in-up 600ms ease-out forwards",
        "pin-settle": "pin-settle 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-up": "slide-up 500ms ease-out forwards",
        "hero-bg-crossfade": "hero-bg-crossfade 700ms ease-in-out forwards",
        "hover-lift": "hover-lift 300ms ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
