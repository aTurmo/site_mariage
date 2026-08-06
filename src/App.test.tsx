import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App'

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('lays out the wedding page from the hero down to the footer', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'La mairie' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'La réception' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Besoin d’un endroit où dormir ?' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(document.title).toBe('Eléna et Adrien — 27 mars 2027')
  })

  it('keeps the confirmation form on its own page', () => {
    renderAt('/presence')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Confirmez votre présence' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'La mairie' })).not.toBeInTheDocument()
    expect(document.title).toBe('Confirmez votre présence — Eléna et Adrien')
  })

  it('walks the visitor from the home page to the confirmation page', async () => {
    const user = userEvent.setup()
    renderAt('/')

    const [presenceLink] = screen.getAllByRole('link', { name: 'Présence' })
    await user.click(presenceLink)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Confirmez votre présence' }),
    ).toBeInTheDocument()
  })

  it('answers an unknown address with a not-found page', () => {
    renderAt('/liste-de-mariage')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Cette page n’existe pas' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Retour à l’accueil' })).toBeInTheDocument()
    expect(document.title).toBe('Page introuvable — Eléna et Adrien')
  })
})
