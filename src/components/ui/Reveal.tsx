import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

export default function Reveal({ children, className = '', delayMs = 0 }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const container = containerRef.current

    if (!container || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  const revealState = hasEntered
    ? 'opacity-100 translate-y-0'
    : 'motion-safe:opacity-0 motion-safe:translate-y-5'

  return (
    <div
      ref={containerRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${revealState} ${className}`}
    >
      {children}
    </div>
  )
}
