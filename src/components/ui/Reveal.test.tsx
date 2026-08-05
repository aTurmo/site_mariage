import { act, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Reveal from './Reveal'

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = []

  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
  private readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    FakeIntersectionObserver.instances.push(this)
  }

  intersect() {
    act(() => {
      this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as never)
    })
  }
}

describe('Reveal', () => {
  it('shows its content immediately when the browser cannot observe intersections', () => {
    render(<Reveal>Vous êtes invités</Reveal>)

    expect(screen.getByText('Vous êtes invités')).toHaveClass('opacity-100')
  })

  describe('when the browser observes intersections', () => {
    beforeEach(() => {
      FakeIntersectionObserver.instances = []
      vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('keeps its content back until it scrolls into view', () => {
      render(<Reveal>Vous êtes invités</Reveal>)

      expect(screen.getByText('Vous êtes invités')).toHaveClass('motion-safe:opacity-0')
    })

    it('reveals its content once it scrolls into view', () => {
      render(<Reveal>Vous êtes invités</Reveal>)

      FakeIntersectionObserver.instances[0].intersect()

      expect(screen.getByText('Vous êtes invités')).toHaveClass('opacity-100')
    })

    it('stops observing once the content has been revealed', () => {
      render(<Reveal>Vous êtes invités</Reveal>)
      const observer = FakeIntersectionObserver.instances[0]

      observer.intersect()

      expect(observer.disconnect).toHaveBeenCalled()
    })

    it('stops observing when it leaves the page', () => {
      const { unmount } = render(<Reveal>Vous êtes invités</Reveal>)
      const observer = FakeIntersectionObserver.instances[0]

      unmount()

      expect(observer.disconnect).toHaveBeenCalled()
    })
  })
})
