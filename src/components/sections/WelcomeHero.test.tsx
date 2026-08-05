import { render, screen } from '@testing-library/react'
import WelcomeHero from './WelcomeHero'

describe('WelcomeHero', () => {
  it('announces the couple as the main heading', () => {
    render(<WelcomeHero />)

    expect(screen.getByRole('heading', { level: 1, name: 'Eléna et Adrien' })).toBeInTheDocument()
  })

  it('shows the date and the venue of the celebration', () => {
    render(<WelcomeHero />)

    expect(screen.getByText('27 mars 2027')).toBeInTheDocument()
    expect(screen.getByText('[[LIEU DE RÉCEPTION]] · Rouen')).toBeInTheDocument()
  })

  it('invites the visitor to come back for the details', () => {
    render(<WelcomeHero />)

    expect(screen.getByText(/partager cette journée avec vous/)).toBeInTheDocument()
  })

  it('reserves a space for the photo of the couple', () => {
    render(<WelcomeHero />)

    expect(screen.getByRole('img', { name: '[[PHOTO DU COUPLE]]' })).toBeInTheDocument()
  })
})
