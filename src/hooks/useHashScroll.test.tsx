import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter } from 'react-router'
import { useHashScroll } from './useHashScroll'

function ScrollingPage() {
  useHashScroll()

  return (
    <>
      <section id="mairie">La mairie</section>
      <Link to="/presence">Présence</Link>
      <Link to="/#mairie">Mairie</Link>
    </>
  )
}

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <ScrollingPage />
    </MemoryRouter>,
  )
}

describe('useHashScroll', () => {
  beforeEach(() => vi.clearAllMocks())

  it('leaves the scroll position alone when the page is first opened', () => {
    renderAt('/')

    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('goes back to the top when the visitor opens another page', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(screen.getByRole('link', { name: 'Présence' }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 })
  })

  it('scrolls to the section named in the address', () => {
    renderAt('/#mairie')

    expect(screen.getByText('La mairie').scrollIntoView).toHaveBeenCalled()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})
