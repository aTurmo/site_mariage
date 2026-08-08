import { useEffect, useState } from 'react'
import { rsvpEndpoint, type ConfirmedGuest } from '../api/rsvpApi'
import { menuChoices, type MenuChoice } from '../content/menuChoices'

type StoredGuest = ConfirmedGuest & { testtest: string }

type FaultyEntry = { id: string; problem: string }

type ParsedEntries = {
  guests: StoredGuest[]
  faultyEntries: FaultyEntry[]
  ignoredCount: number
  error: string | null
}

type ApiResponse = { status: string; body: string }

type LoadState =
  | { phase: 'loading' }
  | { phase: 'loaded'; response: ApiResponse; entries: ParsedEntries }
  | { phase: 'failed'; response: ApiResponse }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isMenuChoice(value: unknown): value is MenuChoice {
  return typeof value === 'string' && menuChoices.some((choice) => choice === value)
}

function readIdentifier(value: unknown) {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return null
}

function readGuest(id: string, entry: Record<string, unknown>): StoredGuest | string {
  const { name, menuChoice, notes } = entry

  if (typeof name !== 'string' || name.trim() === '') {
    return 'nom absent ou vide'
  }

  if (!isMenuChoice(menuChoice)) {
    return `menu invalide (${menuChoices.join(' / ')} attendu)`
  }

  if (typeof notes !== 'string') {
    return 'précisions absentes ou invalides'
  }

  return { testtest: id, name: name.trim(), menuChoice, notes }
}

function parseEntries(body: string): ParsedEntries {
  const emptyResult = { guests: [], faultyEntries: [], ignoredCount: 0 }

  let payload: unknown

  try {
    payload = JSON.parse(body)
  } catch {
    return { ...emptyResult, error: 'La réponse n’est pas un JSON valide.' }
  }

  if (!Array.isArray(payload)) {
    return { ...emptyResult, error: 'La réponse n’est pas un tableau.' }
  }

  const guests: StoredGuest[] = []
  const faultyEntries: FaultyEntry[] = []
  let ignoredCount = 0

  for (const entry of payload) {
    const id = isRecord(entry) ? readIdentifier(entry.testtest) : null

    if (id === null || !isRecord(entry)) {
      ignoredCount += 1
      continue
    }

    const guest = readGuest(id, entry)

    if (typeof guest === 'string') {
      faultyEntries.push({ id, problem: guest })
    } else {
      guests.push(guest)
    }
  }

  return { guests, faultyEntries, ignoredCount, error: null }
}

async function readGuests(): Promise<LoadState> {
  try {
    const httpResponse = await fetch(rsvpEndpoint)
    const body = await httpResponse.text()
    const response = { status: `${httpResponse.status} ${httpResponse.statusText}`, body }

    return { phase: 'loaded', response, entries: parseEntries(body) }
  } catch (error) {
    return { phase: 'failed', response: { status: 'Échec de la requête', body: String(error) } }
  }
}

function formatBody(body: string) {
  if (body.trim() === '') {
    return '(réponse vide)'
  }

  try {
    return JSON.stringify(JSON.parse(body), null, 2)
  } catch {
    return body
  }
}

function normalizeForSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

const cellClassName = 'border border-black px-3 py-2 align-top'

function summaryTileClassName(isActive: boolean) {
  const baseClassName = 'min-h-11 border border-black px-4 py-2'

  return isActive ? `${baseClassName} bg-black text-white` : baseClassName
}

export default function GuestsPage() {
  const [state, setState] = useState<LoadState>({ phase: 'loading' })
  const [menuFilter, setMenuFilter] = useState<MenuChoice | null>(null)
  const [nameQuery, setNameQuery] = useState('')

  useEffect(() => {
    let isMounted = true

    void readGuests().then((nextState) => {
      if (isMounted) {
        setState(nextState)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const handleReload = () => {
    setState({ phase: 'loading' })
    void readGuests().then(setState)
  }

  const isLoading = state.phase === 'loading'
  const entries = state.phase === 'loaded' ? state.entries : null
  const response = state.phase === 'loading' ? null : state.response

  const guests = entries?.guests ?? []
  const normalizedQuery = normalizeForSearch(nameQuery)
  const searchedGuests = guests.filter((guest) =>
    normalizeForSearch(guest.name).includes(normalizedQuery),
  )
  const visibleGuests = searchedGuests.filter(
    (guest) => menuFilter === null || guest.menuChoice === menuFilter,
  )

  const toggleMenuFilter = (choice: MenuChoice) => {
    setMenuFilter((currentFilter) => (currentFilter === choice ? null : choice))
  }

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-8 p-6 lg:max-w-7xl">
      <title>Invités</title>
      <h1 className="text-2xl">Invités</h1>

      <button
        type="button"
        disabled={isLoading}
        onClick={handleReload}
        className="min-h-11 self-start border border-black px-6 py-3 disabled:opacity-50"
      >
        {isLoading ? 'Chargement…' : 'Recharger les données'}
      </button>

      {entries ? (
        <div className="flex flex-col gap-6">
          {entries.error ? (
            <p className="border border-black p-4">{entries.error}</p>
          ) : (
            <>
              {guests.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <label className="flex max-w-sm flex-col gap-1">
                    Rechercher un invité
                    <input
                      type="search"
                      value={nameQuery}
                      onChange={(event) => setNameQuery(event.target.value)}
                      placeholder="Nom"
                      className="min-h-11 border border-black px-3 py-2"
                    />
                  </label>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      aria-pressed={menuFilter === null}
                      onClick={() => setMenuFilter(null)}
                      className={summaryTileClassName(menuFilter === null)}
                    >
                      Tous ({searchedGuests.length})
                    </button>
                    {menuChoices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        aria-pressed={menuFilter === choice}
                        onClick={() => toggleMenuFilter(choice)}
                        className={summaryTileClassName(menuFilter === choice)}
                      >
                        {choice} (
                        {searchedGuests.filter((guest) => guest.menuChoice === choice).length})
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <h2 className="text-xl">Invités ({visibleGuests.length})</h2>
                {visibleGuests.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-md border-collapse text-left text-sm">
                      <thead>
                        <tr>
                          <th className={cellClassName}>Nom</th>
                          <th className={cellClassName}>Menu</th>
                          <th className={cellClassName}>Précisions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleGuests.map((guest) => (
                          <tr key={guest.testtest}>
                            <td className={cellClassName}>{guest.name}</td>
                            <td className={cellClassName}>{guest.menuChoice}</td>
                            <td className={cellClassName}>{guest.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>
                    {guests.length === 0
                      ? 'Aucun invité lisible dans la réponse.'
                      : 'Aucun invité ne correspond à votre recherche.'}
                  </p>
                )}
              </div>

              {entries.faultyEntries.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl">Entrées incorrectes ({entries.faultyEntries.length})</h2>
                  <ul className="flex flex-col gap-1 text-sm">
                    {entries.faultyEntries.map(({ id, problem }, index) => (
                      <li key={`${id}-${index}`}>
                        <code>{id}</code> — {problem}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {entries.ignoredCount > 0 ? (
                <p className="text-sm">
                  {entries.ignoredCount}{' '}
                  {entries.ignoredCount === 1 ? 'entrée ignorée' : 'entrées ignorées'} (identifiant
                  testtest absent).
                </p>
              ) : null}
            </>
          )}
        </div>
      ) : null}

      {response ? (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Réponse brute</h2>
          <pre className="overflow-x-auto border border-black p-4 text-sm">
            {response.status}
            {'\n\n'}
            {formatBody(response.body)}
          </pre>
        </div>
      ) : null}
    </section>
  )
}
