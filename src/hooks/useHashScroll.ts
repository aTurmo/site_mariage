import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export function useHashScroll() {
  const { pathname, hash } = useLocation()
  const lastVisitedPathname = useRef(pathname)

  useEffect(() => {
    if (hash !== '') {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }

    const staysOnTheSamePage = lastVisitedPathname.current === pathname

    if (staysOnTheSamePage) {
      return
    }

    lastVisitedPathname.current = pathname
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
}
