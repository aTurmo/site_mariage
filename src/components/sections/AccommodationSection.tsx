import Reveal from '../ui/Reveal'

export default function AccommodationSection() {
  return (
    <section id="hebergement" className="bg-tertiary py-section-mobile md:py-section-desktop">
      <Reveal className="mx-auto max-w-page px-6 text-center md:px-gutter">
        <h2 className="mb-6 font-display text-headline-sm text-on-tertiary md:text-headline-md">
          Besoin d’un endroit où dormir&#8239;?
        </h2>
        <p className="mx-auto max-w-xl text-body-lg text-on-tertiary-variant">
          Nous réunissons quelques adresses proches du lieu de réception pour celles et ceux qui
          viennent de loin. Les informations seront ajoutées ici prochainement.
        </p>
      </Reveal>
    </section>
  )
}
