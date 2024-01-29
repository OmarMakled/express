// .eslintrc.js
module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'no-unused-vars': 'warn',
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
};
