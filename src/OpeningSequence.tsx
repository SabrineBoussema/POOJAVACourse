import { useState, useEffect, type CSSProperties, type ReactNode, type FC } from 'react'
import { LogoStrip, ToolLogo } from './TechLogos'
import { hi } from './syntaxHighlight'

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

function isPrintMode() {
  return typeof document !== 'undefined' && document.documentElement.dataset.printing === '1'
}

function usePhase(delays: number[]) {
  const printing = isPrintMode()
  const [phase, setPhase] = useState(printing ? delays.length : 0)
  useEffect(() => {
    if (isPrintMode()) {
      setPhase(delays.length)
      return
    }
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
  const printing = isPrintMode()
  if (printing && !show) return null
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        transition: printing ? 'none' : 'opacity 0.9s ease, transform 0.9s ease',
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
  const [active, setActive] = useState<string | null>(null)
  const entities = [
    {
      label: 'Étudiant', x: '8%', y: '18%',
      etat: ['nom', 'matricule', 'moyenne'],
      comp: ['sInscrire()', 'calculerMoyenne()', 'afficherProfil()'],
    },
    {
      label: 'Voiture', x: '42%', y: '8%',
      etat: ['couleur', 'vitesse', 'carburant'],
      comp: ['demarrer()', 'accelerer()', 'freiner()'],
    },
    {
      label: 'Enseignant', x: '72%', y: '14%',
      etat: ['nom', 'spécialité', 'département'],
      comp: ['enseigner()', 'evaluer()', 'publierNote()'],
    },
    { label: 'Cours', x: '18%', y: '72%', etat: ['titre', 'crédits'], comp: ['ouvrir()', 'evaluer()'] },
    { label: 'Salle', x: '78%', y: '68%', etat: ['numero', 'capacite'], comp: ['reserver()'] },
    { label: 'Ordinateur', x: '4%', y: '48%', etat: ['marque', 'ram'], comp: ['demarrer()', 'eteindre()'] },
    { label: 'Bibliothèque', x: '82%', y: '42%', etat: ['nom', 'nbLivres'], comp: ['emprunter()'] },
    { label: 'Smartphone', x: '55%', y: '78%', etat: ['modele', 'batterie'], comp: ['appeler()', 'charger()'] },
  ]
  const selected = entities.find(e => e.label === active)

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 45%, ${ORANGE}14 0%, transparent 55%)`,
      }} />

      {entities.map((e, i) => (
        <button
          key={e.label}
          type="button"
          onClick={() => setActive(active === e.label ? null : e.label)}
          className="absolute mono tracking-widest uppercase"
          style={{
            ...mono,
            left: e.x,
            top: e.y,
            color: active === e.label ? ORANGE : SUB,
            letterSpacing: '0.14em',
            opacity: phase > i ? 0.95 : 0,
            transition: 'opacity 1s ease, color 0.3s',
            background: active === e.label ? ORANGE + '18' : 'transparent',
            border: `2.5px solid ${active === e.label ? ORANGE : D4}`,
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: 18,
            fontWeight: 900,
            cursor: 'pointer',
          }}
        >
          {e.label}
        </button>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center pointer-events-none">
        <Fade show={phase >= 1} className="mb-6 flex justify-center pointer-events-auto">
          <LogoStrip kinds={['java', 'jdk', 'jvm', 'intellij']} size={44} gap={12} />
        </Fade>
        <h1
          className="font-bold leading-none tracking-tight"
          style={{
            ...display,
            fontSize: 'clamp(44px, 6.5vw, 84px)',
            color: OW,
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 1.2s ease',
            letterSpacing: '-0.03em',
          }}
        >
          REGARDEZ AUTOUR DE VOUS.
        </h1>
        <Fade show={phase >= 2} className="mt-4">
          <p className="mono font-black" style={{ ...mono, color: ORANGE, fontSize: 18, letterSpacing: '0.12em' }}>
            TOUT EST DÉJÀ UN OBJET QUI ATTEND D&apos;ÊTRE MODÉLISÉ.
          </p>
        </Fade>

        <Fade show={phase >= 9 && !selected} className="mt-10 max-w-3xl">
          <p
            className="font-bold leading-tight"
            style={{
              ...display,
              fontSize: 'clamp(26px, 3vw, 40px)',
              color: OW,
              letterSpacing: '-0.02em',
            }}
          >
            LE MONDE EST FAIT D&apos;ENTITÉS.<br />
            CHAQUE ENTITÉ = <span style={{ color: BLUE }}>ÉTAT</span> + <span style={{ color: EMERALD }}>COMPORTEMENT</span>.
          </p>
          <p className="mono mt-3 font-bold" style={{ ...mono, color: ORANGE, fontSize: 20 }}>
            À VOUS → cliquez une entité. Nommez état + comportement à voix haute.
          </p>
        </Fade>
      </div>

      {selected && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 rounded-2xl p-5 pointer-events-auto"
          style={{ background: D2, border: `2px solid ${ORANGE}`, boxShadow: '0 16px 48px rgba(15,23,42,0.12)', minWidth: 380 }}>
          <p className="mono font-black mb-1" style={{ ...mono, color: ORANGE, fontSize: 24 }}>{selected.label.toUpperCase()}</p>
          <p className="mono font-black mb-3" style={{ ...mono, color: MUTED, fontSize: 20 }}>ce qu&apos;elle EST + ce qu&apos;elle FAIT</p>
          <div className="flex gap-8">
            <div>
              <p className="mono font-black mb-2" style={{ ...mono, color: BLUE, fontSize: 20, letterSpacing: '0.12em' }}>ÉTAT</p>
              {selected.etat.map(a => <p key={a} className="mono font-black" style={{ ...mono, color: OW, fontSize: 22 }}>{a}</p>)}
            </div>
            <div>
              <p className="mono font-black mb-2" style={{ ...mono, color: EMERALD, fontSize: 20, letterSpacing: '0.12em' }}>COMPORTEMENT</p>
              {selected.comp.map(a => <p key={a} className="mono font-black" style={{ ...mono, color: OW, fontSize: 22 }}>{a}</p>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SCENE 02 — COMMENT REPRÉSENTER CE MONDE ──────────────────────────────
function Scene02Campus() {
  const phase = usePhase([400, 1200, 2200, 3400, 4800])
  const [revealed, setRevealed] = useState(isPrintMode())
  const [vote, setVote] = useState<string | null>(isPrintMode() ? 'c' : null)
  const showAnswer = revealed || phase >= 5 || isPrintMode()

  const steps = [
    { label: 'RÉEL', sub: 'humain', color: OW },
    { label: 'FILTRE', sub: 'utile seulement', color: BLUE },
    { label: 'DONNÉES', sub: 'nom, notes…', color: VIOLET },
    { label: 'MODÈLE', sub: 'contrat logiciel', color: ORANGE },
  ]

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col px-10 py-8" style={{ background: D1 }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 30%, ${BLUE}14 0%, transparent 55%)`,
      }} />

      <div className="relative z-10 shrink-0 mb-5">
        <p className="mono font-black tracking-widest mb-2" style={{ ...mono, color: ORANGE, fontSize: 20, letterSpacing: '0.16em' }}>
          VÉRITÉ INFORMATIQUE
        </p>
        <h2 className="font-black leading-none" style={{ ...display, fontSize: 44, color: OW, letterSpacing: '-0.03em', maxWidth: 1200 }}>
          L&apos;ORDINATEUR NE CONNAÎT PAS<br />
          <span style={{ color: ORANGE }}>« UN ÉTUDIANT ».</span>
        </h2>
        <p className="font-black mt-3" style={{ ...display, fontSize: 28, color: SUB }}>
          Il ne manipule que des <span style={{ color: BLUE }}>données</span> + des <span style={{ color: BLUE }}>instructions</span>.
        </p>
      </div>

      <div className="relative z-10 flex items-stretch gap-3 mb-6 shrink-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3 flex-1 min-w-0">
            <Fade show={phase >= i + 1} className="flex-1">
              <div className="rounded-2xl px-4 py-5 text-center h-full"
                style={{ background: D2, border: `4px solid ${s.color}` }}>
                <p className="font-black" style={{ ...display, color: s.color, fontSize: 28 }}>{s.label}</p>
                <p className="mono font-black mt-2" style={{ ...mono, color: OW, fontSize: 18 }}>{s.sub}</p>
              </div>
            </Fade>
            {i < steps.length - 1 && (
              <Fade show={phase >= i + 2} className="shrink-0">
                <span className="mono font-black" style={{ ...mono, color: ORANGE, fontSize: 32 }}>→</span>
              </Fade>
            )}
          </div>
        ))}
      </div>

      <Fade show={phase >= 4} className="relative z-10 flex-1 flex flex-col min-h-0">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="text-left mb-4"
          style={{ background: 'none', border: 'none', cursor: showAnswer ? 'default' : 'pointer', padding: 0 }}
        >
          <p className="font-black leading-tight" style={{ ...display, fontSize: 32, color: OW }}>
            QUESTION — comment passer du réel<br />
            à quelque chose <span style={{ color: ORANGE }}>manipulable par un programme</span> ?
          </p>
          {!showAnswer && (
            <p className="mono font-black mt-3" style={{ ...mono, color: ORANGE, fontSize: 20 }}>
              CLIQUER POUR RÉVÉLER →
            </p>
          )}
        </button>

        {showAnswer && (
          <div className="flex gap-5 flex-1 min-h-0">
            <div className="flex-1 rounded-2xl p-6 flex flex-col justify-center"
              style={{ background: OW }}>
              <p className="font-black leading-none mb-3" style={{ ...display, fontSize: 40, color: ORANGE }}>
                EN CRÉANT UN MODÈLE.
              </p>
              <p className="mono font-black" style={{ ...mono, color: '#fff', fontSize: 22 }}>
                PAS DE MODÈLE → PAS DE PROGRAMME FIABLE
              </p>
            </div>

            <div className="flex-1 rounded-2xl p-5 flex flex-col"
              style={{ background: D2, border: `4px solid ${ORANGE}` }}>
              <p className="mono font-black mb-2" style={{ ...mono, color: ORANGE, fontSize: 18, letterSpacing: '0.12em' }}>
                À VOUS
              </p>
              <p className="font-black mb-4 leading-tight" style={{ ...display, fontSize: 26, color: OW }}>
                Sans modèle, que fait le programmeur ?
              </p>
              <div className="flex flex-col gap-2.5 mb-3">
                {[
                  { id: 'a', label: 'Il tape au hasard' },
                  { id: 'b', label: 'Il copie sans comprendre' },
                  { id: 'c', label: 'Les deux — et ça casse' },
                ].map(c => (
                  <button key={c.id} type="button" onClick={() => setVote(c.id)}
                    className="px-4 py-3 rounded-xl mono font-black text-left"
                    style={{
                      ...mono, fontSize: 22,
                      background: vote === c.id ? ORANGE : D3,
                      color: vote === c.id ? '#fff' : OW,
                      border: `3px solid ${vote === c.id ? ORANGE : OW}`,
                    }}>
                    {c.label}
                  </button>
                ))}
              </div>
              {(vote || isPrintMode()) && (
                <p className="font-black" style={{ color: OW, fontSize: 22 }}>
                  Exact. <span style={{ color: ORANGE }}>D’abord le modèle. Ensuite le code.</span>
                </p>
              )}
            </div>
          </div>
        )}
      </Fade>
    </div>
  )
}

// ─── SCENE 03 — ABSTRACTION + CONTEXTES ───────────────────────────────────
type AbsContext = 'notes' | 'biblio' | 'presence'

function Scene03Abstraction() {
  const [abstracted, setAbstracted] = useState(false)
  const [ctx, setCtx] = useState<AbsContext>('notes')
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
  const contexts: { id: AbsContext; label: string; attrs: string[] }[] = [
    { id: 'notes', label: 'Gestion des notes', attrs: ['nom', 'matricule', 'moyenne', 'niveau'] },
    { id: 'biblio', label: 'Bibliothèque', attrs: ['nom', 'matricule', 'nombreLivresEmpruntes'] },
    { id: 'presence', label: 'Présence', attrs: ['nom', 'matricule', 'nombreAbsences'] },
  ]
  const activeCtx = contexts.find(c => c.id === ctx)!

  return (
    <div className="w-full h-full relative overflow-hidden flex" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 30% 50%, ${BLUE}15 0%, transparent 50%)`,
      }} />

      <div className="w-[34%] h-full flex flex-col items-center justify-center relative">
        <svg width="160" height="240" viewBox="0 0 180 280" className="opacity-90">
          <circle cx="90" cy="60" r="42" fill="none" stroke={ORANGE} strokeWidth="2.5" />
          <path d="M30 260 Q30 140 90 120 Q150 140 150 260" fill="none" stroke={ORANGE} strokeWidth="2.5" />
          <circle cx="75" cy="55" r="4" fill={ORANGE} />
          <circle cx="105" cy="55" r="4" fill={ORANGE} />
          <path d="M75 75 Q90 85 105 75" fill="none" stroke={ORANGE} strokeWidth="2" />
        </svg>
        <p className="mono text-xs tracking-widest mt-4" style={{ ...mono, color: SUB }}>ÉTUDIANT</p>
        <Fade show={abstracted} className="mt-6 px-4 text-center">
          <p className="mono" style={{ ...mono, color: MUTED, fontSize: 18 }}>réalité complexe → filtre → utiles</p>
        </Fade>
      </div>

      <div className="flex-1 h-full flex flex-col justify-center pr-10 pl-2 relative overflow-hidden">
        <div className="flex flex-wrap gap-2.5 mb-6 max-w-xl">
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
                  opacity: fadeOut ? 0.12 : phase >= 1 ? 1 : 0,
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
            className="text-left mb-4"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <p className="font-bold leading-tight" style={{
              ...display, fontSize: 'clamp(28px, 3.2vw, 42px)', color: OW, letterSpacing: '-0.02em',
            }}>
              Notre app gère les résultats.<br />
              <span style={{ color: ORANGE }}>Avons-nous besoin de tout ?</span>
            </p>
            <p className="mono text-xs mt-3 tracking-widest" style={{ ...mono, color: MUTED }}>
              CLIQUER POUR ABSTRAIRE →
            </p>
          </button>
        </Fade>

        <Fade show={abstracted}>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {behaviors.map((b) => (
              <span key={b} className="mono text-base px-3 py-1.5 rounded-lg font-bold" style={{
                ...mono, color: EMERALD, background: `${EMERALD}14`, border: `1px solid ${EMERALD}55`,
              }}>{b}</span>
            ))}
          </div>
          <p className="font-bold leading-none mb-2" style={{ ...display, fontSize: 48, color: ORANGE, letterSpacing: '-0.03em' }}>
            ABSTRACTION
          </p>
          <p className="mono font-black mb-3" style={{ ...mono, color: BLUE, fontSize: 20, letterSpacing: '0.06em' }}>
            GARDER L’UTILE. JETER LE RESTE. POUR CE PROBLÈME.
          </p>
          <p style={{ color: SUB, fontSize: 18, maxWidth: 440, marginBottom: 14 }}>
            Garder uniquement informations + comportements utiles à NOTRE problème.
          </p>

          <div className="flex gap-2 mb-4 flex-wrap">
            {contexts.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCtx(c.id)}
                className="mono font-bold px-3 py-2 rounded-xl"
                style={{
                  ...mono, fontSize: 18,
                  background: ctx === c.id ? ORANGE : D3,
                  color: ctx === c.id ? ON_ACCENT : SUB,
                  border: `3px solid ${ctx === c.id ? ORANGE : D4}`,
                  cursor: 'pointer',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {activeCtx.attrs.map(a => (
              <span key={a} className="mono px-3 py-1.5 rounded-lg font-bold" style={{
                ...mono, color: BLUE, background: BLUE + '14', border: `1px solid ${BLUE}44`, fontSize: 20,
              }}>{a}</span>
            ))}
          </div>
          <p className="font-black leading-tight" style={{ ...display, fontSize: 22, color: OW }}>
            UNE MÊME ENTITÉ RÉELLE<br />
            <span style={{ color: ORANGE }}>≠ UN SEUL MODÈLE.</span>
          </p>
          <p className="mono font-black mt-2" style={{ ...mono, color: MUTED, fontSize: 18 }}>
            Changez de contexte ci-dessus → le modèle change. Retenez ça.
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

      <Fade show={phase >= 4} className="mt-12 text-center px-8">
        <p
          className="font-bold leading-tight mb-3"
          style={{ ...display, fontSize: 'clamp(34px, 4.2vw, 56px)', color: OW, letterSpacing: '-0.02em' }}
        >
          NOUS VENONS DE CRÉER<br />
          <span style={{ color: ORANGE }}>UN MODÈLE.</span>
        </p>
        <p className="mono font-black mb-3" style={{ ...mono, color: BLUE, fontSize: 20, letterSpacing: '0.08em' }}>
          MODÈLE ≠ SARRA ≠ AHMED ≠ LINA
        </p>
        <p style={{ color: SUB, fontSize: 19, maxWidth: 540, margin: '0 auto', lineHeight: 1.4 }}>
          Ce modèle décrit ce qu&apos;est <span style={{ color: ORANGE, fontWeight: 800 }}>un</span> étudiant
          dans notre application — pas une personne précise.
        </p>
      </Fade>
    </div>
  )
}

// ─── SCENE 05 — MODEL → JAVA ──────────────────────────────────────────────
function Scene05ModelToJava() {
  const phase = usePhase([500, 1400, 2200, 3000, 3800, 4600, 5600])

  const codeLines = [
    { show: 2, code: 'class Etudiant {' },
    { show: 3, code: '    String nom;' },
    { show: 3, code: '    String matricule;' },
    { show: 4, code: '    double moyenne;' },
    { show: 4, code: '    int niveau;' },
    { show: 5, code: '' },
    { show: 5, code: '    void sInscrire() { }' },
    { show: 5, code: '    void calculerMoyenne() { }' },
    { show: 5, code: '    void afficherProfil() { }' },
    { show: 2, code: '}' },
  ]

  const methods = [
    { m: 'sInscrire()', p: 5 },
    { m: 'calculerMoyenne()', p: 5 },
    { m: 'afficherProfil()', p: 5 },
  ]

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col" style={{ background: D1 }}>
      <div className="flex-1 flex min-h-0">
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
                  fontSize: 20,
                  transition: 'color 0.4s',
                  opacity: phase >= x.p ? 1 : 0.4,
                }}>{x.f}</div>
              ))}
            </div>
            <div className="px-6 py-3">
              {methods.map((x) => (
                <div key={x.m} className="mono py-1" style={{
                  ...mono,
                  color: phase >= x.p ? EMERALD : MUTED,
                  fontSize: 18,
                  transition: 'color 0.4s',
                }}>{x.m}</div>
              ))}
            </div>
          </div>
        </div>

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
                  <div key={i} className="mono" style={{ ...mono, lineHeight: '2.1rem', fontSize: 18, color: '#3B4252' }}>{i + 1}</div>
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
                      fontSize: 20,
                      color: '#D4D4D4',
                      opacity: phase >= l.show ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                    dangerouslySetInnerHTML={{ __html: l.code ? hi(l.code) : '&nbsp;' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Fade show={phase >= 6} className="shrink-0 py-5 flex items-center justify-center gap-4 flex-wrap"
        style={{ borderTop: `1px solid ${D4}`, background: D2 }}>
        {['MONDE RÉEL', '→', 'ABSTRACTION', '→', 'MODÈLE', '→', 'CLASSE JAVA'].map((t, i) => (
          <span key={i} className="mono font-black tracking-widest" style={{
            ...mono,
            fontSize: t === '→' ? 14 : 12,
            color: t === 'CLASSE JAVA' ? ORANGE : t === '→' ? MUTED : OW,
            letterSpacing: '0.08em',
          }}>{t}</span>
        ))}
      </Fade>
    </div>
  )
}

// ─── SCENE 06 — CLASS ≠ OBJECT ────────────────────────────────────────────
function Scene06ClassNotObject() {
  const phase = usePhase([500, 1400, 2600, 4000, 5400])
  const [vote, setVote] = useState<string | null>(isPrintMode() ? 'no' : null)
  const names = ['Sarra', 'Ahmed', 'Lina']
  const answered = vote !== null || phase >= 4 || isPrintMode()

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center px-12" style={{ background: D1 }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 50%, ${ORANGE}10 0%, transparent 50%)`,
      }} />

      <Fade show={phase >= 1} className="text-center mb-6">
        <p className="mono font-black tracking-widest mb-2" style={{ ...mono, color: MUTED, fontSize: 18 }}>NOUS AVONS LE MODÈLE</p>
        <p className="mono font-bold" style={{ ...mono, fontSize: 30, color: BLUE }}>class Etudiant</p>
      </Fade>

      <Fade show={phase >= 2} className="flex items-center gap-6 mb-8">
        <div className="rounded-xl px-5 py-3 mono font-black" style={{ ...mono, background: ORANGE, color: '#fff', fontSize: 18 }}>
          Etudiant
        </div>
        <span className="mono font-black" style={{ ...mono, color: MUTED, fontSize: 26 }}>↓</span>
        <div className="flex gap-3">
          {names.map(n => (
            <div key={n} className="rounded-xl px-4 py-3 mono font-black" style={{
              ...mono, background: D2, border: `2px solid ${BLUE}`, color: OW, fontSize: 22,
            }}>{n}</div>
          ))}
        </div>
      </Fade>

      <Fade show={phase >= 3} className="text-center mb-6 max-w-2xl">
        <p className="font-black leading-tight mb-4" style={{ ...display, fontSize: 'clamp(28px, 3.4vw, 40px)', color: OW }}>
          À VOUS : faut-il <span style={{ color: ORANGE }}>trois classes</span> ?
        </p>
        <div className="flex justify-center gap-3 mb-4">
          {[
            { id: 'yes', label: 'Oui — une par personne' },
            { id: 'no', label: 'Non — une classe suffit' },
          ].map(c => (
            <button key={c.id} type="button" onClick={() => setVote(c.id)}
              className="px-5 py-3 rounded-xl mono font-black"
              style={{
                ...mono, fontSize: 20,
                background: vote === c.id ? ORANGE : D2,
                color: vote === c.id ? '#fff' : OW,
                border: `2px solid ${vote === c.id ? ORANGE : D4}`,
              }}>
              {c.label}
            </button>
          ))}
        </div>
      </Fade>

      <Fade show={answered} className="text-center">
        <p className="font-black leading-none mb-4" style={{ ...display, fontSize: 'clamp(64px, 9vw, 100px)', color: ORANGE }}>
          NON.
        </p>
        <p className="font-black leading-tight mb-2" style={{ ...display, fontSize: 'clamp(26px, 3vw, 36px)', color: OW }}>
          UNE CLASSE → PLUSIEURS OBJETS.
        </p>
        <p className="mono font-black" style={{ ...mono, color: BLUE, fontSize: 20, letterSpacing: '0.08em' }}>
          CLASSE = PLAN · OBJET = INSTANCE VIVANTE
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
              border: `2px solid ${D4}`,
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
                  border: `2px solid ${D4}`,
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
                    ...mono, color: OW, background: D3, border: `2px solid ${D4}`,
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
                border: `3px solid ${ORANGE}`,
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
              <div className="mono p-5" style={{ ...mono, margin: 0, fontSize: 20, lineHeight: 1.7, color: '#D4D4D4' }}>
                {`class Voiture {
    String marque;
    String couleur;
    double vitesse;

    void demarrer() { }
    void accelerer() { }
    void freiner() { }
}`.split('\n').map((line, i) => (
                  <div key={i} className="whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: hi(line) || '&nbsp;' }} />
                ))}
              </div>
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
/** Scenes 01–05 : monde réel → abstraction → modèle → classe Java */
export const OPENING_EARLY: { component: FC; chapter: string; id: string }[] = [
  { component: Scene01LookAround, chapter: 'Ouverture', id: 'open-01-look' },
  { component: Scene02Campus, chapter: 'Ouverture', id: 'open-02-represent' },
  { component: Scene03Abstraction, chapter: 'Ouverture', id: 'open-03-abstraction' },
  { component: Scene04Model, chapter: 'Ouverture', id: 'open-04-model' },
  { component: Scene05ModelToJava, chapter: 'Ouverture', id: 'open-05-java' },
]

/** Scenes 06–12 : classe vs objet et suite narrative */
export const OPENING_LATE: { component: FC; chapter: string; id: string }[] = [
  { component: Scene06ClassNotObject, chapter: 'Ouverture', id: 'open-06-class-not-object' },
  { component: Scene07ObjectsAlive, chapter: 'Ouverture', id: 'open-07-alive' },
  { component: Scene08StateBehavior, chapter: 'Ouverture', id: 'open-08-state-behavior' },
  { component: Scene09Collaborate, chapter: 'Ouverture', id: 'open-09-collaborate' },
  { component: Scene10CarChallenge, chapter: 'Ouverture', id: 'open-10-car' },
  { component: Scene11WhyJava, chapter: 'Ouverture', id: 'open-11-why-java' },
  { component: Scene12Promise, chapter: 'Ouverture', id: 'open-12-promise' },
]

export const OPENING_SLIDES: { component: FC; chapter: string; id: string }[] = [
  ...OPENING_EARLY,
  ...OPENING_LATE,
]
