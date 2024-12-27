/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
    },
      colors: {
        black: '#171717',
        primary: '#FF2626',
        light: '#FFE6E6',
        gray: '#8B8B8B',
      },
      fontSize: {
        h1: '64px',
        h2: '54px',
        h3: '36px',
        h4: '24px',
        body_copy: '16px',
        small_copy: '14px',
      },
    },
  },
  plugins: [],
}

