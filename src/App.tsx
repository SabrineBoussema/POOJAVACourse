import { useState, useEffect, useCallback, useRef } from 'react'
import fsmLogo from './assets/attachment2.png'
import { OPENING_SLIDES } from './OpeningSequence'
import { ToolLogo, TechMark, LogoStrip } from './TechLogos'

// ─── JAVA — Design Tokens (clair / académique) ────────────────
const D1     = '#F4F7FB'   // page background
const D2     = '#FFFFFF'   // surface / cards
const D3     = '#EEF2F7'   // muted panel
const D4     = '#CBD5E1'   // borders
const OW     = '#0F172A'   // primary text (navy)
const SUB    = '#334155'   // secondary text — contraste amphi
const MUTED  = '#64748B'   // muted labels

const ORANGE = '#F97300'
const BLUE   = '#2563EB'
const EMERALD= '#10B981'
const VIOLET = '#8B5CF6'
const RED    = '#EF4444'
const AMBER  = '#F59E0B'

// Light screens (aliases)
const LBG   = '#F1F5F9'
const LCARD = '#ffffff'
const LBLUE = '#EFF6FF'
const LTEXT = '#0F172A'
const LSUB  = '#475569'
const LBORD = '#CBD5E1'

// Code editor (IntelliJ-inspired — reste sombre pour le code)
const E_BG    = '#0D1117'
const E_GUTTER= '#0A0F1A'
const E_ACTIVE= '#1C2333'
const E_BORD  = '#21262D'
const E_LINE  = '#8B949E'

// Texte sur fonds colorés (orange, bleu, etc.)
const ON_ACCENT = '#FFFFFF'

// ─── Syntax highlight (classes CSS — jamais de codes couleur en texte brut) ─
function hi(code: string): string {
  const strings: string[] = []
  let s = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"([^"]*)"/g, (_, inner: string) => {
      const i = strings.length
      strings.push(`<span class="str">"${inner}"</span>`)
      return `\u0000S${i}\u0000`
    })
    .replace(/\/\/.*$/gm, '<span class="cmt">$&</span>')
    .replace(
      /\b(public|private|protected|static|void|class|new|return|this|import|package|final|extends|if|else|for|while|true|false|null|abstract|interface|implements)\b/g,
      '<span class="kw">$1</span>',
    )
    .replace(
      /\b(String|int|long|short|byte|char|float|double|boolean|Object|StringBuilder|Arrays|System|Point|Etudiant|Main)\b/g,
      '<span class="cls">$1</span>',
    )
    .replace(/\b(\d+\.?\d*[fldFL]?)\b/g, '<span class="num">$1</span>')

  strings.forEach((html, i) => {
    s = s.replace(`\u0000S${i}\u0000`, html)
  })
  return s
}

// ─── Backgrounds ──────────────────────────────────────────────────────────
const DARK_GRID: React.CSSProperties = {
  background: D1,
  backgroundImage: `
    radial-gradient(ellipse at 12% 0%, ${ORANGE}10 0%, transparent 42%),
    radial-gradient(ellipse at 88% 100%, ${BLUE}10 0%, transparent 45%),
    linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)
  `,
  backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
}

const BLUEPRINT: React.CSSProperties = {
  background: '#EEF4FF',
  backgroundImage: `
    radial-gradient(ellipse at 80% 10%, ${BLUE}12 0%, transparent 40%),
    linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)
  `,
  backgroundSize: 'auto, 32px 32px, 32px 32px',
}

function glowBg(color: string, x = '30%', y = '40%'): React.CSSProperties {
  return {
    background: D1,
    backgroundImage: `
      radial-gradient(ellipse at ${x} ${y}, ${color}1a 0%, transparent 52%),
      linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)
    `,
    backgroundSize: 'auto, 48px 48px, 48px 48px',
  }
}

/** En-tête de section académique — cohérent sur toutes les slides */
function SlideKicker({ children, color = ORANGE }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="mono font-black tracking-widest mb-3"
      style={{ color, fontSize: 16, letterSpacing: '0.18em' }}>
      {children}
    </p>
  )
}

function SlideTitleText({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className="font-black leading-tight"
      style={{
        fontFamily: "'Syne', system-ui, sans-serif",
        fontSize: 52,
        color: light ? '#fff' : OW,
        letterSpacing: '-0.03em',
      }}>
      {children}
    </h2>
  )
}

// ─── FSM Corner ───────────────────────────────────────────────────────────
function FsmCorner({ dark = false }: { dark?: boolean }) {
  return (
    <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 pointer-events-none"
      style={{ opacity: 0.55 }}>
      <img src={fsmLogo} alt="Faculté des Sciences de Monastir" className="w-10 h-10 object-contain"
        style={{ filter: dark ? 'brightness(0.9)' : 'none' }} />
    </div>
  )
}

/** En-tête de slide : logo FSM + logos techniques */
function SlideChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full relative slide-chrome">
      <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none"
        style={{ height: 4, background: `linear-gradient(90deg, ${ORANGE} 0%, ${BLUE} 55%, ${EMERALD} 100%)` }} />

      {/* Head bar — fond léger pour rester lisible aussi sur slides sombres */}
      <div
        className="absolute top-2 left-3 right-3 z-40 flex items-center justify-between gap-3 pointer-events-none print-hidden"
        style={{
          height: 48,
          padding: '0 10px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.92)',
          border: `1px solid ${D4}`,
          boxShadow: '0 4px 18px rgba(15,23,42,0.08)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <img
            src={fsmLogo}
            alt="Faculté des Sciences de Monastir"
            className="object-contain"
            style={{ width: 34, height: 34 }}
          />
          <div className="leading-tight">
            <p className="mono font-black" style={{ color: ORANGE, fontSize: 13, letterSpacing: '0.12em' }}>
              JAVA
            </p>
            <p className="mono" style={{ color: MUTED, fontSize: 12 }}>
              FSM · POO · GLSI 2
            </p>
          </div>
          <span
            className="mono font-bold px-2 py-1 rounded-md ml-1"
            style={{
              fontSize: 11,
              letterSpacing: '0.06em',
              background: 'rgba(245,158,11,0.14)',
              color: '#B45309',
              border: `1px solid ${AMBER}66`,
            }}
          >
            EN COURS
          </span>
        </div>
        <LogoStrip kinds={['java', 'jdk', 'jvm', 'intellij']} size={30} gap={5} />
      </div>

      <div className="w-full h-full" style={{ paddingTop: 56, boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  )
}

// ─── IntelliJ Editor ──────────────────────────────────────────────────────
function Editor({
  code, filename = 'Main.java', highlight = [], activeLine = 0,
  showTerminal = false, terminalOutput = '', large = false,
  terminalTitle = 'Terminal', runLabel,
}: {
  code: string; filename?: string; highlight?: number[]; activeLine?: number;
  showTerminal?: boolean; terminalOutput?: string; large?: boolean
  terminalTitle?: string; runLabel?: string
}) {
  const lines = code.split('\n')
  const fs = large ? 24 : 20
  const lh = large ? '2.2rem' : '2.05rem'
  const outLines = terminalOutput ? terminalOutput.split('\n') : []
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-2xl h-full"
      style={{ border: `1px solid ${E_BORD}` }}>
      {/* Title bar */}
      <div className="flex items-center gap-0 shrink-0" style={{ background: '#161B22', borderBottom: `1px solid ${E_BORD}`, height: 40 }}>
        <div className="flex items-center gap-1.5 px-4">
          <span style={{ color: '#FF5F57', fontSize: 12 }}>●</span>
          <span style={{ color: '#FFBD2E', fontSize: 12 }}>●</span>
          <span style={{ color: '#28CA41', fontSize: 12 }}>●</span>
        </div>
        <div className="px-3 py-1 text-sm mono flex items-center gap-2"
          style={{ background: E_BG, borderRight: `1px solid ${E_BORD}`, color: '#8B949E', borderBottom: `2px solid ${ORANGE}` }}>
          <span style={{ color: ORANGE, fontWeight: 700 }}>Java</span>
          {filename}
        </div>
      </div>
      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden min-h-0" style={{ background: E_BG }}>
        {/* Gutter */}
        <div className="shrink-0 pt-3 pb-2 pr-3 select-none text-right"
          style={{ width: 48, background: E_GUTTER, borderRight: `1px solid ${E_BORD}` }}>
          {lines.map((_, i) => (
            <div key={i} style={{ lineHeight: lh, fontSize: fs - 2, color: highlight.includes(i + 1) || activeLine === i + 1 ? ORANGE + 'cc' : '#3B4252' }}
              className="mono pr-1">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Code */}
        <div className="flex-1 overflow-x-auto overflow-y-auto py-3 pl-3">
          {lines.map((line, i) => {
            const n = i + 1
            const isActive = activeLine === n || highlight.includes(n)
            return (
              <div key={i} className="relative"
                style={{ lineHeight: lh, background: isActive ? E_ACTIVE : 'transparent', paddingLeft: 8 }}>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: ORANGE }} />
                )}
                <span className="mono whitespace-pre"
                  style={{ fontSize: fs, color: '#D4D4D4' }}
                  dangerouslySetInnerHTML={{ __html: hi(line) }} />
              </div>
            )
          })}
        </div>
      </div>
      {/* Terminal */}
      {showTerminal && (
        <div className="shrink-0" style={{ background: '#0A0F1A', borderTop: `1px solid ${E_BORD}`, minHeight: 72 }}>
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm mono" style={{ borderBottom: `1px solid ${E_BORD}`, color: '#3B4252' }}>
            <span style={{ color: EMERALD }}>▶</span> {terminalTitle}
          </div>
          <div className="px-3 py-2 mono" style={{ fontSize: large ? 22 : 20, lineHeight: 1.45 }}>
            {runLabel && (
              <div>
                <span style={{ color: EMERALD }}>&gt; </span>
                <span style={{ color: '#D4D4D4' }}>{runLabel}</span>
              </div>
            )}
            {!runLabel && (
              <div>
                <span style={{ color: EMERALD }}>$ </span>
                <span style={{ color: '#D4D4D4' }}>java Main</span>
              </div>
            )}
            {outLines.map((l, i) => (
              <div key={i} style={{ color: EMERALD, marginTop: i === 0 ? 4 : 0 }}>{l}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Heap Object ──────────────────────────────────────────────────────────
function HeapObj({ label, addr, fields, color = ORANGE, glow = false, large = false }: {
  label: string; addr?: string; fields: { k: string; v: string; changed?: boolean }[];
  color?: string; glow?: boolean; large?: boolean
}) {
  return (
    <div className="rounded-xl overflow-hidden"
      style={{
        border: `2px solid ${color}`,
        boxShadow: glow ? `0 0 32px ${color}55, 0 0 64px ${color}20` : '0 4px 20px rgba(15,23,42,0.1)',
        minWidth: large ? 180 : 140,
      }}>
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: color }}>
        <span className="mono font-black text-white" style={{ fontSize: large ? 28 : 22 }}>{label}</span>
        {addr && <span className="mono text-xs" style={{ color: '#ffffff99' }}>{addr}</span>}
      </div>
      {fields.map(f => (
        <div key={f.k} className="flex items-center justify-between px-4 py-3 border-t"
          style={{
            borderColor: D4,
            background: f.changed ? color + '22' : D2,
            boxShadow: f.changed ? `inset 0 0 12px ${color}33` : 'none',
          }}>
          <span className="mono" style={{ color: BLUE, fontSize: large ? 22 : 18 }}>{f.k}</span>
          <span className="mono font-bold" style={{ color: f.changed ? color : OW, fontSize: large ? 24 : 20 }}>{f.v}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Challenge Arena ──────────────────────────────────────────────────────
function ChallengeArena({ number, code, question, options, correctIndex, explanation }: {
  number: number; code?: string; question: string;
  options: string[]; correctIndex: number; explanation: string
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const answered = selected !== null
  const correct = selected === correctIndex

  useEffect(() => {
    if (answered) return
    if (timeLeft <= 0) return
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, answered])

  const pct = (timeLeft / 30) * 100
  const timerColor = timeLeft > 15 ? EMERALD : timeLeft > 8 ? AMBER : RED

  return (
    <div className="w-full h-full flex flex-col" style={DARK_GRID}>
      <FsmCorner />
      {/* Header */}
      <div className="flex items-center justify-between px-12 pt-8 pb-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="mono font-black tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: VIOLET+'18', color: VIOLET, border: `1.5px solid ${VIOLET}55`, fontSize: 15, letterSpacing: '0.14em' }}>
            JAVA ARENA
          </div>
          <span className="mono font-bold" style={{ color: SUB, fontSize: 20 }}>Challenge {String(number).padStart(2,'0')}</span>
        </div>
        {!answered && (
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" stroke={D4} />
                <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" stroke={timerColor}
                  strokeDasharray={`${pct} 100`} style={{ transition: 'stroke-dasharray 1s linear' }} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center mono font-bold"
                style={{ fontSize: 20, color: timerColor }}>{timeLeft}</span>
            </div>
          </div>
        )}
        {answered && (
          <span className="mono font-black text-xl" style={{ color: correct ? EMERALD : RED }}>
            {correct ? 'CORRECT' : 'INCORRECT'}
          </span>
        )}
      </div>

      {code && (
        <div className="px-12 shrink-0 mb-5" style={{ maxWidth: 720 }}>
          <Editor code={code} filename="Challenge.java" large />
        </div>
      )}

      <div className="px-12 mb-6 shrink-0">
        <p className="font-black leading-snug"
          style={{ fontSize: 40, color: OW, fontFamily: "'Syne', system-ui, sans-serif" }}>{question}</p>
      </div>

      <div className="px-12 grid grid-cols-2 gap-4 flex-1" style={{ maxWidth: 960 }}>
        {options.map((opt,i) => {
          const label = String.fromCharCode(65+i)
          let bg = D2, border = D4, tc = SUB, lc = MUTED
          if (answered) {
            if (i === correctIndex) { bg = EMERALD+'18'; border = EMERALD+'66'; tc = OW; lc = EMERALD }
            else if (i === selected) { bg = RED+'15'; border = RED+'66'; tc = SUB; lc = RED }
          } else {
            bg = D2; border = D4; tc = SUB; lc = D4
          }
          return (
            <button key={i} onClick={() => !answered && setSelected(i)}
              className="flex items-center gap-5 px-7 py-6 rounded-2xl text-left transition-all"
              style={{ background: bg, border: `2px solid ${border}`, cursor: answered ? 'default' : 'pointer',
                boxShadow: answered && i === correctIndex ? `0 0 24px ${EMERALD}33` : '0 4px 16px rgba(15,23,42,0.06)' }}>
              <span className="mono font-black shrink-0" style={{ fontSize: 40, color: lc }}>{label}</span>
              <span className="font-semibold" style={{ fontSize: 24, color: tc }}>{opt}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="px-12 pb-8 mt-4">
          <div className="rounded-xl px-6 py-4 flex gap-4"
            style={{ background: ORANGE+'12', border: `1.5px solid ${ORANGE}44` }}>
            <span className="mono font-black shrink-0 mt-0.5" style={{ color: ORANGE, fontSize: 16 }}>POURQUOI</span>
            <span className="leading-relaxed" style={{ color: SUB, fontSize: 22 }}>{explanation}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Memory Arena (Stack / Highway / Heap) ────────────────────────────────
type MemStep = {
  instruction: string
  stack: { name: string; value: string; active?: boolean }[]
  heap: { id: string; label: string; addr: string; fields: { k:string; v:string; changed?: boolean }[]; color?: string }[]
  refs: { from: string; to: string; active?: boolean }[]
  note?: string
}
function MemoryArena({ steps, title = 'MEMORY ARENA' }: { steps: MemStep[]; title?: string }) {
  const [step, setStep] = useState(0)
  const s = steps[step]
  return (
    <div className="w-full h-full flex flex-col" style={DARK_GRID}>
      <FsmCorner />
      {/* Top */}
      <div className="flex items-center justify-between px-8 pt-5 pb-3 shrink-0">
        <div>
          <p className="mono text-xs font-black tracking-widest mb-0.5" style={{ fontSize: 16, letterSpacing: '0.16em',  color: VIOLET }}>{title}</p>
          <p className="mono font-bold text-sm" style={{ color: OW, background: D3, padding: '3px 10px', borderRadius: 6, border: `1px solid ${VIOLET}44` }}>
            <span style={{ color: VIOLET }}>▶ </span>{s.instruction}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((_,i) => (
            <button key={i} onClick={() => setStep(i)}
              className="rounded-full transition-all"
              style={{ width: i===step?28:14, height: 6, background: i===step?VIOLET:D4 }} />
          ))}
        </div>
      </div>

      {/* Arena */}
      <div className="flex flex-1 mx-6 mb-5 rounded-2xl overflow-hidden" style={{ border: `1px solid ${D4}` }}>
        {/* STACK — 28% */}
        <div className="flex flex-col" style={{ width: '28%', background: D2, borderRight: `1px solid ${D4}` }}>
          <div className="px-4 py-3 border-b" style={{ borderColor: D4 }}>
            <p className="mono text-xs font-black tracking-widest" style={{ fontSize: 16, letterSpacing: '0.16em',  color: BLUE }}>STACK</p>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-2 justify-end">
            {s.stack.map(v => (
              <div key={v.name} className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: v.active ? BLUE+'22' : D3, border: `1.5px solid ${v.active ? BLUE+'88' : D4}`,
                  boxShadow: v.active ? `0 0 16px ${BLUE}33` : 'none' }}>
                <span className="mono font-bold" style={{ fontSize: 22, color: v.active ? BLUE : OW }}>{v.name}</span>
                <span className="mono font-black" style={{ fontSize: 21, color: v.active ? VIOLET : SUB }}>{v.value}</span>
              </div>
            ))}
            {s.stack.length === 0 && <span className="mono text-xs text-center" style={{ color: MUTED }}>— empty —</span>}
          </div>
        </div>

        {/* HIGHWAY — 20% */}
        <div className="flex flex-col items-center justify-center" style={{ width: '20%', background: D1, borderRight: `1px solid ${D4}` }}>
          <p className="mono text-xs font-black tracking-widest mb-5" style={{ fontSize: 16, letterSpacing: '0.16em',  color: MUTED }}>REF</p>
          {s.refs.length > 0 ? s.refs.map(r => (
            <div key={r.from+r.to} className="flex flex-col items-center gap-1 w-full px-4">
              <span className="mono text-xs font-bold" style={{ color: r.active ? VIOLET : MUTED }}>{r.from}</span>
              <div className="w-full flex items-center gap-1 my-1">
                <div className="flex-1 h-0.5 rounded" style={{ background: r.active ? VIOLET : D4 }} />
                <div className="w-0 h-0" style={{ borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `8px solid ${r.active ? VIOLET : D4}` }} />
              </div>
              <span className="mono text-xs font-bold" style={{ color: r.active ? ORANGE : MUTED }}>{r.to}</span>
            </div>
          )) : <span className="mono text-xs" style={{ color: MUTED }}>null</span>}
        </div>

        {/* HEAP — 52% */}
        <div className="flex flex-col" style={{ width: '52%', background: D1 }}>
          <div className="px-4 py-3 border-b" style={{ borderColor: D4 }}>
            <p className="mono text-xs font-black tracking-widest" style={{ fontSize: 16, letterSpacing: '0.16em',  color: ORANGE }}>HEAP</p>
          </div>
          <div className="flex-1 p-5 flex flex-wrap gap-4 content-start">
            {s.heap.map(obj => (
              <HeapObj key={obj.id} label={obj.label} addr={obj.addr}
                fields={obj.fields} color={obj.color||ORANGE} large />
            ))}
            {s.heap.length === 0 && <span className="mono text-xs" style={{ color: MUTED }}>— vide —</span>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-8 pb-4 shrink-0">
        {s.note && <p className="text-sm italic" style={{ color: AMBER }}>⚡ {s.note}</p>}
        <div className="flex items-center gap-3 ml-auto">
          <span className="mono text-xs" style={{ color: MUTED }}>{step+1} / {steps.length}</span>
          <button onClick={() => setStep(s=>Math.max(s-1,0))} disabled={step===0}
            className="w-8 h-8 rounded-xl mono font-bold flex items-center justify-center"
            style={{ background: step===0?'transparent':D3, color: step===0?MUTED:OW, border: `1px solid ${D4}` }}>←</button>
          <button onClick={() => setStep(s=>Math.min(s+1,steps.length-1))} disabled={step===steps.length-1}
            className="px-4 h-8 rounded-xl mono font-bold text-sm"
            style={{ background: step===steps.length-1?'transparent':VIOLET, color: step===steps.length-1?MUTED:'#fff', border: `1px solid ${step===steps.length-1?D4:VIOLET}` }}>
            Suivant →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Object Creation Sequence ─────────────────────────────────────────────
function ObjectCreationSeq() {
  const [step, setStep] = useState(0)
  const steps = [
    { n:'01', label:'ALLOCATE', desc:'La JVM réserve de l\'espace en mémoire pour le nouvel objet.',
      visual: <div className="rounded-xl border-2 border-dashed flex items-center justify-center" style={{ width:180, height:110, borderColor:MUTED, color:MUTED }}>
        <span className="mono text-sm">empty shell…</span>
      </div>, color: MUTED },
    { n:'02', label:'CONSTRUCTOR', desc:'Le constructeur Point(3,4) est invoqué.',
      visual: <HeapObj label="Point" addr="@A01" fields={[{k:'x',v:'?'},{k:'y',v:'?'}]} color={VIOLET} large />, color: VIOLET },
    { n:'03', label:'INITIALIZE', desc:'Les attributs reçoivent leurs valeurs : x=3, y=4.',
      visual: <HeapObj label="Point" addr="@A01" fields={[{k:'x',v:'3',changed:true},{k:'y',v:'4',changed:true}]} color={ORANGE} glow large />, color: ORANGE },
    { n:'04', label:'REFERENCE', desc:'La variable p1 reçoit l\'adresse @A01.',
      visual: <div className="flex items-center gap-4">
        <div className="rounded-xl px-4 py-3 mono font-black text-xl" style={{ background: BLUE+'22', border:`2px solid ${BLUE}`, color: BLUE }}>p1</div>
        <div className="flex items-center gap-1">
          <div style={{ width:48, height:2, background:VIOLET }} />
          <div style={{ borderTop:'5px solid transparent', borderBottom:'5px solid transparent', borderLeft:`8px solid ${VIOLET}` }} />
        </div>
        <HeapObj label="Point" addr="@A01" fields={[{k:'x',v:'3'},{k:'y',v:'4'}]} color={ORANGE} large />
      </div>, color: VIOLET },
    { n:'05', label:'READY', desc:'L\'objet est créé et accessible via p1.',
      visual: <div className="flex flex-col items-center gap-3">
        <div className="mono font-black text-3xl" style={{ color: EMERALD }}>✓ OBJECT CREATED</div>
        <HeapObj label="Point" addr="@A01" fields={[{k:'x',v:'3'},{k:'y',v:'4'}]} color={EMERALD} glow large />
      </div>, color: EMERALD },
  ]
  const s = steps[step]
  return (
    <div className="w-full h-full flex flex-col px-12 py-8" style={glowBg(s.color, '80%', '20%')}>
      <FsmCorner />
      <div className="shrink-0 mb-6">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color: ORANGE }}>WHAT HAPPENS WHEN JAVA SEES</p>
        <div className="font-black" style={{ fontSize: 67, color: OW, letterSpacing: '-2px' }}>
          new <span style={{ color: ORANGE }}>Point(3,4)</span>
        </div>
      </div>
      {/* Step pills */}
      <div className="flex items-center gap-0 shrink-0 mb-8">
        {steps.map((st,i) => (
          <div key={i} className="flex items-center">
            <button onClick={() => setStep(i)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all"
              style={{ background: i===step ? st.color+'22' : 'transparent', border: `1.5px solid ${i===step?st.color:D4}` }}>
              <span className="mono font-black text-base" style={{ color: i<=step?st.color:MUTED }}>{st.n}</span>
              <span className="mono text-xs font-bold" style={{ color: i===step?st.color:MUTED }}>{st.label}</span>
            </button>
            {i < steps.length-1 && (
              <div className="w-5 h-0.5" style={{ background: i<step?s.color:D4 }} />
            )}
          </div>
        ))}
      </div>
      {/* Main visual */}
      <div className="flex flex-1 gap-10 items-center">
        <div className="flex-1 flex items-center justify-center">
          {s.visual}
        </div>
        <div className="w-64">
          <div className="rounded-2xl p-6" style={{ background: D3, border: `1.5px solid ${s.color}55` }}>
            <div className="font-black text-4xl mb-3" style={{ color: s.color }}>{s.n}</div>
            <div className="font-black text-xl mb-3" style={{ color: OW }}>{s.label}</div>
            <p className="text-sm leading-relaxed" style={{ color: SUB }}>{s.desc}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setStep(s=>Math.max(s-1,0))} disabled={step===0}
              className="flex-1 py-2.5 rounded-xl mono font-bold text-sm"
              style={{ background: step===0?'transparent':D3, color:step===0?MUTED:OW, border:`1.5px solid ${D4}` }}>←</button>
            <button onClick={() => setStep(s=>Math.min(s+1,steps.length-1))} disabled={step===steps.length-1}
              className="flex-1 py-2.5 rounded-xl mono font-bold text-sm"
              style={{ background: step===steps.length-1?'transparent':s.color, color:'#fff', border:`1.5px solid ${step===steps.length-1?D4:s.color}` }}>→</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── This Simulator ───────────────────────────────────────────────────────
function ThisSimulator() {
  const [active, setActive] = useState<'p1'|'p2'|null>(null)
  const objs = [
    { id: 'p1' as const, fields: [{k:'x',v:'3'},{k:'y',v:'4'}], color: BLUE },
    { id: 'p2' as const, fields: [{k:'x',v:'8'},{k:'y',v:'2'}], color: VIOLET },
  ]
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12" style={glowBg(active === 'p1' ? BLUE : active === 'p2' ? VIOLET : ORANGE)}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-4" style={{ fontSize: 16, letterSpacing: '0.16em',  color: ORANGE }}>THIS SIMULATOR</p>
      <p className="text-lg mb-8 text-center" style={{ color: SUB }}>
        Cliquez sur un objet pour appeler <span className="mono font-bold" style={{ color: ORANGE }}>move()</span>
      </p>
      {/* Objects */}
      <div className="flex gap-24 items-start mb-8">
        {objs.map(obj => {
          const isActive = active === obj.id
          return (
            <button key={obj.id} onClick={() => setActive(v => v === obj.id ? null : obj.id)}
              className="flex flex-col items-center gap-4 transition-all"
              style={{ transform: isActive ? 'scale(1.08)' : 'scale(1)' }}>
              <div className="rounded-2xl overflow-hidden transition-all"
                style={{ border: `2px solid ${isActive ? obj.color : D4}`, boxShadow: isActive ? `0 0 40px ${obj.color}55` : 'none', minWidth: 180 }}>
                <div className="px-5 py-3 font-black text-xl text-white" style={{ background: isActive ? obj.color : D3 }}>
                  {obj.id}
                </div>
                {obj.fields.map(f => (
                  <div key={f.k} className="flex justify-between px-5 py-3 border-t mono"
                    style={{ borderColor: D4, background: D2 }}>
                    <span style={{ color: isActive ? obj.color : BLUE }}>{f.k}</span>
                    <span style={{ color: OW }}>{f.v}</span>
                  </div>
                ))}
              </div>
              {isActive && (
                <div className="flex flex-col items-center gap-1 animate-bounce" style={{ animationDuration: '1s' }}>
                  <div className="mono font-black text-4xl" style={{ color: ORANGE }}>this</div>
                  <div className="w-0.5 h-6" style={{ background: ORANGE }} />
                  <div className="w-0 h-0" style={{ borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:`10px solid ${ORANGE}` }} />
                  <div className="mono font-black text-xl" style={{ color: obj.color }}>{obj.id}</div>
                </div>
              )}
            </button>
          )
        })}
      </div>
      {/* Bottom statement */}
      <div className="rounded-2xl px-8 py-4 text-center"
        style={{ background: D3, border: `1px solid ${D4}`, maxWidth: 560 }}>
        <p className="mono text-sm leading-relaxed" style={{ color: active ? OW : SUB }}>
          {active
            ? <><span style={{ color: ORANGE }} className="font-bold">this</span> = l'objet <span style={{ color: active === 'p1' ? BLUE : VIOLET, fontWeight: 'bold' }}>{active}</span> qui exécute actuellement la méthode.</>
            : 'this = l\'objet qui exécute actuellement la méthode.'
          }
        </p>
      </div>
    </div>
  )
}

// ─── Static Universe ──────────────────────────────────────────────────────
function StaticUniverse() {
  const [counter, setCounter] = useState(0)
  const instances = [
    { id:'p1', x:'1', y:'2' },
    { id:'p2', x:'5', y:'3' },
    { id:'p3', x:'0', y:'0' },
  ].slice(0, counter)
  return (
    <div className="w-full h-full flex flex-col px-10 py-8" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-4" style={{ fontSize: 16, letterSpacing: '0.16em',  color: ORANGE }}>STATIC UNIVERSE</p>
      {/* Class container */}
      <div className="rounded-2xl p-5 mb-6 relative"
        style={{ border: `2px solid ${ORANGE}55`, background: ORANGE+'0a', boxShadow: counter > 0 ? `0 0 32px ${ORANGE}22` : 'none' }}>
        <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color: ORANGE }}>CLASS POINT</p>
        <div className="flex items-center justify-between">
          <div className="mono text-3xl font-black" style={{ color: OW }}>
            static <span style={{ color: ORANGE }}>nbPoints</span> =
          </div>
          <div className="mono font-black transition-all"
            style={{ fontSize: 83, color: ORANGE, lineHeight: 1, textShadow: `0 0 32px ${ORANGE}88` }}>
            {counter}
          </div>
        </div>
        <p className="mono text-xs mt-2" style={{ color: SUB }}>ONE VALUE — SHARED BY ALL INSTANCES</p>
      </div>
      {/* Instance world */}
      <div>
        <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color: BLUE }}>INSTANCE WORLD</p>
        <div className="flex gap-5">
          {['p1','p2','p3'].map((id,i) => {
            const inst = instances[i]
            return (
              <div key={id} className="flex-1 flex flex-col gap-3 items-center">
                <div className="rounded-xl overflow-hidden transition-all w-full"
                  style={{ border: `1.5px solid ${inst ? BLUE+'66' : D4}`, opacity: inst ? 1 : 0.3 }}>
                  <div className="px-4 py-2 font-black mono" style={{ background: inst ? BLUE : D3, color: '#fff', fontSize: 22 }}>{id}</div>
                  {[{k:'x',v:inst?.x||'?'},{k:'y',v:inst?.y||'?'}].map(f=>(
                    <div key={f.k} className="flex justify-between px-4 py-2 border-t mono text-sm"
                      style={{ borderColor: D4, background: D2, color: inst?OW:MUTED }}>
                      <span style={{ color: inst?BLUE:MUTED }}>{f.k}</span>
                      <span>{f.v}</span>
                    </div>
                  ))}
                </div>
                {/* Arrow up to class */}
                {inst && (
                  <div className="flex flex-col items-center">
                    <div className="mono text-xs" style={{ color: SUB }}>nbPoints++</div>
                    <div className="w-0.5 h-4" style={{ background: ORANGE+'66' }} />
                    <div style={{ borderLeft:'5px solid transparent', borderRight:'5px solid transparent', borderBottom:`8px solid ${ORANGE}66` }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {/* Controls */}
      <div className="flex gap-3 mt-6">
        <button onClick={() => setCounter(c=>Math.min(c+1,3))} disabled={counter===3}
          className="px-6 py-3 rounded-xl mono font-bold text-sm"
          style={{ background: counter===3?'transparent':ORANGE, color:counter===3?MUTED:'#fff', border:`1.5px solid ${counter===3?D4:ORANGE}` }}>
          + new Point()
        </button>
        <button onClick={() => setCounter(0)}
          className="px-6 py-3 rounded-xl mono font-bold text-sm"
          style={{ background: 'transparent', color: MUTED, border:`1px solid ${D4}` }}>
          Reset
        </button>
        <span className="flex items-center mono text-sm" style={{ color: SUB }}>
          ← cliquez pour créer des instances
        </span>
      </div>
    </div>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────
function Overview({ current, total, chapters, onClose, onGoto }: {
  current: number; total: number
  chapters: { label: string; indices: number[] }[]
  onClose: () => void; onGoto: (i: number) => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(244,247,251,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl sm:rounded-3xl shadow-2xl w-full p-5 sm:p-8 max-h-[88dvh] overflow-y-auto"
        style={{ background: D2, maxWidth: 720, border: `1px solid ${D4}`, boxShadow: '0 24px 64px rgba(15,23,42,0.12)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5 sm:mb-6 gap-3">
          <div>
            <p className="mono text-[10px] sm:text-xs font-black tracking-widest mb-1" style={{ color: ORANGE }}>
              JAVA
            </p>
            <h2 className="font-black text-xl sm:text-2xl" style={{ color: OW, fontFamily: "'Syne', system-ui, sans-serif" }}>
              Plan du cours
            </h2>
            <p className="text-xs mt-1" style={{ color: MUTED }}>{total} slides · progression pédagogique</p>
            <p className="mono text-[10px] mt-2 font-bold px-2 py-1 rounded inline-block"
              style={{ background: AMBER + '22', color: '#B45309', border: `1px solid ${AMBER}55` }}>
              VERSION EN COURS — slides incomplets
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mono text-sm px-4 py-2.5 rounded-xl font-bold shrink-0 min-w-[44px] min-h-[44px]"
            style={{ background: D3, color: SUB, border: `1px solid ${D4}` }}
            aria-label="Fermer le plan"
          >
            ✕
          </button>
        </div>

        {chapters.map((sec) => (
          <div key={sec.label} className="mb-5">
            <p className="mono text-[10px] sm:text-xs font-black tracking-widest mb-2.5" style={{ color: ORANGE }}>
              {sec.label.toUpperCase()}
            </p>
            <div className="flex flex-wrap gap-2">
              {sec.indices.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { onGoto(i); onClose() }}
                  className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl mono text-xs font-bold"
                  style={{
                    background: i === current ? ORANGE : i < current ? ORANGE + '22' : D3,
                    color: i === current ? '#fff' : i < current ? ORANGE : SUB,
                    border: `1px solid ${i === current ? ORANGE : D4}`,
                  }}
                  aria-label={`Aller à la slide ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-xl p-3 mt-2" style={{ background: D1, border: `1px solid ${D4}` }}>
          <p className="mono text-[10px] sm:text-xs leading-relaxed mb-2" style={{ color: MUTED }}>
            <span style={{ color: ORANGE }}>← →</span> naviguer
            <span className="hidden sm:inline"> · <span style={{ color: ORANGE }}>O</span> plan · <span style={{ color: ORANGE }}>F</span> plein écran · <span style={{ color: ORANGE }}>Espace</span> suivant</span>
            <span className="sm:hidden"> · <span style={{ color: ORANGE }}>glisser</span> pour changer de slide</span>
          </p>
          <p className="text-xs leading-relaxed" style={{ color: SUB }}>
            Certaines slides sont encore en construction. Le contenu sera complété progressivement.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── SLIDES ═══════════════════════════════════════════════════════════════

// SLIDE 01 — Institutional Cover
function SlideTitle() {
  const isPrint = typeof document !== 'undefined' && document.documentElement.dataset.printing === '1'
  const [phase, setPhase] = useState(isPrint ? 5 : 0)
  useEffect(() => {
    if (isPrint) return
    const delays = [200, 700, 1300, 1900, 2500]
    const timers = delays.map((ms, i) => setTimeout(() => setPhase(i + 1), ms))
    return () => timers.forEach(clearTimeout)
  }, [isPrint])

  const fade = (p: number, extra?: React.CSSProperties): React.CSSProperties => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? 'translateY(0)' : 'translateY(14px)',
    transition: isPrint ? 'none' : 'opacity 0.75s ease, transform 0.75s ease',
    ...extra,
  })

  const keywords = [
    { t: 'class', x: '18%', y: '16%' },
    { t: 'new', x: '82%', y: '20%' },
    { t: 'this', x: '12%', y: '78%' },
    { t: 'private', x: '86%', y: '74%' },
    { t: 'static', x: '28%', y: '88%' },
    { t: 'Object', x: '90%', y: '48%' },
  ]

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: '#F4F7FB' }}>
      {/* Clear technical grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      {/* Soft accent washes — light, not muddy */}
      <div className="absolute pointer-events-none" style={{
        top: '-10%', left: '-6%', width: '50%', height: '55%',
        background: `radial-gradient(ellipse, ${ORANGE}14 0%, transparent 70%)`,
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '-8%', right: '0%', width: '48%', height: '55%',
        background: `radial-gradient(ellipse, ${BLUE}10 0%, transparent 68%)`,
      }} />
      {/* Very faint code watermark — dark on light for structure, low opacity */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" style={{ opacity: 0.045 }}>
        {[
          'public class Etudiant {',
          '  private String nom;',
          '  public void afficher() {',
          '    System.out.println(nom);',
          '  }',
          '}',
          'Etudiant e = new Etudiant();',
          'e.afficher();',
        ].map((l, i) => (
          <div key={i} className="mono font-bold whitespace-nowrap"
            style={{
              color: LTEXT, fontSize: 33, position: 'absolute',
              top: 48 + i * 78, left: i % 2 === 0 ? 20 : 160,
            }}>
            {l}
          </div>
        ))}
      </div>
      {/* Clean architectural lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.35 }}>
        <line x1="0" y1="90%" x2="100%" y2="90%" stroke={LBORD} strokeWidth="1.5" />
        <line x1="57%" y1="0" x2="57%" y2="100%" stroke={LBORD} strokeWidth="1" strokeDasharray="5 7" />
        <line x1="0" y1="16%" x2="10%" y2="16%" stroke={ORANGE} strokeWidth="2.5" />
      </svg>

      {/* LEFT — institutional content */}
      <div className="absolute inset-y-0 left-0 flex flex-col justify-between"
        style={{ width: '57%', padding: '88px 36px 56px 64px' }}>
        <div>
          <div style={fade(1)} className="flex items-center gap-4 mb-7">
            <img
              src={fsmLogo}
              alt="Faculté des Sciences de Monastir"
              className="object-contain"
              style={{ width: 72, height: 72 }}
            />
            <div>
              <p className="uppercase"
                style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: 18, fontWeight: 700, color: BLUE, letterSpacing: '0.16em',
                }}>
                FACULTÉ DES SCIENCES<br />DE MONASTIR
              </p>
            </div>
          </div>

          <div style={fade(2)}>
            <h1 className="leading-[0.95] mb-2"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: 71,
                fontWeight: 800,
                color: LTEXT,
                letterSpacing: '-0.03em',
              }}>
              PROGRAMMATION<br />ORIENTÉE OBJET
            </h1>
          </div>

          <div style={fade(3)}>
            <div className="w-14 h-1.5 mb-5 rounded-full" style={{ background: ORANGE }} />
            <p className="leading-none"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: 170,
                fontWeight: 800,
                color: ORANGE,
                letterSpacing: '-0.06em',
                lineHeight: 0.88,
              }}>
              JAVA
            </p>
          </div>

          <div style={fade(5)}>
            <p className="mt-6 mb-5"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: 32, fontWeight: 600, color: LSUB, letterSpacing: '0.01em',
              }}>
              Comprendre • Modéliser • Coder
            </p>
            <LogoStrip
              kinds={['java', 'jdk', 'jvm', 'intellij']}
              size={48}
              gap={12}
              labels
            />
          </div>
        </div>

        <div style={fade(5)} className="flex items-end gap-8 flex-wrap">
          <div>
            <p className="mono text-xs tracking-widest uppercase mb-1.5" style={{ color: '#64748B' }}>Niveau</p>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 25, fontWeight: 700, color: LTEXT }}>
              Licence GLSI 2
            </p>
          </div>
          <div className="w-px h-11" style={{ background: LBORD }} />
          <div>
            <p className="mono text-xs tracking-widest uppercase mb-1.5" style={{ color: '#64748B' }}>Année universitaire</p>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 25, fontWeight: 700, color: LTEXT }}>
              2026–2027
            </p>
          </div>
          <div className="w-px h-11" style={{ background: LBORD }} />
          <div>
            <p className="mono text-xs tracking-widest uppercase mb-1.5" style={{ color: '#64748B' }}>Enseignante</p>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 25, fontWeight: 700, color: LTEXT }}>
              Sabrine Boussema
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — grand éditeur Main.java (lisible en amphithéâtre) */}
      <div className="absolute inset-y-0 right-0 flex items-center justify-center"
        style={{ width: '46%', paddingRight: 40, paddingTop: 64, paddingBottom: 48 }}>
        {keywords.map((k) => (
          <span key={k.t} className="absolute mono select-none pointer-events-none"
            style={{
              left: k.x, top: k.y, transform: 'translate(-50%, -50%)',
              fontSize: 21, color: BLUE, opacity: phase >= 4 ? 0.28 : 0,
              transition: isPrint ? 'none' : 'opacity 1s ease', letterSpacing: '0.05em',
              fontWeight: 600,
            }}>
            {k.t}
          </span>
        ))}

        <div style={{
          ...fade(4),
          width: '100%',
          maxWidth: 740,
          height: '82%',
          minHeight: 560,
          display: 'flex',
          flexDirection: 'column',
          transform: phase >= 4
            ? 'perspective(1400px) rotateY(-3deg) rotateX(1deg) translateY(0)'
            : 'perspective(1400px) rotateY(-3deg) rotateX(1deg) translateX(28px)',
          transition: isPrint ? 'none' : 'opacity 0.9s ease, transform 0.9s ease',
          boxShadow: '0 28px 72px rgba(15,23,42,0.22), 0 0 0 1px rgba(148,163,184,0.4)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          <div className="flex-1 min-h-0 h-full">
            <Editor
              large
              filename="Main.java"
              highlight={[3]}
              activeLine={3}
              code={`public class Main {
    public static void main(String[] args) {
        Etudiant e1 = new Etudiant("Sarra", 14.5);
        e1.afficherProfil();
    }
}

class Etudiant {
    String nom;
    double moyenne;

    Etudiant(String nom, double moyenne) {
        this.nom = nom;
        this.moyenne = moyenne;
    }

    void afficherProfil() {
        System.out.println("Etudiant : " + nom);
        System.out.println("Moyenne : " + moyenne);
    }
}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 02 — Ch1 Opener
function SlideCh1Opener() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: ORANGE }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />
      <FsmCorner dark={false} />
      <div className="absolute font-black select-none pointer-events-none"
        style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 340, color: '#00000014', letterSpacing: '-18px', right: '-4%', bottom: '-8%', lineHeight: 1 }}>
        01
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-20">
        <div className="w-16 h-1.5 rounded mb-6" style={{ background: '#ffffffcc' }} />
        <p className="mono font-black tracking-widest mb-4" style={{ color: '#ffffffcc', fontSize: 18, letterSpacing: '0.22em' }}>CHAPITRE 01</p>
        <h1 className="font-black mb-5 leading-none"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 92, color: '#fff', letterSpacing: '-0.04em' }}>
          Introduction à Java
        </h1>
        <p style={{ color: '#ffffffee', maxWidth: 560, fontSize: 26, lineHeight: 1.45 }} className="mb-8">
          Du code source à l&apos;exécution — comprendre comment Java fonctionne vraiment.
        </p>
        <LogoStrip kinds={['java', 'jdk', 'jvm', 'intellij']} size={52} gap={14} />
      </div>
    </div>
  )
}

// SLIDE 03 — Why Java (orbital)
function SlideWhyJava() {
  const nodes = [
    { label:'Portable', angle:-60, color: BLUE },
    { label:'OOP', angle:-10, color: ORANGE },
    { label:'Typé', angle:40, color: EMERALD },
    { label:'Concurrent', angle:100, color: VIOLET },
    { label:'Sécurisé', angle:150, color: AMBER },
  ]
  return (
    <div className="w-full h-full flex" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1 flex flex-col justify-center pl-16">
        <SlideKicker>POURQUOI JAVA</SlideKicker>
        <div className="font-black leading-none"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 108, color: OW, letterSpacing: '-0.05em' }}>
          POURQUOI<br /><span style={{ color: ORANGE }}>JAVA ?</span>
        </div>
        <p className="mt-8" style={{ color: SUB, maxWidth: 420, fontSize: 24, lineHeight: 1.5 }}>
          Cinq raisons qui ont transformé le développement logiciel depuis 1995.
        </p>
      </div>
      {/* Right — orbital SVG */}
      <div className="w-[420px] flex items-center justify-center pr-10">
        <div className="relative" style={{ width: 380, height: 380 }}>
          <svg className="absolute inset-0" viewBox="0 0 380 380">
            <circle cx="190" cy="190" r={170} fill="none" stroke={D4} strokeWidth="1.5" strokeDasharray="6 4" />
            {nodes.map((n,i) => {
              const rad = (n.angle * Math.PI) / 180
              const x = 190 + 170 * Math.cos(rad)
              const y = 190 + 170 * Math.sin(rad)
              return <line key={i} x1="190" y1="190" x2={x} y2={y} stroke={n.color} strokeWidth="2" opacity="0.45" />
            })}
          </svg>
          <div className="absolute flex flex-col items-center justify-center rounded-full overflow-hidden"
            style={{ left: 190-52, top: 190-52, width:104, height:104, background: '#000', boxShadow:`0 0 40px ${ORANGE}55` }}>
            <ToolLogo kind="java" size={96} />
          </div>
          {nodes.map((n,i) => {
            const rad = (n.angle * Math.PI) / 180
            const x = 190 + 170 * Math.cos(rad)
            const y = 190 + 170 * Math.sin(rad)
            return (
              <div key={i} className="absolute flex items-center justify-center rounded-xl px-3 py-2 mono font-bold"
                style={{ left: x-56, top: y-22, width:112, height:44, background: D2, border:`2px solid ${n.color}`, color: n.color, fontSize: 16,
                  boxShadow: '0 6px 20px rgba(15,23,42,0.08)' }}>
                {n.label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// SLIDE 04 — History (cinematic timeline)
function SlideHistory() {
  const events = [
    { year:'1991', label:'OAK', sub:'James Gosling, Sun Microsystems', c: MUTED },
    { year:'1995', label:'JAVA 1.0', sub:'Write Once, Run Anywhere', c: ORANGE },
    { year:'2004', label:'JAVA 5', sub:'Generics, annotations, enums', c: BLUE },
    { year:'2010', label:'ORACLE', sub:'Acquisition de Sun — $7.4B', c: VIOLET },
    { year:'2026', label:'JAVA 23+', sub:'Cloud, serverless, AI-ready', c: EMERALD },
  ]
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="mb-8">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color: ORANGE }}>TIMELINE</p>
        <h2 className="font-black" style={{ fontSize:74, color: OW, letterSpacing:'-3px', lineHeight:1 }}>L'histoire de Java</h2>
      </div>
      {/* Timeline track */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Line */}
        <div className="relative mb-12">
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${ORANGE}, ${BLUE}, ${EMERALD})` }} />
        </div>
        {/* Events */}
        <div className="flex items-start justify-between">
          {events.map((e,i) => (
            <div key={i} className="flex flex-col items-center gap-3" style={{ flex:1 }}>
              {/* Year big */}
              <div className="font-black text-center" style={{ fontSize: i===1||i===4?52:36, color:e.c, lineHeight:1 }}>{e.year}</div>
              <div className="w-3 h-3 rounded-full border-2" style={{ background: D1, borderColor: e.c, boxShadow: `0 0 12px ${e.c}77` }} />
              {/* Content */}
              <div className="text-center px-2">
                <div className="mono font-black text-base mb-1" style={{ color: OW }}>{e.label}</div>
                <div className="text-xs" style={{ color: SUB }}>{e.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// SLIDE 05 — Java DNA
function SlideJavaDna() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-5" style={{ fontSize: 16, letterSpacing: '0.16em',  color: ORANGE }}>L'ADN DE JAVA</p>
      <h2 className="font-black text-center mb-10" style={{ fontSize:67, color:OW, letterSpacing:'-2px' }}>5 caractéristiques fondamentales</h2>
      <div className="flex gap-5 w-full max-w-5xl">
        {[
          { t:'Orienté objet', sub:'Modélisation naturelle du réel', c:ORANGE },
          { t:'Multiplateforme', sub:'JVM — bytecode portable', c:BLUE },
          { t:'Fortement typé', sub:'Erreurs à la compilation', c:VIOLET },
          { t:'Concurrent', sub:'Multi-threads natif', c:EMERALD },
          { t:'Sécurisé', sub:'Sandbox, bytecode vérifié', c:AMBER },
        ].map((d,i) => (
          <div key={i} className="flex-1 rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: d.c+'10', border:`1.5px solid ${d.c}44` }}>
            <div className="w-6 h-1.5 rounded" style={{ background: d.c }} />
            <p className="font-black text-lg leading-tight" style={{ color: OW }}>{d.t}</p>
            <p className="text-xs" style={{ color: SUB }}>{d.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 06 — Write Once Run Everywhere
function SlideWriteOnce() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative" style={DARK_GRID}>
      <FsmCorner />
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: ORANGE }} />
      <p className="mono font-black tracking-widest mb-5 text-center" style={{ fontSize:22, color: ORANGE }}>JAVA PHILOSOPHY</p>
      <div className="font-black text-center leading-none"
        style={{ fontSize: 'clamp(67px, 9.72vw, 123px)', color:OW, letterSpacing:'-5px', lineHeight:0.95 }}>
        WRITE ONCE.<br />
        <span style={{ color: ORANGE }}>RUN EVERYWHERE.</span>
      </div>
      <div className="mt-12 flex items-center gap-3 flex-wrap justify-center">
        {['.java','→ javac →','.class','→ JVM →','Windows / Linux / macOS'].map((t,i) => (
          i%2===1
            ? <span key={i} className="mono text-sm" style={{ color: MUTED }}>{t}</span>
            : <span key={i} className="mono font-bold px-4 py-2 rounded-xl"
                style={{ background: D3, border:`1px solid ${D4}`, color: i===4?EMERALD:OW }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// SLIDE 07 — Ecosystem
function SlideEcosystem() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color: BLUE }}>ARCHITECTURE</p>
        <h2 className="font-black mb-6" style={{ fontSize:62, color:LTEXT, letterSpacing:'-2px' }}>L'Écosystème Java</h2>
        <p className="text-2xl font-black mb-8" style={{ color:LTEXT }}>
          <span style={{ color:ORANGE }}>JAVA</span> = Langage + JVM + API
        </p>
        <div className="flex flex-col gap-2">
          {[
            { l:'Application Java', c:BLUE },
            { l:'API Java (paquetages)', c:ORANGE },
            { l:'JVM (Machine Virtuelle)', c:VIOLET },
            { l:'Système d\'exploitation', c:EMERALD },
            { l:'Matériel', c:LSUB },
          ].map((item,i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl px-5 py-3 shadow-sm"
              style={{ background:LCARD, border:`1.5px solid ${item.c}44`, marginLeft:i*16 }}>
              <div className="w-1 h-8 rounded" style={{ background:item.c }} />
              <span className="font-semibold text-sm" style={{ color:item.c }}>{item.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-60 flex flex-col justify-center">
        <div className="rounded-2xl p-5 shadow-lg" style={{ background:LCARD, border:`1.5px solid ${LBORD}` }}>
          {[{ kind: 'java', t: 'Langage', d: 'Syntaxe Java' }, { kind: 'jvm', t: 'JVM', d: 'Exécute le bytecode' }, { kind: 'jdk', t: 'API / JDK', d: 'Bibliothèques standard' }].map(c => (
            <div key={c.t} className="flex items-center gap-3 mb-4 last:mb-0">
              <ToolLogo kind={c.kind} size={40} />
              <div>
                <p className="font-bold text-sm" style={{ color: LTEXT }}>{c.t}</p>
                <p className="text-xs" style={{ color: LSUB }}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// SLIDE 08 — Editions
function SlideEditions() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em', color: ORANGE }}>ÉDITIONS</p>
      <h2 className="font-black mb-7" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 56, color: OW }}>Les 3 éditions Java</h2>
      <div className="grid grid-cols-3 gap-5 flex-1">
        {[
          { n: 'Java SE', full: 'Standard Edition', mark: 'SE', desc: 'Applications desktop & standalone', items: ['Base Library', 'Collections', 'I/O, Réseau'], c: ORANGE },
          { n: 'Jakarta EE', full: 'Enterprise Edition (ex-Java EE)', mark: 'EE', desc: 'Applications serveur & web', items: ['Servlet, JSP, JSF', 'EJB, JTA', 'JMS, Persistence'], c: BLUE },
          { n: 'Java ME', full: 'Micro / Mobile Edition', mark: 'ME', desc: 'Embarqué, IoT, faible footprint', items: ['API réduite', 'Faibles ressources', 'CLDC / MIDP'], c: VIOLET },
        ].map(e => (
          <div key={e.n} className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: D2, border: `2px solid ${e.c}44`, boxShadow: '0 8px 28px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-4">
              <TechMark label={e.mark} color={e.c} size={56} />
              <div>
                <p className="font-black text-3xl" style={{ color: e.c }}>{e.n}</p>
                <p className="mono mt-0.5" style={{ color: SUB, fontSize: 14 }}>{e.full}</p>
              </div>
            </div>
            <p style={{ color: SUB, fontSize: 18 }}>{e.desc}</p>
            <ul className="flex flex-col gap-2 mt-auto">
              {e.items.map(item => (
                <li key={item} className="flex gap-2" style={{ fontSize: 18 }}>
                  <span style={{ color: e.c }}>›</span>
                  <span style={{ color: OW }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE — JAVA TOOLCHAIN (avant LET'S CODE)
function SlideJavaToolchain() {
  const steps = [
    { label: 'JAVA SOURCE', file: 'Main.java', sub: 'Code source', c: BLUE, dominant: false },
    { label: 'JDK', file: 'javac', sub: 'Compilation', c: ORANGE, dominant: true },
    { label: 'BYTECODE', file: 'Main.class', sub: 'Portable', c: VIOLET, dominant: false },
    { label: 'JVM', file: 'HotSpot', sub: 'Exécution', c: EMERALD, dominant: true },
    { label: 'RUNNING', file: 'Programme', sub: 'Résultat', c: AMBER, dominant: false },
  ]
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono font-black tracking-widest mb-3" style={{ fontSize: 15, letterSpacing: '0.16em', color: ORANGE }}>TOOLCHAIN</p>
      <h2 className="font-black mb-10 leading-tight"
        style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 44, color: OW, letterSpacing: '-0.03em', maxWidth: 900 }}>
        De quoi avons-nous besoin<br />pour coder en Java ?
      </h2>

      <div className="flex items-stretch gap-3 flex-1 mb-8">
        {steps.map((s, i) => (
          <div key={s.label} className="contents">
            <div
              className="flex-1 rounded-2xl flex flex-col items-center justify-center text-center px-3 py-6"
              style={{
                background: s.dominant ? s.c + '16' : D2,
                border: `2.5px solid ${s.dominant ? s.c : D4}`,
                boxShadow: s.dominant ? `0 12px 40px ${s.c}33` : '0 4px 16px rgba(15,23,42,0.06)',
                transform: s.dominant ? 'scale(1.04)' : undefined,
              }}
            >
              {s.dominant && (
                <div className="mb-3">
                  <ToolLogo kind={s.label === 'JDK' ? 'jdk' : 'jvm'} size={52} compact />
                </div>
              )}
              <p className="mono font-black tracking-wider mb-2"
                style={{ color: s.c, fontSize: s.dominant ? 18 : 14, letterSpacing: '0.1em' }}>
                {s.label}
              </p>
              <p className="font-black mono mb-1" style={{ color: OW, fontSize: s.dominant ? 28 : 22 }}>{s.file}</p>
              <p style={{ color: SUB, fontSize: 15 }}>{s.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center shrink-0 px-0.5">
                <span className="font-black" style={{ color: MUTED, fontSize: 28 }}>→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-6 shrink-0">
        <div className="flex-1 rounded-2xl px-8 py-6 flex items-center gap-5"
          style={{ background: ORANGE + '14', border: `2px solid ${ORANGE}` }}>
          <ToolLogo kind="jdk" size={56} compact />
          <div>
            <p className="font-black leading-none mb-1" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 36, color: ORANGE }}>JDK</p>
            <p className="font-bold" style={{ color: OW, fontSize: 22 }}>POUR DÉVELOPPER.</p>
          </div>
        </div>
        <div className="flex-1 rounded-2xl px-8 py-6 flex items-center gap-5"
          style={{ background: EMERALD + '14', border: `2px solid ${EMERALD}` }}>
          <ToolLogo kind="jvm" size={56} compact />
          <div>
            <p className="font-black leading-none mb-1" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 36, color: EMERALD }}>JVM</p>
            <p className="font-bold" style={{ color: OW, fontSize: 22 }}>POUR EXÉCUTER.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE — Environnement : IntelliJ dominant
function SlideDevEnvironment() {
  return (
    <div className="w-full h-full flex gap-8 px-10 py-9" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex flex-col" style={{ width: '32%' }}>
        <p className="mono font-black tracking-widest mb-3" style={{ fontSize: 15, letterSpacing: '0.16em', color: ORANGE }}>ENVIRONNEMENT</p>
        <h2 className="font-black mb-8 leading-tight"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 42, color: OW, letterSpacing: '-0.03em' }}>
          Où allons-nous<br />coder ?
        </h2>

        <div className="rounded-2xl p-6 mb-6"
          style={{ background: ORANGE + '12', border: `2.5px solid ${ORANGE}`, boxShadow: `0 12px 40px ${ORANGE}28` }}>
          <div className="flex items-center gap-4 mb-4">
            <ToolLogo kind="intellij" size={64} />
            <div>
              <p className="font-black" style={{ color: OW, fontSize: 26 }}>INTELLIJ IDEA</p>
              <p className="mono font-bold" style={{ color: ORANGE, fontSize: 14 }}>RECOMMANDÉ</p>
            </div>
          </div>
          <p style={{ color: SUB, fontSize: 18, lineHeight: 1.45 }}>
            Environnement recommandé pour ce cours.
          </p>
        </div>

        <p className="mono font-black tracking-widest mb-3" style={{ color: MUTED, fontSize: 12, letterSpacing: '0.14em' }}>
          POUR CE COURS · NOUS UTILISONS INTELLIJ IDEA
        </p>

        <div className="flex flex-col gap-2 mt-auto opacity-55">
          <p className="mono mb-1" style={{ color: MUTED, fontSize: 13 }}>Alternatives (non prioritaires)</p>
          {[
            { k: 'eclipse', n: 'Eclipse' },
            { k: 'vscode', n: 'VS Code' },
          ].map(a => (
            <div key={a.k} className="flex items-center gap-3 rounded-xl px-4 py-2.5"
              style={{ background: D2, border: `1px solid ${D4}` }}>
              <ToolLogo kind={a.k} size={32} />
              <span className="font-semibold" style={{ color: SUB, fontSize: 16 }}>{a.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Large IntelliJ-inspired UI ~68% */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: `1px solid ${E_BORD}`, background: E_BG }}>
        <div className="flex items-center h-10 px-4 shrink-0" style={{ background: '#161B22', borderBottom: `1px solid ${E_BORD}` }}>
          <span style={{ color: '#FF5F57', fontSize: 11 }}>●</span>
          <span className="ml-1" style={{ color: '#FFBD2E', fontSize: 11 }}>●</span>
          <span className="ml-1" style={{ color: '#28CA41', fontSize: 11 }}>●</span>
          <span className="mono ml-4" style={{ color: '#8B949E', fontSize: 13 }}>IntelliJ IDEA — POO-Java</span>
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="shrink-0 py-4 px-4" style={{ width: 200, background: '#0A0F1A', borderRight: `1px solid ${E_BORD}` }}>
            <p className="mono font-bold mb-3" style={{ color: MUTED, fontSize: 12, letterSpacing: '0.1em' }}>PROJECT</p>
            <div className="mono" style={{ color: '#D4D4D4', fontSize: 15, lineHeight: 1.7 }}>
              <div>Project</div>
              <div style={{ color: '#8B949E' }}>└── src</div>
              <div style={{ color: ORANGE, fontWeight: 700, paddingLeft: 24 }}>└── Main.java</div>
            </div>
          </div>
          <div className="flex-1 min-h-0 p-0">
            <Editor
              large
              filename="Main.java"
              code={`public class Main {
    public static void main(String[] args) {
        Etudiant e1 = new Etudiant("Sarra", 14.5);
        e1.afficherProfil();
    }
}

class Etudiant {
    String nom;
    double moyenne;

    Etudiant(String nom, double moyenne) {
        this.nom = nom;
        this.moyenne = moyenne;
    }

    void afficherProfil() {
        System.out.println("Etudiant : " + nom);
        System.out.println("Moyenne : " + moyenne);
    }
}`}
              highlight={[3]}
              activeLine={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE — Ready to code (transition)
function SlideReadyToCode() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const timers = [500, 1400, 2400, 3600, 4800].map((ms, i) =>
      setTimeout(() => setPhase(i + 1), ms)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const show = (n: number) => ({
    opacity: phase >= n ? 1 : 0,
    transform: phase >= n ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  })

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: '#0B1220' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 40%, ${ORANGE}18 0%, transparent 50%)`,
      }} />
      <FsmCorner dark />

      <div className="relative z-10 w-full max-w-3xl px-12">
        <div className="rounded-2xl overflow-hidden mb-10"
          style={{ background: '#0D1117', border: `1px solid ${E_BORD}`, boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}>
          <div className="px-5 py-2.5 mono flex items-center gap-2" style={{ background: '#161B22', borderBottom: `1px solid ${E_BORD}`, color: '#8B949E', fontSize: 14 }}>
            <span style={{ color: EMERALD }}>▶</span> Terminal
          </div>
          <div className="p-6 mono" style={{ fontSize: 22, lineHeight: 1.85 }}>
            <div style={show(1)}>
              <span style={{ color: EMERALD }}>$ </span>
              <span style={{ color: '#D4D4D4' }}>java --version</span>
            </div>
            <div style={{ ...show(2), color: EMERALD }}>✓ Java installé</div>
            <div style={{ ...show(3), marginTop: 12 }}>
              <span style={{ color: EMERALD }}>$ </span>
              <span style={{ color: '#D4D4D4' }}>javac --version</span>
            </div>
            <div style={{ ...show(4), color: EMERALD }}>✓ Compilateur prêt</div>
          </div>
        </div>

        <div className="text-center" style={show(5)}>
          <p className="mono font-black tracking-widest mb-4" style={{ color: '#94A3B8', fontSize: 16, letterSpacing: '0.2em' }}>
            ENVIRONNEMENT PRÊT.
          </p>
          <p className="font-black leading-none"
            style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 96, color: '#F8FAFC', letterSpacing: '-0.05em' }}>
            LET&apos;S <span style={{ color: ORANGE }}>CODE.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// SLIDE — Du code au projet professionnel (plus tard dans le cours)
function SlideProProject() {
  const steps = [
    { label: 'SOURCE CODE', icon: 'java', c: ORANGE },
    { label: 'GIT', icon: 'git', c: '#F05032' },
    { label: 'MAVEN / GRADLE', icon: 'maven', c: '#C71A36' },
    { label: 'BUILD', icon: 'jdk', c: BLUE },
    { label: 'PACKAGE', icon: 'jvm', c: EMERALD },
  ]
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono font-black tracking-widest mb-3" style={{ fontSize: 15, letterSpacing: '0.16em', color: ORANGE }}>PROJET PROFESSIONNEL</p>
      <h2 className="font-black mb-4 leading-tight"
        style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 48, color: OW, letterSpacing: '-0.03em' }}>
        Du code au projet professionnel
      </h2>
      <p className="mb-10" style={{ color: SUB, fontSize: 20, maxWidth: 720 }}>
        Après les classes et la structure de base — Git, Maven et Gradle entrent en scène.
      </p>

      <div className="flex items-center justify-between flex-1 gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="contents">
            <div className="flex-1 rounded-2xl flex flex-col items-center justify-center py-10 px-4 text-center"
              style={{ background: D2, border: `2px solid ${s.c}55`, boxShadow: `0 8px 28px ${s.c}18` }}>
              <ToolLogo kind={s.icon} size={s.icon === 'jdk' || s.icon === 'jvm' ? 48 : 56} compact={s.icon === 'jdk' || s.icon === 'jvm'} />
              <p className="mono font-black mt-5 tracking-wider"
                style={{ color: s.c, fontSize: 16, letterSpacing: '0.08em' }}>
                {s.label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <span className="font-black shrink-0 px-1" style={{ color: MUTED, fontSize: 32 }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 09 — Let's Code
function SlideLetsCode() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex items-center gap-1.5 mb-6">
        {['#FF5F57','#FFBD2E','#28CA41'].map(c=><div key={c} className="w-3 h-3 rounded-full" style={{ background:c }} />)}
      </div>
      <p className="mono text-lg mb-4" style={{ color: MUTED }}>// Assez de théorie.</p>
      <div className="font-black text-center leading-none"
        style={{ fontSize: 'clamp(83px, 12.96vw, 148px)', color:OW, letterSpacing:'-6px', lineHeight:1 }}>
        LET'S<br /><span style={{ color:ORANGE }}>CODE.</span>
      </div>
      <div className="mt-10 flex items-center gap-2 mono text-2xl" style={{ color:EMERALD }}>
        <span>$</span><span>javac Main.java</span><span className="animate-pulse">_</span>
      </div>
    </div>
  )
}

// SLIDE — Premier programme OOP (classe → objet → constructeur → méthode)
function SlideFirstProgram() {
  const [step, setStep] = useState(0)
  const printing =
    typeof document !== 'undefined' && document.documentElement.dataset.printing === '1'
  const view = printing ? 4 : step

  const FULL = `public class Main {
    public static void main(String[] args) {

        Etudiant e1 = new Etudiant("Sarra", 14.5);

        e1.afficherProfil();
    }
}

class Etudiant {

    String nom;
    double moyenne;

    Etudiant(String nom, double moyenne) {
        this.nom = nom;
        this.moyenne = moyenne;
    }

    void afficherProfil() {
        System.out.println("Etudiant : " + nom);
        System.out.println("Moyenne : " + moyenne);
    }
}`

  const codeForStep = (() => {
    if (view === 0) {
      return `class Etudiant {

}`
    }
    if (view === 1) {
      return `class Etudiant {

    String nom;
    double moyenne;

}`
    }
    if (view === 2) {
      return `class Etudiant {

    String nom;
    double moyenne;

    Etudiant(String nom, double moyenne) {
        this.nom = nom;
        this.moyenne = moyenne;
    }

}`
    }
    return FULL
  })()

  const hl =
    view === 0 ? [1] :
    view === 1 ? [3, 4] :
    view === 2 ? [6, 7, 8] :
    view === 3 ? [4] :
    [6]

  const notes = [
    { kicker: 'CLASS', note: 'La classe Etudiant — le modèle', color: BLUE },
    { kicker: 'ÉTAT', note: 'Les attributs décrivent l’état', color: BLUE },
    { kicker: 'CONSTRUCTION', note: 'Le constructeur initialise l’objet', color: VIOLET },
    { kicker: 'OBJECT', note: 'new crée une instance', color: ORANGE },
    { kicker: 'COMPORTEMENT', note: 'L’objet exécute un comportement', color: EMERALD },
  ]
  const n = notes[view]
  const showObject = view >= 3
  const showTerminal = view >= 4
  const showNewHint = view === 3

  const callouts = [
    { id: 'CLASS', show: view >= 0, title: 'CLASS', cap: 'Le modèle', color: BLUE },
    { id: 'OBJECT', show: view >= 3, title: 'OBJECT', cap: 'Une instance de la classe', color: ORANGE },
    { id: 'CTOR', show: view >= 2, title: 'CONSTRUCTOR', cap: "Initialise l'objet", color: VIOLET },
    { id: 'METHOD', show: view >= 4, title: 'METHOD', cap: "L'objet exécute un comportement", color: EMERALD },
  ]

  return (
    <div className="w-full h-full flex flex-col px-8 pt-3 pb-3" style={DARK_GRID}>
      <FsmCorner />

      <div className="flex items-center justify-between shrink-0 mb-3">
        <div>
          <p className="mono font-black tracking-widest mb-1" style={{ fontSize: 15, letterSpacing: '0.16em', color: EMERALD }}>
            PREMIER PROGRAMME · OOP
          </p>
          <p className="font-semibold" style={{ color: SUB, fontSize: 18 }}>
            <span className="mono font-black" style={{ color: n.color }}>{n.kicker}</span>
            <span style={{ color: MUTED }}> — </span>
            {n.note}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map(i => (
            <button key={i} type="button" onClick={() => setStep(i)}
              className="rounded-full h-2.5 transition-all"
              style={{ width: i === view ? 28 : 12, background: i <= view ? ORANGE : D4 }} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex flex-col justify-center gap-3 shrink-0" style={{ width: 168 }}>
          {callouts.map(c => (
            <div key={c.id}
              className="rounded-xl px-3 py-2.5 transition-all"
              style={{
                opacity: c.show ? 1 : 0.22,
                background: c.show ? c.color + '12' : D3,
                border: `1.5px solid ${c.show ? c.color : D4}`,
              }}>
              <p className="mono font-black tracking-wider"
                style={{ color: c.show ? c.color : MUTED, fontSize: 13, letterSpacing: '0.08em' }}>
                {c.title}
              </p>
              <p style={{ color: c.show ? SUB : MUTED, fontSize: 14, lineHeight: 1.3, marginTop: 2 }}>{c.cap}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-0 min-h-0 relative flex flex-col">
          <div className="flex-1 min-h-0">
            <OopEditor
              code={codeForStep}
              highlight={hl}
              activeLine={hl[0]}
              emphasizeNew={showNewHint}
              showTerminal={showTerminal}
              terminalOutput={showTerminal ? 'Etudiant : Sarra\nMoyenne : 14.5' : ''}
            />
          </div>
          {showNewHint && (
            <div className="absolute z-10 pointer-events-none"
              style={{ right: 24, top: 96, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="mono font-black px-2.5 py-1 rounded"
                style={{ background: ORANGE + '28', border: `2px solid ${ORANGE}`, color: ORANGE, fontSize: 15 }}>
                new
              </div>
              <div style={{ width: 2, height: 16, background: ORANGE }} />
              <p className="mono font-bold text-center leading-tight"
                style={{ color: ORANGE, fontSize: 12 }}>
                ↓<br />création<br />de l&apos;objet
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center shrink-0" style={{ width: 220 }}>
          {showObject ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2 mb-3 w-full">
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ORANGE})` }} />
                <span className="mono font-black" style={{ color: ORANGE, fontSize: 14 }}>→ e1</span>
              </div>
              <p className="mono font-black mb-2 self-start" style={{ color: ORANGE, fontSize: 22 }}>e1</p>
              <div className="w-full rounded-xl overflow-hidden"
                style={{ border: `2px solid ${ORANGE}`, boxShadow: `0 0 28px ${ORANGE}33`, background: D2 }}>
                <div className="px-4 py-2 mono font-black text-white" style={{ background: ORANGE, fontSize: 18 }}>
                  Etudiant
                </div>
                <div className="flex justify-between px-4 py-3" style={{ borderBottom: `1px solid ${D4}` }}>
                  <span className="mono" style={{ color: BLUE, fontSize: 16 }}>nom</span>
                  <span className="mono font-bold" style={{ color: OW, fontSize: 16 }}>&quot;Sarra&quot;</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="mono" style={{ color: BLUE, fontSize: 16 }}>moyenne</span>
                  <span className="mono font-bold" style={{ color: OW, fontSize: 16 }}>14.5</span>
                </div>
              </div>
              <p className="mono mt-3 text-center" style={{ color: MUTED, fontSize: 13 }}>CODE → OBJET</p>
            </div>
          ) : (
            <div className="w-full h-44 rounded-xl flex items-center justify-center"
              style={{ border: `1.5px dashed ${D4}`, background: D3 }}>
              <p className="mono text-center" style={{ color: MUTED, fontSize: 14 }}>objet<br />à venir</p>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between mt-3 gap-4">
        <p className="font-black tracking-tight"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 26, color: OW }}>
          UNE <span style={{ color: BLUE }}>CLASSE</span> DÉCRIT.
          {' '}UN <span style={{ color: ORANGE }}>OBJET</span> EXISTE ET AGIT.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => setStep(s => Math.max(s - 1, 0))} disabled={view === 0}
            className="px-4 py-2 rounded-xl mono font-bold text-sm"
            style={{ background: view === 0 ? 'transparent' : D3, color: view === 0 ? MUTED : OW, border: `1px solid ${D4}` }}>←</button>
          <button type="button" onClick={() => setStep(s => Math.min(s + 1, 4))} disabled={view === 4}
            className="px-4 py-2 rounded-xl mono font-bold text-sm"
            style={{ background: view === 4 ? 'transparent' : ORANGE, color: view === 4 ? MUTED : '#fff', border: `1px solid ${view === 4 ? D4 : ORANGE}` }}>→</button>
        </div>
      </div>
    </div>
  )
}

/** Éditeur OOP : même shell IntelliJ + emphase visuelle sur « new » */
function OopEditor({
  code, highlight, activeLine, emphasizeNew, showTerminal, terminalOutput,
}: {
  code: string
  highlight: number[]
  activeLine: number
  emphasizeNew?: boolean
  showTerminal?: boolean
  terminalOutput?: string
}) {
  const lines = code.split('\n')
  const fs = 22
  const lh = '2.05rem'
  const outLines = terminalOutput ? terminalOutput.split('\n').filter(Boolean) : []

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-2xl h-full"
      style={{ border: `1px solid ${E_BORD}` }}>
      <div className="flex items-center gap-0 shrink-0" style={{ background: '#161B22', borderBottom: `1px solid ${E_BORD}`, height: 40 }}>
        <div className="flex items-center gap-1.5 px-4">
          <span style={{ color: '#FF5F57', fontSize: 12 }}>●</span>
          <span style={{ color: '#FFBD2E', fontSize: 12 }}>●</span>
          <span style={{ color: '#28CA41', fontSize: 12 }}>●</span>
        </div>
        <div className="px-3 py-1 text-sm mono flex items-center gap-2"
          style={{ background: E_BG, borderRight: `1px solid ${E_BORD}`, color: '#8B949E', borderBottom: `2px solid ${ORANGE}` }}>
          <span style={{ color: ORANGE, fontWeight: 700 }}>Java</span>
          Main.java
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0" style={{ background: E_BG }}>
        <div className="shrink-0 pt-3 pb-2 pr-3 select-none text-right"
          style={{ width: 44, background: E_GUTTER, borderRight: `1px solid ${E_BORD}` }}>
          {lines.map((_, i) => (
            <div key={i} className="mono pr-1"
              style={{ lineHeight: lh, fontSize: fs - 2, color: highlight.includes(i + 1) || activeLine === i + 1 ? ORANGE + 'cc' : '#3B4252' }}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-auto py-3 pl-3">
          {lines.map((line, i) => {
            const n = i + 1
            const isActive = activeLine === n || highlight.includes(n)
            const hasNew = emphasizeNew && /\bnew\b/.test(line)
            let html = hi(line)
            if (hasNew) {
              html = html.replace(
                /<span class="kw">new<\/span>/,
                `<span class="kw" style="background:${ORANGE}44;border-radius:4px;padding:1px 5px;box-shadow:0 0 0 1.5px ${ORANGE}">new</span>`,
              )
            }
            return (
              <div key={i} className="relative"
                style={{ lineHeight: lh, background: isActive ? E_ACTIVE : 'transparent', paddingLeft: 8 }}>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: ORANGE }} />}
                <span className="mono whitespace-pre" style={{ fontSize: fs, color: '#D4D4D4' }}
                  dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            )
          })}
        </div>
      </div>

      {showTerminal && (
        <div className="shrink-0" style={{ background: '#0A0F1A', borderTop: `1px solid ${E_BORD}` }}>
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm mono"
            style={{ borderBottom: `1px solid ${E_BORD}`, color: '#3B4252' }}>
            <span style={{ color: EMERALD }}>▶</span> Terminal
            <span className="ml-auto mono font-bold" style={{ color: EMERALD, fontSize: 12 }}>✓ OK</span>
          </div>
          <div className="px-4 py-2.5 mono" style={{ fontSize: 20, lineHeight: 1.5 }}>
            <div>
              <span style={{ color: EMERALD }}>&gt; </span>
              <span style={{ color: '#D4D4D4' }}>Run Main</span>
            </div>
            {outLines.map((l, i) => (
              <div key={i} style={{ color: EMERALD }}>{l}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// SLIDE 11 — INSIDE THE JVM
function SlidePipeline() {
  const [step, setStep] = useState(0)
  const stages = [
    { label:'SOURCE', code:'.java', color:BLUE },
    { label:'COMPILATEUR', code:'javac', color:ORANGE },
    { label:'BYTECODE', code:'.class', color:VIOLET },
    { label:'JVM', code:'exec', color:RED },
    { label:'SORTIE', code:'✓', color:EMERALD },
  ]
  return (
    <div className="w-full h-full flex flex-col px-12 py-8" style={glowBg(ORANGE,'50%','80%')}>
      <FsmCorner />
      <div className="text-center mb-6 shrink-0">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>SOUS LE CAPOT</p>
        <h2 className="font-black" style={{ fontSize:58, color:OW, letterSpacing:'-2px' }}>
          Source → Bytecode → JVM
        </h2>
      </div>
      {/* Machine visual */}
      <div className="flex items-center justify-center gap-0 mb-8 shrink-0">
        {stages.map((s,i)=>(
          <div key={i} className="flex items-center">
            <button onClick={()=>setStep(i)}
              className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl transition-all"
              style={{ background: i===step?s.color+'22':D3, border:`2px solid ${i<=step?s.color:D4}`, opacity:i<=step?1:0.4, minWidth:100 }}>
              <span className="mono font-black text-2xl" style={{ color:i===step?s.color:MUTED }}>{s.code}</span>
              <span className="mono text-xs" style={{ color:i===step?OW:MUTED }}>{s.label}</span>
            </button>
            {i<stages.length-1 && (
              <div className="flex items-center mx-1">
                <div className="w-8 h-0.5" style={{ background:i<step?ORANGE:D4 }} />
                <div style={{ borderTop:'5px solid transparent', borderBottom:'5px solid transparent', borderLeft:`8px solid ${i<step?ORANGE:D4}` }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Detail */}
      <div className="flex flex-1 gap-8 items-stretch">
        <div className="flex-1">
          {step===0 && <Editor code={`public class Salem {\n    public static void main(String[] args) {\n        System.out.println("Salem");\n    }\n}`} filename="Salem.java" highlight={[1,2,3,4,5]} large />}
          {step===1 && (
            <div className="h-full rounded-2xl flex flex-col justify-center p-6"
              style={{ background:D2, border:`1px solid ${D4}` }}>
              <div className="mono text-xl" style={{ color:EMERALD }}>$ javac Salem.java</div>
              <div className="mono text-sm mt-3" style={{ color:SUB }}>Analyse… Vérification… Génération du bytecode…</div>
              <div className="mono font-bold mt-3" style={{ color:EMERALD }}>✓ Salem.class généré</div>
            </div>
          )}
          {step===2 && (
            <div className="h-full rounded-2xl p-6" style={{ background:VIOLET+'0c', border:`1.5px solid ${VIOLET}55` }}>
              <p className="mono font-bold mb-3" style={{ color:VIOLET }}>Salem.class — BYTECODE (indépendant de la plateforme)</p>
              <div className="grid grid-cols-8 gap-1 mono text-sm">
                {['ca','fe','ba','be','00','00','00','3d','00','1d','0a','00','02','00','03','07'].map((b,i)=>(
                  <span key={i} className="px-2 py-1 rounded text-center" style={{ background:i<4?VIOLET+'22':D3, color:i<4?VIOLET:SUB }}>{b}</span>
                ))}
              </div>
            </div>
          )}
          {step===3 && (
            <div className="h-full rounded-2xl p-5" style={{ background:RED+'08', border:`1.5px solid ${RED}44` }}>
              <p className="mono font-bold mb-4" style={{ color:RED }}>JVM — Java Virtual Machine</p>
              <div className="flex flex-col gap-2">
                {['Class Loader','Bytecode Verifier','Execution Engine','JIT Compiler','Garbage Collector'].map((c,i)=>(
                  <div key={i} className="flex gap-3 items-center rounded-xl px-4 py-3"
                    style={{ background:D3, border:`1px solid ${D4}` }}>
                    <span className="mono font-bold w-4 text-center" style={{ color:RED }}>{i+1}</span>
                    <span className="mono text-sm" style={{ color:OW }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step===4 && (
            <div className="grid grid-cols-4 gap-3 h-full">
              {['Windows','Linux','macOS','Android'].map(p=>(
                <div key={p} className="rounded-2xl flex flex-col items-center justify-center gap-2"
                  style={{ background:EMERALD+'0c', border:`1.5px solid ${EMERALD}55` }}>
                  <span className="mono font-black text-lg" style={{ color:EMERALD }}>Salem</span>
                  <span className="text-xs" style={{ color:SUB }}>{p}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-48 flex flex-col justify-center">
          <div className="rounded-2xl p-5 text-center shadow-xl"
            style={{ background:D3, border:`2px solid ${stages[step].color}55` }}>
            <p className="font-black text-4xl mb-2" style={{ color:stages[step].color }}>{stages[step].code}</p>
            <p className="mono font-bold text-sm mb-2" style={{ color:OW }}>{stages[step].label}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={()=>setStep(s=>Math.max(s-1,0))} disabled={step===0}
              className="flex-1 py-2.5 rounded-xl mono text-sm font-bold"
              style={{ background:step===0?'transparent':D3, color:step===0?MUTED:OW, border:`1px solid ${D4}` }}>←</button>
            <button onClick={()=>setStep(s=>Math.min(s+1,stages.length-1))} disabled={step===stages.length-1}
              className="flex-1 py-2.5 rounded-xl mono text-sm font-bold"
              style={{ background:step===stages.length-1?'transparent':ORANGE, color:'#fff', border:`1px solid ${step===stages.length-1?D4:ORANGE}` }}>→</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 12 — Architecture
function SlideArchitecture() {
  return (
    <div className="w-full h-full flex gap-12 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>ARCHITECTURE</p>
        <h2 className="font-black mb-6" style={{ fontSize:62, color:OW, letterSpacing:'-2px' }}>Structure d'un projet Java</h2>
        <div className="flex flex-col gap-3 mb-5">
          {['Une application Java = ensemble de fichiers .java','Chaque fichier contient une ou plusieurs classes','Au plus une classe public par fichier .java'].map((r,i)=>(
            <div key={i} className="flex items-center gap-4 rounded-xl px-5 py-4"
              style={{ background:D3, border:`1px solid ${D4}` }}>
              <span className="mono font-black text-3xl shrink-0" style={{ color:ORANGE }}>{i+1}</span>
              <span className="text-sm" style={{ color:OW }}>{r}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl px-5 py-4 flex gap-3" style={{ background:ORANGE+'18', border:`1.5px solid ${ORANGE}44` }}>
          <span style={{ color:ORANGE }}>!</span>
          <p className="text-sm" style={{ color:OW }}>Classe <span className="mono font-bold" style={{ color:ORANGE }}>public</span> → nom du fichier = nom de la classe</p>
        </div>
      </div>
      <div className="w-56">
        <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border:`1px solid ${D4}` }}>
          <div className="px-4 py-2.5 mono text-xs font-bold" style={{ background:D3, borderBottom:`1px solid ${D4}`, color:SUB }}>src/</div>
          <div className="p-4 mono text-sm leading-7" style={{ background:D2 }}>
            {[{d:0,t:'Point.java',c:BLUE},{d:1,t:'class Point',c:VIOLET},{d:1,t:'class Test',c:VIOLET},{d:0,t:'',c:''},{d:0,t:'javac',c:MUTED},{d:0,t:'',c:''},{d:0,t:'Point.class',c:ORANGE},{d:0,t:'Test.class',c:ORANGE}].map((l,i)=>l.t?(
              <div key={i} style={{ marginLeft:l.d*14, color:l.c }}>{l.t}</div>
            ):<div key={i} className="h-2" />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 13 — Identifiers
function SlideIdentifiers() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>CONVENTIONS</p>
      <h2 className="font-black mb-7" style={{ fontSize:62, color:LTEXT, letterSpacing:'-2px' }}>Nommage en Java</h2>
      <div className="grid grid-cols-2 gap-5 flex-1">
        {[
          { l:'Classes', ex:'UneClasse, Object, Cercle', n:'PascalCase — commence par une MAJUSCULE', c:BLUE },
          { l:'Méthodes & Variables', ex:'uneMethode(), uneVariable', n:'camelCase — commence par une minuscule', c:EMERALD },
          { l:'Constantes', ex:'UNE_CONSTANTE, MAX_SIZE', n:'SCREAMING_SNAKE_CASE', c:ORANGE },
          { l:'❌ Mauvais exemples', ex:'monClasse, Une_methode, 1var', n:'Convention incorrecte ou erreur de syntaxe', c:RED },
        ].map((r,i)=>(
          <div key={i} className="rounded-2xl p-5 shadow-sm"
            style={{ background:LCARD, border:`2px solid ${r.c}44` }}>
            <p className="font-bold text-base mb-1" style={{ color:r.c===RED?RED:LTEXT }}>{r.l}</p>
            <p className="mono font-black text-2xl mb-2" style={{ color:r.c }}>{r.ex}</p>
            <p className="text-sm" style={{ color:LSUB }}>{r.n}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 14 — Comments
function SlideComments() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:EMERALD }}>COMMENTAIRES</p>
      <h2 className="font-black mb-7" style={{ fontSize:62, color:OW }}>3 types de commentaires</h2>
      <div className="grid grid-cols-3 gap-5 flex-1">
        {[
          { t:'//', l:'Ligne simple', c:SUB, code:'// Voici un commentaire\n// Une autre ligne' },
          { t:'/* */', l:'Multi-lignes', c:BLUE, code:'/* Première ligne\n   Deuxième ligne\n   Fin */' },
          { t:'/** */', l:'Javadoc', c:ORANGE, code:'/**\n * @param p point\n * @return distance\n */' },
        ].map(t=>(
          <div key={t.t} className="rounded-2xl overflow-hidden flex flex-col" style={{ border:`1.5px solid ${t.c}55` }}>
            <div className="px-5 py-3 flex items-center gap-3" style={{ background:t.c+'18' }}>
              <span className="mono font-black text-2xl" style={{ color:t.c }}>{t.t}</span>
              <span className="font-semibold text-sm" style={{ color:OW }}>{t.l}</span>
            </div>
            <div className="flex-1 p-5" style={{ background:E_BG }}>
              <pre className="mono text-sm leading-6 whitespace-pre-wrap" style={{ color:'#6A9955', fontStyle:'italic' }}>{t.code}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 15 — Primitive Types
function SlidePrimitiveTypes() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>TYPES PRIMITIFS</p>
      <h2 className="font-black mb-7" style={{ fontSize:62, color:LTEXT, letterSpacing:'-2px' }}>Les types de base Java</h2>
      <div className="grid grid-cols-3 gap-5 flex-1">
        {[
          { g:'ENTIERS', c:BLUE, types:[{n:'byte',b:8,r:'−128 à 127'},{n:'short',b:16,r:'−32 768 à 32 767'},{n:'int',b:32,r:'±2 milliards'},{n:'long',b:64,r:'très grand — suffixe L'}] },
          { g:'FLOTTANTS', c:ORANGE, types:[{n:'float',b:32,r:'IEEE 754 — suffixe f'},{n:'double',b:64,r:'IEEE 754 (par défaut)'}] },
          { g:'AUTRES', c:VIOLET, types:[{n:'boolean',b:1,r:'true / false'},{n:'char',b:16,r:'Unicode 0–65535'}] },
        ].map(g=>(
          <div key={g.g} className="rounded-2xl overflow-hidden shadow-sm" style={{ border:`2px solid ${g.c}55`, background:LCARD }}>
            <div className="px-5 py-3" style={{ background:g.c+'14' }}>
              <span className="mono text-xs font-black tracking-widest" style={{ color:g.c }}>{g.g}</span>
            </div>
            {g.types.map(t=>(
              <div key={t.n} className="flex items-center gap-3 px-5 py-3 border-t" style={{ borderColor:LBORD }}>
                <span className="mono font-bold w-14" style={{ color:g.c }}>{t.n}</span>
                <span className="mono text-xs px-2 py-0.5 rounded-full font-bold" style={{ background:g.c+'18', color:g.c }}>{t.b}b</span>
                <span className="text-xs" style={{ color:LSUB }}>{t.r}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 16 — Casting
function SlideCasting() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>TRANSTYPAGE</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Conversion de types</h2>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="rounded-xl p-4" style={{ background:EMERALD+'10', border:`1.5px solid ${EMERALD}55` }}>
            <p className="mono font-bold mb-1" style={{ color:EMERALD }}>IMPLICITE — Sûr</p>
            <div className="mono text-sm flex flex-wrap gap-2">
              {['byte','→','short','→','int','→','long','→','double'].map((t,i)=>(
                <span key={i} style={{ color:i%2===0?BLUE:MUTED }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ background:RED+'10', border:`1.5px solid ${RED}55` }}>
            <p className="mono font-bold mb-1" style={{ color:RED }}>EXPLICITE — Risqué</p>
            <div className="mono text-sm" style={{ color:RED }}>int → (short) → perte possible</div>
          </div>
        </div>
        <Editor code={`int i = 60;\nshort b = (short)(i + 5);   // cast explicite\n\nint j = (int) 1.99;          // j = 1, pas 2 !`} filename="Cast.java" highlight={[2,4]} />
      </div>
      <div className="w-48 flex flex-col justify-center">
        <div className="rounded-2xl p-5 text-center shadow-xl" style={{ background:D3, border:`2px solid ${RED}55` }}>
          <p className="mono text-sm mb-3" style={{ color:SUB }}>float → int</p>
          <div className="font-black text-3xl mb-1" style={{ color:BLUE }}>1.99</div>
          <div className="my-2" style={{ color:ORANGE, fontSize:32 }}>↓</div>
          <div className="font-black text-3xl" style={{ color:ORANGE }}>1</div>
          <p className="mono text-xs mt-3 font-bold" style={{ color:RED }}>TRONCATURE !</p>
        </div>
      </div>
    </div>
  )
}

// SLIDE 17 — Cast Challenge
function SlideCastChallenge() {
  return (
    <ChallengeArena number={1}
      code={`byte b1 = 20;\nbyte b2 = 15;\nbyte b3 = b1 + b2;`}
      question="Que se passe-t-il lors de la compilation ?"
      options={['b3 vaut 35','Erreur de compilation','Erreur à l\'exécution','b3 vaut 0']}
      correctIndex={1}
      explanation="b1 + b2 produit un int (promotion arithmétique). Affecter un int à un byte sans cast explicite est une erreur de compilation."
    />
  )
}

// SLIDE 18 — Ch1 Recap
function SlideCh1Recap() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>RÉCAPITULATIF CH.1</p>
        <h2 className="font-black mb-6" style={{ fontSize:58, color:LTEXT }}>5 choses à retenir</h2>
        {[
          { n:1, t:'Java compile vers du bytecode exécuté par la JVM', c:ORANGE },
          { n:2, t:'Classe public → nom du fichier = nom de la classe', c:BLUE },
          { n:3, t:'Les types primitifs ont des tailles fixes en bits', c:VIOLET },
          { n:4, t:'Conversion implicite sûre ; explicite peut perdre des données', c:RED },
          { n:5, t:'byte + byte → int (promotion arithmétique)', c:EMERALD },
        ].map(r=>(
          <div key={r.n} className="flex gap-4 items-center mb-3 rounded-2xl px-5 py-4 shadow-sm"
            style={{ background:LCARD, border:`1.5px solid ${r.c}44` }}>
            <span className="mono font-black text-4xl shrink-0" style={{ color:r.c }}>{r.n}</span>
            <span className="font-medium" style={{ color:LTEXT }}>{r.t}</span>
          </div>
        ))}
      </div>
      <div className="w-52 flex flex-col gap-3 pt-10">
        <p className="mono text-xs font-black tracking-widest" style={{ fontSize: 16, letterSpacing: '0.16em',  color:LSUB }}>QUIZ RAPIDE</p>
        {[{q:'Extension bytecode ?',a:'.class'},{q:'Commande javac ?',a:'javac'},{q:'Rôle JVM ?',a:'Exécuter'},{q:'int→byte ?',a:'Explicite'}].map(item=>(
          <div key={item.q} className="rounded-xl p-3 shadow-sm" style={{ background:LCARD, border:`1px solid ${LBORD}` }}>
            <p className="text-xs mb-1" style={{ color:LSUB }}>{item.q}</p>
            <p className="mono font-bold" style={{ color:ORANGE }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 19 — Transition
function SlideTransition() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative" style={DARK_GRID}>
      <FsmCorner />
      <div className="w-16 h-1 rounded mb-8" style={{ background:`linear-gradient(to right,${ORANGE},${BLUE})` }} />
      <p className="text-xl italic mb-3 text-center" style={{ color:MUTED }}>Jusqu'ici, nous avons écrit du Java.</p>
      <p className="text-2xl mb-8 text-center" style={{ color:OW }}>
        Maintenant, nous allons <span style={{ color:ORANGE }}>modéliser le monde</span>.
      </p>
      <div className="font-black text-center leading-none"
        style={{ fontSize: 'clamp(62px, 8.64vw, 106px)', color:OW, letterSpacing:'-4px' }}>
        FROM CODE<br /><span style={{ color:ORANGE }}>TO OBJECTS.</span>
      </div>
    </div>
  )
}

// SLIDE 20 — Ch2 Opener
function SlideCh2Opening() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: BLUE }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />
      <FsmCorner dark={false} />
      <div className="absolute font-black select-none pointer-events-none"
        style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 340, color: '#00000014', letterSpacing: '-18px', right: '-4%', bottom: '-8%', lineHeight: 1 }}>
        02
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-20">
        <div className="w-16 h-1.5 rounded mb-6" style={{ background: '#ffffffcc' }} />
        <p className="mono font-black tracking-widest mb-4" style={{ color: '#ffffffcc', fontSize: 18, letterSpacing: '0.22em' }}>CHAPITRE 02</p>
        <h1 className="font-black mb-5 leading-none"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 92, color: '#fff', letterSpacing: '-0.04em' }}>
          Classes &amp; Objets
        </h1>
        <p style={{ color: '#ffffffee', maxWidth: 560, fontSize: 26, lineHeight: 1.45 }}>
          Du modèle à l&apos;instance — les fondations de la programmation orientée objet.
        </p>
      </div>
    </div>
  )
}

// SLIDE 21 — OOP Pillars
function SlideOopPillars() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>LES 4 PILIERS OOP</p>
      <h2 className="font-black mb-7" style={{ fontSize:62, color:OW }}>Programmation Orientée Objet</h2>
      <div className="grid grid-cols-4 gap-4 flex-1">
        {[
          { n:'Abstraction', c:ORANGE, focus:true, d:'Modéliser le réel en classes' },
          { n:'Encapsulation', c:BLUE, focus:true, d:'Protéger l\'état interne' },
          { n:'Héritage', c:MUTED, focus:false, d:'Réutilisation par extension' },
          { n:'Polymorphisme', c:MUTED, focus:false, d:'Un message, plusieurs comportements' },
        ].map(p=>(
          <div key={p.n} className="rounded-2xl p-5 flex flex-col gap-4"
            style={{ background:p.focus?p.c+'12':D2, border:`2px solid ${p.focus?p.c+'55':D4}`, opacity:p.focus?1:0.5 }}>
            <div className="w-6 h-1.5 rounded" style={{ background:p.c }} />
            <div>
              <p className="font-black text-xl mb-1" style={{ color:OW }}>{p.n}</p>
              {p.focus && <span className="mono text-xs px-2 py-0.5 rounded font-bold" style={{ background:p.c+'22', color:p.c }}>CH.2 FOCUS</span>}
            </div>
            <p className="text-sm" style={{ color:SUB }}>{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 22 — Problem First
function SlideProblemFirst() {
  return (
    <div className="w-full h-full flex gap-12 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:RED }}>LE PROBLÈME</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Imaginez 500 étudiants…</h2>
        <div className="rounded-2xl p-5 mb-5" style={{ background:RED+'0a', border:`1.5px solid ${RED}44` }}>
          <p className="mono font-bold mb-3 text-sm" style={{ color:RED }}>SANS CLASSE — ingérable</p>
          <div className="mono text-sm grid grid-cols-2 gap-4">
            {[['String nom1 = "Alice";','String nom2 = "Bob";','String nom3 = "…";','// × 500...'],
              ['double note1 = 14.5;','double note2 = 11.0;','double note3 = "…";','// × 500...']].map((col,ci)=>(
              <div key={ci}>{col.map((l,i)=><div key={i} style={{ color:i===3?RED:OW }}>{l}</div>)}</div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-bold" style={{ color:OW }}>Solution : une <span style={{ color:ORANGE }}>classe</span> comme modèle.</p>
      </div>
      <div className="w-56 flex flex-col justify-center">
        <div className="rounded-2xl p-6 text-center shadow-xl" style={{ border:`2px solid ${EMERALD}55`, background:EMERALD+'0a' }}>
          <p className="mono text-xs font-bold mb-4" style={{ color:EMERALD }}>AVEC UNE CLASSE</p>
          <div className="font-black text-4xl mb-1" style={{ color:OW }}>class</div>
          <div className="font-black text-4xl" style={{ color:ORANGE }}>Etudiant</div>
          <div className="mt-4 mono text-xs flex flex-col gap-1">
            {['nom : String','prenom : String','moyenne : double'].map(a=><div key={a} style={{color:BLUE}}>{a}</div>)}
            {['afficher()','calculerMention()'].map(m=><div key={m} style={{color:EMERALD,marginTop:4}}>{m}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 23 — CLASS VS OBJECT Blueprint
function SlideClassVsObject() {
  return (
    <div className="w-full h-full flex gap-0" style={DARK_GRID}>
      <FsmCorner />
      {/* Left — Blueprint */}
      <div className="flex-1 flex flex-col justify-center px-12 border-r" style={{ borderColor:D4 }}>
        <p className="mono text-xs font-black tracking-widest mb-4" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>CLASSE — BLUEPRINT</p>
        <div className="rounded-2xl overflow-hidden shadow-2xl mono text-base"
          style={{ border:`2px solid ${BLUE}55`, maxWidth:280 }}>
          <div className="px-5 py-3 font-black text-xl text-center"
            style={{ background:BLUE+'22', color:BLUE, borderBottom:`1.5px solid ${BLUE}44` }}>
            Point
          </div>
          <div className="px-5 py-3 border-b" style={{ borderColor:D4, background:D2 }}>
            <div style={{ color:ORANGE }}>x : int</div>
            <div style={{ color:ORANGE }}>y : int</div>
          </div>
          <div className="px-5 py-3" style={{ background:D2 }}>
            <div style={{ color:EMERALD }}>move(dx, dy)</div>
            <div style={{ color:EMERALD }}>display()</div>
          </div>
        </div>
        <p className="mt-5 text-sm" style={{ color:SUB }}>Existe une seule fois — définit la structure.</p>
      </div>

      {/* Center arrow */}
      <div className="flex flex-col items-center justify-center px-8">
        <div className="font-black text-base mono mb-2" style={{ color:MUTED }}>INSTANTIATES</div>
        <div className="flex items-center">
          <div className="h-0.5 w-12" style={{ background:ORANGE }} />
          <div style={{ borderTop:'7px solid transparent', borderBottom:'7px solid transparent', borderLeft:`12px solid ${ORANGE}` }} />
        </div>
      </div>

      {/* Right — Instances */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <p className="mono text-xs font-black tracking-widest mb-5" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>OBJETS — INSTANCES</p>
        <div className="flex flex-col gap-4">
          {[
            { id:'p1', x:'3', y:'4', c:ORANGE },
            { id:'p2', x:'9', y:'-5', c:VIOLET },
            { id:'p3', x:'0', y:'0', c:EMERALD },
          ].map(obj=>(
            <div key={obj.id} className="flex items-center gap-4">
              <HeapObj label={obj.id} fields={[{k:'x',v:obj.x},{k:'y',v:obj.y}]} color={obj.c} />
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm" style={{ color:SUB }}>Instances — données en mémoire.</p>
      </div>
    </div>
  )
}

// SLIDE 24 — Anatomy
function SlideAnatomy() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:VIOLET }}>ANATOMIE</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Anatomie d'une classe Java</h2>
        <Editor code={`class Point {\n\n    int x;          // attribut\n    int y;          // attribut\n\n    void afficher() {\n        // méthode\n    }\n\n    void deplacer(int dx, int dy) {\n        x += dx;   y += dy;\n    }\n}`} filename="Point.java" highlight={[3,4,6,10]} large />
      </div>
      <div className="w-56 flex flex-col gap-3 pt-10">
        {[
          { l:'Nom de classe', c:BLUE, ex:'class Point' },
          { l:'Attributs', c:ORANGE, ex:'int x, int y' },
          { l:'Méthodes', c:EMERALD, ex:'afficher(), deplacer()' },
          { l:'Paramètres', c:VIOLET, ex:'int dx, int dy' },
        ].map(a=>(
          <div key={a.l} className="flex gap-3 items-center rounded-xl px-4 py-3"
            style={{ background:D3, border:`1.5px solid ${a.c}44` }}>
            <div className="w-1 h-8 rounded shrink-0" style={{ background:a.c }} />
            <div>
              <p className="mono text-xs font-bold" style={{ color:a.c }}>{a.l}</p>
              <p className="mono text-sm" style={{ color:OW }}>{a.ex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 25 — Memory Arena (Object Creation)
function SlideObjectCreation() {
  return (
    <MemoryArena title="OBJECT CREATION LAB" steps={[
      { instruction:'Point p1;  // déclaration',
        stack:[{name:'p1',value:'null',active:true}], heap:[], refs:[], note:'p1 existe en mémoire mais ne pointe vers rien.' },
      { instruction:'p1 = new Point();  // instanciation',
        stack:[{name:'p1',value:'@A01',active:true}],
        heap:[{id:'p1',label:'Point',addr:'@A01',fields:[{k:'x',v:'0'},{k:'y',v:'0'}]}],
        refs:[{from:'p1',to:'Point',active:true}] },
      { instruction:'p1 = new Point(3, 4);  // constructeur paramétré',
        stack:[{name:'p1',value:'@B7F',active:true}],
        heap:[{id:'p1b',label:'Point',addr:'@B7F',fields:[{k:'x',v:'3',changed:true},{k:'y',v:'4',changed:true}]}],
        refs:[{from:'p1',to:'Point',active:true}], note:'Les attributs sont initialisés avec 3 et 4.' },
    ]} />
  )
}

// SLIDE 26 — Object Creation Sequence (new)
function SlideNewHero() {
  return <ObjectCreationSeq />
}

// SLIDE 27 — Memory Arena (References)
function SlideReferences() {
  return (
    <MemoryArena title="REFERENCE LAB" steps={[
      { instruction:'Point p1 = new Point(2, 3);',
        stack:[{name:'p1',value:'@A01',active:true}],
        heap:[{id:'obj1',label:'Point',addr:'@A01',fields:[{k:'x',v:'2'},{k:'y',v:'3'}]}],
        refs:[{from:'p1',to:'Point',active:true}] },
      { instruction:'Point p2 = p1;  // copie de référence !',
        stack:[{name:'p1',value:'@A01',active:true},{name:'p2',value:'@A01',active:true}],
        heap:[{id:'obj1',label:'Point',addr:'@A01',fields:[{k:'x',v:'2'},{k:'y',v:'3'}]}],
        refs:[{from:'p1 & p2',to:'Point',active:true}], note:'Deux variables, UN SEUL objet !' },
      { instruction:'p2.x = 10;  // modifie l\'objet partagé',
        stack:[{name:'p1',value:'@A01'},{name:'p2',value:'@A01',active:true}],
        heap:[{id:'obj1',label:'Point',addr:'@A01',fields:[{k:'x',v:'10',changed:true},{k:'y',v:'3'}]}],
        refs:[{from:'p1 & p2',to:'Point',active:true}], note:'p1.x vaut aussi 10 maintenant !' },
    ]} />
  )
}

// SLIDE 28 — Two Refs Hero
function SlideTwoRefsHero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={DARK_GRID}>
      <FsmCorner />
      <div className="w-16 h-1.5 rounded mb-6" style={{ background:ORANGE }} />
      <div className="font-black text-center leading-none" style={{ fontSize: 'clamp(62px, 8.64vw, 110px)', color:OW, letterSpacing:'-4px' }}>
        DEUX RÉFÉRENCES.
      </div>
      <div className="font-black text-center leading-none mt-2" style={{ fontSize: 'clamp(62px, 8.64vw, 110px)', color:ORANGE, letterSpacing:'-4px' }}>
        UN SEUL OBJET.
      </div>
      <div className="w-16 h-1.5 rounded mt-6" style={{ background:ORANGE }} />
    </div>
  )
}

// SLIDE 29 — Ref Challenge
function SlideRefChallenge() {
  return (
    <ChallengeArena number={2}
      code={`Point p1 = new Point(2, 3);\nPoint p2 = p1;\n\np2.x = 10;\n\nSystem.out.println(p1.x);`}
      question="Que s'affiche ?"
      options={['2','3','10','Erreur de compilation']}
      correctIndex={2}
      explanation={'p2 = p1 copie la référence, pas l\'objet. Les deux variables pointent vers le même objet en mémoire. Modifier p2.x modifie aussi p1.x.'}
    />
  )
}

// SLIDE 30 — Constructor Hero
function SlideConstructorHero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={glowBg(BLUE,'50%','30%')}>
      <FsmCorner />
      <p className="mono font-black tracking-widest mb-5" style={{ fontSize:22, color:BLUE }}>COMMENT UN OBJET PREND VIE</p>
      <div className="font-black text-center leading-none"
        style={{ fontSize: 'clamp(69px, 10.8vw, 132px)', color:OW, letterSpacing:'-5px' }}>
        CONSTRUCTOR
      </div>
      <div className="mt-8 flex flex-col items-center gap-0 mono">
        {['new Point(3, 4)', null, 'Constructeur appelé', null, 'x=3, y=4 initialisés'].map((item,i)=>
          item===null
            ? <div key={i} className="w-0.5 h-6 my-0.5" style={{ background:ORANGE }} />
            : <div key={i} className="px-6 py-2.5 rounded-xl font-bold text-base"
                style={{ background: i===2?BLUE+'22':D3, border:`1.5px solid ${i===2?BLUE+88:D4}`, color:i===2?BLUE:SUB, minWidth:260, textAlign:'center' }}>
                {item}
              </div>
        )}
      </div>
    </div>
  )
}

// SLIDE 31 — Constructors (split code)
function SlideConstructors() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>CONSTRUCTEUR</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Le constructeur</h2>
        <Editor code={`class Point {\n    int x, y;\n\n    // Constructeur\n    Point(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n}`} filename="Point.java" highlight={[4,5,6,7,8]} large />
      </div>
      <div className="w-60 flex flex-col gap-4 pt-10">
        <div className="rounded-2xl p-5 shadow-xl" style={{ background:D3, border:`1.5px solid ${ORANGE}55` }}>
          <p className="mono text-xs font-bold mb-3" style={{ color:ORANGE }}>RÈGLES</p>
          {['Même nom que la classe','Aucun type de retour','Initialise l\'état de l\'objet'].map(r=>(
            <div key={r} className="flex gap-2 text-sm mb-2">
              <span style={{ color:ORANGE }}>›</span>
              <span style={{ color:OW }}>{r}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-4" style={{ background:D3, border:`1px solid ${D4}` }}>
          {['new Point(3, 4)', null, 'Point(int x, int y)', null, 'x=3 • y=4'].map((item,i)=>
            item===null
              ? <div key={i} className="flex justify-center my-1"><span style={{ color:ORANGE }}>↓</span></div>
              : <div key={i} className="mono text-sm px-3 py-2 rounded-xl text-center"
                  style={{ background:i===2?ORANGE+'18':D2, color:i===2?ORANGE:SUB, border:`1px solid ${i===2?ORANGE+33:D4}` }}>
                  {item}
                </div>
          )}
        </div>
      </div>
    </div>
  )
}

// SLIDE 32 — Multiple Constructors
function SlideMultipleConstructors() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>SURCHARGE</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Constructeurs multiples</h2>
        <Editor code={`class Point {\n    int x, y;\n\n    Point() {                        // (0,0)\n        x = 0; y = 0;\n    }\n\n    Point(int x, int y) {            // paramétré\n        this.x = x; this.y = y;\n    }\n\n    Point(Point p) {                 // copie\n        this.x = p.x; this.y = p.y;\n    }\n}`} filename="Point.java" highlight={[4,8,12]} large />
      </div>
      <div className="w-60 flex flex-col gap-3 pt-10">
        {[{call:'new Point()',c:BLUE},{call:'new Point(3, 4)',c:ORANGE},{call:'new Point(p1)',c:VIOLET}].map(c=>(
          <div key={c.call} className="rounded-xl px-4 py-3" style={{ background:D3, border:`1.5px solid ${c.c}55` }}>
            <span className="mono font-bold" style={{ color:c.c }}>{c.call}</span>
          </div>
        ))}
        <p className="text-sm mt-2" style={{ color:SUB }}>Java choisit selon les paramètres.</p>
      </div>
    </div>
  )
}

// SLIDE 33 — THIS Break
function SlideThisHero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={DARK_GRID}>
      <FsmCorner />
      <div className="w-14 h-1 rounded mb-6" style={{ background:ORANGE }} />
      <div className="font-black text-center leading-none" style={{ fontSize: 'clamp(92px, 12.96vw, 170px)', color:ORANGE, letterSpacing:'-6px' }}>
        this
      </div>
      <div className="font-black text-center mt-2" style={{ fontSize: 'clamp(36px, 4.32vw, 62px)', color:OW, letterSpacing:'-2px' }}>
        MEANS THIS OBJECT.
      </div>
      <div className="w-14 h-1 rounded mt-6" style={{ background:ORANGE }} />
    </div>
  )
}

// SLIDE 34 — THIS Simulator
function SlideThis() { return <ThisSimulator /> }

// SLIDE 35 — Arrays Visualizer
function SlideArrays() {
  const [sorted, setSorted] = useState(false)
  const arr = sorted ? [1,6,8] : [8,6,1]
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>ARRAY VISUALIZER</p>
      <h2 className="font-black mb-6" style={{ fontSize:58, color:OW }}>Les tableaux Java</h2>
      <div className="flex gap-10 flex-1">
        <div className="flex-1">
          {/* Large array visual */}
          <div className="mb-5">
            <div className="flex gap-2 mb-2">
              {arr.map((v,i)=>(
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-xl py-5 text-center font-black text-5xl shadow-lg transition-all"
                    style={{ background:BLUE+'22', border:`2px solid ${BLUE}`, color:OW }}>
                    {v}
                  </div>
                  <div className="mono text-sm mt-1.5" style={{ color:SUB }}>[{i}]</div>
                </div>
              ))}
            </div>
            <p className="mono text-xs text-right" style={{ color:MUTED }}>int[] primes = {sorted?'{1,6,8}':'{8,6,1}'}; // length = 3</p>
          </div>
          {/* Code */}
          <Editor code={`int[] tab = new int[3];\n// [0] [0] [0]\n\nint[] primes = {8, 6, 1};\n\nArrays.sort(primes);  // [1, 6, 8]`} filename="Arrays.java" highlight={sorted?[6]:[4]} />
          {/* Sort button */}
          <div className="flex gap-3 mt-4">
            <button onClick={()=>setSorted(s=>!s)}
              className="px-6 py-2.5 rounded-xl mono font-bold text-sm"
              style={{ background:BLUE, color:'#fff', border:`1.5px solid ${BLUE}` }}>
              {sorted ? '▶ Reset' : '▶ Arrays.sort()'}
            </button>
          </div>
        </div>
        <div className="w-52">
          <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color:MUTED }}>UTILITAIRES</p>
          {['Arrays.sort()','Arrays.fill()','Arrays.equals()','Arrays.copyOf()','Arrays.binarySearch()'].map(m=>(
            <div key={m} className="mono text-sm px-3 py-2.5 rounded-xl mb-1.5"
              style={{ background:D3, border:`1px solid ${D4}`, color:SUB }}>{m}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// SLIDE 36 — String Memory Experiment
function SlideString() {
  return (
    <div className="w-full h-full flex gap-0" style={DARK_GRID}>
      <FsmCorner />
      {/* Left — code */}
      <div className="flex-1 px-10 py-10 border-r" style={{ borderColor:D4 }}>
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>STRING MEMORY</p>
        <h2 className="font-black mb-5" style={{ fontSize:53, color:OW }}>La classe String</h2>
        <Editor code={`String s1 = "Bonjour";\nString s2 = "Bonjour";\n// s1 et s2 → même objet\n\nString s3 = new String("Bonjour");\n// s3 → NOUVEL objet`} filename="Strings.java" highlight={[1,2,5]} large />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl p-3" style={{ background:EMERALD+'10', border:`1px solid ${EMERALD}44` }}>
            <p className="mono text-xs font-bold mb-1" style={{ color:EMERALD }}>STRING POOL</p>
            <p className="text-xs" style={{ color:OW }}>s1 et s2 partagent le même littéral.</p>
          </div>
          <div className="rounded-xl p-3" style={{ background:ORANGE+'10', border:`1px solid ${ORANGE}44` }}>
            <p className="mono text-xs font-bold mb-1" style={{ color:ORANGE }}>new String()</p>
            <p className="text-xs" style={{ color:OW }}>Crée un nouvel objet dans le heap.</p>
          </div>
        </div>
      </div>
      {/* Right — memory zones */}
      <div className="w-80 px-8 py-10 flex flex-col gap-5">
        <div className="rounded-2xl p-4" style={{ background:D3, border:`1.5px solid ${BLUE}55` }}>
          <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>STRING POOL</p>
          <div className="flex flex-col gap-2 mono text-sm">
            <div className="flex items-center gap-2"><span style={{ color:VIOLET }}>s1 ──┐</span></div>
            <div className="flex items-center gap-2 ml-6">
              <span style={{ color:MUTED }}>├──→</span>
              <span className="px-2 py-1 rounded" style={{ background:EMERALD+'22', color:EMERALD }}>"Bonjour"</span>
            </div>
            <div className="flex items-center gap-2"><span style={{ color:VIOLET }}>s2 ──┘</span></div>
          </div>
        </div>
        <div className="rounded-2xl p-4" style={{ background:D3, border:`1.5px solid ${ORANGE}55` }}>
          <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>HEAP</p>
          <div className="flex flex-col gap-2 mono text-sm">
            <div className="flex items-center gap-2">
              <span style={{ color:VIOLET }}>s3 ──→</span>
              <span className="px-2 py-1 rounded" style={{ background:ORANGE+'22', color:ORANGE }}>"Bonjour"</span>
            </div>
            <p className="text-xs mt-1" style={{ color:MUTED }}>Objet séparé</p>
          </div>
        </div>
        <div className="mono text-xs" style={{ color:MUTED }}>
          {['length()','charAt(i)','substring()','toUpperCase()','equals()','contains()'].map(m=>(
            <div key={m} className="px-2 py-1.5 rounded mb-1" style={{ background:D2, color:SUB }}>{m}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// SLIDE 37 — STRING IS IMMUTABLE
function SlideStringImmutableHero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={DARK_GRID}>
      <FsmCorner />
      <div className="w-14 h-1 rounded mb-6" style={{ background:BLUE }} />
      <div className="font-black text-center leading-none" style={{ fontSize: 'clamp(80px, 11.88vw, 138px)', color:OW, letterSpacing:'-5px' }}>
        STRING
      </div>
      <div className="font-black text-center mt-1" style={{ fontSize: 'clamp(46px, 5.4vw, 83px)', color:BLUE, letterSpacing:'-2px' }}>
        IS IMMUTABLE.
      </div>
      <p className="mt-8 text-center" style={{ color:SUB, maxWidth:480, fontSize:25 }}>
        Toute "modification" crée un <em>nouvel objet</em>.<br />L'original reste intact.
      </p>
      <div className="w-14 h-1 rounded mt-6" style={{ background:BLUE }} />
    </div>
  )
}

// SLIDE 38 — == vs equals() dramatic
function SlideEqualsHero() {
  return (
    <div className="w-full h-full flex" style={DARK_GRID}>
      <FsmCorner />
      {/* Left == */}
      <div className="flex-1 flex flex-col items-center justify-center border-r px-10"
        style={{ borderColor:D4 }}>
        <div className="font-black leading-none mb-3" style={{ fontSize: 'clamp(92px, 12.96vw, 148px)', color:RED, letterSpacing:'-4px' }}>==</div>
        <p className="mono font-black text-xl mb-4" style={{ color:OW }}>SAME OBJECT?</p>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {[{ref:'s1',addr:'@A01'},{ref:'s2',addr:'@B42'}].map(r=>(
            <div key={r.ref} className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background:D3, border:`1px solid ${D4}` }}>
              <span className="mono font-bold" style={{ color:VIOLET }}>{r.ref}</span>
              <div className="flex items-center gap-1">
                <div className="h-0.5 w-8" style={{ background:MUTED }} />
                <div style={{ borderTop:'4px solid transparent', borderBottom:'4px solid transparent', borderLeft:`6px solid ${MUTED}` }} />
              </div>
              <span className="mono text-sm" style={{ color:MUTED }}>{r.addr}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 px-4 py-2 rounded-xl mono font-black text-xl" style={{ background:RED+'22', color:RED, border:`1.5px solid ${RED}55` }}>false</div>
      </div>
      {/* Center divider */}
      <div className="flex items-center px-4">
        <div className="font-black text-6xl" style={{ color:MUTED }}>≠</div>
      </div>
      {/* Right .equals() */}
      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <div className="font-black leading-none mb-3" style={{ fontSize: 'clamp(62px, 8.64vw, 110px)', color:EMERALD, letterSpacing:'-3px' }}>.equals()</div>
        <p className="mono font-black text-xl mb-4" style={{ color:OW }}>SAME VALUE?</p>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {[{ref:'s1',val:'"Java"'},{ref:'s2',val:'"Java"'}].map(r=>(
            <div key={r.ref} className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background:D3, border:`1px solid ${D4}` }}>
              <span className="mono font-bold" style={{ color:VIOLET }}>{r.ref}</span>
              <span className="mono text-sm ml-auto" style={{ color:EMERALD }}>{r.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 px-4 py-2 rounded-xl mono font-black text-xl" style={{ background:EMERALD+'22', color:EMERALD, border:`1.5px solid ${EMERALD}55` }}>true</div>
      </div>
    </div>
  )
}

// SLIDE 39 — String Challenge
function SlideStringChallenge() {
  return (
    <ChallengeArena number={3}
      code={`String a = new String("Java");\nString b = new String("Java");`}
      question="Que valent a == b et a.equals(b) ?"
      options={['true / true','false / false','false / true','true / false']}
      correctIndex={2}
      explanation={'a == b compare les références (deux new → deux objets différents → false). a.equals(b) compare le contenu ("Java" == "Java" → true).'}
    />
  )
}

// SLIDE 40 — StringBuilder
function SlideStringBuilder() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>STRINGBUILDER</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>String vs StringBuilder</h2>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="rounded-xl p-4" style={{ background:RED+'0a', border:`1.5px solid ${RED}44` }}>
            <p className="mono font-bold mb-1" style={{ color:RED }}>String — Immuable</p>
            <p className="text-xs" style={{ color:OW }}>Chaque concat = nouvel objet en mémoire</p>
          </div>
          <div className="rounded-xl p-4" style={{ background:EMERALD+'0a', border:`1.5px solid ${EMERALD}44` }}>
            <p className="mono font-bold mb-1" style={{ color:EMERALD }}>StringBuilder — Modifiable</p>
            <p className="text-xs" style={{ color:OW }}>Modifie le même buffer — efficace</p>
          </div>
        </div>
        <Editor code={`StringBuilder sb = new StringBuilder("Java");\nsb.append(" SE");         // "Java SE"\nsb.insert(4, " 21");      // "Java 21 SE"\nsb.replace(5, 7, "23");   // "Java 23 SE"\nsb.delete(7, 10);         // "Java 23"\nString result = sb.toString();`} filename="Builder.java" highlight={[2,3,4,5]} large />
      </div>
      <div className="w-48 pt-10">
        {['append()','insert()','replace()','delete()','reverse()','toString()'].map(m=>(
          <div key={m} className="mono text-sm px-3 py-2.5 rounded-xl mb-1.5"
            style={{ background:D3, border:`1px solid ${D4}`, color:SUB }}>{m}</div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 41 — Overloading
function SlideOverloading() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>SURCHARGE</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Surcharge de méthodes</h2>
        <Editor code={`class Point {\n\n    void deplacer(int dx, int dy) {\n        x += dx;\n        y += dy;\n    }\n\n    void deplacer(Point p) {\n        x += p.x;\n        y += p.y;\n    }\n}`} filename="Point.java" highlight={[3,8]} large />
      </div>
      <div className="w-64 flex flex-col gap-4 pt-10">
        <div className="rounded-2xl p-5 shadow-xl" style={{ background:D3, border:`2px solid ${ORANGE}55` }}>
          <p className="font-black text-2xl mb-2" style={{ color:ORANGE }}>OVERLOADING</p>
          <p className="text-sm" style={{ color:OW }}>Même nom, <strong>signatures différentes</strong>.</p>
        </div>
        <div className="rounded-xl p-4" style={{ background:RED+'0a', border:`1px solid ${RED}44` }}>
          <p className="mono text-xs font-bold mb-1" style={{ color:RED }}>INTERDIT</p>
          <p className="text-xs" style={{ color:OW }}>Changer uniquement le type de retour n'est <strong>pas</strong> une surcharge.</p>
        </div>
      </div>
    </div>
  )
}

// SLIDE 42 — STATIC Break
function SlideStaticHero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={DARK_GRID}>
      <FsmCorner />
      <div className="w-14 h-1 rounded mb-6" style={{ background:BLUE }} />
      <div className="font-black text-center leading-none" style={{ fontSize: 'clamp(92px, 12.96vw, 159px)', color:BLUE, letterSpacing:'-6px' }}>
        static
      </div>
      <div className="font-black text-center mt-2" style={{ fontSize: 'clamp(36px, 4.32vw, 62px)', color:OW, letterSpacing:'-2px' }}>
        BELONGS TO THE CLASS.
      </div>
      <div className="w-14 h-1 rounded mt-6" style={{ background:BLUE }} />
    </div>
  )
}

// SLIDE 43 — Static Universe
function SlideStatic() { return <StaticUniverse /> }

// SLIDE 44 — Parameters
function SlideParameters() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>PASSAGE DE PARAMÈTRES</p>
      <h2 className="font-black mb-6" style={{ fontSize:58, color:LTEXT }}>Comment Java passe les paramètres</h2>
      <div className="grid grid-cols-2 gap-6 flex-1">
        <div className="rounded-2xl p-5 shadow-sm flex flex-col gap-3" style={{ background:LCARD, border:`2px solid ${BLUE}55` }}>
          <p className="mono font-black text-lg" style={{ color:BLUE }}>Type primitif</p>
          <p className="text-sm" style={{ color:LSUB }}>Copie de la <strong>valeur</strong>. L'original est intact.</p>
          <Editor code={`void add(int n) {\n    n = n + 1; // local\n}\nint x = 5;\nadd(x);\n// x vaut encore 5`} />
        </div>
        <div className="rounded-2xl p-5 shadow-sm flex flex-col gap-3" style={{ background:LCARD, border:`2px solid ${ORANGE}55` }}>
          <p className="mono font-black text-lg" style={{ color:ORANGE }}>Objet (référence)</p>
          <p className="text-sm" style={{ color:LSUB }}>Copie de la <strong>référence</strong>. L'objet peut être modifié.</p>
          <Editor code={`void reset(Point p) {\n    p.x = 0; // modifie\n}\nPoint p1 = new Point(3,4);\nreset(p1);\n// p1.x vaut maintenant 0`} />
        </div>
      </div>
    </div>
  )
}

// SLIDE 45 — Packages
function SlidePackages() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>PACKAGES</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Organisation par packages</h2>
        <Editor code={`package vehicule;\n\nimport java.util.ArrayList;\nimport java.util.*;        // tout le package\n\npublic class Voiture {\n    // ...\n}`} filename="Voiture.java" highlight={[1,3,4]} large />
      </div>
      <div className="w-60 pt-10">
        <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border:`1px solid ${D4}` }}>
          <div className="px-4 py-2.5 mono text-xs font-bold" style={{ background:D3, borderBottom:`1px solid ${D4}`, color:SUB }}>📁 Projet</div>
          <div className="p-4 mono text-sm leading-7" style={{ background:D2 }}>
            {[{d:0,t:'src',c:BLUE},{d:1,t:'vehicule',c:BLUE},{d:2,t:'Voiture.java',c:EMERALD},{d:2,t:'Moto.java',c:EMERALD},{d:2,t:'voiture',c:BLUE},{d:3,t:'VoitureEssence.java',c:EMERALD}].map((f,i)=>(
              <div key={i} style={{ marginLeft:f.d*14, color:f.c }}>{f.t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 46 — PRIVATE Break
function SlidePrivateHero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={DARK_GRID}>
      <FsmCorner />
      <div className="w-14 h-1 rounded mb-6" style={{ background:RED }} />
      <div className="font-black text-center leading-none" style={{ fontSize: 'clamp(92px, 12.96vw, 159px)', color:RED, letterSpacing:'-6px' }}>
        private
      </div>
      <div className="font-black text-center mt-2" style={{ fontSize: 'clamp(36px, 4.32vw, 62px)', color:OW, letterSpacing:'-2px' }}>
        PROTECTS STATE.
      </div>
      <div className="w-14 h-1 rounded mt-6" style={{ background:RED }} />
    </div>
  )
}

// SLIDE 47 — Encapsulation Shield
function SlideEncapsulation() {
  const [phase, setPhase] = useState<'broken'|'fixed'>('broken')
  return (
    <div className="w-full h-full flex gap-0" style={DARK_GRID}>
      <FsmCorner />
      {/* Left — toggle */}
      <div className="flex flex-col justify-center items-center px-8 border-r" style={{ width:200, borderColor:D4 }}>
        <p className="mono text-xs font-black tracking-widest mb-4" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>ENCAPSULATION</p>
        <button onClick={()=>setPhase(p=>p==='broken'?'fixed':'broken')}
          className="px-5 py-2.5 rounded-xl mono font-bold text-sm mb-3"
          style={{ background:phase==='fixed'?EMERALD:RED, color:'#fff' }}>
          {phase==='broken'?'BROKEN':'FIXED'}
        </button>
        <p className="text-xs text-center" style={{ color:SUB }}>Cliquez pour toggler</p>
        <div className="mt-8 text-center">
          <p className="font-black text-xl" style={{ color:OW }}>CONTROL</p>
          <p className="font-black text-xl" style={{ color:ORANGE }}>THE GATEWAY.</p>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 flex gap-8 px-10 py-10 items-center">
        {phase === 'broken' ? (
          <>
            <div className="flex-1">
              <p className="mono text-xs font-bold mb-3" style={{ color:RED }}>DESIGN BRISÉ — état exposé</p>
              <Editor code={`class Point {\n    public double rho; // exposé !\n}\n\n// Code externe :\np.rho = -1; // invalide !`} filename="Point.java" highlight={[2,6]} />
            </div>
            <div className="w-56 text-center">
              <HeapObj label="Point" addr="@A01" fields={[{k:'rho',v:'-1 ⚠',changed:true}]} color={RED} glow large />
              <p className="mono text-sm font-bold mt-4" style={{ color:RED }}>STATE CORRUPTED</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1">
              <p className="mono text-xs font-bold mb-3" style={{ color:EMERALD }}>DESIGN PROTÉGÉ — accès contrôlé</p>
              <Editor code={`class Point {\n    private double rho;\n\n    public void setRho(double v) {\n        if (v >= 0) rho = v; // gate\n    }\n}`} filename="Point.java" highlight={[2,4,5]} />
            </div>
            <div className="w-56 flex flex-col items-center gap-2">
              <div className="rounded-xl px-4 py-2 mono text-sm" style={{ background:D3, border:`1px solid ${D4}`, color:SUB }}>setRho(5)</div>
              <div style={{ color:ORANGE, fontSize:27 }}>↓</div>
              <div className="rounded-xl px-4 py-2 mono text-sm" style={{ background:ORANGE+'18', border:`1.5px solid ${ORANGE}44`, color:ORANGE }}>validation gate</div>
              <div style={{ color:EMERALD, fontSize:27 }}>↓</div>
              <HeapObj label="Point" fields={[{k:'rho',v:'5',changed:true}]} color={EMERALD} glow large />
              <p className="mono text-sm font-bold mt-2" style={{ color:EMERALD }}>STATE SAFE</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// SLIDE 48 — Visibility
function SlideVisibility() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>MODIFICATEURS D'ACCÈS</p>
      <h2 className="font-black mb-6" style={{ fontSize:58, color:LTEXT }}>Visibilité des membres</h2>
      <div className="flex-1 rounded-2xl overflow-hidden shadow-lg" style={{ border:`1.5px solid ${LBORD}` }}>
        <div className="grid grid-cols-5 text-xs mono font-black uppercase tracking-widest px-8 py-4"
          style={{ background:LTEXT, color:'#fff' }}>
          {['Modificateur','Classe','Package','Sous-classe','Partout'].map(h=>(
            <span key={h} style={{ color: h==='Modificateur'?AMBER:OW }}>{h}</span>
          ))}
        </div>
        {[
          { mod:'public', same:true, pkg:true, sub:true, all:true, c:EMERALD },
          { mod:'protected', same:true, pkg:true, sub:true, all:false, c:BLUE },
          { mod:'default', same:true, pkg:true, sub:false, all:false, c:ORANGE },
          { mod:'private', same:true, pkg:false, sub:false, all:false, c:RED },
        ].map(r=>(
          <div key={r.mod} className="grid grid-cols-5 items-center px-8 py-5 border-t"
            style={{ borderColor:LBORD, background:LCARD }}>
            <span className="mono font-black text-xl" style={{ color:r.c }}>{r.mod}</span>
            {[r.same,r.pkg,r.sub,r.all].map((v,i)=>(
              <span key={i} className="text-xl font-bold" style={{ color:v?EMERALD:LBORD }}>{v?'✔':'✗'}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 49 — Getters & Setters
function SlideGettersSetters() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:BLUE }}>GETTERS & SETTERS</p>
        <h2 className="font-black mb-5" style={{ fontSize:58, color:OW }}>Accès contrôlé</h2>
        <Editor code={`class Point {\n    private int x;\n    private int y;\n\n    public int getX() { return x; }\n    public int getY() { return y; }\n\n    public void setX(int value) {\n        if (value >= 0) this.x = value;\n    }\n}`} filename="Point.java" highlight={[5,6,8,9,10]} large />
      </div>
      <div className="w-56 flex flex-col gap-4 pt-10">
        {[
          { t:'LECTURE', color:BLUE, items:['getX() → x','getY() → y'] },
          { t:'ÉCRITURE', color:ORANGE, items:['setX(val)','→ validation','→ private x'] },
        ].map(section=>(
          <div key={section.t} className="rounded-2xl p-4" style={{ background:D3, border:`1.5px solid ${section.color}55` }}>
            <p className="mono text-xs font-bold mb-3" style={{ color:section.color }}>{section.t}</p>
            {section.items.map((item,i)=>(
              <div key={i}>
                {i>0 && <div className="flex justify-center my-0.5"><span style={{ color:section.color, fontSize:22 }}>↓</span></div>}
                <div className="rounded-xl px-3 py-2 mono text-xs text-center"
                  style={{ background:section.color+'12', color:section.color }}>{item}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 50 — Encapsulation Benefit
function SlideEncapsulationBenefit() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:EMERALD }}>COUPLAGE RÉDUIT</p>
      <h2 className="font-black mb-5" style={{ fontSize:53, color:LTEXT }}>Interface stable, implémentation flexible</h2>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="rounded-2xl p-5 flex flex-col gap-3 shadow-sm" style={{ background:LCARD, border:`2px solid ${BLUE}55` }}>
          <p className="mono text-xs font-bold" style={{ color:BLUE }}>Implémentation A</p>
          <Editor code={`class Segment {\n    private Point p1, p2;\n}`} />
        </div>
        <div className="rounded-2xl p-5 flex flex-col gap-3 shadow-sm" style={{ background:LCARD, border:`2px solid ${ORANGE}55` }}>
          <p className="mono text-xs font-bold" style={{ color:ORANGE }}>Implémentation B</p>
          <Editor code={`class Segment {\n    private Point[] tab;\n}`} />
        </div>
      </div>
      <div className="rounded-2xl p-5 shadow-sm flex gap-3" style={{ background:EMERALD+'0c', border:`1.5px solid ${EMERALD}55` }}>
        <div>
          <p className="mono text-xs font-bold mb-2" style={{ color:EMERALD }}>INTERFACE PUBLIQUE — identique :</p>
          <div className="flex gap-2 flex-wrap">
            {['getStart()','getEnd()','length()','contains(Point p)'].map(m=>(
              <span key={m} className="mono text-sm px-3 py-1 rounded-full font-bold" style={{ background:EMERALD+'18', color:EMERALD, border:`1px solid ${EMERALD}44` }}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// SLIDE 51 — Campus Java (Project Story)
function SlideCampusHud() {
  const done = ['Classe Etudiant','Constructeur','Encapsulation','Static counter']
  const all = ['Classe Etudiant','Constructeur','Encapsulation','Static counter','Défi final']
  const nodes = [
    { l:'Student', x:50, y:25, done:true },
    { l:'Course', x:80, y:55, done:false },
    { l:'Teacher', x:20, y:55, done:false },
    { l:'Group', x:50, y:80, done:false },
  ]
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      {/* Architecture diagram */}
      <div className="flex-1 flex flex-col">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>MINI-PROJET</p>
        <h2 className="font-black mb-6" style={{ fontSize:58, color:OW }}>CAMPUS JAVA</h2>
        <div className="flex-1 relative">
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full">
            {nodes.slice(1).map(n=>(
              <line key={n.l} x1="50%" y1="25%" x2={`${n.x}%`} y2={`${n.y}%`}
                stroke={D4} strokeWidth="1.5" strokeDasharray="5 3" />
            ))}
          </svg>
          {/* Center node */}
          <div className="absolute flex items-center justify-center"
            style={{ left:'50%', top:'25%', transform:'translate(-50%,-50%)', zIndex:10 }}>
            <div className="rounded-2xl px-6 py-3 shadow-2xl"
              style={{ background:ORANGE, border:`2px solid ${ORANGE}`, boxShadow:`0 0 32px ${ORANGE}55` }}>
              <span className="mono font-black text-white text-xl">Etudiant</span>
            </div>
          </div>
          {/* Other nodes */}
          {nodes.slice(1).map(n=>(
            <div key={n.l} className="absolute flex items-center justify-center"
              style={{ left:`${n.x}%`, top:`${n.y}%`, transform:'translate(-50%,-50%)', zIndex:10 }}>
              <div className="rounded-xl px-5 py-2" style={{ background:D3, border:`1.5px solid ${D4}` }}>
                <span className="mono font-bold" style={{ color:MUTED }}>{n.l}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Progress */}
      <div className="w-64 flex flex-col justify-center">
        <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>PROGRESSION</p>
        <div className="h-2 rounded-full mb-4" style={{ background:D4 }}>
          <div className="h-full rounded-full" style={{ background:`linear-gradient(to right,${ORANGE},${BLUE})`, width:`${(done.length/all.length)*100}%` }} />
        </div>
        {all.map(item=>{
          const isDone = done.includes(item)
          return (
            <div key={item} className="flex items-center gap-3 rounded-xl px-4 py-3 mb-2"
              style={{ background:D3, border:`1.5px solid ${isDone?ORANGE+55:D4}` }}>
              <span style={{ color:isDone?ORANGE:MUTED, fontSize:25 }}>{isDone?'✓':'○'}</span>
              <span className="text-sm" style={{ color:isDone?OW:MUTED }}>{item}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// SLIDE 52 — Ch2 Recap
function SlideCh2Recap() {
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={{ ...BLUEPRINT }}>
      <FsmCorner dark={false} />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:ORANGE }}>CARTE CONCEPTUELLE CH.2</p>
        <h2 className="font-black mb-5" style={{ fontSize:53, color:LTEXT }}>Les connexions essentielles</h2>
        {[
          {from:'CLASS',arrow:'→ crée',to:'OBJECT',cf:BLUE,ct:ORANGE},
          {from:'OBJECT',arrow:'→ contient',to:'ÉTAT + COMPORTEMENT',cf:ORANGE,ct:VIOLET},
          {from:'new',arrow:'→ invoque',to:'CONSTRUCTEUR',cf:EMERALD,ct:EMERALD},
          {from:'this',arrow:'→ réfère à',to:'L\'OBJET COURANT',cf:ORANGE,ct:ORANGE},
          {from:'private',arrow:'→ protège',to:'L\'ÉTAT',cf:RED,ct:RED},
          {from:'static',arrow:'→ appartient à',to:'LA CLASSE',cf:BLUE,ct:BLUE},
        ].map((c,i)=>(
          <div key={i} className="flex items-center gap-4 rounded-2xl px-5 py-3 mb-2.5 shadow-sm"
            style={{ background:LCARD, border:`1px solid ${LBORD}` }}>
            <span className="mono font-black text-lg w-24 shrink-0" style={{ color:c.cf }}>{c.from}</span>
            <span className="text-xs" style={{ color:LSUB }}>{c.arrow}</span>
            <span className="mono font-semibold text-sm" style={{ color:c.ct }}>{c.to}</span>
          </div>
        ))}
      </div>
      <div className="w-48 pt-10">
        <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color:LSUB }}>MOTS-CLÉS</p>
        <div className="flex flex-wrap gap-2">
          {['class','new','this','private','public','static','void','return'].map(k=>(
            <span key={k} className="mono text-sm px-3 py-1 rounded-full font-bold"
              style={{ background:ORANGE+'14', color:ORANGE, border:`1px solid ${ORANGE}44` }}>{k}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// SLIDE 53 — Mission Dashboard (Final Challenge)
function SlideFinalChallenge() {
  const [completed, setCompleted] = useState<number[]>([])
  const tasks = [
    { n:'01', t:'Créer les attributs privés', d:'nom : String, moyenne : double, static count' },
    { n:'02', t:'Écrire le constructeur', d:'Utiliser this pour différencier attribut et paramètre' },
    { n:'03', t:'Ajouter les getters/setters', d:'Valider moyenne >= 0 dans setMoyenne' },
    { n:'04', t:'Implémenter static counter', d:'count++ dans chaque constructeur' },
    { n:'05', t:'Créer un objet et afficher', d:'Etudiant e = new Etudiant("Alice", 14.5)' },
  ]
  return (
    <div className="w-full h-full flex gap-10 px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <div className="flex-1">
        <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:EMERALD }}>MISSION</p>
        <h2 className="font-black mb-1" style={{ fontSize:62, color:OW, letterSpacing:'-2px' }}>BUILD</h2>
        <h2 className="font-black mb-5" style={{ fontSize:62, color:ORANGE, letterSpacing:'-2px' }}>ETUDIANT.JAVA</h2>
        {/* Progress */}
        <div className="h-2 rounded-full mb-6" style={{ background:D4 }}>
          <div className="h-full rounded-full transition-all"
            style={{ background:`linear-gradient(to right,${ORANGE},${EMERALD})`, width:`${(completed.length/tasks.length)*100}%` }} />
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map((task,i)=>{
            const isDone = completed.includes(i)
            return (
              <button key={i} onClick={()=>setCompleted(c=>c.includes(i)?c.filter(x=>x!==i):[...c,i])}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all"
                style={{ background:isDone?EMERALD+'12':D3, border:`1.5px solid ${isDone?EMERALD+66:D4}` }}>
                <span className="mono font-black text-xl shrink-0 w-8" style={{ color:isDone?EMERALD:MUTED }}>{isDone?'✓':task.n}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color:isDone?OW:SUB }}>{task.t}</p>
                  <p className="text-xs" style={{ color:isDone?EMERALD+'99':MUTED }}>{task.d}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <div className="w-56 flex flex-col justify-center">
        <p className="mono text-xs font-black tracking-widest mb-3" style={{ fontSize: 16, letterSpacing: '0.16em',  color:EMERALD }}>PROGRESS</p>
        <div className="text-center rounded-2xl p-6 mb-4"
          style={{ background:D3, border:`2px solid ${completed.length===tasks.length?EMERALD:D4}ss` }}>
          <span className="mono font-black" style={{ fontSize:74, color:completed.length===tasks.length?EMERALD:OW, lineHeight:1 }}>
            {completed.length}
          </span>
          <span className="mono font-black text-3xl" style={{ color:MUTED }}> / {tasks.length}</span>
        </div>
        {completed.length===tasks.length && (
          <div className="text-center font-black text-xl" style={{ color:EMERALD }}>MISSION COMPLETE !</div>
        )}
      </div>
    </div>
  )
}

// SLIDE 54 — Final Answer
function SlideFinalAnswer() {
  return (
    <div className="w-full h-full flex flex-col px-12 py-10" style={DARK_GRID}>
      <FsmCorner />
      <p className="mono text-xs font-black tracking-widest mb-2" style={{ fontSize: 16, letterSpacing: '0.16em',  color:EMERALD }}>SOLUTION COMPLÈTE</p>
      <h2 className="font-black mb-5" style={{ fontSize:53, color:OW }}>Etudiant.java — correction</h2>
      <div className="flex-1">
        <Editor code={`public class Etudiant {\n    private String nom;\n    private double moyenne;\n    static int count = 0;\n\n    public Etudiant(String nom, double moyenne) {\n        this.nom = nom;\n        this.moyenne = moyenne;\n        count++;\n    }\n\n    public String getNom() { return nom; }\n    public double getMoyenne() { return moyenne; }\n    public void setMoyenne(double m) { if (m >= 0) this.moyenne = m; }\n\n    public void afficher() {\n        System.out.println(nom + " : " + moyenne);\n    }\n}`} filename="Etudiant.java" highlight={[2,3,4,6,12,13,14]} large />
      </div>
    </div>
  )
}

// SLIDE 55 — End
function SlideEnd() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={DARK_GRID}>
      <FsmCorner />
      <div className="absolute inset-0 flex items-center px-16">
        <div className="flex-1 pr-8">
          <SlideKicker>FIN DU COURS</SlideKicker>
          <div className="font-black leading-none mb-4"
            style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 120, color: OW, letterSpacing: '-0.05em' }}>
            JAVA
          </div>
          <p className="mb-8" style={{ color: SUB, fontSize: 26 }}>
            Comprendre. Modéliser. Coder.
          </p>
          <div className="mb-8">
            <p className="mono font-black tracking-widest mb-4" style={{ color: MUTED, fontSize: 15, letterSpacing: '0.16em' }}>
              VOUS SAVEZ MAINTENANT
            </p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
              {[
                'Comprendre l\'exécution Java',
                'Créer une classe',
                'Instancier des objets',
                'Raisonner sur les références',
                'Utiliser des constructeurs',
                'Comprendre this',
                'Encapsuler l\'état',
                'Utiliser les membres static',
              ].map(s => (
                <div key={s} className="flex items-center gap-3" style={{ fontSize: 22 }}>
                  <span style={{ color: EMERALD, fontWeight: 800 }}>›</span>
                  <span style={{ color: OW }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mono font-black tracking-widest mb-3" style={{ color: MUTED, fontSize: 14, letterSpacing: '0.14em' }}>
            À SUIVRE
          </p>
          <div className="flex gap-3 flex-wrap mb-10">
            {['Héritage', 'Polymorphisme', 'Interfaces', 'Exceptions'].map(t => (
              <span key={t} className="mono font-bold px-5 py-2 rounded-full"
                style={{ background: BLUE + '14', color: BLUE, border: `1.5px solid ${BLUE}44`, fontSize: 18 }}>
                {t}
              </span>
            ))}
          </div>
          <div className="font-black" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 44, color: ORANGE }}>
            Questions ?
          </div>
        </div>
        <div className="w-56 flex flex-col items-center gap-4">
          <img src={fsmLogo} alt="FSM" className="w-36 h-36 object-contain" />
          <p className="text-center font-semibold" style={{ color: SUB, fontSize: 16 }}>
            Faculté des Sciences<br />de Monastir
          </p>
          <p className="text-center mono" style={{ color: MUTED, fontSize: 14 }}>Licence GLSI 2 · 2026–2027</p>
        </div>
      </div>
    </div>
  )
}

// ─── Slide registry ───────────────────────────────────────────────────────
const SLIDES: { component: React.FC; chapter: string }[] = [
  { component: SlideTitle, chapter: 'Accueil' },
  ...OPENING_SLIDES,
  { component: SlideCh1Opener, chapter: '01 Introduction' },
  { component: SlideWhyJava, chapter: '01 Introduction' },
  { component: SlideHistory, chapter: '01 Introduction' },
  { component: SlideJavaDna, chapter: '01 Introduction' },
  { component: SlideWriteOnce, chapter: '01 Introduction' },
  { component: SlideEcosystem, chapter: '01 Introduction' },
  { component: SlideEditions, chapter: '01 Introduction' },
  { component: SlidePipeline, chapter: '01 Introduction' },
  { component: SlideArchitecture, chapter: '01 Introduction' },
  { component: SlideJavaToolchain, chapter: '01 Introduction' },
  { component: SlideDevEnvironment, chapter: '01 Introduction' },
  { component: SlideReadyToCode, chapter: '01 Introduction' },
  { component: SlideFirstProgram, chapter: '01 Introduction' },
  { component: SlideIdentifiers, chapter: '01 Introduction' },
  { component: SlideComments, chapter: '01 Introduction' },
  { component: SlidePrimitiveTypes, chapter: '01 Introduction' },
  { component: SlideCasting, chapter: '01 Introduction' },
  { component: SlideCastChallenge, chapter: '01 Introduction' },
  { component: SlideCh1Recap, chapter: '01 Introduction' },
  { component: SlideTransition, chapter: 'Transition' },
  { component: SlideCh2Opening, chapter: '02 Classes & Objets' },
  { component: SlideOopPillars, chapter: '02 Classes & Objets' },
  { component: SlideProblemFirst, chapter: '02 Classes & Objets' },
  { component: SlideClassVsObject, chapter: '02 Classes & Objets' },
  { component: SlideAnatomy, chapter: '02 Classes & Objets' },
  { component: SlideObjectCreation, chapter: '02 Classes & Objets' },
  { component: SlideNewHero, chapter: '02 Classes & Objets' },
  { component: SlideReferences, chapter: '02 Classes & Objets' },
  { component: SlideTwoRefsHero, chapter: '02 Classes & Objets' },
  { component: SlideRefChallenge, chapter: '02 Classes & Objets' },
  { component: SlideConstructorHero, chapter: '02 Classes & Objets' },
  { component: SlideConstructors, chapter: '02 Classes & Objets' },
  { component: SlideMultipleConstructors, chapter: '02 Classes & Objets' },
  { component: SlideThisHero, chapter: '02 Classes & Objets' },
  { component: SlideThis, chapter: '02 Classes & Objets' },
  { component: SlideArrays, chapter: '02 Classes & Objets' },
  { component: SlideString, chapter: '02 Classes & Objets' },
  { component: SlideStringImmutableHero, chapter: '02 Classes & Objets' },
  { component: SlideEqualsHero, chapter: '02 Classes & Objets' },
  { component: SlideStringChallenge, chapter: '02 Classes & Objets' },
  { component: SlideStringBuilder, chapter: '02 Classes & Objets' },
  { component: SlideOverloading, chapter: '02 Classes & Objets' },
  { component: SlideStaticHero, chapter: '02 Classes & Objets' },
  { component: SlideStatic, chapter: '02 Classes & Objets' },
  { component: SlideParameters, chapter: '02 Classes & Objets' },
  { component: SlidePackages, chapter: '02 Classes & Objets' },
  { component: SlideProProject, chapter: '02 Classes & Objets' },
  { component: SlidePrivateHero, chapter: '02 Classes & Objets' },
  { component: SlideEncapsulation, chapter: '02 Classes & Objets' },
  { component: SlideVisibility, chapter: '02 Classes & Objets' },
  { component: SlideGettersSetters, chapter: '02 Classes & Objets' },
  { component: SlideEncapsulationBenefit, chapter: '02 Classes & Objets' },
  { component: SlideCampusHud, chapter: '02 Classes & Objets' },
  { component: SlideCh2Recap, chapter: '02 Classes & Objets' },
  { component: SlideFinalChallenge, chapter: '02 Classes & Objets' },
  { component: SlideFinalAnswer, chapter: '02 Classes & Objets' },
  { component: SlideEnd, chapter: 'Fin' },
]

// ─── NavBar ───────────────────────────────────────────────────────────────
function NavBar({ current, total, chapter, isFullscreen, onPrev, onNext, onPdf, onOverview, onFullscreen }: {
  current: number; total: number; chapter: string; isFullscreen: boolean
  onPrev: () => void; onNext: () => void; onPdf: () => void; onOverview: () => void; onFullscreen: () => void
}) {
  const progress = ((current + 1) / total) * 100
  return (
    <nav
      className="presentation-nav w-full print-hidden"
      style={{ background: 'rgba(255,255,255,0.96)', borderTop: `1px solid ${D4}` }}
      aria-label="Navigation du cours"
    >
      <div className="h-1 w-full" style={{ background: D3 }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: `linear-gradient(to right, ${ORANGE}, ${BLUE})` }}
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-2.5">
        <div className="min-w-0 flex-1 flex items-center gap-3">
          <img
            src={fsmLogo}
            alt="FSM"
            className="object-contain shrink-0"
            style={{ width: 36, height: 36 }}
          />
          <ToolLogo kind="java" size={32} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="mono text-[10px] font-black tracking-wider truncate" style={{ color: ORANGE }}>
                JAVA
              </p>
              <span
                className="mono font-bold px-2 py-0.5 rounded-md shrink-0"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  background: AMBER + '22',
                  color: '#B45309',
                  border: `1px solid ${AMBER}66`,
                }}
                title="Contenu pédagogique encore en construction"
              >
                EN COURS
              </span>
            </div>
            <p className="mono text-[10px] sm:text-xs truncate" style={{ color: MUTED }} title={chapter}>
              {chapter}
              <span style={{ color: MUTED }}> · slides incomplets</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onFullscreen}
            className="px-2.5 sm:px-3 py-2 rounded-xl mono text-[10px] sm:text-xs font-bold min-h-[44px]"
            style={{ background: isFullscreen ? BLUE : D3, color: isFullscreen ? '#fff' : SUB, border: `1px solid ${isFullscreen ? BLUE : D4}` }}
            aria-label={isFullscreen ? 'Quitter le plein écran' : 'Passer en plein écran'}
            title={isFullscreen ? 'Quitter (Échap ou F)' : 'Plein écran (F)'}
          >
            {isFullscreen ? 'Quitter' : 'Plein écran'}
          </button>
          <button
            type="button"
            onClick={onOverview}
            className="px-2.5 sm:px-3 py-2 rounded-xl mono text-[10px] sm:text-xs font-bold min-h-[44px]"
            style={{ background: D3, color: SUB, border: `1px solid ${D4}` }}
            aria-label="Ouvrir le plan du cours"
          >
            Plan
          </button>
          <button
            type="button"
            onClick={onPdf}
            className="px-2.5 sm:px-3 py-2 rounded-xl mono text-[10px] sm:text-xs font-bold min-h-[44px]"
            style={{ background: ORANGE, color: '#fff' }}
            aria-label="Exporter en PDF"
          >
            PDF
          </button>
          <button
            type="button"
            onClick={onPrev}
            disabled={current === 0}
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg"
            style={{ background: D2, color: current === 0 ? MUTED : OW, border: `1px solid ${D4}` }}
            aria-label="Slide précédente"
          >
            ‹
          </button>
          <span className="mono text-[11px] sm:text-xs w-[4.5rem] text-center tabular-nums" style={{ color: SUB }} aria-live="polite">
            <span style={{ color: OW }}>{String(current + 1).padStart(2, '0')}</span>
            {' / '}
            {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={current === total - 1}
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg"
            style={{
              background: current === total - 1 ? D3 : ORANGE,
              color: current === total - 1 ? MUTED : '#fff',
              border: `1px solid ${current === total - 1 ? D4 : ORANGE}`,
            }}
            aria-label="Slide suivante"
          >
            ›
          </button>
        </div>
      </div>
    </nav>
  )
}

const STAGE_W = 1920
const STAGE_H = 1080

function useStageScale() {
  const [scale, setScale] = useState(() => {
    if (typeof window === 'undefined') return 0.45
    return Math.min(
      Math.max(0.2, (window.innerWidth - 16) / STAGE_W),
      Math.max(0.2, (window.innerHeight - 88) / STAGE_H),
    )
  })
  useEffect(() => {
    const update = () => {
      const shell = document.querySelector('.presentation-stage-wrap') as HTMLElement | null
      const aw = shell?.clientWidth ?? window.innerWidth - 16
      const ah = shell?.clientHeight ?? window.innerHeight - 88
      if (aw <= 0 || ah <= 0) return
      setScale(Math.min(aw / STAGE_W, ah / STAGE_H))
    }
    update()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    const shell = document.querySelector('.presentation-stage-wrap')
    if (shell && ro) ro.observe(shell)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    const t = window.setTimeout(update, 50)
    return () => {
      clearTimeout(t)
      ro?.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])
  return scale
}

function buildChapterSections(slides: { chapter: string }[]) {
  const sections: { label: string; indices: number[] }[] = []
  slides.forEach((s, i) => {
    const last = sections[sections.length - 1]
    if (!last || last.label !== s.chapter) sections.push({ label: s.chapter, indices: [i] })
    else last.indices.push(i)
  })
  return sections
}

// ─── App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState(0)
  const [printing, setPrinting] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const total = SLIDES.length
  const scale = useStageScale()
  const chapters = buildChapterSections(SLIDES)
  const shellRef = useRef<HTMLDivElement>(null)

  const go = useCallback((dir: number) => {
    setCurrent(c => Math.min(Math.max(c + dir, 0), total - 1))
  }, [total])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        const el = shellRef.current ?? document.documentElement
        await el.requestFullscreen?.()
      } else {
        await document.exitFullscreen?.()
      }
    } catch {
      // Fullscreen may be blocked by the browser — ignore silently
    }
  }, [])

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (printing) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'f' || e.key === 'F') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault()
          toggleFullscreen()
          return
        }
      }
      if (e.key === 'o' || e.key === 'O') { setShowOverview(v => !v); return }
      if (showOverview) { if (e.key === 'Escape') setShowOverview(false); return }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        go(1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go, printing, showOverview, toggleFullscreen])

  useEffect(() => {
    if (printing || showOverview) return
    let x0 = 0
    let y0 = 0
    let t0 = 0
    const onStart = (e: TouchEvent) => {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
      t0 = Date.now()
    }
    const onEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('input, textarea, button, a, [role="button"]')) return
      const dx = e.changedTouches[0].clientX - x0
      const dy = e.changedTouches[0].clientY - y0
      const dt = Date.now() - t0
      if (dt > 800) return
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.2) return
      if (dx < 0) go(1)
      else go(-1)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [go, printing, showOverview])

  const handlePdf = useCallback(() => {
    setPrinting(true)
    document.documentElement.dataset.printing = '1'
    setTimeout(() => {
      window.print()
      setTimeout(() => {
        setPrinting(false)
        delete document.documentElement.dataset.printing
      }, 500)
    }, 300)
  }, [])

  if (printing) {
    return (
      <div className="print-all-wrapper" style={{ background: D1 }}>
        <div className="print-hidden fixed inset-0 flex items-center justify-center z-50" style={{ background: D1 }}>
          <p className="mono text-xl font-bold" style={{ color: ORANGE }}>Préparation du PDF… {total} slides</p>
        </div>
        {SLIDES.map(({ component: Slide }, i) => (
          <div key={i} className="print-slide" style={{ width: '100vw', height: '56.25vw', position: 'relative', overflow: 'hidden' }}>
            <SlideChrome>
              <Slide />
            </SlideChrome>
          </div>
        ))}
      </div>
    )
  }

  const { component: Slide, chapter } = SLIDES[current]
  return (
    <div
      ref={shellRef}
      className={`presentation-shell presentation-mode${isFullscreen ? ' is-fullscreen' : ''}`}
    >
      {showOverview && (
        <Overview
          current={current}
          total={total}
          chapters={chapters}
          onClose={() => setShowOverview(false)}
          onGoto={(i) => { setCurrent(i); setShowOverview(false) }}
        />
      )}

      <div className="presentation-stage-wrap">
        <div
          className="presentation-stage-outer"
          style={{ width: STAGE_W * scale, height: STAGE_H * scale }}
        >
          <div
            className="presentation-stage-inner slide-frame"
            style={{ transform: `scale(${scale})` }}
          >
            <SlideChrome>
              <Slide />
            </SlideChrome>
          </div>
        </div>
      </div>

      <NavBar
        current={current}
        total={total}
        chapter={chapter}
        isFullscreen={isFullscreen}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onPdf={handlePdf}
        onOverview={() => setShowOverview(true)}
        onFullscreen={toggleFullscreen}
      />
    </div>
  )
}
