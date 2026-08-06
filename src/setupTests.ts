import '@testing-library/jest-dom/vitest'

window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()
