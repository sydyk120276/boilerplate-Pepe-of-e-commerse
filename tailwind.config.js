module.exports = {
  purge: ['./client/**/*.html', './client/**/*.js', './client/**/*.jsx'],
  darkMode: false,
  theme: {
    container: {
      center: true
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  },
  plugins: []
}
