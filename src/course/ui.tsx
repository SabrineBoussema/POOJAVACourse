import React, { useState } from 'react'
import { hi } from '../syntaxHighlight'
import type { Block, Bullet, MemObj, MemVar, Slide } from './types'
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

export function CodeBlock({ code, file, output, small, plain, highlight }: { code: string; file?: string; output?: string; small?: boolean; plain?: boolean; highlight?: number[] }) {
  const clean = code.replace(/^\n+|\s+$/g, '')
  const hl = new Set(highlight ?? [])
  const term = file === 'Terminal'
  return (
    <div className={`code ${small ? 'code-small' : ''}`}>
      {file && (
        <div className="code-tabs">
          <span className="code-tab"><span className={`code-tab-icon ${term ? 'term' : ''}`}>{term ? '>_' : 'J'}</span>{file}</span>
        </div>
      )}
      {plain || term ? (
        <pre className={term ? '' : 'plain'}>{clean}</pre>
      ) : (
        <div className="code-body">
          {splitHtmlLines(hi(clean)).map((h, i) => (
            <div key={i} className={`ln ${hl.has(i + 1) ? 'ln-hl' : ''}`}>
              <span className="ln-no">{i + 1}</span>
              <span className="ln-tx" dangerouslySetInnerHTML={{ __html: h }} />
            </div>
          ))}
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

const BOX_LABEL = { retenir: 'À retenir', attention: 'Attention', info: 'Remarque' }

export function BlockView({ b, revealed, onReveal }: { b: Block; revealed: boolean; onReveal: () => void }) {
  switch (b.k) {
    case 'p':
      return <p className="para"><Rich text={b.text} /></p>
    case 'list': {
      const Tag = b.numbered ? 'ol' : 'ul'
      return <Tag className="list">{b.items.map((it, i) => <BulletItem key={i} b={it} />)}</Tag>
    }
    case 'code':
      return <CodeBlock code={b.code} file={b.file} output={b.output} small={b.small} plain={b.plain} highlight={b.highlight} />
    case 'table':
      return (
        <table className={`tbl ${b.small ? 'tbl-small' : ''}`}>
          <thead><tr>{b.head.map((h, i) => <th key={i}><Rich text={h} /></th>)}</tr></thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => <td key={j}><Rich text={c} /></td>)}</tr>
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
      return <QuizView b={b} revealed={revealed} />
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
export function SlideView({ slide, index, total, revealed, onReveal }: {
  slide: Slide; index: number; total: number; revealed: boolean; onReveal: () => void
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
        {slide.blocks.map((b, i) => <BlockView key={i} b={b} revealed={revealed} onReveal={onReveal} />)}
      </div>
      <SlideFooter index={index} total={total} />
    </div>
  )
}

function SlideFooter({ index, total }: { index: number; total: number }) {
  return <div className="slide-num">{index + 1} / {total}</div>
}
