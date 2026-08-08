import type { MenuChoice } from '../content/menuChoices'

export const rsvpEndpoint =
  'https://kj33lgaum3.execute-api.eu-north-1.amazonaws.com/api/registerMariage'

export type ConfirmedGuest = {
  name: string
  menuChoice: MenuChoice
  notes: string
}

export type SubmissionOutcome = 'success' | 'network-failure' | 'server-failure'

export async function submitConfirmations(guests: ConfirmedGuest[]): Promise<SubmissionOutcome> {
  let response: Response

  try {
    response = await fetch(rsvpEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guests }),
    })
  } catch {
    return 'network-failure'
  }

  return response.ok ? 'success' : 'server-failure'
}
