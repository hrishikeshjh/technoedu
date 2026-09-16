/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          red: '#dc2626', // TIU Primary Red
          darkred: '#b91c1c',
          deepred: '#991b1b',
          900: '#881337',
        },
        dark: {
          950: '#07090e',
          900: '#0b0f19',
          800: '#111827',
          700: '#1f2937',
          600: '#374151',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 16px -2px rgba(0, 0, 0, 0.07), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 16px 32px -8px rgba(220, 38, 38, 0.10), 0 6px 14px -4px rgba(0, 0, 0, 0.06)',
        'elevated': '0 24px 40px -12px rgba(0, 0, 0, 0.10), 0 10px 20px -8px rgba(0, 0, 0, 0.05)',
        'soft': '0 4px 24px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 8px 32px -6px rgba(0, 0, 0, 0.10), 0 4px 12px -4px rgba(0, 0, 0, 0.06)',
        'red-glow': '0 8px 24px -6px rgba(220, 38, 38, 0.20)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
