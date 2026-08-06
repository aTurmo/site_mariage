import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import TopNavBar from './TopNavBar'

function renderNavBar() {
  render(
    <MemoryRouter>
      <TopNavBar />
    </MemoryRouter>,
  )
}

describe('TopNavBar', () => {
  it('keeps the section links out of the menu until it is opened', () => {
    renderNavBar()

    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.getAllByRole('link', { name: 'Mairie' })).toHaveLength(1)
  })

  it('opens the menu when the visitor taps the button', async () => {
    const user = userEvent.setup()
    renderNavBar()

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))

    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getAllByRole('link', { name: 'Mairie' })).toHaveLength(2)
  })

  it('closes the menu once a section is chosen', async () => {
    const user = userEvent.setup()
    renderNavBar()

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))
    const [, menuLink] = screen.getAllByRole('link', { name: 'Réception' })
    await user.click(menuLink)

    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument()
  })

  it('closes the menu on Escape and hands focus back to the button', async () => {
    const user = userEvent.setup()
    renderNavBar()

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))
    await user.keyboard('{Escape}')

    const toggle = screen.getByRole('button', { name: 'Ouvrir le menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('always points the button at the menu it controls', () => {
    renderNavBar()

    const controlledId = screen
      .getByRole('button', { name: 'Ouvrir le menu' })
      .getAttribute('aria-controls')

    expect(controlledId).toBeTruthy()
    expect(document.getElementById(controlledId ?? '')).toBeInTheDocument()
  })
})
