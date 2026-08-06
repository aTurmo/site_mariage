import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import SectionLinkList from './SectionLinkList'
import { weddingDetails } from '../../content/weddingDetails'
import { useHasScrolled } from '../../hooks/useHasScrolled'

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {isOpen ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const hasScrolled = useHasScrolled(50)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  const background = hasScrolled ? 'bg-surface/95 shadow-sm' : 'bg-surface/80'

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all ${background}`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4 md:px-gutter">
        <Link to="/#accueil" className="font-display text-headline-sm italic text-primary">
          {weddingDetails.coupleNames}
        </Link>

        <SectionLinkList
          className="hidden items-center gap-8 md:flex"
          linkClassName="text-label-caps uppercase text-on-surface-variant transition-colors hover:text-primary"
        />

        <button
          type="button"
          ref={toggleRef}
          aria-expanded={isMenuOpen}
          aria-controls="menu-principal"
          onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
          className="-mr-3 p-3 text-primary md:hidden"
        >
          <span className="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </div>

      <SectionLinkList
        id="menu-principal"
        hidden={!isMenuOpen}
        onSelect={() => setIsMenuOpen(false)}
        className="border-t border-outline-variant/40 px-6 pb-4 md:hidden"
        linkClassName="block py-3 text-label-caps uppercase text-on-surface-variant"
      />
    </nav>
  )
}
