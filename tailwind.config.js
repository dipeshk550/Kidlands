export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter','ui-sans-serif','system-ui','sans-serif'],
        display: ['Playfair Display','Georgia','serif'],
      },
      colors: {
        primary: {
          50:  '#f0fde8',
          100: '#dcfcc7',
          200: '#bbf7a0',
          300: '#86ef67',
          400: '#54B435',
          500: '#41a020',
          600: '#338016',
          700: '#276514',
          800: '#235112',
          900: '#1f4511',
          950: '#0c2707',
          DEFAULT: '#54B435',
        },
        navy: {
          50:  '#f0f4ff',
          100: '#e0e8ff',
          600: '#1e3a5f',
          700: '#162c48',
          800: '#0f1f35',
          900: '#0a1628',
          DEFAULT: '#1e3a5f',
        },
        gold: { DEFAULT: '#D97706', light: '#FCD34D' },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: { '0%': { opacity:'0', transform:'translateY(24px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        slideIn: { '0%': { opacity:'0', transform:'translateX(-24px)' }, '100%': { opacity:'1', transform:'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
