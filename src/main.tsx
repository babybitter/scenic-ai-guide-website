/**
 * @fileoverview 数智游踪介绍站的浏览器启动入口。
 *
 * @description
 * 将 React 应用挂载到页面根节点，并配置严格模式、语言上下文和支持子路径部署的浏览器路由。
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { LanguageProvider } from './context/LanguageContext'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
