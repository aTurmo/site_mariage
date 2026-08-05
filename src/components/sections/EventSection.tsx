import Reveal from '../ui/Reveal'
import SectionImage from '../ui/SectionImage'

function ClockIcon() {
  return (
    <svg
      className="mt-1 h-5 w-5 shrink-0 text-primary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      className="mt-1 h-5 w-5 shrink-0 text-primary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

type EventSectionProps = {
  id: string
  overline: string
  title: string
  description: string
  details: { time: string; place: string; address: string }
  image: { src?: string; alt: string }
  map: { src?: string; alt: string }
  imageSide?: 'left' | 'right'
}

export default function EventSection({
  id,
  overline,
  title,
  description,
  details,
  image,
  map,
  imageSide = 'left',
}: EventSectionProps) {
  const imageOrder = imageSide === 'right' ? 'md:order-2' : ''
  const detailsOrder = imageSide === 'right' ? 'md:order-1' : ''

  return (
    <section
      id={id}
      className="mx-auto max-w-page px-6 py-section-mobile md:px-gutter md:py-section-desktop"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className={imageOrder}>
          <div className="border border-outline-variant p-3 md:p-6">
            <SectionImage {...image} className="aspect-[4/3] w-full" />
          </div>
        </Reveal>

        <Reveal className={`flex flex-col gap-6 ${detailsOrder}`} delayMs={150}>
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-secondary/30" />
            <span className="text-label-caps uppercase text-secondary">{overline}</span>
          </div>

          <h2 className="font-display text-headline-sm text-primary md:text-headline-md">{title}</h2>
          <p className="text-body-lg text-on-surface-variant">{description}</p>

          <dl className="flex flex-col gap-4 border-y border-outline-variant/30 py-6">
            <div className="flex items-start gap-4">
              <ClockIcon />
              <div>
                <dt className="text-label-caps uppercase text-on-surface-variant">Horaire</dt>
                <dd className="text-body-md">{details.time}</dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <PinIcon />
              <div>
                <dt className="text-label-caps uppercase text-on-surface-variant">Lieu</dt>
                <dd className="text-body-md">{details.place}</dd>
                <dd className="text-body-md italic text-on-surface-variant">{details.address}</dd>
              </div>
            </div>
          </dl>

          <SectionImage {...map} className="h-48 w-full" />
        </Reveal>
      </div>
    </section>
  )
}
