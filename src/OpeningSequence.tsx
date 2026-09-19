import { useState, useEffect, type CSSProperties, type ReactNode, type FC } from 'react'
import { LogoStrip, ToolLogo } from './TechLogos'

// ─── Tokens (clair / académique — aligné App) ─────────────────────────────
const D1 = '#F4F7FB'
const D2 = '#FFFFFF'
const D3 = '#EEF2F7'
const D4 = '#CBD5E1'
const OW = '#0F172A'
const SUB = '#334155'
const MUTED = '#64748B'
const ORANGE = '#F97300'
const BLUE = '#2563EB'
const EMERALD = '#10B981'
const VIOLET = '#8B5CF6'
const AMBER = '#F59E0B'
const E_BG = '#0D1117'
const E_BORD = '#21262D'
const ON_ACCENT = '#FFFFFF'

const display: CSSProperties = { fontFamily: "'Syne', system-ui, sans-serif" }
const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

function usePhase(delays: number[]) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const timers = delays.map((ms, i) =>
      setTimeout(() => setPhase(i + 1), ms)
    )
    return () => timers.forEach(clearTimeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return phase
}

function Fade({ show, children, className = '', style }: {
  show: boolean; children: ReactNode; className?: string; style?: CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

// ─── SCENE 01 — REGARDEZ AUTOUR DE VOUS ───────────────────────────────────
function Scene01LookAround() {
  const phase = usePhase([600, 1400, 2200, 3000, 3800, 4600, 5400, 6200, 7500])
  const entities = [
    { label: 'Étudiant', x: '8%', y: '18%' },
    { label: 'Enseignant', x: '72%', y: '14%' },
    { label: 'Cours', x: '18%', y: '72%' },
    { label: 'Salle', x: '78%', y: '68%' },
    { label: 'Ordinateur', x: '4%', y: '48%' },
    { label: 'Bibliothèque', x: '82%', y: '42%' },
    { label: 'Voiture', x: '42%', y: '8%' },
    { label: 'Smartphone', x: '55%', y: '78%' },
  ]

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 45%, ${ORANGE}14 0%, transparent 55%)`,
      }} />
      {/* Abstract silhouettes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <circle cx="200" cy="200" r="80" fill="none" stroke={OW} strokeWidth="1.5" />
        <rect x="1200" y="120" width="90" height="120" fill="none" stroke={OW} strokeWidth="1.5" rx="4" />
        <path d="M140 650 L180 580 L220 650 Z" fill="none" stroke={OW} strokeWidth="1.5" />
        <rect x="1280" y="620" width="140" height="90" fill="none" stroke={OW} strokeWidth="1.5" rx="6" />
        <circle cx="800" cy="780" r="40" fill="none" stroke={OW} strokeWidth="1.5" />
        <rect x="760" y="820" width="80" height="12" fill="none" stroke={OW} strokeWidth="1.5" />
      </svg>

      {entities.map((e, i) => (
        <div
          key={e.label}
          className="absolute mono text-sm tracking-widest uppercase"
          style={{
            ...mono,
            left: e.x,
            top: e.y,
            color: SUB,
            letterSpacing: '0.2em',
            opacity: phase > i ? 0.85 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          {e.label}
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
        <Fade show={phase >= 1} className="mb-8 flex justify-center">
          <LogoStrip kinds={['java', 'jdk', 'jvm', 'intellij']} size={44} gap={12} />
        </Fade>
        <h1
          className="font-bold leading-none tracking-tight"
          style={{
            ...display,
            fontSize: 'clamp(50px, 7.56vw, 97px)',
            color: OW,
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 1.2s ease',
            letterSpacing: '-0.03em',
          }}
        >
          REGARDEZ AUTOUR DE VOUS.
        </h1>

        <Fade show={phase >= 9} className="mt-16 max-w-3xl">
          <p
            className="font-bold leading-tight"
            style={{
              ...display,
              fontSize: 'clamp(30px, 3.46vw, 48px)',
              color: ORANGE,
              letterSpacing: '-0.02em',
            }}
          >
            LE MONDE EST FAIT<br />
            D&apos;ENTITÉS QUI ONT UN ÉTAT<br />
            ET UN COMPORTEMENT.
          </p>
        </Fade>
      </div>
    </div>
  )
}

// ─── SCENE 02 — THE REAL WORLD (campus) ───────────────────────────────────
function Scene02Campus() {
  const [active, setActive] = useState<string | null>(null)
  const phase = usePhase([400, 1200])

  const spots = [
    { id: 'etudiant', label: 'Étudiant', x: 22, y: 55, icon: (
      <g>
        <circle cx="0" cy="-18" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M-22 28 Q0 8 22 28" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
    )},
    { id: 'enseignant', label: 'Enseignant', x: 48, y: 38, icon: (
      <g>
        <circle cx="0" cy="-16" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M-20 26 Q0 6 20 26" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="-28" y="8" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
    )},
    { id: 'salle', label: 'Salle', x: 72, y: 48, icon: (
      <g>
        <rect x="-36" y="-28" width="72" height="52" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M-36 -28 L0 -48 L36 -28" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="-8" y="4" width="16" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
    )},
    { id: 'cours', label: 'Cours', x: 38, y: 68, icon: (
      <g>
        <rect x="-24" y="-20" width="48" height="40" fill="none" stroke="currentColor" strokeWidth="2" rx="2" />
        <line x1="-14" y1="-8" x2="14" y2="-8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="-14" y1="2" x2="10" y2="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="-14" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" />
      </g>
    )},
    { id: 'ordi', label: 'Ordinateur', x: 58, y: 62, icon: (
      <g>
        <rect x="-26" y="-18" width="52" height="32" fill="none" stroke="currentColor" strokeWidth="2" rx="2" />
        <line x1="-30" y1="18" x2="30" y2="18" stroke="currentColor" strokeWidth="2" />
      </g>
    )},
    { id: 'biblio', label: 'Bibliothèque', x: 85, y: 32, icon: (
      <g>
        <rect x="-30" y="-24" width="14" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="-12" y="-24" width="14" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="6" y="-24" width="14" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
    )},
  ]

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: D1 }}>
      {/* Campus atmosphere */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg, #E8F0FE 0%, #F4F7FB 45%, #EEF2F7 100%)
        `,
      }} />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `linear-gradient(${BLUE}08 1px, transparent 1px), linear-gradient(90deg, ${BLUE}08 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />
      {/* Horizon / ground plane */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%]" style={{
        background: `linear-gradient(180deg, transparent, ${D2}88 30%, ${D2})`,
        borderTop: `1px solid ${D4}`,
      }} />
      {/* Soft building silhouettes */}
      <svg className="absolute bottom-[38%] left-0 w-full h-[35%] opacity-40" viewBox="0 0 1600 300" preserveAspectRatio="none">
        <path d="M0 300 L0 180 L80 180 L80 100 L160 100 L160 180 L240 180 L240 60 L400 60 L400 180 L520 180 L520 40 L700 40 L700 180 L820 180 L820 90 L980 90 L980 180 L1100 180 L1100 50 L1300 50 L1300 180 L1450 180 L1450 120 L1600 120 L1600 300 Z"
          fill={D3} stroke={D4} strokeWidth="1" />
      </svg>

      {spots.map((s, i) => {
        const isOn = active === s.id
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(isOn ? null : s.id)}
            className="absolute flex flex-col items-center gap-2 cursor-pointer group"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: phase >= 1 ? 1 : 0,
              transition: `opacity 0.7s ease ${i * 0.12}s`,
              color: isOn ? ORANGE : SUB,
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            <div
              className="w-20 h-20 flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                border: `1.5px solid ${isOn ? ORANGE : D4}`,
                background: isOn ? `${ORANGE}18` : `${D2}aa`,
                boxShadow: isOn ? `0 0 40px ${ORANGE}44` : 'none',
              }}
            >
              <svg width="56" height="56" viewBox="-40 -50 80 90">{s.icon}</svg>
            </div>
            <span
              className="mono text-xs font-bold tracking-widest uppercase"
              style={{
                ...mono,
                color: isOn ? ORANGE : 'transparent',
                transition: 'color 0.3s',
                letterSpacing: '0.15em',
              }}
            >
              {s.label}
            </span>
          </button>
        )
      })}

      <Fade show={phase >= 2} className="absolute bottom-16 left-0 right-0 text-center px-12">
        <p
          className="font-bold leading-tight"
          style={{
            ...display,
            fontSize: 'clamp(33px, 4.1vw, 58px)',
            color: OW,
            letterSpacing: '-0.02em',
          }}
        >
          COMMENT REPRÉSENTER<br />
          <span style={{ color: ORANGE }}>CE MONDE DANS UN PROGRAMME ?</span>
        </p>
      </Fade>
    </div>
  )
}

// ─── SCENE 03 — TOO MUCH INFORMATION ──────────────────────────────────────
function Scene03Abstraction() {
  const [abstracted, setAbstracted] = useState(false)
  const phase = usePhase([500, 1400, 2800])

  const allAttrs = [
    { k: 'nom', keep: true },
    { k: 'âge', keep: false },
    { k: 'taille', keep: false },
    { k: 'adresse', keep: false },
    { k: 'couleur des yeux', keep: false },
    { k: 'matricule', keep: true },
    { k: 'moyenne', keep: true },
    { k: 'filière', keep: false },
    { k: 'niveau', keep: true },
    { k: 'présence', keep: false },
    { k: 'hobbies', keep: false },
    { k: 'nationalité', keep: false },
  ]
  const behaviors = ['sInscrire()', 'calculerMoyenne()', 'afficherProfil()']

  return (
    <div className="w-full h-full relative overflow-hidden flex" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 30% 50%, ${BLUE}15 0%, transparent 50%)`,
      }} />

      {/* Student silhouette */}
      <div className="w-[38%] h-full flex flex-col items-center justify-center relative">
        <svg width="180" height="280" viewBox="0 0 180 280" className="opacity-90">
          <circle cx="90" cy="60" r="42" fill="none" stroke={ORANGE} strokeWidth="2.5" />
          <path d="M30 260 Q30 140 90 120 Q150 140 150 260" fill="none" stroke={ORANGE} strokeWidth="2.5" />
          <circle cx="75" cy="55" r="4" fill={ORANGE} />
          <circle cx="105" cy="55" r="4" fill={ORANGE} />
          <path d="M75 75 Q90 85 105 75" fill="none" stroke={ORANGE} strokeWidth="2" />
        </svg>
        <p className="mono text-xs tracking-widest mt-4" style={{ ...mono, color: SUB }}>ÉTUDIANT</p>
      </div>

      {/* Attributes cloud */}
      <div className="flex-1 h-full flex flex-col justify-center pr-12 pl-4 relative">
        <div className="flex flex-wrap gap-3 mb-8 max-w-xl">
          {allAttrs.map((a, i) => {
            const fadeOut = abstracted && !a.keep
            const highlight = abstracted && a.keep
            return (
              <span
                key={a.k}
                className="mono text-sm px-3 py-1.5 rounded-lg"
                style={{
                  ...mono,
                  color: highlight ? ORANGE : fadeOut ? MUTED : SUB,
                  background: highlight ? `${ORANGE}18` : 'transparent',
                  border: `1px solid ${highlight ? ORANGE + '66' : D4}`,
                  opacity: fadeOut ? 0.15 : phase >= 1 ? 1 : 0,
                  transform: fadeOut ? 'scale(0.85)' : 'scale(1)',
                  transition: `all 0.7s ease ${i * 0.04}s`,
                  textDecoration: fadeOut ? 'line-through' : 'none',
                }}
              >
                {a.k}
              </span>
            )
          })}
        </div>

        <Fade show={phase >= 2 && !abstracted}>
          <button
            type="button"
            onClick={() => setAbstracted(true)}
            className="text-left mb-6 group"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <p
              className="font-bold leading-tight"
              style={{
                ...display,
                fontSize: 'clamp(36px, 3.78vw, 53px)',
                color: OW,
                letterSpacing: '-0.02em',
              }}
            >
              AVONS-NOUS BESOIN<br />
              <span style={{ color: ORANGE }}>DE TOUT CONNAÎTRE ?</span>
            </p>
            <p className="mono text-xs mt-3 tracking-widest" style={{ ...mono, color: MUTED }}>
              CLIQUER POUR ABSTRAIRE →
            </p>
          </button>
        </Fade>

        <Fade show={abstracted}>
          <div className="flex flex-wrap gap-3 mb-8">
            {behaviors.map((b) => (
              <span
                key={b}
                className="mono text-base px-4 py-2 rounded-lg font-bold"
                style={{
                  ...mono,
                  color: EMERALD,
                  background: `${EMERALD}14`,
                  border: `1px solid ${EMERALD}55`,
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <p
            className="font-bold leading-none mb-3"
            style={{ ...display, fontSize: 'clamp(58px, 6.48vw, 83px)', color: ORANGE, letterSpacing: '-0.03em' }}
          >
            ABSTRACTION.
          </p>
          <p style={{ color: SUB, fontSize: 25, maxWidth: 420 }}>
            Garder seulement les informations utiles à notre problème.
          </p>
        </Fade>
      </div>
    </div>
  )
}

// ─── SCENE 04 — REALITY → MODEL ───────────────────────────────────────────
function Scene04Model() {
  const phase = usePhase([400, 1600, 3200, 4800])

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 40%, ${VIOLET}12 0%, transparent 55%)`,
      }} />

      {/* Pipeline labels */}
      <div className="flex items-center gap-6 mb-12">
        {[
          { t: 'RÉALITÉ', p: 1 },
          { t: '→', p: 2 },
          { t: 'ABSTRACTION', p: 2 },
          { t: '→', p: 3 },
          { t: 'MODÈLE', p: 3 },
        ].map((s, i) => (
          <span
            key={i}
            className="mono font-bold tracking-widest"
            style={{
              ...mono,
              fontSize: s.t === '→' ? 20 : 14,
              color: phase >= s.p ? (s.t === 'MODÈLE' ? ORANGE : OW) : MUTED,
              transition: 'color 0.6s',
              letterSpacing: '0.12em',
            }}
          >
            {s.t}
          </span>
        ))}
      </div>

      {/* UML-inspired model */}
      <Fade show={phase >= 3}>
        <div
          className="overflow-hidden"
          style={{
            minWidth: 340,
            border: `2px solid ${ORANGE}`,
            boxShadow: `0 0 60px ${ORANGE}33`,
            background: D2,
          }}
        >
          <div className="px-8 py-4 text-center" style={{ background: ORANGE }}>
            <span className="mono font-black text-white tracking-widest" style={{ ...mono, fontSize: 30 }}>
              ETUDIANT
            </span>
          </div>
          <div className="px-8 py-4" style={{ borderBottom: `1.5px solid ${D4}` }}>
            {['nom', 'matricule', 'moyenne', 'niveau'].map((f) => (
              <div key={f} className="mono py-1.5" style={{ ...mono, color: BLUE, fontSize: 22 }}>
                {f}
              </div>
            ))}
          </div>
          <div className="px-8 py-4">
            {['sInscrire()', 'calculerMoyenne()', 'afficherProfil()'].map((m) => (
              <div key={m} className="mono py-1.5" style={{ ...mono, color: EMERALD, fontSize: 22 }}>
                {m}
              </div>
            ))}
          </div>
        </div>
      </Fade>

      <Fade show={phase >= 4} className="mt-14 text-center">
        <p
          className="font-bold leading-tight"
          style={{ ...display, fontSize: 'clamp(41px, 4.86vw, 67px)', color: OW, letterSpacing: '-0.02em' }}
        >
          NOUS VENONS DE CRÉER<br />
          <span style={{ color: ORANGE }}>UN MODÈLE.</span>
        </p>
      </Fade>
    </div>
  )
}

// ─── SCENE 05 — MODEL → JAVA ──────────────────────────────────────────────
function Scene05ModelToJava() {
  const phase = usePhase([500, 1400, 2200, 3000, 3800, 4600, 5600])

  const codeLines = [
    { show: 2, html: `<span style="color:#CC99CD">class</span> <span style="color:#DCDCAA">Etudiant</span> {` },
    { show: 3, html: `    <span style="color:#DCDCAA">String</span> nom;` },
    { show: 3, html: `    <span style="color:#DCDCAA">String</span> matricule;` },
    { show: 4, html: `    <span style="color:#DCDCAA">double</span> moyenne;` },
    { show: 4, html: `    <span style="color:#DCDCAA">int</span> niveau;` },
    { show: 5, html: `` },
    { show: 5, html: `    <span style="color:#CC99CD">void</span> <span style="color:#DCDCAA">afficherProfil</span>() {` },
    { show: 5, html: `        <span style="color:#6A9955;font-style:italic">// ...</span>` },
    { show: 5, html: `    }` },
    { show: 5, html: `` },
    { show: 5, html: `    <span style="color:#CC99CD">void</span> <span style="color:#DCDCAA">calculerMoyenne</span>() {` },
    { show: 5, html: `        <span style="color:#6A9955;font-style:italic">// ...</span>` },
    { show: 5, html: `    }` },
    { show: 2, html: `}` },
  ]

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{ background: D1 }}>
      <div className="flex-1 flex min-h-0">
        {/* Left — model */}
        <div className="w-[42%] flex flex-col items-center justify-center border-r" style={{ borderColor: D4 }}>
          <p className="mono text-xs tracking-widest mb-6" style={{ ...mono, color: MUTED }}>MODÈLE</p>
          <div style={{ minWidth: 260, border: `2px solid ${ORANGE}`, background: D2 }}>
            <div className="px-6 py-3 text-center" style={{
              background: phase >= 2 ? ORANGE : D3,
              transition: 'background 0.5s',
            }}>
              <span className="mono font-black text-white" style={{ ...mono, fontSize: 25 }}>ETUDIANT</span>
            </div>
            <div className="px-6 py-3" style={{ borderBottom: `1px solid ${D4}` }}>
              {[
                { f: 'nom', p: 3 },
                { f: 'matricule', p: 3 },
                { f: 'moyenne', p: 4 },
                { f: 'niveau', p: 4 },
              ].map((x) => (
                <div key={x.f} className="mono py-1" style={{
                  ...mono,
                  color: phase >= x.p ? BLUE : MUTED,
                  fontSize: 22,
                  transition: 'color 0.4s',
                  opacity: phase >= x.p ? 1 : 0.4,
                }}>{x.f}</div>
              ))}
            </div>
            <div className="px-6 py-3">
              {['afficherProfil()', 'calculerMoyenne()'].map((m) => (
                <div key={m} className="mono py-1" style={{
                  ...mono,
                  color: phase >= 5 ? EMERALD : MUTED,
                  fontSize: 22,
                  transition: 'color 0.4s',
                }}>{m}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — editor */}
        <div className="flex-1 flex flex-col p-8">
          <p className="mono text-xs tracking-widest mb-4" style={{ ...mono, color: MUTED }}>JAVA</p>
          <div className="flex-1 rounded-xl overflow-hidden flex flex-col" style={{ border: `1px solid ${E_BORD}`, background: E_BG }}>
            <div className="flex items-center h-9 px-4 shrink-0" style={{ background: '#161B22', borderBottom: `1px solid ${E_BORD}` }}>
              <span style={{ color: '#FF5F57', fontSize: 18 }}>●</span>
              <span className="ml-1" style={{ color: '#FFBD2E', fontSize: 18 }}>●</span>
              <span className="ml-1" style={{ color: '#28CA41', fontSize: 18 }}>●</span>
              <span className="mono text-xs ml-4" style={{ ...mono, color: '#8B949E', borderBottom: `2px solid ${ORANGE}`, paddingBottom: 6 }}>
                Etudiant.java
              </span>
            </div>
            <div className="flex-1 flex overflow-hidden">
              <div className="pt-3 pr-3 text-right select-none" style={{ width: 48, background: '#0A0F1A', borderRight: `1px solid ${E_BORD}` }}>
                {codeLines.map((_, i) => (
                  <div key={i} className="mono" style={{ ...mono, lineHeight: '2.1rem', fontSize: 20, color: '#3B4252' }}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1 py-3 pl-4">
                {codeLines.map((l, i) => (
                  <div
                    key={i}
                    className="mono whitespace-pre"
                    style={{
                      ...mono,
                      lineHeight: '2.1rem',
                      fontSize: 22,
                      color: '#D4D4D4',
                      opacity: phase >= l.show ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                    dangerouslySetInnerHTML={{ __html: l.html || '&nbsp;' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Fade show={phase >= 6} className="shrink-0 py-5 flex items-center justify-center gap-5"
        style={{ borderTop: `1px solid ${D4}`, background: D2 }}>
        {['REAL WORLD', '→', 'MODEL', '→', 'JAVA CLASS'].map((t, i) => (
          <span key={i} className="mono font-black tracking-widest" style={{
            ...mono,
            fontSize: t === '→' ? 14 : 13,
            color: t === 'JAVA CLASS' ? ORANGE : t === '→' ? MUTED : OW,
            letterSpacing: '0.1em',
          }}>{t}</span>
        ))}
      </Fade>
    </div>
  )
}

// ─── SCENE 06 — CLASS ≠ OBJECT ────────────────────────────────────────────
function Scene06ClassNotObject() {
  const phase = usePhase([800, 2800, 4200, 5600])

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 50%, ${ORANGE}10 0%, transparent 50%)`,
      }} />

      <Fade show={phase >= 1}>
        <p className="mono font-bold mb-10" style={{ ...mono, fontSize: 36, color: BLUE }}>
          class Etudiant
        </p>
      </Fade>

      <Fade show={phase >= 2} className="text-center mb-10">
        <p
          className="font-bold leading-tight"
          style={{ ...display, fontSize: 'clamp(46px, 5.4vw, 74px)', color: OW, letterSpacing: '-0.02em' }}
        >
          EST-CE DÉJÀ<br />UN ÉTUDIANT ?
        </p>
      </Fade>

      <Fade show={phase >= 3} className="text-center">
        <p
          className="font-bold leading-none mb-6"
          style={{ ...display, fontSize: 'clamp(74px, 10.8vw, 132px)', color: ORANGE, letterSpacing: '-0.04em' }}
        >
          NON.
        </p>
        <p className="mono font-bold tracking-widest mb-4" style={{ ...mono, fontSize: 25, color: OW, letterSpacing: '0.2em' }}>
          A CLASS IS A MODEL.
        </p>
        <p style={{ color: SUB, fontSize: 25, maxWidth: 480 }}>
          Une classe décrit comment seront construits les objets.
        </p>
      </Fade>
    </div>
  )
}

// ─── SCENE 07 — MODEL COMES ALIVE ─────────────────────────────────────────
function Scene07ObjectsAlive() {
  const phase = usePhase([600, 1800, 3000, 4200, 5600])

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center px-12" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 30%, ${EMERALD}10 0%, transparent 50%)`,
      }} />

      <Fade show={phase >= 1} className="mb-8">
        <p className="mono text-center" style={{ ...mono, fontSize: 27, color: SUB }}>
          <span style={{ color: BLUE }}>Etudiant</span>{' '}
          <span style={{ color: OW }}>e1</span>{' '}
          <span style={{ color: MUTED }}>=</span>{' '}
          <span style={{ color: ORANGE }}>new</span>{' '}
          <span style={{ color: BLUE }}>Etudiant</span>
          <span style={{ color: MUTED }}>();</span>
        </p>
      </Fade>

      <div className="flex items-center gap-10 mb-10">
        <Fade show={phase >= 1}>
          <div className="mono text-center px-5 py-3 rounded-lg" style={{
            ...mono, border: `1.5px dashed ${D4}`, color: SUB, fontSize: 22,
          }}>
            class Etudiant
          </div>
        </Fade>
        <Fade show={phase >= 2}>
          <span className="mono font-black" style={{ ...mono, color: ORANGE, fontSize: 32 }}>↓ new</span>
        </Fade>
        <Fade show={phase >= 3}>
          <div style={{
            minWidth: 280,
            border: `2px solid ${ORANGE}`,
            boxShadow: `0 0 48px ${ORANGE}44`,
            background: D2,
          }}>
            <div className="flex items-center justify-between px-5 py-2.5" style={{ background: ORANGE }}>
              <span className="mono font-black text-white" style={{ ...mono, fontSize: 22 }}>ETUDIANT</span>
              <span className="mono text-xs" style={{ ...mono, color: '#ffffff99' }}>e1</span>
            </div>
            {[
              ['nom', '"Sarra"'],
              ['matricule', '"E001"'],
              ['moyenne', '14.5'],
              ['niveau', '2'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between px-5 py-2.5" style={{ borderTop: `1px solid ${D4}` }}>
                <span className="mono" style={{ ...mono, color: BLUE, fontSize: 22 }}>{k}</span>
                <span className="mono font-bold" style={{ ...mono, color: OW, fontSize: 22 }}>{v}</span>
              </div>
            ))}
          </div>
        </Fade>
      </div>

      <Fade show={phase >= 4} className="flex items-center gap-8 mb-10">
        <p className="mono" style={{ ...mono, fontSize: 22, color: SUB }}>
          <span style={{ color: BLUE }}>Etudiant</span> <span style={{ color: OW }}>e2</span> = <span style={{ color: ORANGE }}>new</span> …
        </p>
        <div style={{ minWidth: 260, border: `2px solid ${BLUE}`, boxShadow: `0 0 32px ${BLUE}33`, background: D2 }}>
          <div className="flex items-center justify-between px-5 py-2" style={{ background: BLUE }}>
            <span className="mono font-black text-white" style={{ ...mono, fontSize: 22 }}>ETUDIANT</span>
            <span className="mono text-xs" style={{ ...mono, color: '#ffffff99' }}>e2</span>
          </div>
          {[
            ['nom', '"Yassine"'],
            ['matricule', '"E002"'],
            ['moyenne', '16.0'],
            ['niveau', '1'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between px-5 py-2" style={{ borderTop: `1px solid ${D4}` }}>
              <span className="mono" style={{ ...mono, color: BLUE, fontSize: 21 }}>{k}</span>
              <span className="mono font-bold" style={{ ...mono, color: OW, fontSize: 21 }}>{v}</span>
            </div>
          ))}
        </div>
      </Fade>

      <Fade show={phase >= 5} className="text-center">
        <p
          className="font-bold leading-tight"
          style={{ ...display, fontSize: 'clamp(41px, 4.86vw, 67px)', color: OW, letterSpacing: '-0.02em' }}
        >
          UNE CLASSE.<br />
          <span style={{ color: ORANGE }}>PLUSIEURS OBJETS.</span>
        </p>
      </Fade>
    </div>
  )
}

// ─── SCENE 08 — STATE + BEHAVIOR ──────────────────────────────────────────
function Scene08StateBehavior() {
  const phase = usePhase([600, 1800, 3200, 4600, 6000])
  const [moyenne, setMoyenne] = useState(12.0)

  useEffect(() => {
    if (phase < 4) return
    const t = setTimeout(() => setMoyenne(14.5), 400)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center gap-16 px-16" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 40% 50%, ${BLUE}12 0%, transparent 50%)`,
      }} />

      {/* Object */}
      <div style={{
        minWidth: 300,
        border: `2px solid ${ORANGE}`,
        boxShadow: phase >= 4 ? `0 0 56px ${ORANGE}55` : `0 0 24px ${ORANGE}22`,
        background: D2,
        transition: 'box-shadow 0.6s',
      }}>
        <div className="px-6 py-3" style={{ background: ORANGE }}>
          <span className="mono font-black text-white" style={{ ...mono, fontSize: 25 }}>e1 · ETUDIANT</span>
        </div>
        <div className="px-2 py-2" style={{ borderBottom: `1px solid ${D4}` }}>
          <p className="mono text-xs px-4 pt-2 pb-1 tracking-widest" style={{
            ...mono,
            color: phase >= 1 && phase < 3 ? AMBER : MUTED,
            letterSpacing: '0.15em',
            transition: 'color 0.4s',
          }}>
            STATE
          </p>
          {[
            ['nom', '"Sarra"'],
            ['moyenne', String(moyenne)],
            ['niveau', '2'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-2 mx-2 rounded-lg mb-1" style={{
              background: phase >= 1 && phase < 3 ? `${AMBER}14` : k === 'moyenne' && phase >= 4 ? `${EMERALD}22` : 'transparent',
              border: k === 'moyenne' && phase >= 4 ? `1px solid ${EMERALD}66` : '1px solid transparent',
              transition: 'all 0.5s',
            }}>
              <span className="mono" style={{ ...mono, color: BLUE, fontSize: 22 }}>{k}</span>
              <span className="mono font-bold" style={{
                ...mono,
                color: k === 'moyenne' && phase >= 4 ? EMERALD : OW,
                fontSize: 22,
              }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="px-2 py-2">
          <p className="mono text-xs px-4 pt-2 pb-1 tracking-widest" style={{
            ...mono,
            color: phase >= 2 ? EMERALD : MUTED,
            letterSpacing: '0.15em',
            transition: 'color 0.4s',
          }}>
            BEHAVIOR
          </p>
          {['afficherProfil()', 'calculerMoyenne()', 'sInscrire()'].map((m) => (
            <div key={m} className="mono px-4 py-2 mx-2 rounded-lg mb-1" style={{
              ...mono,
              color: m === 'calculerMoyenne()' && phase >= 4 ? ORANGE : EMERALD,
              fontSize: 22,
              background: m === 'calculerMoyenne()' && phase >= 3 ? `${ORANGE}18` : 'transparent',
              border: m === 'calculerMoyenne()' && phase >= 3 ? `1px solid ${ORANGE}55` : '1px solid transparent',
              transition: 'all 0.4s',
            }}>{m}</div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-md">
        <Fade show={phase >= 3}>
          <p className="mono" style={{ ...mono, fontSize: 25, color: SUB }}>
            <span style={{ color: OW }}>e1</span>
            <span style={{ color: MUTED }}>.</span>
            <span style={{ color: ORANGE }}>calculerMoyenne</span>
            <span style={{ color: MUTED }}>();</span>
          </p>
        </Fade>
        <Fade show={phase >= 5}>
          <p
            className="font-bold leading-tight"
            style={{ ...display, fontSize: 'clamp(36px, 4.32vw, 58px)', color: OW, letterSpacing: '-0.02em' }}
          >
            OBJECT<br />
            <span style={{ color: MUTED }}>=</span><br />
            <span style={{ color: AMBER }}>STATE</span>
            <span style={{ color: MUTED }}> + </span>
            <span style={{ color: EMERALD }}>BEHAVIOR</span>
            <span style={{ color: MUTED }}>.</span>
          </p>
        </Fade>
      </div>
    </div>
  )
}

// ─── SCENE 09 — OBJECTS COLLABORATE ───────────────────────────────────────
function Scene09Collaborate() {
  const phase = usePhase([500, 1400, 2400, 3600, 5000])

  const nodes = [
    { id: 'etudiant', label: 'Etudiant', x: 18, y: 42, c: ORANGE },
    { id: 'cours', label: 'Cours', x: 50, y: 28, c: BLUE },
    { id: 'enseignant', label: 'Enseignant', x: 82, y: 42, c: VIOLET },
    { id: 'salle', label: 'Salle', x: 50, y: 72, c: EMERALD },
  ]

  const edges = [
    { from: 'etudiant', to: 'cours', label: "s'inscrit à", p: 2 },
    { from: 'enseignant', to: 'cours', label: 'enseigne', p: 3 },
    { from: 'cours', to: 'salle', label: 'se déroule dans', p: 4 },
  ]

  const get = (id: string) => nodes.find(n => n.id === id)!

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 40%, ${BLUE}10 0%, transparent 55%)`,
      }} />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map((e) => {
          const a = get(e.from)
          const b = get(e.to)
          return (
            <g key={e.label} style={{ opacity: phase >= e.p ? 1 : 0, transition: 'opacity 0.8s' }}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={D4} strokeWidth="0.35" strokeDasharray="1.2 0.8"
              />
            </g>
          )
        })}
      </svg>

      {/* Edge labels (HTML for readability) */}
      {edges.map((e) => {
        const a = get(e.from)
        const b = get(e.to)
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        return (
          <div
            key={`lbl-${e.label}`}
            className="absolute mono text-xs px-2 py-1 rounded"
            style={{
              ...mono,
              left: `${mx}%`,
              top: `${my}%`,
              transform: 'translate(-50%, -50%)',
              color: SUB,
              background: `${D1}ee`,
              border: `1px solid ${D4}`,
              opacity: phase >= e.p ? 1 : 0,
              transition: 'opacity 0.8s',
              whiteSpace: 'nowrap',
              fontSize: 19,
            }}
          >
            {e.label}
          </div>
        )
      })}

      {nodes.map((n, i) => (
        <div
          key={n.id}
          className="absolute flex flex-col items-center"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: phase >= 1 ? 1 : 0,
            transition: `opacity 0.6s ${i * 0.1}s`,
          }}
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mono font-bold"
            style={{
              ...mono,
              border: `2px solid ${n.c}`,
              background: `${n.c}18`,
              boxShadow: `0 0 36px ${n.c}33`,
              color: n.c,
              fontSize: 21,
              letterSpacing: '0.04em',
            }}
          >
            {n.label}
          </div>
        </div>
      ))}

      <Fade show={phase >= 5} className="absolute bottom-14 left-0 right-0 text-center px-12">
        <p
          className="font-bold leading-tight"
          style={{ ...display, fontSize: 'clamp(32px, 3.78vw, 50px)', color: OW, letterSpacing: '-0.02em' }}
        >
          UN PROGRAMME ORIENTÉ OBJET<br />
          EST UN SYSTÈME D&apos;OBJETS<br />
          <span style={{ color: ORANGE }}>QUI COLLABORENT.</span>
        </p>
      </Fade>
    </div>
  )
}

// ─── SCENE 10 — STUDENT CHALLENGE (car) ───────────────────────────────────
function Scene10CarChallenge() {
  const [step, setStep] = useState(0) // 0 ask, 2 reveal, 3 code
  const [proposals, setProposals] = useState<string[]>([])
  const [input, setInput] = useState('')

  const suggestions = ['marque', 'couleur', 'vitesse', 'carburant', 'demarrer', 'accelerer', 'freiner']

  const addProposal = (v: string) => {
    const t = v.trim().toLowerCase()
    if (!t || proposals.includes(t)) return
    setProposals(p => [...p, t])
    setInput('')
  }

  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => setStep(3), 2800)
      return () => clearTimeout(t)
    }
  }, [step])

  return (
    <div className="w-full h-full relative overflow-hidden flex" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 25% 50%, ${AMBER}12 0%, transparent 50%)`,
      }} />

      {/* Car illustration */}
      <div className="w-[40%] h-full flex flex-col items-center justify-center relative z-10">
        <svg width="280" height="140" viewBox="0 0 280 140" className="mb-4">
          <path
            d="M40 90 L55 55 Q70 35 100 35 L170 35 Q200 35 215 55 L240 90"
            fill="none" stroke={ORANGE} strokeWidth="2.5"
          />
          <rect x="30" y="88" width="220" height="22" rx="4" fill="none" stroke={ORANGE} strokeWidth="2.5" />
          <circle cx="75" cy="112" r="18" fill="none" stroke={OW} strokeWidth="2.5" />
          <circle cx="205" cy="112" r="18" fill="none" stroke={OW} strokeWidth="2.5" />
          <circle cx="75" cy="112" r="7" fill={ORANGE} opacity="0.5" />
          <circle cx="205" cy="112" r="7" fill={ORANGE} opacity="0.5" />
          <path d="M100 38 L110 70 L165 70 L175 38" fill="none" stroke={BLUE} strokeWidth="1.5" />
          <line x1="48" y1="98" x2="62" y2="98" stroke={AMBER} strokeWidth="3" />
        </svg>
        <p className="mono text-xs tracking-widest" style={{ ...mono, color: MUTED }}>VOITURE</p>
      </div>

      <div className="flex-1 h-full flex flex-col justify-center pr-12 pl-4 relative z-10">
        {step === 0 && (
          <>
            <p
              className="font-bold leading-tight mb-8"
              style={{ ...display, fontSize: 'clamp(33px, 3.78vw, 50px)', color: OW, letterSpacing: '-0.02em' }}
            >
              SI VOUS DEVIEZ PROGRAMMER<br />
              <span style={{ color: ORANGE }}>CETTE VOITURE,</span><br />
              QUE GARDERIEZ-VOUS ?
            </p>
            <div className="flex gap-2 mb-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); addProposal(input) } }}
                placeholder="Votre proposition…"
                className="flex-1 mono text-sm px-4 py-3 rounded-xl outline-none"
                style={{
                  ...mono,
                  background: D2,
                  border: `1px solid ${D4}`,
                  color: OW,
                }}
              />
              <button
                type="button"
                onClick={() => addProposal(input)}
                className="px-5 py-3 rounded-xl mono text-sm font-bold"
                style={{ background: ORANGE, color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addProposal(s)}
                  className="mono text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    ...mono,
                    background: proposals.includes(s) ? `${ORANGE}22` : D3,
                    border: `1px solid ${proposals.includes(s) ? ORANGE : D4}`,
                    color: proposals.includes(s) ? ORANGE : SUB,
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            {proposals.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {proposals.map((p) => (
                  <span key={p} className="mono text-sm px-3 py-1 rounded-lg" style={{
                    ...mono, color: OW, background: D3, border: `1px solid ${D4}`,
                  }}>{p}</span>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="self-start mono text-xs font-bold tracking-widest px-6 py-3 rounded-xl"
              style={{
                ...mono,
                background: 'transparent',
                border: `1.5px solid ${ORANGE}`,
                color: ORANGE,
                cursor: 'pointer',
                letterSpacing: '0.12em',
              }}
            >
              RÉVÉLER LE MODÈLE →
            </button>
          </>
        )}

        {step >= 2 && step < 3 && (
          <div className="flex gap-12">
            <div>
              <p className="mono text-xs tracking-widest mb-4" style={{ ...mono, color: AMBER, letterSpacing: '0.15em' }}>STATE</p>
              {['marque', 'couleur', 'vitesse', 'carburant'].map((s) => (
                <div key={s} className="mono py-1.5" style={{ ...mono, color: BLUE, fontSize: 25 }}>{s}</div>
              ))}
            </div>
            <div>
              <p className="mono text-xs tracking-widest mb-4" style={{ ...mono, color: EMERALD, letterSpacing: '0.15em' }}>BEHAVIOR</p>
              {['demarrer()', 'accelerer()', 'freiner()', 'tourner()'].map((s) => (
                <div key={s} className="mono py-1.5" style={{ ...mono, color: EMERALD, fontSize: 25 }}>{s}</div>
              ))}
            </div>
          </div>
        )}

        {step >= 3 && (
          <div>
            <div className="rounded-xl overflow-hidden mb-8" style={{ border: `1px solid ${E_BORD}`, background: E_BG }}>
              <div className="px-4 py-2 mono text-xs" style={{ ...mono, color: '#8B949E', borderBottom: `1px solid ${E_BORD}` }}>
                Voiture.java
              </div>
              <pre className="mono p-5 text-sm leading-relaxed" style={{ ...mono, color: '#D4D4D4', margin: 0 }}>{`class Voiture {
    String marque;
    String couleur;
    double vitesse;

    void demarrer() { }
    void accelerer() { }
    void freiner() { }
}`}</pre>
            </div>
            <p
              className="font-bold leading-tight"
              style={{ ...display, fontSize: 'clamp(32px, 3.46vw, 48px)', color: OW, letterSpacing: '-0.02em' }}
            >
              VOUS VENEZ DE MODÉLISER<br />
              <span style={{ color: ORANGE }}>VOTRE PREMIÈRE CLASSE.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── SCENE 11 — WHY JAVA ──────────────────────────────────────────────────
function Scene11WhyJava() {
  const phase = usePhase([800, 2000, 3200, 4000, 4800, 5600, 6400, 7200, 8200])
  const keywords = [
    { t: 'class', p: 3, x: '12%', y: '22%' },
    { t: 'object', p: 4, x: '78%', y: '18%' },
    { t: 'new', p: 5, x: '10%', y: '70%' },
    { t: 'this', p: 6, x: '82%', y: '68%' },
    { t: 'private', p: 7, x: '18%', y: '45%' },
    { t: 'static', p: 8, x: '75%', y: '45%' },
  ]

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 50%, ${ORANGE}14 0%, transparent 45%)`,
      }} />

      <Fade show={phase >= 1} className="text-center mb-6">
        <p
          className="font-bold leading-tight"
          style={{ ...display, fontSize: 'clamp(30px, 3.24vw, 46px)', color: SUB, letterSpacing: '-0.01em' }}
        >
          NOUS AVONS LE MODÈLE.
        </p>
      </Fade>
      <Fade show={phase >= 2} className="text-center mb-14">
        <p
          className="font-bold leading-tight"
          style={{ ...display, fontSize: 'clamp(30px, 3.24vw, 46px)', color: SUB, letterSpacing: '-0.01em' }}
        >
          NOUS AVONS BESOIN<br />D&apos;UN LANGAGE POUR LE CODER.
        </p>
      </Fade>

      <Fade show={phase >= 3}>
        <div className="flex flex-col items-center gap-6">
          <ToolLogo kind="java" size={88} />
          <p
            className="font-bold leading-none relative z-10"
            style={{
              ...display,
              fontSize: 'clamp(110px, 19.44vw, 227px)',
              color: OW,
              letterSpacing: '-0.06em',
              textShadow: `0 0 80px ${ORANGE}55`,
            }}
          >
            JAVA
          </p>
          <LogoStrip kinds={['jdk', 'jvm', 'intellij']} size={48} gap={14} labels />
        </div>
      </Fade>

      {keywords.map((k) => (
        <span
          key={k.t}
          className="absolute mono font-bold"
          style={{
            ...mono,
            left: k.x,
            top: k.y,
            color: ORANGE,
            fontSize: 25,
            opacity: phase >= k.p ? 0.9 : 0,
            transition: 'opacity 0.7s',
            letterSpacing: '0.08em',
          }}
        >
          {k.t}
        </span>
      ))}

      <Fade show={phase >= 9} className="mt-14 text-center">
        <p style={{ color: SUB, fontSize: 27 }}>
          De la modélisation à l&apos;exécution.
        </p>
      </Fade>
    </div>
  )
}

// ─── SCENE 12 — COURSE PROMISE ────────────────────────────────────────────
function Scene12Promise() {
  const phase = usePhase([500, 1100, 1700, 2300, 2900, 3500, 4100, 5000, 6200, 7600])

  const roadmap = [
    'REAL WORLD',
    'ABSTRACTION',
    'MODEL',
    'CLASS',
    'OBJECT',
    'JAVA CODE',
    'RUNNING PROGRAM',
  ]

  return (
    <div className="w-full h-full relative overflow-hidden flex" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 70% 50%, ${ORANGE}10 0%, transparent 50%)`,
      }} />

      {/* Roadmap column */}
      <div className="w-[38%] h-full flex flex-col justify-center pl-14 gap-1">
        {roadmap.map((step, i) => (
          <div key={step} className="flex flex-col items-start">
            <span
              className="mono font-bold tracking-widest"
              style={{
                ...mono,
                fontSize: 21,
                letterSpacing: '0.14em',
                color: phase >= i + 1 ? (i === roadmap.length - 1 ? ORANGE : OW) : MUTED,
                transition: 'color 0.5s',
              }}
            >
              {step}
            </span>
            {i < roadmap.length - 1 && (
              <span
                className="mono ml-6 my-0.5"
                style={{
                  ...mono,
                  color: phase >= i + 2 ? ORANGE : MUTED,
                  fontSize: 22,
                  transition: 'color 0.5s',
                }}
              >
                ↓
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Right narrative */}
      <div className="flex-1 h-full flex flex-col justify-center pr-14 pl-8">
        <Fade show={phase >= 8 && phase < 10}>
          <p
            className="font-bold leading-tight mb-8"
            style={{ ...display, fontSize: 'clamp(36px, 4.1vw, 58px)', color: OW, letterSpacing: '-0.02em' }}
          >
            COMMENT PASSER<br />
            DU MONDE RÉEL<br />
            À UN PROGRAMME JAVA ?
          </p>
        </Fade>

        <Fade show={phase >= 9 && phase < 10}>
          <p
            className="font-bold leading-tight"
            style={{ ...display, fontSize: 'clamp(32px, 3.46vw, 48px)', color: ORANGE, letterSpacing: '-0.02em' }}
          >
            C&apos;EST EXACTEMENT<br />
            CE QUE NOUS ALLONS APPRENDRE.
          </p>
        </Fade>

        <Fade show={phase >= 10}>
          <div className="w-14 h-1.5 rounded mb-6" style={{ background: ORANGE }} />
          <p className="mono font-bold tracking-widest mb-3" style={{ ...mono, color: ORANGE, fontSize: 22, letterSpacing: '0.2em' }}>
            PROGRAMMATION ORIENTÉE OBJET
          </p>
          <p
            className="font-bold leading-none mb-6"
            style={{ ...display, fontSize: 'clamp(83px, 12.96vw, 148px)', color: OW, letterSpacing: '-0.05em' }}
          >
            JAVA
          </p>
          <p style={{ color: SUB, fontSize: 30, letterSpacing: '0.04em' }} className="mb-6">
            Comprendre. Modéliser. Coder.
          </p>
          <LogoStrip kinds={['java', 'jdk', 'jvm', 'intellij']} size={44} gap={12} labels />
          <p className="mono text-xs mt-10 tracking-widest" style={{ ...mono, color: MUTED, letterSpacing: '0.15em' }}>
            → CHAPITRE 01
          </p>
        </Fade>
      </div>
    </div>
  )
}

// ─── Export registry ──────────────────────────────────────────────────────
export const OPENING_SLIDES: { component: FC; chapter: string }[] = [
  { component: Scene01LookAround, chapter: 'Ouverture' },
  { component: Scene02Campus, chapter: 'Ouverture' },
  { component: Scene03Abstraction, chapter: 'Ouverture' },
  { component: Scene04Model, chapter: 'Ouverture' },
  { component: Scene05ModelToJava, chapter: 'Ouverture' },
  { component: Scene06ClassNotObject, chapter: 'Ouverture' },
  { component: Scene07ObjectsAlive, chapter: 'Ouverture' },
  { component: Scene08StateBehavior, chapter: 'Ouverture' },
  { component: Scene09Collaborate, chapter: 'Ouverture' },
  { component: Scene10CarChallenge, chapter: 'Ouverture' },
  { component: Scene11WhyJava, chapter: 'Ouverture' },
  { component: Scene12Promise, chapter: 'Ouverture' },
]
