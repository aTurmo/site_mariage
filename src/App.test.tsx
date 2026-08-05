import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('lays out the wedding page from the hero down to the footer', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'La mairie' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'La réception' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Besoin d’un endroit où dormir\u202f?' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
