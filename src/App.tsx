import { Route, Routes } from 'react-router'
import SiteLayout from './components/layout/SiteLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import RsvpPage from './pages/RsvpPage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="presence" element={<RsvpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
