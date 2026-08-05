import type { ComponentPropsWithoutRef } from 'react'
import { pageSections } from '../../content/sections'

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
      {pageSections.map((section) => (
        <li key={section.id}>
          <a href={`#${section.id}`} onClick={onSelect} className={linkClassName}>
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
