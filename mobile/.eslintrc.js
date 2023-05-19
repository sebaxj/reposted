module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  // parser options for typescript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    // 0 = 'off', 1 = 'warn', 2 = 'error'
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'react-native/no-inline-styles': 'off',
    'no-console': 'warn',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 100, tabWidth: 2 }],
  },
  env: {
    jest: true,
    node: true,
  },
};
