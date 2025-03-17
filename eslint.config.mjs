import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-empty': 1,
      '@/no-var': 2,
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  {
    files: ['tests/**'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
];
