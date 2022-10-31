module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-shadow': ['off', { hoist: 'all', allow: [] }],
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] },
    ],
    '@typescript-eslint/no-empty-pattern': 'off',
    'no-empty-pattern': 'off',
    'no-undef': 'error',
    'no-redeclare': 'error',
    'no-unused-vars': 'off',
  },
  globals: {
    setTimeout: true,
    setInterval: true,
    clearTimeout: true,
    clearInterval: true,
    window: true,
    document: true,
    navigator: true,
    localStorage: true,
    sessionStorage: true,
    fetch: true,
    module: true,
  },
};
