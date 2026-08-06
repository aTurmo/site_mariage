import { Outlet } from 'react-router'
import SiteFooter from './SiteFooter'
import TopNavBar from './TopNavBar'
import { useHashScroll } from '../../hooks/useHashScroll'

export default function SiteLayout() {
  useHashScroll()

  return (
    <>
      <TopNavBar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
