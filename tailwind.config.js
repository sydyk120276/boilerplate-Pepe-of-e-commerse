module.exports = {
  purge: ['./client/**/*.html', './client/**/*.js', './client/**/*.jsx'],
  darkMode: false,
  theme: {
    screens: {
      galaxy_fold: '250px',
      mobile2: '320px',
      mobile: '480px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
