module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    'max-len': ["error", { "code": 80, "ignoreComments": true }],
    'semi': 2,
    'no-extra-semi': 2,
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    'quote-props': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'sort-imports': ['error', { 'ignoreCase': true }],
    '@typescript-eslint/no-unused-vars': 2,
  },
  env: {
    'browser': true,
  },
}
