/**
 * Style amphi / vidéoprojecteur — référence diapo 3
 * À utiliser pour toute typo lisible du fond de salle.
 */
import type { CSSProperties } from 'react'

export const AMPHI = {
  kicker: 18,
  title: 48,
  slogan: 28,
  body: 24,
  card: 22,
  label: 20,
  btn: 20,
  border: 3,
  borderStrong: 4,
} as const

export const AMPHI_COLORS = {
  bg: '#F4F7FB',
  surface: '#FFFFFF',
  text: '#0F172A',
  secondary: '#334155',
  muted: '#64748B',
  orange: '#F97300',
  blue: '#2563EB',
  emerald: '#10B981',
  border: '#CBD5E1',
} as const

export const displayFont: CSSProperties = { fontFamily: "'Syne', system-ui, sans-serif" }
export const monoFont: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

export function amphiKicker(color: string = AMPHI_COLORS.orange): CSSProperties {
  return {
    ...monoFont,
    color,
    fontSize: AMPHI.kicker,
    letterSpacing: '0.14em',
    fontWeight: 900,
  }
}

export function amphiTitle(light = false): CSSProperties {
  return {
    ...displayFont,
    fontSize: AMPHI.title,
    color: light ? '#FFFFFF' : AMPHI_COLORS.text,
    letterSpacing: '-0.03em',
    fontWeight: 900,
    lineHeight: 1.05,
  }
}

export function amphiBody(strong = true): CSSProperties {
  return {
    color: strong ? AMPHI_COLORS.text : AMPHI_COLORS.secondary,
    fontSize: AMPHI.body,
    fontWeight: strong ? 800 : 700,
    lineHeight: 1.35,
  }
}

export function amphiCard(accent = AMPHI_COLORS.orange): CSSProperties {
  return {
    background: AMPHI_COLORS.surface,
    border: `${AMPHI.borderStrong}px solid ${accent}`,
    borderRadius: 16,
  }
}

export function amphiBtn(active: boolean, accent = AMPHI_COLORS.orange): CSSProperties {
  return {
    ...monoFont,
    fontSize: AMPHI.btn,
    fontWeight: 900,
    background: active ? accent : AMPHI_COLORS.surface,
    color: active ? '#FFFFFF' : AMPHI_COLORS.text,
    border: `${AMPHI.border}px solid ${active ? accent : AMPHI_COLORS.text}`,
    borderRadius: 12,
    cursor: 'pointer',
    padding: '12px 20px',
  }
}
