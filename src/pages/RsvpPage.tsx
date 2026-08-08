import { useState, type FormEvent } from 'react'
import RsvpGuestFields from '../components/sections/RsvpGuestFields'
import Reveal from '../components/ui/Reveal'
import { weddingDetails } from '../content/weddingDetails'
import { useGuestList } from '../hooks/useGuestList'
import { submitConfirmations } from '../api/rsvpApi'

const missingFieldsMessage = 'Merci d’indiquer le nom et le choix de menu de chaque personne.'
const networkFailureMessage =
  'Votre réponse n’a pas pu être envoyée. Vérifiez votre connexion, puis réessayez.'
const serverFailureMessage =
  'Votre réponse n’a pas pu être enregistrée. Merci de réessayer dans quelques instants.'

export default function RsvpPage() {
  const { guests, confirmedGuests, addGuest, removeGuest, updateGuest } = useGuestList()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (confirmedGuests === null) {
      setErrorMessage(missingFieldsMessage)
      return
    }

    setErrorMessage(null)
    setIsSending(true)

    const outcome = await submitConfirmations(confirmedGuests)

    setIsSending(false)

    if (outcome === 'success') {
      setHasConfirmed(true)
      return
    }

    setErrorMessage(outcome === 'network-failure' ? networkFailureMessage : serverFailureMessage)
  }

  return (
    <section className="min-h-dvh bg-surface-container-low pt-28 pb-section-mobile md:pt-40 md:pb-section-desktop">
      <title>{`Confirmez votre présence — ${weddingDetails.coupleNames}`}</title>
      <Reveal className="mx-auto flex max-w-2xl flex-col gap-8 px-6 md:px-gutter">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-label-caps uppercase text-secondary">Votre réponse</span>
          <h1 className="font-display text-headline-md text-primary md:text-display-lg-mobile">
            Confirmez votre présence
          </h1>
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
                disabled={isSending}
                className="min-h-11 flex-1 bg-primary px-6 py-3 text-label-caps uppercase text-surface transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isSending ? 'Envoi…' : 'Confirmer'}
              </button>
              <button
                type="button"
                onClick={addGuest}
                disabled={isSending}
                className="min-h-11 flex-1 border border-primary px-6 py-3 text-label-caps uppercase text-primary transition-colors hover:bg-primary/5 disabled:opacity-60"
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
