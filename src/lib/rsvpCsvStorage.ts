import { appendGuestsToCsv, type ConfirmedGuest } from './guestsCsv'

const storageKey = 'mariage.presences.csv'

export function readConfirmationsCsv() {
  return localStorage.getItem(storageKey) ?? ''
}

export function appendConfirmations(guests: ConfirmedGuest[]) {
  localStorage.setItem(storageKey, appendGuestsToCsv(readConfirmationsCsv(), guests))
}
