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
        flip: 'flip 1000ms ease-in infinite',
        slidein: 'slidein 200ms',
        slideout: 'slideout 200ms',
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
          'from': { transform: 'scale(0.8)', opacity: '0' },
          '40%': { transform: 'scale(1.1)', opacity: '1' },
        },
        flip: {
          '0%': { transform: 'rotateX(90deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0)' },
        },
        slidein: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        slideout: {
          '0%': { transform: 'translateY(0px)', opacity: '1' },
          '90%': { opacity: '0' },
          '100%': { transform: 'translateY(60px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}