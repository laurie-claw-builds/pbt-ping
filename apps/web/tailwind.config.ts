import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pbt-cloud-white': '#F5F7F8',
        'pbt-charcoal': '#1B1B1B',
        'pbt-dark-cool-grey': '#6D7B87',
        'pbt-cool-grey': '#E4E9ED',
      },
      borderRadius: {
        '2xl': '20px',
      },
      fontFamily: {
        izmir: ['Izmir', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
