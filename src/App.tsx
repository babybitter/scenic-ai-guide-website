/**
 * @fileoverview 数智游踪介绍站的顶层路由组件。
 *
 * @description
 * 集中声明站点公共布局、业务页面路由与未知地址回退规则，作为 React 应用的页面入口。
 */
import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { DownloadPage } from './pages/DownloadPage'
import { InnovationPage } from './pages/InnovationPage'

/**
 * @description 渲染数智游踪介绍站的完整路由树，并将所有业务页面置于统一站点布局中。
 * @returns {import('react').JSX.Element} 包含页面路由、公共布局和首页回退规则的 React 元素。
 * @example
 * <App />
 */
export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs/*" element={<DocsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/innovation" element={<InnovationPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
