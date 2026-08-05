import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('greets the visitor', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Bonjour' })).toBeInTheDocument()
  })
})
