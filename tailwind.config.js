/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-50',
    'bg-green-50',
    'bg-purple-50',
    'bg-indigo-50',
    'bg-red-50',
    'bg-amber-50',
    'text-blue-600',
    'text-green-600',
    'text-purple-600',
    'text-indigo-600',
    'text-red-600',
    'text-amber-600',
    'bg-blue-100',
    'bg-green-100',
    'bg-purple-100',
    'bg-indigo-100',
    'bg-red-100',
    'bg-amber-100',
  ],
};