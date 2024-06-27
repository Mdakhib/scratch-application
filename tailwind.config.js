module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  purge: ["./src/**/*.js"],
  variants: {},
  plugins: [],
  theme: {
    extend: {
      keyframes: {
        move: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100px)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(15deg)" },
        },
        rotateLeft: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-30deg)" },
        },
      },
      animation: {
        move: "move 1s ease-out forwards", // Adjust the duration as needed
        rotate: "rotate 1s ease-out forwards", // Adjust the duration as needed
        rotateLeft: "rotateLeft 10s linear forwards",
      },
    },
  },
};
