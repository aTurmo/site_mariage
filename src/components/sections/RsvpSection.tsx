import { useState, type FormEvent } from 'react'
import RsvpGuestFields from './RsvpGuestFields'
import Reveal from '../ui/Reveal'
import { useGuestList } from '../../hooks/useGuestList'
import { appendConfirmations } from '../../lib/rsvpCsvStorage'

const missingFieldsMessage = 'Merci d’indiquer le nom et le choix de menu de chaque personne.'
const storageFailureMessage =
  'Votre navigateur n’a pas pu enregistrer la réponse. Autorisez le stockage local, puis réessayez.'

export default function RsvpSection() {
  const { guests, confirmedGuests, addGuest, removeGuest, updateGuest } = useGuestList()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasConfirmed, setHasConfirmed] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (confirmedGuests === null) {
      setErrorMessage(missingFieldsMessage)
      return
    }

    try {
      appendConfirmations(confirmedGuests)
    } catch {
      setErrorMessage(storageFailureMessage)
      return
    }

    setErrorMessage(null)
    setHasConfirmed(true)
  }

  return (
    <section
      id="presence"
      className="bg-surface-container-low py-section-mobile md:py-section-desktop"
    >
      <Reveal className="mx-auto flex max-w-2xl flex-col gap-8 px-6 md:px-gutter">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-label-caps uppercase text-secondary">Votre réponse</span>
          <h2 className="font-display text-headline-sm text-primary md:text-headline-md">
            Confirmez votre présence
          </h2>
          <p className="max-w-xl text-body-lg text-on-surface-variant">
            Indiquez-nous qui sera présent et le menu souhaité pour chaque personne. Vous pouvez
            répondre pour toute votre famille en une seule fois.
          </p>
        </div>

        {hasConfirmed ? (
          <p
            role="status"
            className="border border-outline-variant bg-surface p-6 text-center text-body-lg text-primary"
          >
            Merci&#8239;! Votre réponse est bien enregistrée.
          </p>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
            {guests.map((guest, index) => (
              <RsvpGuestFields
                key={guest.id}
                guest={guest}
                position={index + 1}
                onChange={(changes) => updateGuest(guest.id, changes)}
                onRemove={guests.length > 1 ? () => removeGuest(guest.id) : undefined}
              />
            ))}

            {errorMessage ? (
              <p role="alert" className="text-body-md text-flower-orange">
                {errorMessage}
              </p>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row-reverse">
              <button
                type="submit"
                className="min-h-11 flex-1 bg-primary px-6 py-3 text-label-caps uppercase text-surface transition-opacity hover:opacity-90"
              >
                Confirmer
              </button>
              <button
                type="button"
                onClick={addGuest}
                className="min-h-11 flex-1 border border-primary px-6 py-3 text-label-caps uppercase text-primary transition-colors hover:bg-primary/5"
              >
                Ajouter une personne
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  )
}
