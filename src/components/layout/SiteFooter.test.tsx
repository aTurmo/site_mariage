import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import SiteFooter from './SiteFooter'

function renderFooter() {
  render(
    <MemoryRouter>
      <SiteFooter />
    </MemoryRouter>,
  )
}

describe('SiteFooter', () => {
  it('signs off with the couple and the date', () => {
    renderFooter()

    expect(screen.getByText('Eléna et Adrien')).toBeInTheDocument()
    expect(screen.getByText(/Au plaisir de vous retrouver le 27 mars 2027/)).toBeInTheDocument()
  })

  it('offers a way back to every section of the page', () => {
    renderFooter()

    expect(screen.getByRole('link', { name: 'Mairie' })).toHaveAttribute('href', '/#mairie')
    expect(screen.getByRole('link', { name: 'Réception' })).toHaveAttribute('href', '/#reception')
    expect(screen.getByRole('link', { name: 'Hébergement' })).toHaveAttribute(
      'href',
      '/#hebergement',
    )
  })

  it('links to the confirmation page', () => {
    renderFooter()

    expect(screen.getByRole('link', { name: 'Présence' })).toHaveAttribute('href', '/presence')
  })
})
