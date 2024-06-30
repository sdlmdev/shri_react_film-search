module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    'semi': ['error', 'always'],
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.config.js', '**/*.dev.js', '**/*.test.js'],
    }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prop-types': '0',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect'
    }
  }
};