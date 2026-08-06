import { menuChoices } from '../../content/menuChoices'
import type { GuestDraft, GuestDraftChanges } from '../../hooks/useGuestList'

type RsvpGuestFieldsProps = {
  guest: GuestDraft
  position: number
  onChange: (changes: GuestDraftChanges) => void
  onRemove?: () => void
}

const fieldClassName =
  'min-h-11 w-full border border-outline-variant bg-surface px-4 py-3 text-body-md text-on-surface transition-colors outline-none focus:border-primary'

export default function RsvpGuestFields({
  guest,
  position,
  onChange,
  onRemove,
}: RsvpGuestFieldsProps) {
  const nameId = `nom-${guest.id}`
  const notesId = `precisions-${guest.id}`

  return (
    <fieldset className="border border-outline-variant p-5 md:p-6">
      <legend className="px-2 text-label-caps uppercase text-secondary">
        {`Personne ${position}`}
      </legend>

      <div className="flex flex-col gap-5">
        {onRemove ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Retirer la personne ${position}`}
              className="-mr-3 min-h-11 px-3 text-body-md text-on-surface-variant transition-colors hover:text-primary"
            >
              Retirer
            </button>
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className="text-body-md text-on-surface-variant">
            Nom
          </label>
          <input
            id={nameId}
            type="text"
            required
            autoComplete="name"
            value={guest.name}
            onChange={(event) => onChange({ name: event.target.value })}
            className={fieldClassName}
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-body-md text-on-surface-variant">Choix du menu</legend>
          <div className="flex flex-col gap-3 sm:flex-row">
            {menuChoices.map((menuChoice) => (
              <label
                key={menuChoice}
                className="flex min-h-11 flex-1 cursor-pointer items-center gap-3 border border-outline-variant px-4 py-3 text-body-md transition-colors has-[:checked]:border-primary has-[:checked]:text-primary"
              >
                <input
                  type="radio"
                  required
                  name={`menu-${guest.id}`}
                  value={menuChoice}
                  checked={guest.menuChoice === menuChoice}
                  onChange={() => onChange({ menuChoice })}
                  className="h-4 w-4 accent-primary"
                />
                {menuChoice}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor={notesId} className="text-body-md text-on-surface-variant">
            Autres précisions&#8239;:
          </label>
          <textarea
            id={notesId}
            rows={3}
            value={guest.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
            className={fieldClassName}
          />
        </div>
      </div>
    </fieldset>
  )
}
