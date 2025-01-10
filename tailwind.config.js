module.exports = {
  darkMode: 'class', // Usa 'class' para controlar el modo oscuro manualmente
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Ajusta según tu estructura
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5', // Ejemplo de color personalizado
          DEFAULT: '#3730a3',
          dark: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente global
      },
    },
  },
  plugins: [],
};
