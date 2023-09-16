/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        vibration: 'vibration 600ms infinite',
        jump: 'jump 1000ms infinite',
        pop: 'pop 100ms',
        flipin: 'flipin 250ms ease-in',
        flipout: 'flipout 250ms ease-in',
      },
      keyframes: {
        vibration: {
          '10%,90% ': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
        },
        jump: {
          '0%, 20%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-30px)' },
          '50%': { transform: 'translateY(5px)' },
          '60%': { transform: 'translateY(-15px)' },
          '80%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        pop: {
          'from': { transform: 'scale(0.8); opacity: 0' },
          '40%': { transform: 'scale(1.1); opacity: 1' },
        },
        flipin: {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(-90deg)' },
        },
        flipout: {
          '0%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0)' },
        },
      },
    }
  },
  plugins: [],
}