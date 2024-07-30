/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#facc15',
        hoverPrimary: '#fbbf24'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
