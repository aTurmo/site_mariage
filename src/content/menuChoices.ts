export const menuChoices = ['Omnivore', 'Halal', 'Vegan'] as const

export type MenuChoice = (typeof menuChoices)[number]
