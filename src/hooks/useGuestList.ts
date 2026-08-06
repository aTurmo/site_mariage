import { useRef, useState } from 'react'
import type { MenuChoice } from '../content/menuChoices'
import type { ConfirmedGuest } from '../lib/guestsCsv'

export type GuestDraft = {
  id: number
  name: string
  menuChoice: MenuChoice | null
  notes: string
}

export type GuestDraftChanges = Partial<Omit<GuestDraft, 'id'>>

function createGuestDraft(id: number): GuestDraft {
  return { id, name: '', menuChoice: null, notes: '' }
}

function toConfirmedGuests(guests: GuestDraft[]): ConfirmedGuest[] | null {
  const confirmedGuests: ConfirmedGuest[] = []

  for (const guest of guests) {
    const name = guest.name.trim()

    if (name === '' || guest.menuChoice === null) {
      return null
    }

    confirmedGuests.push({ name, menuChoice: guest.menuChoice, notes: guest.notes.trim() })
  }

  return confirmedGuests
}

export function useGuestList() {
  const lastGuestId = useRef(0)
  const [guests, setGuests] = useState<GuestDraft[]>(() => [createGuestDraft(0)])

  const addGuest = () => {
    lastGuestId.current += 1
    setGuests((currentGuests) => [...currentGuests, createGuestDraft(lastGuestId.current)])
  }

  const removeGuest = (id: number) => {
    setGuests((currentGuests) => currentGuests.filter((guest) => guest.id !== id))
  }

  const updateGuest = (id: number, changes: GuestDraftChanges) => {
    setGuests((currentGuests) =>
      currentGuests.map((guest) => (guest.id === id ? { ...guest, ...changes } : guest)),
    )
  }

  return { guests, confirmedGuests: toConfirmedGuests(guests), addGuest, removeGuest, updateGuest }
}
