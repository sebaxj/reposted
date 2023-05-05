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
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'no-console': 'warn',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-use-before-define': 'warn',
    'max-len': ['error', { code: 100, tabWidth: 2 }],
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
};
