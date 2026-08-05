import { useEffect, useState } from 'react'

export function useHasScrolled(thresholdPx: number) {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const updateFromScrollPosition = () => setHasScrolled(window.scrollY > thresholdPx)

    updateFromScrollPosition()
    window.addEventListener('scroll', updateFromScrollPosition, { passive: true })

    return () => window.removeEventListener('scroll', updateFromScrollPosition)
  }, [thresholdPx])

  return hasScrolled
}
