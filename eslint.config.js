/**
 * @fileoverview 数智游踪官网的 ESLint 扁平化配置。
 *
 * @description
 * 为 TypeScript、React Hooks 与 React Fast Refresh 组合推荐规则，
 * 声明浏览器全局变量，并排除 Vite 生产构建目录。
 */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

/**
 * @description 导出适用于官网 TypeScript 与 TSX 源文件的 ESLint 配置数组。
 * @type {import('eslint').Linter.Config[]}
 * @example
 * npm run lint
 */
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
)
