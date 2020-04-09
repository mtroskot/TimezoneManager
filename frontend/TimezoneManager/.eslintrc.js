module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint:recommended'],
  plugins: ['jest'],
  rules: {
    'react/prop-types': [2, { ignore: ['navigation'] }],
    'comma-dangle': [1, 'never'],
    'max-len': [2, { code: 120 }],
    'no-restricted-imports': [2, { patterns: ['./*', '../*'] }],
    'no-undef': [2],
    'react/forbid-prop-types': [
      2,
      { forbid: ['any', 'array', 'object'], checkContextTypes: true, checkChildContextTypes: true }
    ],
    'no-unused-vars': [2, { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'react/no-unused-prop-types': [2],
    'no-case-declarations': [1],
    'prefer-template': [1],
    'jest/no-identical-title': [2],
    'no-unneeded-ternary': [2],
    'sort-imports': [2, { ignoreDeclarationSort: true }],
    'react-hooks/exhaustive-deps': [1],
    'no-shadow': [2, { builtinGlobals: true, hoist: 'functions', allow: [] }]
  }
};
