import SectionLinkList from './SectionLinkList'
import { weddingDetails } from '../../content/weddingDetails'

export default function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant/30 bg-surface-container-low py-section-mobile md:py-section-desktop">
      <div className="mx-auto flex max-w-page flex-col items-center gap-8 px-6 text-center md:px-gutter">
        <p className="font-display text-headline-sm text-primary md:text-headline-md">
          {weddingDetails.coupleNames}
        </p>

        <SectionLinkList
          className="flex flex-wrap justify-center gap-x-8 gap-y-2"
          linkClassName="text-body-md text-secondary transition-colors hover:text-primary"
        />

        <p className="max-w-md text-body-md text-on-surface-variant">
          Au plaisir de vous retrouver le {weddingDetails.date}.
        </p>
      </div>
    </footer>
  )
}
