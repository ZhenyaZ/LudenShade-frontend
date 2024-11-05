/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      primaryBackground: '#000000',
      primaryText: '#FFFFFF',
      primaryAccent: '#FFFFFF',
      secondaryBackground: '#1a1a1a',
      secondaryText: '#CCCCCC',
      buttonTextPrimary: '#FFFFFF',
      buttonTextSecondary: '#DDDDDD',

      // Светлая тема
      lightPrimaryBackground: '#FFFFFF',
      lightPrimaryText: '#000000',
      lightPrimaryAccent: '#333333',
      lightSecondaryBackground: '#F5F5F5',
      lightSecondaryText: '#666666',
      lightButtonTextPrimary: '#000000',
      lightButtonTextSecondary: '#333333',
    },
    backgroundImage: {
      'gradient-primary': 'linear-gradient(to right, #000000, #333333)',
      'gradient-light-primary': 'linear-gradient(to right, #FFFFFF, #E0E0E0)',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
