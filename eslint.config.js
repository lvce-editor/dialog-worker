import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  {
    rules: {
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'prefer-destructuring': 'off',
      '@cspell/spellchecker': 'off',
    },
  },
]
