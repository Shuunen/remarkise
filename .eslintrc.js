const rules = require('./.eslintrc.rules.js')

module.exports = {
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'html'
  ],
  rules
}
