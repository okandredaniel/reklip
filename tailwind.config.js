/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        card: '#111B2E',
        surface: '#182336',
        'card-border': '#1E2D45',
        primary: '#3B82F6',
        'primary-light': '#60A5FA',
        recording: '#EF4444',
        success: '#22C55E',
        processing: '#F59E0B',
        uploading: '#F97316',
        'text-primary': '#FFFFFF',
        'text-secondary': '#7B8BA3',
        divider: '#1E2D45',
        'input-bg': '#111B2E',
      },
    },
  },
  plugins: [],
};
