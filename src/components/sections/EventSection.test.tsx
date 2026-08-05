import { render, screen } from '@testing-library/react'
import EventSection from './EventSection'

const eventProps = {
  id: 'mairie',
  overline: 'Les vœux',
  title: 'La mairie',
  description: 'Nous nous dirons oui.',
  details: {
    time: '27 mars 2027 à 13 h 15',
    place: 'Hôtel de ville de Rouen',
    address: '2 Pl. du Général de Gaulle, 76000 Rouen',
  },
  image: { alt: '[[PHOTO]]' },
  map: { alt: '[[PLAN]]' },
}

describe('EventSection', () => {
  it('presents the schedule and the place of the event', () => {
    render(<EventSection {...eventProps} />)

    expect(screen.getByRole('heading', { name: 'La mairie' })).toBeInTheDocument()
    expect(screen.getByText('Horaire')).toBeInTheDocument()
    expect(screen.getByText('27 mars 2027 à 13 h 15')).toBeInTheDocument()
    expect(screen.getByText('Hôtel de ville de Rouen')).toBeInTheDocument()
    expect(screen.getByText('2 Pl. du Général de Gaulle, 76000 Rouen')).toBeInTheDocument()
  })

  it('describes the awaited photo and map so they can be replaced', () => {
    render(<EventSection {...eventProps} />)

    expect(screen.getByRole('img', { name: '[[PHOTO]]' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '[[PLAN]]' })).toBeInTheDocument()
  })

  it('shows the real photo and map once they are provided', () => {
    render(
      <EventSection
        {...eventProps}
        image={{ src: '/photo.jpeg', alt: 'Façade de l’hôtel de ville de Rouen' }}
        map={{ src: '/plan.jpeg', alt: 'Plan d’accès à l’hôtel de ville de Rouen' }}
      />,
    )

    expect(screen.getByRole('img', { name: 'Façade de l’hôtel de ville de Rouen' })).toHaveAttribute(
      'src',
      '/photo.jpeg',
    )
    expect(
      screen.getByRole('img', { name: 'Plan d’accès à l’hôtel de ville de Rouen' }),
    ).toHaveAttribute('src', '/plan.jpeg')
  })
})
