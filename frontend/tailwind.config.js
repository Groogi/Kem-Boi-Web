/* global require */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background": "#f7f7f2",
        "outline-variant": "#adada9",
        "surface-bright": "#f7f7f2",
        "inverse-on-surface": "#9c9d99",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#c7fc79",
        "inverse-surface": "#0d0f0c",
        "surface": "#f7f7f2",
        "secondary-dim": "#49533c",
        "inverse-primary": "#caff7c",
        "on-secondary-fixed-variant": "#555f47",
        "primary-fixed": "#c7fc79",
        "surface-tint": "#426500",
        "error-dim": "#b92902",
        "surface-container-highest": "#dcddd7",
        "on-primary-fixed": "#304c00",
        "surface-container-low": "#f1f1ec",
        "primary-dim": "#395800",
        "on-secondary": "#ecf7d8",
        "secondary-fixed": "#dbe7c8",
        "secondary": "#555f47",
        "secondary-container": "#dbe7c8",
        "on-primary-container": "#3e6000",
        "primary": "#426500",
        "surface-variant": "#dcddd7",
        "tertiary-container": "#fbf3e4",
        "on-error": "#ffefec",
        "surface-dim": "#d3d5cf",
        "on-tertiary-fixed": "#4d493f",
        "error-container": "#f95630",
        "on-error-container": "#520c00",
        "secondary-fixed-dim": "#cdd9bb",
        "on-background": "#2d2f2c",
        "on-tertiary": "#faf2e3",
        "tertiary-fixed": "#fbf3e4",
        "primary-fixed-dim": "#b9ed6d",
        "surface-container": "#e8e9e3",
        "outline": "#767773",
        "on-tertiary-fixed-variant": "#6b665a",
        "on-secondary-container": "#4b553e",
        "error": "#b02500",
        "tertiary": "#605b50",
        "on-primary-fixed-variant": "#466b00",
        "tertiary-fixed-dim": "#ece5d6",
        "on-primary": "#dbffa4",
        "surface-container-high": "#e2e3dd",
        "on-secondary-fixed": "#39422d",
        "on-surface": "#2d2f2c",
        "on-surface-variant": "#5a5c58",
        "tertiary-dim": "#544f44",
        "on-tertiary-container": "#605b50"
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans"],
        "body": ["Be Vietnam Pro"],
        "label": ["Be Vietnam Pro"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}