import type { MenuChoice } from '../content/menuChoices'

export type ConfirmedGuest = {
  name: string
  menuChoice: MenuChoice
  notes: string
}

const csvHeader = 'nom,menu,precisions'

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`
}

function toCsvRow({ name, menuChoice, notes }: ConfirmedGuest) {
  return [name, menuChoice, notes].map(escapeCsvValue).join(',')
}

export function appendGuestsToCsv(existingCsv: string, guests: ConfirmedGuest[]) {
  const rows = guests.map(toCsvRow)
  const previousLines = existingCsv.trim() === '' ? [csvHeader] : [existingCsv.trimEnd()]

  return [...previousLines, ...rows].join('\n')
}
