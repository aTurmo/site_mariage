import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useHasScrolled } from './useHasScrolled'

const scrollTo = (position: number) => {
  Object.defineProperty(window, 'scrollY', { value: position, configurable: true })
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

describe('useHasScrolled', () => {
  afterEach(() => {
    scrollTo(0)
  })

  it('reports nothing while the page sits at the top', () => {
    const { result } = renderHook(() => useHasScrolled(50))

    expect(result.current).toBe(false)
  })

  it('reports a scroll once the page passes the threshold', () => {
    const { result } = renderHook(() => useHasScrolled(50))

    scrollTo(51)

    expect(result.current).toBe(true)
  })

  it('reports nothing again when the page returns to the top', () => {
    const { result } = renderHook(() => useHasScrolled(50))

    scrollTo(120)
    scrollTo(10)

    expect(result.current).toBe(false)
  })

  it('starts out scrolled when the page is already down the document', () => {
    Object.defineProperty(window, 'scrollY', { value: 300, configurable: true })

    const { result } = renderHook(() => useHasScrolled(50))

    expect(result.current).toBe(true)
  })

  it('stops listening when the component leaves the page', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useHasScrolled(50))
    unmount()

    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListener.mockRestore()
  })
})
