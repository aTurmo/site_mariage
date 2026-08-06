import { appendGuestsToCsv } from './guestsCsv'

describe('appendGuestsToCsv', () => {
  it('starts the file with a header row', () => {
    const csv = appendGuestsToCsv('', [{ name: 'Camille', menuChoice: 'Vegan', notes: '' }])

    expect(csv).toBe('nom,menu,precisions\n"Camille","Vegan",""')
  })

  it('appends the new guests below the ones already recorded', () => {
    const existingCsv = 'nom,menu,precisions\n"Camille","Vegan",""'

    const csv = appendGuestsToCsv(existingCsv, [
      { name: 'Louis', menuChoice: 'Halal', notes: 'Arrive plus tard' },
      { name: 'Sarah', menuChoice: 'Omnivore', notes: '' },
    ])

    expect(csv).toBe(
      'nom,menu,precisions\n"Camille","Vegan",""\n"Louis","Halal","Arrive plus tard"\n"Sarah","Omnivore",""',
    )
  })

  it('keeps commas, quotes and line breaks inside a single quoted field', () => {
    const csv = appendGuestsToCsv('', [
      {
        name: 'Dupont, Jean',
        menuChoice: 'Omnivore',
        notes: 'Allergique aux "fruits à coque"\nEt au lactose',
      },
    ])

    expect(csv).toBe(
      'nom,menu,precisions\n"Dupont, Jean","Omnivore","Allergique aux ""fruits à coque""\nEt au lactose"',
    )
  })
})
