import React, { useState } from 'react'
import { hi } from '../syntaxHighlight'
import type { Block, Bullet, MemObj, MemVar, Slide, UmlClass } from './types'
import { chapterLabel } from './slides'
import fsmLogo from '../imports/fsmlogo.jpeg'

/* ── Texte enrichi : **gras** et `code` ─────────────────────────────── */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{renderCodeInBold(p.slice(2, -2))}</strong>
        if (p.startsWith('`') && p.endsWith('`')) return <code key={i} className="inline-code">{p.slice(1, -1)}</code>
        if (p.length > 2 && p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>
        return <React.Fragment key={i}>{p}</React.Fragment>
      })}
    </>
  )
}

function renderCodeInBold(s: string) {
  return s.split(/(`[^`]+`)/g).map((p, i) =>
    p.startsWith('`') && p.endsWith('`')
      ? <code key={i} className="inline-code">{p.slice(1, -1)}</code>
      : <React.Fragment key={i}>{p}</React.Fragment>,
  )
}

/* ── Blocs ───────────────────────────────────────────────────────────── */
function BulletItem({ b }: { b: Bullet }) {
  if (typeof b === 'string') return <li><Rich text={b} /></li>
  return (
    <li>
      <Rich text={b.text} />
      <ul className="sub">
        {b.sub.map((s, i) => <li key={i}><Rich text={s} /></li>)}
      </ul>
    </li>
  )
}

/** Découpe le HTML coloré en lignes ; referme/rouvre un <span> qui chevauche plusieurs lignes. */
function splitHtmlLines(html: string): string[] {
  let open = ''
  return html.split('\n').map(l => {
    let out = open + l
    const opens = out.match(/<span class="[a-z]+">/g) ?? []
    const closes = out.match(/<\/span>/g) ?? []
    if (opens.length > closes.length) {
      open = opens[opens.length - 1]
      out += '</span>'
    } else open = ''
    return out === '' ? ' ' : out
  })
}

export function CodeBlock({ code, file, output, small, plain, highlight, bad, status, notes, hidden }: {
  code: string; file?: string; output?: string; small?: boolean; plain?: boolean; highlight?: number[]
  bad?: number[]; status?: 'ok' | 'ko'; notes?: Record<number, string>; hidden?: number[]
}) {
  const clean = code.replace(/^\n+|\s+$/g, '')
  const hl = new Set(highlight ?? [])
  const ko = new Set(bad ?? [])
  const off = new Set(hidden ?? [])
  const term = file === 'Terminal'
  return (
    <div className={`code ${small ? 'code-small' : ''} ${status ? `code-${status}` : ''}`}>
      {(file || status) && (
        <div className="code-tabs">
          {file && <span className="code-tab"><span className={`code-tab-icon ${term ? 'term' : ''}`}>{term ? '>_' : 'J'}</span>{file}</span>}
          {status && <span className={`code-status ${status}`}>{status === 'ok' ? '✓ Compile' : '✗ Ne compile pas'}</span>}
        </div>
      )}
      {plain || term ? (
        <pre className={term ? '' : 'plain'}>{clean}</pre>
      ) : (
        <div className="code-body">
          {splitHtmlLines(hi(clean)).map((h, i) => {
            const n = i + 1
            const cls = off.has(n) ? 'ln-off' : ko.has(n) ? 'ln-bad' : hl.has(n) ? 'ln-hl' : ''
            return (
              <div key={i} className={`ln ${cls}`}>
                <span className="ln-no">{n}</span>
                <span className="ln-tx" dangerouslySetInnerHTML={{ __html: h }} />
                {notes?.[n] && !off.has(n) && <span className="ln-note">{notes[n]}</span>}
              </div>
            )
          })}
        </div>
      )}
      {output !== undefined && (
        <div className="code-out">
          <span className="code-out-label">Terminal</span>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  )
}

/* ── Schéma mémoire statique (pile / tas) ─────────────────────────────── */
const MEM_COLORS = ['#c2410c', '#1d4ed8', '#047857', '#7c3aed', '#be185d']

export function MemoryView({ stack, heap, title, caption, compact }: {
  stack: MemVar[]; heap: MemObj[]; title?: string; caption?: string; compact?: boolean
}) {
  const D = compact
    ? { stackW: 260, gap: 150, heapW: 380, varH: 54, varGap: 10, hdrH: 46, fieldH: 40, font: 27 }
    : { stackW: 340, gap: 240, heapW: 500, varH: 66, varGap: 14, hdrH: 54, fieldH: 50, font: 32 }
  const HEAD = 50, PAD = 12, FRAME_LABEL = 34, NOTE_H = 36, OBJ_GAP = 26

  // objets triés selon la première variable qui les référence (moins de croisements)
  const firstRef = (id: string) => stack.findIndex(v => v.ref === id)
  const objs = heap
    .map((o, i) => ({ o, key: firstRef(o.id) >= 0 ? firstRef(o.id) : o.cls ? -1 : 1000 + i }))
    .sort((a, b) => a.key - b.key)
    .map(x => x.o)

  // pile : positions des variables (groupées par cadre d'appel)
  type PVar = { v: MemVar; x: number; y: number; w: number }
  const pvars: PVar[] = []
  const frames: { label: string; y: number; h: number }[] = []
  let y = HEAD
  for (let i = 0; i < stack.length; ) {
    const fr = stack[i].frame
    let j = i
    while (j < stack.length && stack[j].frame === fr) j++
    const group = stack.slice(i, j)
    const inner = fr ? PAD : 0
    const top = y
    y += fr ? FRAME_LABEL : 0
    group.forEach((v, k) => {
      pvars.push({ v, x: inner, y: y + k * (D.varH + D.varGap), w: D.stackW - 2 * inner })
    })
    y += group.length * D.varH + (group.length - 1) * D.varGap
    if (fr) { y += PAD; frames.push({ label: fr, y: top, h: y - top }) }
    y += 18
    i = j
  }
  const stackH = y

  // tas : positions des objets
  const pobjs = objs.map(() => ({ y: 0, h: 0 }))
  let hy = HEAD
  objs.forEach((o, i) => {
    const h = D.hdrH + o.fields.length * D.fieldH + (o.note ? NOTE_H : 0) + 8
    pobjs[i] = { y: hy, h }
    hy += h + OBJ_GAP
  })
  const heapH = hy
  const H = Math.max(stackH, heapH)
  const W = D.stackW + D.gap + D.heapW
  const heapX = D.stackW + D.gap

  const colorOf = (id: string) => {
    const i = objs.findIndex(o => o.id === id)
    return objs[i]?.dead ? '#94a3b8' : MEM_COLORS[i % MEM_COLORS.length]
  }
  const incoming: Record<string, number> = {}
  stack.forEach(v => { if (v.ref) incoming[v.ref] = (incoming[v.ref] ?? 0) + 1 })
  const seen: Record<string, number> = {}

  const arrows = pvars.filter(p => p.v.ref).map(p => {
    const id = p.v.ref as string
    const oi = objs.findIndex(o => o.id === id)
    if (oi < 0) return null
    const n = incoming[id]
    const k = seen[id] = (seen[id] ?? -1) + 1
    const x1 = p.x + p.w, y1 = p.y + D.varH / 2
    const x2 = heapX, y2 = pobjs[oi].y + D.hdrH / 2 + (k - (n - 1) / 2) * 16
    return { x1, y1, x2, y2, c: colorOf(id), key: p.v.name + id }
  })

  return (
    <div className="mem">
      {title && <div className="mem-title">{title}</div>}
      <div className="mem-canvas" style={{ width: W, height: H, fontSize: D.font }}>
        <div className="mem-label" style={{ left: 0, width: D.stackW }}>Pile</div>
        <div className="mem-label" style={{ left: heapX, width: D.heapW }}>Tas</div>

        {frames.map((f, i) => (
          <div key={i} className="mem-frame" style={{ left: 0, top: f.y, width: D.stackW, height: f.h }}>
            <span className="mem-frame-label">{f.label}</span>
          </div>
        ))}

        {pvars.map(p => (
          <div key={p.v.name} className="mem-var" style={{ left: p.x, top: p.y, width: p.w, height: D.varH }}>
            <span className="mem-var-name">{p.v.name}</span>
            {p.v.ref ? <span className="mem-dot" style={{ background: colorOf(p.v.ref) }} /> : <span className="mem-var-val">{p.v.value}</span>}
          </div>
        ))}

        {objs.map((o, i) => (
          <div
            key={o.id}
            className={`mem-obj ${o.dead ? 'dead' : ''} ${o.cls ? 'cls' : ''}`}
            style={{ left: heapX, top: pobjs[i].y, width: D.heapW, height: pobjs[i].h, borderColor: colorOf(o.id) }}
          >
            <div className="mem-obj-head" style={{ height: D.hdrH, background: colorOf(o.id) }}>
              <span>{o.cls ? `Classe ${o.type}` : o.type}</span>
              {o.addr && <span className="mem-addr">{o.addr}</span>}
            </div>
            {o.fields.map(([n, v]) => (
              <div key={n} className={`mem-field ${o.changed?.includes(n) ? 'changed' : ''}`} style={{ height: D.fieldH }}>
                <span className="mem-field-n">{o.cls ? `static ${n}` : n}</span>
                <span className="mem-field-v">{v}</span>
              </div>
            ))}
            {o.note && <div className="mem-note" style={{ height: NOTE_H }}>{o.note}</div>}
          </div>
        ))}

        <svg className="mem-arrows" width={W} height={H}>
          {arrows.map(a => a && (
            <g key={a.key}>
              <path
                d={`M ${a.x1} ${a.y1} C ${a.x1 + D.gap * 0.55} ${a.y1}, ${a.x2 - D.gap * 0.55} ${a.y2}, ${a.x2 - 22} ${a.y2}`}
                fill="none" stroke={a.c} strokeWidth={5} strokeLinecap="round"
              />
              <polygon points={`${a.x2},${a.y2} ${a.x2 - 24},${a.y2 - 13} ${a.x2 - 24},${a.y2 + 13}`} fill={a.c} />
            </g>
          ))}
        </svg>
      </div>
      {caption && <div className="mem-caption"><Rich text={caption} /></div>}
    </div>
  )
}

/* ── Quiz : options cliquables, correction au clic ou touche S ─────────── */
export function QuizView({ b, revealed }: { b: Extract<Block, { k: 'quiz' }>; revealed: boolean }) {
  const [sel, setSel] = useState<number | null>(null)
  const answered = sel !== null || revealed
  const options = (
    <div className="quiz-opts">
      {b.options.map((o, i) => {
        const state = !answered ? '' : i === b.correct ? 'ok' : i === sel ? 'ko' : 'dim'
        return (
          <button key={i} className={`quiz-opt ${state}`} onClick={() => setSel(i)}>
            <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
            <span className="quiz-text"><Rich text={o} /></span>
            {state === 'ok' && <span className="quiz-mark">✓</span>}
            {state === 'ko' && <span className="quiz-mark">✗</span>}
          </button>
        )
      })}
    </div>
  )
  return (
    <div className="quiz">
      <div className="quiz-q"><span className="quiz-tag">Quiz</span><span><Rich text={b.question} /></span></div>
      {b.code ? (
        <div className="quiz-main"><CodeBlock code={b.code} small />{options}</div>
      ) : options}
      {answered ? (
        <div className="box box-retenir quiz-exp">
          <div className="box-title">Réponse : {String.fromCharCode(65 + b.correct)}</div>
          <div className="box-text"><Rich text={b.explication} /></div>
        </div>
      ) : (
        <div className="quiz-hint print-hide">Votez à main levée, puis cliquez sur une réponse ou touche <kbd>S</kbd> pour la correction</div>
      )}
    </div>
  )
}

/* ── Quiz « prédiction » : choisir, Vérifier, Correction, Réinitialiser ── */
function QuizCheckView({ b, revealed, onReveal }: { b: Extract<Block, { k: 'quiz' }>; revealed: boolean; onReveal: () => void }) {
  const [sel, setSel] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const shown = checked || revealed
  const reset = () => {
    setSel(null)
    setChecked(false)
    if (revealed) onReveal()
  }
  const letter = (i: number) => String.fromCharCode(65 + i)
  return (
    <div className="quiz">
      <div className="quiz-q">
        <span className="quiz-tag">Prédiction</span><span><Rich text={b.question} /></span>
        <div className="quiz-actions print-hide">
          <button className="qbtn qbtn-main" disabled={sel === null || shown} onClick={() => setChecked(true)}>Vérifier</button>
          {!shown && <button className="qbtn" onClick={onReveal}>Correction <kbd>S</kbd></button>}
          <button className="qbtn" onClick={reset}>Réinitialiser</button>
        </div>
      </div>
      <div className="quiz-main">
        {b.code && <CodeBlock code={b.code} file={b.codeFile} small bad={shown && b.errorLine ? [b.errorLine] : undefined} />}
        <div className="quiz-opts" role="radiogroup" aria-label="Réponses">
          {b.options.map((o, i) => {
            const state = shown ? (i === b.correct ? 'ok' : i === sel ? 'ko' : 'dim') : i === sel ? 'sel' : ''
            return (
              <button
                key={i} role="radio" aria-checked={i === sel} disabled={shown}
                className={`quiz-opt ${state}`} onClick={() => setSel(i)}
              >
                <span className="quiz-letter">{letter(i)}</span>
                <span className="quiz-text"><Rich text={o} /></span>
                {state === 'ok' && <span className="quiz-mark">✓</span>}
                {state === 'ko' && <span className="quiz-mark">✗</span>}
              </button>
            )
          })}
        </div>
      </div>
      {shown ? (
        <div className={`quiz-feedback ${b.detail ? '' : 'one'}`}>
          <div className="box box-retenir">
            <div className="box-title">
              Réponse {letter(b.correct)}
              {sel !== null && (sel === b.correct ? ' · bien vu !' : ` · vous aviez choisi ${letter(sel)}`)}
            </div>
            <div className="box-text"><Rich text={b.explication} /></div>
            {b.error && (
              <>
                <div className="err-kind">
                  {b.error.startsWith('Exception') ? 'Erreur d\'exécution attendue' : 'Erreur de compilation attendue'}
                </div>
                <pre className="javac-err">{b.error}</pre>
              </>
            )}
          </div>
          {b.detail && (
            <div className="box box-info">
              <div className="box-title">{b.detailTitle ?? 'Compilation ou exécution ?'}</div>
              <div className="box-text"><Rich text={b.detail} /></div>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz-hint print-hide">Votez à main levée (A, B, C ou D), puis choisissez une réponse et cliquez sur « Vérifier ».</div>
      )}
    </div>
  )
}

/* ── Panneaux progressifs ─────────────────────────────────────────────── */
function StepsView({ b, step, onStep, revealed, onReveal }: {
  b: Extract<Block, { k: 'steps' }>; step: number; onStep: (i: number) => void; revealed: boolean; onReveal: () => void
}) {
  const cur = Math.max(0, Math.min(step, b.items.length - 1))
  return (
    <div className="steps">
      <div className="steps-bar" role="tablist" aria-label="Étapes de la diapositive">
        {b.items.map((it, i) => (
          <button
            key={i} role="tab" aria-selected={i === cur}
            className={`step-tab ${i === cur ? 'on' : ''} ${i < cur ? 'done' : ''}`}
            onClick={() => onStep(i)}
          >
            <span className="step-n">{i + 1}</span>
            <Rich text={it.label} />
          </button>
        ))}
        {cur < b.items.length - 1 && b.items.length <= 5 && <span className="steps-hint print-hide">→ étape suivante</span>}
      </div>
      <div className="steps-panel" role="tabpanel" key={cur}>
        {b.items[cur].blocks.map((x, i) => <BlockView key={i} b={x} revealed={revealed} onReveal={onReveal} />)}
      </div>
    </div>
  )
}

/* ── Arborescence de fichiers ─────────────────────────────────────────── */
function TreeView({ b }: { b: Extract<Block, { k: 'tree' }> }) {
  return (
    <div className={`tree ${b.tone ? `tree-${b.tone}` : ''}`}>
      {b.title && <div className="tree-title"><Rich text={b.title} /></div>}
      <div className="tree-body">
        {b.nodes.map((n, i) => {
          const dir = n.name.endsWith('/')
          return (
            <div key={i} className={`tree-row ${n.bad ? 'bad' : ''}`}>
              {Array.from({ length: n.depth }, (_, d) => <span key={d} className="tree-indent" />)}
              <span className={`tree-ico ${dir ? 'dir' : 'file'}`}>{dir ? '' : 'J'}</span>
              <span className={`tree-name ${dir ? 'dir' : ''}`}>{n.name}</span>
              {n.bad && <span className="tree-bad">✗</span>}
              {n.note && <span className="tree-note"><Rich text={n.note} /></span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Schéma : point en coordonnées polaires ───────────────────────────── */
function PolarView({ cartesian }: { cartesian?: boolean }) {
  const O = { x: 70, y: 370 }
  const a = (35 * Math.PI) / 180
  const R = 380
  const P = { x: O.x + R * Math.cos(a), y: O.y - R * Math.sin(a) }
  const r = 95
  const arcEnd = { x: O.x + r * Math.cos(a), y: O.y - r * Math.sin(a) }
  return (
    <figure className="polar">
      <svg viewBox="0 0 560 430" width={420} height={322} role="img"
        aria-label={cartesian ? 'Point P : coordonnées polaires et cartésiennes' : 'Point P en coordonnées polaires'}>
        <defs>
          <marker id="ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#64748b" />
          </marker>
        </defs>
        <line x1={O.x} y1={O.y} x2={540} y2={O.y} stroke="#64748b" strokeWidth={3} markerEnd="url(#ax)" />
        <line x1={O.x} y1={O.y} x2={O.x} y2={20} stroke="#64748b" strokeWidth={3} markerEnd="url(#ax)" />
        {cartesian && (
          <g stroke="#1d4ed8" strokeWidth={3} strokeDasharray="10 8">
            <line x1={P.x} y1={P.y} x2={P.x} y2={O.y} />
            <line x1={P.x} y1={P.y} x2={O.x} y2={P.y} />
          </g>
        )}
        <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#c2410c" strokeWidth={6} strokeLinecap="round" />
        <path d={`M ${O.x + r} ${O.y} A ${r} ${r} 0 0 0 ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke="#047857" strokeWidth={4} />
        <circle cx={P.x} cy={P.y} r={11} fill="#0f172a" />
        <text x={O.x - 34} y={O.y + 34} className="polar-t">O</text>
        <text x={P.x + 16} y={P.y - 14} className="polar-t">P</text>
        <text x={(O.x + P.x) / 2 - 36} y={(O.y + P.y) / 2 - 18} className="polar-t polar-rho">ρ</text>
        <text x={O.x + r + 18} y={O.y - 16} className="polar-t polar-theta">θ</text>
        {cartesian && <text x={P.x - 12} y={O.y + 40} className="polar-t polar-xy">x</text>}
        {cartesian && <text x={O.x - 40} y={P.y + 10} className="polar-t polar-xy">y</text>}
      </svg>
      <figcaption className="polar-cap">
        {cartesian
          ? <Rich text="`x = ρ·cos θ`  ·  `y = ρ·sin θ`" />
          : <Rich text="**ρ** (`rho`) : distance à O, **≥ 0** · **θ** (`theta`) : angle" />}
      </figcaption>
    </figure>
  )
}

/* ── Questions de vérification ────────────────────────────────────────── */
function QaView({ b, revealed, onReveal }: { b: Extract<Block, { k: 'qa' }>; revealed: boolean; onReveal: () => void }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set())
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    return next
  })
  const reset = () => {
    setOpen(new Set())
    if (revealed) onReveal()
  }
  return (
    <div className="qa">
      <div className="qa-grid">
        {b.items.map((it, i) => {
          const shown = revealed || open.has(i)
          return (
            <button key={i} className={`qa-item ${shown ? 'open' : ''}`} aria-expanded={shown} onClick={() => toggle(i)}>
              <span className="qa-q"><span className="qa-tag">Q{i + 1}</span><Rich text={it.q} /></span>
              {shown ? <span className="qa-a"><Rich text={it.a} /></span> : <span className="qa-more print-hide">Afficher la correction</span>}
            </button>
          )
        })}
      </div>
      <div className="quiz-actions print-hide">
        {!revealed && <button className="qbtn" onClick={onReveal}>Toutes les corrections <kbd>S</kbd></button>}
        <button className="qbtn" onClick={reset}>Réinitialiser</button>
      </div>
    </div>
  )
}

/* ── Explorateur de visibilité ────────────────────────────────────────── */
function AccessView({ b }: { b: Extract<Block, { k: 'access' }> }) {
  const [m, setM] = useState(0)
  const [c, setC] = useState(b.contexts.length - 1)
  const ctx = b.contexts[c]
  const res = b.results[c][m]
  const put = (code: string) => code.replace('{MOD}', b.mods[m].kw)
  const modLine = (code: string) => code.replace(/^\n+/, '').split('\n').findIndex(l => l.includes('{MOD}')) + 1
  const hlCtx = res.ok ? { highlight: [ctx.line] } : { bad: [ctx.line] }
  return (
    <div className="acc">
      <div className="acc-row" role="radiogroup" aria-label="Modificateur">
        <span className="acc-lbl">Modificateur</span>
        {b.mods.map((x, i) => (
          <button key={i} role="radio" aria-checked={i === m} className={`acc-btn ${i === m ? 'on' : ''}`} onClick={() => setM(i)}>
            <Rich text={x.label} />
          </button>
        ))}
      </div>
      <div className="acc-row" role="radiogroup" aria-label="Contexte d'accès">
        <span className="acc-lbl">Accès depuis</span>
        {b.contexts.map((x, i) => (
          <button key={i} role="radio" aria-checked={i === c} className={`acc-btn ${i === c ? 'on' : ''}`} onClick={() => setC(i)}>
            <Rich text={x.label} />
          </button>
        ))}
      </div>
      <div className={`acc-codes ${ctx.same ? 'one' : ''}`}>
        {!ctx.same && <CodeBlock code={put(b.decl)} file={b.declFile} small highlight={[modLine(b.decl)]} />}
        <CodeBlock code={put(ctx.code)} file={ctx.file} small status={res.ok ? 'ok' : 'ko'} {...hlCtx} />
      </div>
      <div className={`acc-verdict ${res.ok ? 'ok' : 'ko'}`} aria-live="polite">
        <span className="acc-badge">{res.ok ? '✓ Compile' : '✗ Ne compile pas'}</span>
        <span className="acc-text">
          <span><Rich text={res.text} /></span>
          {res.error && <code className="acc-err">error: {res.error}</code>}
        </span>
      </div>
    </div>
  )
}

/* ── Question orale à réponse cachée ──────────────────────────────────── */
function RevealView({ b, revealed, onReveal }: { b: Extract<Block, { k: 'reveal' }>; revealed: boolean; onReveal: () => void }) {
  const [open, setOpen] = useState(false)
  const shown = open || revealed
  const hide = () => {
    setOpen(false)
    if (revealed) onReveal()
  }
  return (
    <div className="rev">
      <div className="exo-head">
        <span className="rev-tag">{b.tag}</span>
        <span className="exo-prompt"><Rich text={b.prompt} /></span>
        <span className="quiz-actions print-hide">
          {shown
            ? <button className="qbtn" onClick={hide}>Masquer</button>
            : <button className="qbtn qbtn-main" aria-expanded={false} onClick={() => setOpen(true)}>Révéler la réponse <kbd>S</kbd></button>}
        </span>
      </div>
      {b.blocks?.map((x, i) => <BlockView key={i} b={x} revealed={revealed} onReveal={onReveal} />)}
      {shown && (
        <div className="rev-ans" aria-live="polite">
          {b.answer.map((x, i) => <BlockView key={i} b={x} revealed={revealed} onReveal={onReveal} />)}
        </div>
      )}
    </div>
  )
}

/* ── Compléter le code ────────────────────────────────────────────────── */
function FillView({ b, revealed, onReveal }: { b: Extract<Block, { k: 'fill' }>; revealed: boolean; onReveal: () => void }) {
  const [open, setOpen] = useState(false)
  const shown = open || revealed
  const src = b.code.replace(/^\n+/, '')
  const lines = src.split('\n').flatMap((l, i) => (l.includes('[[') ? [i + 1] : []))
  const code = src.replace(/\[\[(.+?)\]\]/g, (_, w: string) => (shown ? w : '_'.repeat(Math.max(4, w.length))))
  const hide = () => {
    setOpen(false)
    if (revealed) onReveal()
  }
  return (
    <div className="rev">
      <div className="exo-head">
        <span className="rev-tag">Compléter</span>
        <span className="exo-prompt"><Rich text={b.prompt} /></span>
        <span className="quiz-actions print-hide">
          {shown
            ? <button className="qbtn" onClick={hide}>Masquer</button>
            : <button className="qbtn qbtn-main" onClick={() => setOpen(true)}>Afficher la correction <kbd>S</kbd></button>}
        </span>
      </div>
      <CodeBlock code={code} file={b.file} small={b.small} highlight={lines} />
      {shown && <div className="rev-ans" aria-live="polite"><p className="para"><Rich text={b.explication} /></p></div>}
    </div>
  )
}

/* ── Diagramme de classes UML ─────────────────────────────────────────── */
const UML_ROW = 36
const umlSec = (n = 0) => (n ? n * UML_ROW + 14 : 0)
const umlHeight = (c: UmlClass) =>
  4 + 44 + (c.kind === 'interface' ? 26 : 0) + umlSec(c.attrs?.length) + umlSec(c.ops?.length)

function UmlView({ b }: { b: Extract<Block, { k: 'uml' }> }) {
  const byId = new Map(b.classes.map(c => [c.id, c]))
  const box = (c: UmlClass) => ({ cx: c.x + (c.w ?? 300) / 2, top: c.y, bottom: c.y + umlHeight(c) })
  return (
    <figure className="uml">
      <div className="uml-stage" style={{ width: b.width, height: b.height }}>
        <svg width={b.width} height={b.height} aria-hidden="true">
          {b.links.map((l, i) => {
            const from = byId.get(l.from)
            const to = byId.get(l.to)
            if (!from || !to) return null
            const f = box(from)
            const t = box(to)
            const tip = t.bottom + 22
            const mid = Math.round((f.top + tip) / 2)
            return (
              <g key={i} className={`uml-link ${l.kind === 'implements' ? 'impl' : ''}`}>
                <path d={`M ${f.cx} ${f.top} V ${mid} H ${t.cx} V ${tip}`} />
                <polygon points={`${t.cx},${t.bottom} ${t.cx - 13},${tip} ${t.cx + 13},${tip}`} />
              </g>
            )
          })}
        </svg>
        {b.classes.map(c => (
          <div
            key={c.id} className={`uml-cls ${c.kind ?? ''}`}
            style={{ left: c.x, top: c.y, width: c.w ?? 300, height: umlHeight(c) }}
          >
            <div className="uml-name">
              {c.kind === 'interface' && <span className="uml-stereo">«interface»</span>}
              <span>{c.name}</span>
            </div>
            {!!c.attrs?.length && <div className="uml-sec">{c.attrs.map((a, i) => <div key={i}>{a}</div>)}</div>}
            {!!c.ops?.length && <div className="uml-sec">{c.ops.map((a, i) => <div key={i}>{a}</div>)}</div>}
          </div>
        ))}
      </div>
      {b.caption && <figcaption className="uml-cap"><Rich text={b.caption} /></figcaption>}
    </figure>
  )
}

/* ── Scène « compte bancaire » ────────────────────────────────────────── */
function Lock() {
  return (
    <svg className="lock" viewBox="0 0 24 24" width="30" height="30" aria-label="cadenas">
      <rect x="4" y="10" width="16" height="12" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" />
    </svg>
  )
}

function SceneView({ state }: { state: Extract<Block, { k: 'scene' }>['state'] }) {
  const app = state !== 'compte'
  const arrow = state === 'direct' || state === 'risque' || state === 'private'
  const priv = state === 'private'
  const risk = state === 'risque'
  return (
    <figure className={`scene scene-${state}`}>
      <div className="scene-row">
        <div className={`scene-col ${app ? '' : 'off'}`}>
          <div className="scene-tag">Classe utilisatrice</div>
          <div className="scene-box scene-app">
            <div className="scene-head">Application</div>
            <code className="scene-code">{arrow ? 'compte.solde = -5000;' : 'main(...)'}</code>
          </div>
        </div>
        <div className={`scene-arrow ${arrow ? '' : 'off'} ${priv ? 'blocked' : risk ? 'danger' : ''}`}>
          <span className="scene-arrow-label">{priv ? 'accès direct : refusé' : 'accès direct'}</span>
          <svg viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="20" x2={priv ? 230 : 382} y2="20" />
            {!priv && <polygon points="400,20 378,8 378,32" />}
          </svg>
          {priv && <span className="scene-barrier" aria-label="bloqué">✗</span>}
          {priv && <span className="scene-arrow-sub">erreur de compilation</span>}
        </div>
        <div className="scene-col">
          <div className="scene-tag">Objet</div>
          <div className={`scene-box scene-obj ${risk ? 'bad' : ''}`}>
            <div className="scene-head">compte : CompteBancaire</div>
            <div className={`scene-attr ${priv ? 'priv' : ''}`}>
              <span className="scene-attr-tag">attribut</span>
              <code>
                <span className={priv ? 'kw-priv' : 'kw-pub'}>{priv ? 'private' : 'public'}</span> double solde
              </code>
              {priv && <Lock />}
              <span className="scene-val">
                {risk ? <><s>1000 DT</s> <b className="neg">−5000 DT</b></> : '1000 DT'}
              </span>
            </div>
          </div>
          <div className={`scene-inv ${risk ? 'broken' : ''} ${state === 'compte' || state === 'app' ? 'off' : ''}`}>
            Règle métier : <b>solde ≥ 0</b> {risk ? '— violée' : ''}
          </div>
        </div>
      </div>
      {risk && (
        <div className="scene-warn" role="alert">
          <span className="scene-warn-ico">⚠</span>
          L'état interne peut être modifié sans respecter les règles métier.
        </div>
      )}
    </figure>
  )
}

/* ── Objet encapsulé : frontière d'accès ──────────────────────────────── */
function EncapView({ b }: { b: Extract<Block, { k: 'encap' }> }) {
  const [sel, setSel] = useState<number | null>(null)
  const used = new Set(b.paths.map(p => p.port).filter(Boolean))
  const rows = [
    ...b.paths.map((p, i) => ({ ...p, i })),
    ...b.methods.filter(m => !used.has(m)).map(m => ({ port: m, i: -1 } as { port: string; i: number; from?: string; label?: string; ok?: boolean })),
  ]
  const cur = sel === null ? null : b.paths[sel]
  return (
    <div className="encap">
      <div className="encap-grid" style={{ gridTemplateRows: `auto repeat(${rows.length}, 64px)` }}>
        <div className="encap-h" style={{ gridColumn: 1 }}>Classes extérieures</div>
        <div className="encap-frame" style={{ gridRow: `1 / ${rows.length + 2}` }} aria-hidden="true" />
        <div className="encap-h encap-obj" style={{ gridColumn: '3 / 5' }}>{b.object} <span>· frontière d'accès</span></div>
        {rows.map((r, k) => (
          <React.Fragment key={k}>
            <div className="encap-cls" style={{ gridRow: k + 2, gridColumn: 1, visibility: r.from ? undefined : 'hidden' }}>{r.from}</div>
            {r.i >= 0 ? (
              <button
                className={`encap-path ${r.ok ? 'ok' : 'ko'} ${sel === r.i ? 'on' : ''}`}
                style={{ gridRow: k + 2, gridColumn: 2 }}
                aria-pressed={sel === r.i} onClick={() => setSel(sel === r.i ? null : r.i)}
              >
                <code>{r.label}</code><span className="encap-head" aria-hidden="true">{r.ok ? '▶' : '✗'}</span>
              </button>
            ) : <span style={{ gridRow: k + 2, gridColumn: 2 }} />}
            <div className={`encap-port ${r.port ? '' : 'wall'}`} style={{ gridRow: k + 2, gridColumn: 3 }}>
              {r.port ? <code>+ {r.port}</code> : <span>accès refusé</span>}
            </div>
          </React.Fragment>
        ))}
        <div className="encap-inner" style={{ gridRow: `2 / ${rows.length + 2}`, gridColumn: 4 }}>
          <span className="encap-inner-tag">zone privée</span>
          <code>{b.inner}</code>
          <Lock />
        </div>
      </div>
      <div className={`encap-expl ${cur ? (cur.ok ? 'ok' : 'ko') : ''}`} aria-live="polite">
        {cur
          ? <><b>{cur.ok ? '✓ Accepté' : '✗ Refusé'}</b><span><Rich text={cur.text} /></span></>
          : <span className="encap-hint print-hide">Cliquez sur une flèche pour l'expliquer.</span>}
      </div>
    </div>
  )
}

/* ── Révélation un par un ─────────────────────────────────────────────── */
function ProgressiveView({ b, revealed, onReveal }: { b: Extract<Block, { k: 'progressive' }>; revealed: boolean; onReveal: () => void }) {
  const [n, setN] = useState(0)
  const shown = revealed ? b.items.length : n
  const reset = () => {
    setN(0)
    if (revealed) onReveal()
  }
  return (
    <div className="prog">
      <div className="prog-grid" style={{ gridTemplateColumns: `repeat(${b.cols ?? 1}, minmax(0, 1fr))` }}>
        {b.items.map((it, i) => (
          <div key={i} className="prog-item" style={{ visibility: i < shown ? undefined : 'hidden' }} aria-hidden={i >= shown}>
            {it.map((x, j) => <BlockView key={j} b={x} revealed={revealed} onReveal={onReveal} />)}
          </div>
        ))}
      </div>
      <div className="quiz-actions print-hide">
        <button className="qbtn qbtn-main" disabled={shown >= b.items.length} onClick={() => setN(shown + 1)}>
          {b.button} ({shown}/{b.items.length})
        </button>
        {shown < b.items.length && <button className="qbtn" onClick={onReveal}>Tout <kbd>S</kbd></button>}
        <button className="qbtn" onClick={reset}>Réinitialiser</button>
      </div>
    </div>
  )
}

/* ── Packages comme frontières ────────────────────────────────────────── */
function PkgsView({ b }: { b: Extract<Block, { k: 'pkgs' }> }) {
  return (
    <div className="pkgs">
      {b.packages.map((p, i) => (
        <div key={i} className="pkg" style={{ flex: p.classes.length }}>
          <div className="pkg-name">package <b>{p.name}</b></div>
          <div className="pkg-classes">
            {p.classes.map((c, j) => (
              <div key={j} className="pkg-cls">
                <div className="pkg-cls-name">{c.name}</div>
                {c.lines?.map((l, k) => <code key={k} className="pkg-line">{l}</code>)}
                {c.verdict && <div className={`pkg-verdict ${c.verdict.ok ? 'ok' : 'ko'}`}><Rich text={c.verdict.text} /></div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Matrice de visibilité interactive ────────────────────────────────── */
function VisMatrixView({ b }: { b: Extract<Block, { k: 'vismatrix' }> }) {
  const [sel, setSel] = useState<number | null>(null)
  const mark = (c: string) => (c.startsWith('✓') ? 'yes' : 'no')
  return (
    <div className="vm">
      <table className="tbl tbl-marks vm-tbl">
        <thead>
          <tr>
            <th>Contexte</th>
            {b.mods.map((m, i) => (
              <th key={i} className={sel === i ? 'vm-on' : ''}>
                <button className="vm-btn" aria-pressed={sel === i} onClick={() => setSel(sel === i ? null : i)}>
                  <Rich text={m.label} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((r, i) => (
            <tr key={i}>
              <td><Rich text={r.label} /></td>
              {r.cells.map((c, j) => (
                <td key={j} className={`mk-${mark(c)} ${sel === j ? 'vm-on' : sel !== null ? 'vm-dim' : ''}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {sel === null ? (
        <div className="vm-hint print-hide">Cliquez sur un modificateur pour surligner sa colonne.</div>
      ) : (
        <div className="vm-detail" aria-live="polite">
          <CodeBlock code={b.mods[sel].code} small />
          <div className="box box-info"><div className="box-text"><Rich text={b.mods[sel].note} /></div></div>
        </div>
      )}
      <div className="quiz-actions print-hide">
        <button className="qbtn" onClick={() => setSel(null)}>Réinitialiser</button>
      </div>
    </div>
  )
}

const BOX_LABEL = { retenir: 'À retenir', attention: 'Attention', info: 'Remarque', question: 'Question' }

const MARK: Record<string, string> = { Oui: 'yes', 'Oui*': 'yes', Non: 'no' }

export function BlockView({ b, revealed, onReveal, step = 0, onStep = () => {} }: {
  b: Block; revealed: boolean; onReveal: () => void; step?: number; onStep?: (i: number) => void
}) {
  switch (b.k) {
    case 'p':
      return <p className="para"><Rich text={b.text} /></p>
    case 'list': {
      const Tag = b.numbered ? 'ol' : 'ul'
      return <Tag className="list">{b.items.map((it, i) => <BulletItem key={i} b={it} />)}</Tag>
    }
    case 'code':
      return (
        <CodeBlock
          code={b.code} file={b.file} output={b.output} small={b.small} plain={b.plain} highlight={b.highlight}
          bad={b.bad} status={b.status} notes={b.notes} hidden={b.hidden}
        />
      )
    case 'table':
      return (
        <table className={`tbl ${b.small ? 'tbl-small' : ''} ${b.marks ? 'tbl-marks' : ''}`}>
          <thead><tr>{b.head.map((h, i) => <th key={i}><Rich text={h} /></th>)}</tr></thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => (
                <td key={j} className={b.marks && MARK[c] ? `mk-${MARK[c]}` : undefined}><Rich text={c} /></td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      )
    case 'box':
      return (
        <div className={`box box-${b.tone}`}>
          <div className="box-title">{b.title ?? BOX_LABEL[b.tone]}</div>
          <div className="box-text"><Rich text={b.text} /></div>
        </div>
      )
    case 'cols': {
      const r = b.ratio ?? 1
      return (
        <div className="cols" style={{ gridTemplateColumns: `${r}fr 1fr` }}>
          <div className="col">{b.left.map((x, i) => <BlockView key={i} b={x} revealed={revealed} onReveal={onReveal} />)}</div>
          <div className="col">{b.right.map((x, i) => <BlockView key={i} b={x} revealed={revealed} onReveal={onReveal} />)}</div>
        </div>
      )
    }
    case 'quiz':
      return b.verify ? <QuizCheckView b={b} revealed={revealed} onReveal={onReveal} /> : <QuizView b={b} revealed={revealed} />
    case 'steps':
      return <StepsView b={b} step={step} onStep={onStep} revealed={revealed} onReveal={onReveal} />
    case 'tree':
      return <TreeView b={b} />
    case 'polar':
      return <PolarView cartesian={b.cartesian} />
    case 'cards':
      return (
        <div className="cards" style={{ gridTemplateColumns: `repeat(${b.items.length}, minmax(0, 1fr))` }}>
          {b.items.map((it, i) => (
            <div key={i} className="card">
              <div className="card-head"><span className="card-n">{i + 1}</span><Rich text={it.title} /></div>
              <div className="card-text"><Rich text={it.text} /></div>
            </div>
          ))}
        </div>
      )
    case 'qa':
      return <QaView b={b} revealed={revealed} onReveal={onReveal} />
    case 'ask':
      return <p className="ask"><Rich text={b.text} /></p>
    case 'scene':
      return <SceneView state={b.state} />
    case 'encap':
      return <EncapView b={b} />
    case 'progressive':
      return <ProgressiveView b={b} revealed={revealed} onReveal={onReveal} />
    case 'pkgs':
      return <PkgsView b={b} />
    case 'vismatrix':
      return <VisMatrixView b={b} />
    case 'reveal':
      return <RevealView b={b} revealed={revealed} onReveal={onReveal} />
    case 'fill':
      return <FillView b={b} revealed={revealed} onReveal={onReveal} />
    case 'uml':
      return <UmlView b={b} />
    case 'access':
      return <AccessView b={b} />
    case 'memory':
      return <MemoryView stack={b.stack} heap={b.heap} title={b.title} caption={b.caption} compact={b.compact} />
    case 'flow':
      return (
        <div className="flow">
          {b.steps.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="flow-arrow">→</div>}
              <div className="flow-step">
                <div className="flow-label"><Rich text={s.label} /></div>
                {s.sub && <div className="flow-sub"><Rich text={s.sub} /></div>}
              </div>
            </React.Fragment>
          ))}
        </div>
      )
    case 'exercise': {
      const sol = revealed ? (
        <div className="exo-sol">
          <div className="exo-sol-title">Solution</div>
          {b.solution.map((x, i) => <BlockView key={i} b={x} revealed={revealed} onReveal={onReveal} />)}
        </div>
      ) : (
        <div className="print-hide">
          <button className="exo-btn" onClick={onReveal}>Afficher la solution <kbd>S</kbd></button>
          <span className="exo-hint">Cherchez 1 minute avec votre voisin avant de répondre.</span>
        </div>
      )
      const head = (
        <div className="exo-head">
          <span className="exo-tag">Exercice</span>
          <span className="exo-prompt"><Rich text={b.prompt} /></span>
        </div>
      )
      if (b.side && b.code) {
        return (
          <div className="exo">
            {head}
            <div className="exo-side">
              <CodeBlock code={b.code} small />
              <div className="exo-right">{sol}</div>
            </div>
          </div>
        )
      }
      return (
        <div className="exo">
          {head}
          {b.code && <CodeBlock code={b.code} small />}
          {sol}
        </div>
      )
    }
  }
}

/* ── Diapositive ─────────────────────────────────────────────────────── */
/** Nombre d'étapes d'une diapo (1 si elle n'a pas de bloc `steps`). */
export function stepCount(slide: Slide): number {
  if (slide.kind !== 'content') return 1
  const s = slide.blocks.find(b => b.k === 'steps')
  return s && s.k === 'steps' ? s.items.length : 1
}

export function SlideView({ slide, index, total, revealed, onReveal, step = 0, onStep = () => {} }: {
  slide: Slide; index: number; total: number; revealed: boolean; onReveal: () => void; step?: number; onStep?: (i: number) => void
}) {
  if (slide.kind === 'cover') {
    return (
      <div className="slide slide-cover">
        <img src={fsmLogo} alt="Faculté des Sciences de Monastir" className="cover-logo" />
        <div className="cover-inst">Faculté des Sciences de Monastir · Licence GLSI 2</div>
        <h1 className="cover-title">{slide.title}</h1>
        <div className="cover-sub">Programmation Orientée Objet en <strong>Java</strong></div>
        <div className="cover-teacher">
          <div>Enseignante : <strong>Sabrine Boussema</strong></div>
          <div>Année universitaire <strong>2026-2027</strong></div>
        </div>
        <div className="cover-hint print-hide">Utilisez les flèches ← → ou la barre du bas pour naviguer</div>
      </div>
    )
  }

  if (slide.kind === 'chapter') {
    return (
      <div className="slide slide-chapter">
        <div className="chap-num">Chapitre {slide.number}</div>
        <h1 className="chap-title">{slide.title}</h1>
        <div className="chap-goals-title">Dans ce chapitre</div>
        <ul className="chap-goals">
          {slide.goals.map((g, i) => <li key={i}><Rich text={g} /></li>)}
        </ul>
        <SlideFooter index={index} total={total} />
      </div>
    )
  }

  return (
    <div className="slide slide-content">
      <header className="slide-head">
        <img src={fsmLogo} alt="" className="head-logo" />
        <span className="head-course"><span className="head-java">JAVA</span> · FSM · POO · GLSI 2</span>
        <span className="head-chapter">{chapterLabel(slide.chapter)}</span>
      </header>
      <div className="slide-title-wrap">
        {slide.section && <div className="slide-section">{slide.section}</div>}
        <h2 className="slide-title"><Rich text={slide.title} /></h2>
      </div>
      <div className="slide-body">
        {slide.blocks.map((b, i) => <BlockView key={i} b={b} revealed={revealed} onReveal={onReveal} step={step} onStep={onStep} />)}
      </div>
      <SlideFooter index={index} total={total} />
    </div>
  )
}

function SlideFooter({ index, total }: { index: number; total: number }) {
  return <div className="slide-num">{index + 1} / {total}</div>
}
