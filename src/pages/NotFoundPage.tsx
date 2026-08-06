import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 pt-28 pb-section-mobile text-center md:px-gutter md:pt-40 md:pb-section-desktop">
      <span className="text-label-caps uppercase text-secondary">Page introuvable</span>
      <h1 className="font-display text-headline-md text-primary md:text-display-lg-mobile">
        Cette page n’existe pas
      </h1>
      <p className="max-w-xl text-body-lg text-on-surface-variant">
        Le lien que vous avez suivi ne mène nulle part. Revenez à l’accueil pour retrouver toutes
        les informations.
      </p>
      <Link
        to="/"
        className="min-h-11 border border-primary px-6 py-3 text-label-caps uppercase text-primary transition-colors hover:bg-primary/5"
      >
        Retour à l’accueil
      </Link>
    </section>
  )
}
