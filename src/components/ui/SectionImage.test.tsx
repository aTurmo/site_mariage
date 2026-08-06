import { render, screen } from '@testing-library/react'
import SectionImage from './SectionImage'

describe('SectionImage', () => {
  it('shows a map whole rather than cropping it', () => {
    render(<SectionImage src="/plan.png" alt="Plan d’accès" fit="contain" />)

    expect(screen.getByRole('img', { name: 'Plan d’accès' })).toHaveClass('object-contain')
  })

  it('fills its frame with a photo by default', () => {
    render(<SectionImage src="/photo.jpg" alt="Le lieu" />)

    expect(screen.getByRole('img', { name: 'Le lieu' })).toHaveClass('object-cover')
  })

  it('reserves the frame with a placeholder while the picture is missing', () => {
    render(<SectionImage alt="[[PHOTO]]" />)

    const placeholder = screen.getByRole('img', { name: '[[PHOTO]]' })

    expect(placeholder).toBeInTheDocument()
    expect(placeholder.tagName).not.toBe('IMG')
  })
})
