import Reveal from '../ui/Reveal'
import SectionImage from '../ui/SectionImage'
import { weddingDetails } from '../../content/weddingDetails'

function BotanicalDivider() {
  return (
    <svg
      className="h-6 w-44 text-secondary/60 md:w-56"
      viewBox="0 0 200 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12h58" />
      <path d="M138 12h58" />
      <path d="M100 3c-7 4-11 8-11 12s4 7 11 9c7-2 11-5 11-9s-4-8-11-12Z" />
      <path d="M100 6v16" />
      <path d="M78 12c4-3 8-4 11-3M122 12c-4-3-8-4-11-3" />
    </svg>
  )
}

export default function WelcomeHero() {
  return (
    <header
      id="accueil"
      className="flex min-h-dvh items-center justify-center bg-surface px-6 pt-28 pb-section-mobile md:px-gutter md:pt-32 md:pb-section-desktop"
    >
      <Reveal className="flex w-full max-w-2xl flex-col items-center gap-6 text-center md:gap-8 md:border md:border-outline-variant md:p-10">
        <p className="text-label-caps uppercase text-secondary">Nous nous marions</p>
        <h1 className="font-display text-display-lg-mobile text-primary md:text-display-lg">
          {weddingDetails.coupleNames}
        </h1>
        <BotanicalDivider />
        <p className="font-display text-headline-sm text-primary md:text-headline-md">
          {weddingDetails.date}
        </p>
        <p className="text-label-caps uppercase text-on-surface-variant">
          {weddingDetails.cities}
        </p>
        <p className="max-w-xl text-body-lg text-on-surface-variant">
          Nous serions très heureux de partager cette journée avec vous. Vous trouverez ici tout ce
          qu’il faut savoir pour nous rejoindre.
        </p>
        <SectionImage alt="[[PHOTO DU COUPLE]]" className="aspect-[4/5] w-full sm:aspect-[3/2]" />
      </Reveal>
    </header>
  )
}
