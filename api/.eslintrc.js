/**
 * ESLint Conifguration
 */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  // parser options for typescript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    // 0 = 'off', 1 = 'warn', 2 = 'error'
    'no-console': 1,
    'no-unreachable': 2,
    'no-unreachable-loop': 2,
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
};
