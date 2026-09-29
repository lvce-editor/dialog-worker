import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  {
    rules: {
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'prefer-destructuring': 'off',
      '@cspell/spellchecker': 'off',
    },
  },
  {
    // The pinned application supplies its own Node runtime.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off', 'github-actions/on': 'off' },
  },
  {
    // Preserve real DOM input events covered by the migrated application scenarios.
    files: ['packages/e2e-integration/src/viewlet.error-dialog.ts'],
    rules: { '@typescript-eslint/no-deprecated': 'off' },
  },
])
