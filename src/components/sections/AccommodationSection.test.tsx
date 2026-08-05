import { render, screen } from '@testing-library/react'
import AccommodationSection from './AccommodationSection'

describe('AccommodationSection', () => {
  it('tells guests from out of town that addresses are coming', () => {
    render(<AccommodationSection />)

    expect(
      screen.getByRole('heading', { name: 'Besoin d’un endroit où dormir\u202f?' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/adresses proches du lieu de réception/)).toBeInTheDocument()
  })
})
