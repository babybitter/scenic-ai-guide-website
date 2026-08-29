/**
 * @fileoverview 数智游踪官网的 Vite 构建与开发服务器配置。
 *
 * @description
 * 启用 React 转换插件，并允许通过 `PUBLIC_BASE_PATH` 环境变量构建到
 * `/website-preview/` 等子路径；未设置变量时使用网站根路径。
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * @description 导出官网使用的 Vite 插件和部署基础路径配置。
 * @type {import('vite').UserConfig}
 * @example
 * PUBLIC_BASE_PATH=/website-preview/ npm run build
 */
export default defineConfig({
  plugins: [react()],
  base: process.env.PUBLIC_BASE_PATH || '/',
})
