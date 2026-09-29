/**
 * Notes enseignant + types partagés pour le storytelling introductif.
 */
import type { FC } from 'react'

export type TeachingNote = {
  title: string
  teachingGoal: string
  speakerNotes: string
  question: string
  expectedAnswer: string
  transition: string
  estimatedMinutes: number
}

export type CourseSlide = {
  component: FC
  chapter: string
  id: string
  notes?: TeachingNote
}

export const TEACHER_SHORTCUT = 'N'
