import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RsvpPage from './RsvpPage'
import { rsvpEndpoint } from '../api/rsvpApi'

type User = ReturnType<typeof userEvent.setup>

type GuestAnswer = {
  name: string
  menuChoice: string
  notes?: string
}

const fetchMock = vi.fn()

function expectedRequest(guests: Array<{ name: string; menuChoice: string; notes: string }>) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guests }),
  }
}

async function fillGuest(user: User, position: number, { name, menuChoice, notes }: GuestAnswer) {
  const fields = within(screen.getByRole('group', { name: `Personne ${position}` }))

  await user.type(fields.getByLabelText('Nom'), name)
  await user.click(fields.getByRole('radio', { name: menuChoice }))

  if (notes) {
    await user.type(fields.getByLabelText('Autres précisions :'), notes)
  }
}

describe('RsvpPage', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    fetchMock.mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => vi.unstubAllGlobals())

  it('sends the answer of a single guest to the api', async () => {
    const user = userEvent.setup()
    render(<RsvpPage />)

    await fillGuest(user, 1, { name: 'Camille', menuChoice: 'Vegan', notes: 'Sans champignons' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Votre réponse est bien enregistrée.',
    )
    expect(fetchMock).toHaveBeenCalledWith(
      rsvpEndpoint,
      expectedRequest([{ name: 'Camille', menuChoice: 'Vegan', notes: 'Sans champignons' }]),
    )
  })

  it('sends every person of a family in a single request', async () => {
    const user = userEvent.setup()
    render(<RsvpPage />)

    await user.click(screen.getByRole('button', { name: 'Ajouter une personne' }))
    await fillGuest(user, 1, { name: 'Louis', menuChoice: 'Halal' })
    await fillGuest(user, 2, { name: 'Sarah', menuChoice: 'Omnivore' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(await screen.findByRole('status')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      rsvpEndpoint,
      expectedRequest([
        { name: 'Louis', menuChoice: 'Halal', notes: '' },
        { name: 'Sarah', menuChoice: 'Omnivore', notes: '' },
      ]),
    )
  })

  it('drops a person added by mistake', async () => {
    const user = userEvent.setup()
    render(<RsvpPage />)

    await user.click(screen.getByRole('button', { name: 'Ajouter une personne' }))
    await user.click(screen.getByRole('button', { name: 'Retirer la personne 2' }))

    expect(screen.queryByRole('group', { name: 'Personne 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Retirer la personne 1' })).not.toBeInTheDocument()
  })

  it('sends nothing until every person has a name and a menu', async () => {
    const user = userEvent.setup()
    render(<RsvpPage />)

    await user.click(screen.getByRole('button', { name: 'Ajouter une personne' }))
    await fillGuest(user, 1, { name: 'Louis', menuChoice: 'Halal' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Merci d’indiquer le nom et le choix de menu de chaque personne.',
    )
    expect(fetchMock).not.toHaveBeenCalled()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('asks the guest to check their connection when the api is unreachable', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))
    const user = userEvent.setup()
    render(<RsvpPage />)

    await fillGuest(user, 1, { name: 'Camille', menuChoice: 'Vegan' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Vérifiez votre connexion, puis réessayez.',
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('asks the guest to retry when the api refuses the answer', async () => {
    fetchMock.mockResolvedValue({ ok: false })
    const user = userEvent.setup()
    render(<RsvpPage />)

    await fillGuest(user, 1, { name: 'Camille', menuChoice: 'Vegan' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Merci de réessayer dans quelques instants.',
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('lets the guest submit again after a failure', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false })
    const user = userEvent.setup()
    render(<RsvpPage />)

    await fillGuest(user, 1, { name: 'Camille', menuChoice: 'Vegan' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))
    await screen.findByRole('alert')

    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(await screen.findByRole('status')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
