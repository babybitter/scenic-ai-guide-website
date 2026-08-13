import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { DownloadPage } from './pages/DownloadPage'
import { InnovationPage } from './pages/InnovationPage'

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
