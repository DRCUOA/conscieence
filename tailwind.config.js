/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        panel: '#121212',
        panel2: '#1b1b1b',
        soft: '#a3a3a3',
        accent: '#ff4500',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 16px 40px rgba(0,0,0,0.45)',
        accent: '0 0 0 1px rgba(255,69,0,0.28), 0 12px 34px rgba(255,69,0,0.12)',
      },
    },
  },
};
