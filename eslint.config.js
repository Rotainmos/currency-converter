import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['src/**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      prettier,
      '@typescript-eslint': ts,
    },
    rules: {
      ...(vue.configs['vue3-recommended']?.rules || {}),
      ...(ts.configs.recommended?.rules || {}),
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'vue/multi-word-component-names': 'off',
    },
  },
]
