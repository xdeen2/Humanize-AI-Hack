/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-button': 'linear-gradient(90deg, #D20ED2 0%, #11A4DA 100%)',
        'gradient-white-text': "linear-gradient(90deg, #FFFFFFE5 0%, #FFFFFFB2 100%)",
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary-50": "#F0F9FF",
        "primary-100": "#E0F2FE",
        "primary-200": "#B9E6FE",
        "primary-300": "#7CD4FD",
        "primary-400": "#36BFFA",
        "primary-500": "#0BA5EC",
        "primary-600": "#0086C9",
        "primary-700": "#026AA2",
        "primary-800": "#065986",
        "primary-900": "#0B4A6F",

        "secondary-500": "#DD38DD",

        "bg-dark-blue": "#101629",
        "bg-50": "#5F626A",
        "bg-100": "#575A62",
        "bg-200": "#4E525A",
        "bg-300": "#464953",
        "bg-400": "#3E414B",
        // "bg-500": "#353943",
        "bg-600": "#2D313B",
        "bg-700": "#252834",
        // "bg-800": "#1C202C",
        // "bg-900": "#141824",
        "bg-500": "#2d2d2d",
        "bg-800": "#4d4d4d",
        "bg-900": "#1d1d1d",
        "bg-950": "#161719",
        "bg-light-black": "#252628",
        "bg-lighter-black": "#343839",

        "neutral-0": "#fff",
        "neutral-100": "#FDFBFB",
        "neutral-200": "#F9F5F5",
        "neutral-300": "#F2EDED",
        "neutral-400": "#E9E3E3",
        "neutral-500": "#DDD6D6",
        "neutral-600": "#CDC5C5",
        "neutral-700": "#B8B1B1",
        "neutral-800": "#A09A9A",
        "neutral-900": "#878282",

        "warning-500": "#FF9500",

        "gray-1": "#ACACAC",
        "gray-2": "#D0D0D0",
        "gray-3": "#E9E9E9",

        "gradient-linear": "linear-gradient(99.4deg, #DD38DD 3.25%, #0BA5EC 94.8%)",
        "gradient-radial": "radial-gradient(49.02% 49.02% at 50% 50.98%, #0BA5EC 0%, #DD38DD 100%)",
        "angular": "conic-gradient(from 180deg at 50% 50%, #DD38DD 0deg, #0BA5EC 360deg)",
        "gradient-diamond": "radial-gradient(50% 50% at 50% 50%, #DD38DD 0%, #0BA5EC 100%)",

        "gradient-pink": "#D20ED2",
        "gradient-blue": "#11A4DA",
        "gradient-dull-pink": "#C816D3",
        "gradient-dull-blue": "#1A9EDA",
        "white": "#fff",
        "white-gray": "#FFFFFFB2",
        "black": "#000",
        "selected-text": "#11A4DA",
        "footer-bg": "#1D51FE"
      },
      rotate: {
        360: '360deg',
        225: '225deg',
      }
    },
  },
  plugins: [],
}
