/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        text: "#E0E0E0",
        inputBg: "#1E1E1E",
        inputBorder: "#424242",
        buttonBg: "#29b75a",
        buttonText: "#FFFFFF",
        linkText: "#4CAF50",
        successText: "#4CAF50",
      },
    },
  },
  plugins: [],
};
