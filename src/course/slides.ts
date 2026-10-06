import type { Chapter, Slide } from './types'
import { INTRO, CH1 } from './ch1'
import { CH2 } from './ch2'
import { CH3 } from './ch3'
import { CH4 } from './ch4'
import { CH5 } from './ch5'
import { NOTES } from './notes'

export const CHAPTERS: Chapter[] = [
  { id: 'intro', label: 'Accueil', short: 'Accueil' },
  { id: 'ch1', label: 'Chapitre 1 · Introduction au langage Java', short: 'Ch. 1 Introduction' },
  { id: 'ch2', label: 'Chapitre 2 · Classes et objets', short: 'Ch. 2 Classes & objets' },
  { id: 'ch3', label: 'Chapitre 3 · Héritage, classes abstraites et interfaces', short: 'Ch. 3 Héritage & interfaces' },
  { id: 'ch4', label: 'Chapitre 4 · Les exceptions', short: 'Ch. 4 Exceptions' },
  { id: 'ch5', label: 'Chapitre 5 · Collections et génériques', short: 'Ch. 5 Collections' },
]

const LABEL: Record<string, string> = Object.fromEntries(CHAPTERS.map(c => [c.id, c.label]))
export const chapterLabel = (id: string) => LABEL[id] ?? id

/** Titre sans mise en forme (**gras**, `code`) : sert de clé pour les notes. */
export const plainTitle = (t: string) => t.replace(/\*\*|`/g, '')

export const SLIDES: Slide[] = [...INTRO, ...CH1, ...CH2, ...CH3, ...CH4, ...CH5].map(s => {
  const notes = NOTES[`${s.chapter}|${plainTitle(s.title)}`]
  return notes ? { ...s, notes } : s
})
