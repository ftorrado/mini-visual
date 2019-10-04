module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'],
  plugins: [
    'import',
    'react'
  ],
  rules: {
    'max-len': ["error", { "code": 80, "ignoreComments": true }],
    'semi': 2,
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    'quote-props': 1,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
  overrides: [
    {
      files: ['*.jsx'],
      rules: {
        'class-methods-use-this': 0
      }
    }
  ],
  env: {
    'browser': true,
    'mocha': true,
    'node': true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx'
        ]
      }
    }
  }
}
