/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nexo: {
          bg: '#FFF7F2',
          'bg-secondary': '#FEF5F1',
          'bg-tertiary': '#F5E8E3',
          'bg-card': '#FFFFFF',
          'bg-dark': '#EDE4DD',
          red: '#B61F1F',
          'red-light': '#C92A2A',
          'red-dark': '#A01818',
          'red-muted': '#D9706F',
          cream: '#FFF7F2',
          'cream-light': '#FFFBF8',
          'cream-dark': '#F5E8E3',
          beige: '#E8D4C4',
          'beige-light': '#F0E4D8',
          primary: '#B61F1F',
          secondary: '#D9706F',
          accent: '#8B4747',
          success: '#6B9D7C',
          error: '#C4605B',
          warning: '#D9A559',
          text: '#2C2C2C',
          'text-secondary': '#5C5C5C',
          'text-muted': '#8B8B8B',
          border: '#D4C4B8',
          'border-light': '#E8D4C4',
          divider: '#E0CCC0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        display: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        elegant: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'elegant-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'red-glow': '0 0 20px rgba(182, 31, 31, 0.1)',
        card: '0 1px 4px rgba(0, 0, 0, 0.06)',
        premium: '0 4px 24px rgba(0, 0, 0, 0.06)',
        'premium-lg': '0 8px 40px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(135deg, #B61F1F 0%, #C92A2A 100%)',
        'gradient-cream': 'linear-gradient(135deg, #FFF7F2 0%, #FEF5F1 100%)',
      },
    },
  },
  plugins: [],
};
