import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Chapter 1: The Beginning - Warm, Growth-Oriented
        chapter1: {
          primary: "#FF6B35", // Warm orange
          secondary: "#4A90E2", // Soft blue
          accent: "#F7931E",
          background: "#FFF8F3",
        },
        // Chapter 2: The Challenges - Dynamic, Problem-Solving
        chapter2: {
          primary: "#0066FF", // Electric blue
          secondary: "#FF3366", // Bold contrast
          accent: "#00CCFF",
          background: "#F0F8FF",
        },
        // Chapter 3: The Leadership - Confident, Collaborative
        chapter3: {
          primary: "#6B46C1", // Professional purple
          secondary: "#F59E0B", // Gold accent
          accent: "#8B5CF6",
          background: "#FAF5FF",
        },
        // Chapter 4: The Vision - Futuristic, Aspirational
        chapter4: {
          primary: "#1E293B", // Deep space blue
          secondary: "#F8FAFC", // Bright white
          accent: "#0EA5E9",
          background: "#0F172A",
        },
      },
      animation: {
        // Organic, flowing movements for Chapter 1
        "grow": "grow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        
        // Sharp, precise transitions for Chapter 2
        "snap-in": "snap-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "slide-puzzle": "slide-puzzle 0.5s ease-out",
        "electric-pulse": "electric-pulse 1s ease-in-out infinite",
        
        // Coordinated, synchronized movements for Chapter 3
        "network-pulse": "network-pulse 2s ease-in-out infinite",
        "sync-fade": "sync-fade 1.5s ease-in-out infinite alternate",
        "leadership-glow": "leadership-glow 3s ease-in-out infinite",
        
        // Smooth, forward-moving for Chapter 4
        "launch": "launch 1s ease-out forwards",
        "space-drift": "space-drift 4s linear infinite",
        "future-glow": "future-glow 2s ease-in-out infinite alternate",
        
        // General story animations
        "story-enter": "story-enter 0.8s ease-out forwards",
        "chapter-transition": "chapter-transition 1s ease-in-out",
        "text-reveal": "text-reveal 1.2s ease-out forwards",
      },
      keyframes: {
        // Chapter 1 animations
        grow: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(1.05)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        
        // Chapter 2 animations
        "snap-in": {
          "0%": { transform: "scale(0) rotate(180deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "slide-puzzle": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "electric-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px #0066FF" },
          "50%": { boxShadow: "0 0 20px #0066FF, 0 0 30px #00CCFF" },
        },
        
        // Chapter 3 animations
        "network-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
        },
        "sync-fade": {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "1" },
        },
        "leadership-glow": {
          "0%, 100%": { boxShadow: "0 0 10px #6B46C1" },
          "50%": { boxShadow: "0 0 25px #6B46C1, 0 0 35px #8B5CF6" },
        },
        
        // Chapter 4 animations
        launch: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "space-drift": {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "future-glow": {
          "0%": { boxShadow: "0 0 15px #0EA5E9" },
          "100%": { boxShadow: "0 0 30px #0EA5E9, 0 0 45px #1E293B" },
        },
        
        // General story animations
        "story-enter": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "chapter-transition": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "text-reveal": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;