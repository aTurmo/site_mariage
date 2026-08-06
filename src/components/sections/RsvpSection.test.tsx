import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RsvpSection from './RsvpSection'
import { readConfirmationsCsv } from '../../lib/rsvpCsvStorage'

type User = ReturnType<typeof userEvent.setup>

type GuestAnswer = {
  name: string
  menuChoice: string
  notes?: string
}

async function fillGuest(user: User, position: number, { name, menuChoice, notes }: GuestAnswer) {
  const fields = within(screen.getByRole('group', { name: `Personne ${position}` }))

  await user.type(fields.getByLabelText('Nom'), name)
  await user.click(fields.getByRole('radio', { name: menuChoice }))

  if (notes) {
    await user.type(fields.getByLabelText('Autres précisions :'), notes)
  }
}

describe('RsvpSection', () => {
  beforeEach(() => localStorage.clear())

  it('records the answer of a single guest as a csv row', async () => {
    const user = userEvent.setup()
    render(<RsvpSection />)

    await fillGuest(user, 1, { name: 'Camille', menuChoice: 'Vegan', notes: 'Sans champignons' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(readConfirmationsCsv()).toBe('nom,menu,precisions\n"Camille","Vegan","Sans champignons"')
    expect(screen.getByRole('status')).toHaveTextContent('Votre réponse est bien enregistrée.')
  })

  it('lets a family answer for several people at once', async () => {
    const user = userEvent.setup()
    render(<RsvpSection />)

    await user.click(screen.getByRole('button', { name: 'Ajouter une personne' }))
    await fillGuest(user, 1, { name: 'Louis', menuChoice: 'Halal' })
    await fillGuest(user, 2, { name: 'Sarah', menuChoice: 'Omnivore' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(readConfirmationsCsv()).toBe(
      'nom,menu,precisions\n"Louis","Halal",""\n"Sarah","Omnivore",""',
    )
  })

  it('drops a person added by mistake', async () => {
    const user = userEvent.setup()
    render(<RsvpSection />)

    await user.click(screen.getByRole('button', { name: 'Ajouter une personne' }))
    await user.click(screen.getByRole('button', { name: 'Retirer la personne 2' }))

    expect(screen.queryByRole('group', { name: 'Personne 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Retirer la personne 1' })).not.toBeInTheDocument()
  })

  it('records nothing until every person has a name and a menu', async () => {
    const user = userEvent.setup()
    render(<RsvpSection />)

    await user.click(screen.getByRole('button', { name: 'Ajouter une personne' }))
    await fillGuest(user, 1, { name: 'Louis', menuChoice: 'Halal' })
    await user.click(screen.getByRole('button', { name: 'Confirmer' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Merci d’indiquer le nom et le choix de menu de chaque personne.',
    )
    expect(readConfirmationsCsv()).toBe('')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
