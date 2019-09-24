module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    'react-native/react-native': true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 8,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    //'no-undef': ['error'],
    'no-console': ['off'],
    'no-unused-vars': ['warn'],
    "react/prop-types": ["off", { "ignore": ["navigation"] }],
    'react-native/no-unused-styles': ['warn'],
    'react-native/split-platform-components': ['warn'],
    //'react-native/no-color-literals': ['off'],
  },
};