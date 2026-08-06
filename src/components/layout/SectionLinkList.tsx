import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router'
import { navigationLinks } from '../../content/navigation'

type SectionLinkListProps = ComponentPropsWithoutRef<'ul'> & {
  linkClassName: string
  onSelect?: () => void
}

export default function SectionLinkList({
  linkClassName,
  onSelect,
  ...listProps
}: SectionLinkListProps) {
  return (
    <ul {...listProps}>
      {navigationLinks.map((link) => (
        <li key={link.to}>
          <Link to={link.to} onClick={onSelect} className={linkClassName}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
