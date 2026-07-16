/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1F3D2B",
          50: "#EEF3EE",
          100: "#D6E3D8",
          200: "#AFC8B4",
          300: "#87AB8E",
          400: "#5C8865",
          500: "#3C6844",
          600: "#294F30",
          700: "#1F3D2B",
          800: "#152A1D",
          900: "#0D1A12",
        },
        sage: {
          DEFAULT: "#8AA68A",
          50: "#F3F6F2",
          100: "#E4EBE2",
          200: "#C9D8C5",
          300: "#AEC5A9",
          400: "#8AA68A",
          500: "#6D8C6E",
          600: "#557056",
        },
        cream: {
          DEFAULT: "#F6F1E4",
          50: "#FBFAF6",
          100: "#F6F1E4",
          200: "#EFE7D2",
        },
        gold: {
          DEFAULT: "#C9A24B",
          50: "#F8F0DC",
          400: "#D6B369",
          500: "#C9A24B",
          600: "#A9843A",
        },
        ink: "#20241F",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(31,61,43,0.25)",
        card: "0 4px 20px -4px rgba(31,61,43,0.12)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(6deg)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-28px) rotate(-8deg)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        sway: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        floatSlow: "floatSlow 11s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        sway: "sway 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
