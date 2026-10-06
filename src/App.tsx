import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { RefObject, TouchEvent } from 'react'
import { SLIDES, CHAPTERS } from './course/slides'
import { SlideView, Rich } from './course/ui'
import type { Slide } from './course/types'

const STAGE_W = 1920
const STAGE_H = 1080

function readHash(): number {
  const n = parseInt(window.location.hash.replace(/[^0-9]/g, ''), 10)
  return Number.isFinite(n) && n >= 1 && n <= SLIDES.length ? n - 1 : 0
}

function useStageScale(ref: RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setScale(Math.max(0.1, Math.min(r.width / STAGE_W, r.height / STAGE_H)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return scale
}

function NotesBody({ n }: { n: NonNullable<Slide['notes']> }) {
  const rows: [string, string | undefined][] = [
    ['Objectif', n.objectif],
    ['Question orale', n.question],
    ['Réponse attendue', n.reponse],
    ['Conseil', n.conseil],
    ['Transition', n.transition],
    ['Durée estimée', n.duree ? `≈ ${n.duree} min` : undefined],
  ]
  return (
    <dl className="notes-body">
      {rows.map(([k, v]) => v ? <div key={k}><dt>{k}</dt><dd>{v}</dd></div> : null)}
    </dl>
  )
}

export default function App() {
  const [current, setCurrent] = useState(readHash)
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set())
  const [overview, setOverview] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [printing, setPrinting] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const scale = useStageScale(wrapRef)
  const total = SLIDES.length

  const go = useCallback((i: number) => setCurrent(Math.max(0, Math.min(total - 1, i))), [total])
  const toggleReveal = useCallback((i: number) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }, [])

  // URL #numéro ⇄ diapo courante
  useEffect(() => {
    const target = `#${current + 1}`
    if (window.location.hash !== target) window.history.replaceState(null, '', target)
  }, [current])
  useEffect(() => {
    const onHash = () => setCurrent(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])

  const printAll = useCallback(() => {
    setPrinting(true)
    setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 300)
  }, [])

  // Clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key
      if (overview) {
        if (k === 'Escape' || k === 'o' || k === 'O') setOverview(false)
        return
      }
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); go(current + 1) }
      else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); go(current - 1) }
      else if (k === 'Home') go(0)
      else if (k === 'End') go(total - 1)
      else if (k === 's' || k === 'S') toggleReveal(current)
      else if (k === 'o' || k === 'O') setOverview(true)
      else if (k === 'n' || k === 'N') setNotesOpen(v => !v)
      else if (k === 'f' || k === 'F') toggleFullscreen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, go, overview, toggleReveal, toggleFullscreen, total])

  // Balayage tactile
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 60) go(current + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

  const chapterStarts = useMemo(
    () => CHAPTERS.map(c => ({ ...c, start: SLIDES.findIndex(s => s.chapter === c.id) })),
    [],
  )
  const currentChapter = SLIDES[current].chapter

  return (
    <div className="shell">
      <div className="stage-wrap" ref={wrapRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="stage-outer" style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
          <div className="stage" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}>
            <SlideView
              slide={SLIDES[current]}
              index={current}
              total={total}
              revealed={revealed.has(current)}
              onReveal={() => toggleReveal(current)}
            />
          </div>
        </div>
      </div>

      <nav className="navbar">
        <button className="nav-btn" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Diapo précédente">←</button>
        <span className="nav-count">{current + 1} / {total}</span>
        <button className="nav-btn" onClick={() => go(current + 1)} disabled={current === total - 1} aria-label="Diapo suivante">→</button>
        <div className="nav-chapters">
          {chapterStarts.map(c => (
            <button
              key={c.id}
              className={`nav-chap ${c.id === currentChapter ? 'active' : ''}`}
              onClick={() => go(c.start)}
              title={c.label}
            >
              {c.short}
            </button>
          ))}
        </div>
        <div className="nav-tools">
          <button className="nav-tool" onClick={() => setOverview(true)} title="Plan (touche O)">Plan</button>
          <button className="nav-tool" onClick={toggleFullscreen} title="Plein écran (touche F)">Plein écran</button>
          <button className="nav-tool" onClick={printAll} title="Imprimer / enregistrer en PDF">PDF</button>
        </div>
        <div className="nav-progress" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </nav>

      {notesOpen && (
        <aside className="notes-panel print-hide" aria-label="Notes enseignant">
          <div className="notes-head">
            <span>Notes · diapo {current + 1}</span>
            <button className="nav-tool" onClick={() => setNotesOpen(false)}>Fermer (N)</button>
          </div>
          {SLIDES[current].notes ? <NotesBody n={SLIDES[current].notes!} /> : <p className="notes-empty">Pas de notes pour cette diapo.</p>}
        </aside>
      )}

      {overview && (
        <div className="overview" onClick={() => setOverview(false)}>
          <div className="overview-panel" onClick={e => e.stopPropagation()}>
            <div className="overview-head">
              <h2>Plan du cours</h2>
              <button className="nav-tool" onClick={() => setOverview(false)}>Fermer</button>
            </div>
            <div className="overview-cols">
              {CHAPTERS.map(c => (
                <div key={c.id} className="overview-chap">
                  <h3>{c.label}</h3>
                  <ol>
                    {SLIDES.map((s, i) => s.chapter !== c.id ? null : (
                      <li key={i} className={i === current ? 'active' : ''}>
                        <button onClick={() => { go(i); setOverview(false) }}>
                          <span className="ov-n">{i + 1}</span>
                          <span className="ov-t"><Rich text={s.title} /></span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {printing && (
        <div className="print-root">
          {SLIDES.map((s, i) => (
            <div className="print-page" key={i}>
              <SlideView slide={s} index={i} total={total} revealed onReveal={() => {}} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
