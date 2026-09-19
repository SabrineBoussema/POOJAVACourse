/** Logos officiels — toolchain Java */

import javaLogo from './assets/logos/java.png'
import jdkLogo from './assets/logos/jdk.jpg'
import jvmLogo from './assets/logos/jvm.png'
import openjdkLogo from './assets/logos/openjdk.jpg'
import intellijLogo from './assets/logos/intellij.svg'
import eclipseLogo from './assets/logos/eclipse.svg'
import vscodeLogo from './assets/logos/vscode.svg'
import mavenLogo from './assets/logos/maven.svg'
import gradleLogo from './assets/logos/gradle.svg'
import gitLogo from './assets/logos/git.svg'
import springLogo from './assets/logos/spring.svg'
import oracleLogo from './assets/logos/oracle.svg'

const ORANGE = '#F97300'

const LOGO_SRC: Record<string, string> = {
  java: javaLogo,
  jdk: jdkLogo,
  jvm: jvmLogo,
  openjdk: openjdkLogo,
  intellij: intellijLogo,
  eclipse: eclipseLogo,
  vscode: vscodeLogo,
  maven: mavenLogo,
  gradle: gradleLogo,
  git: gitLogo,
  spring: springLogo,
  oracle: oracleLogo,
}

const PLATE: Record<string, string> = {
  java: '#000000',
  jdk: '#FFFFFF',
  jvm: '#F8FAFC',
  openjdk: '#FFFFFF',
  intellij: '#F8FAFC',
  eclipse: '#F5F3FF',
  vscode: '#EFF6FF',
  maven: '#FEF2F2',
  gradle: '#ECFDF5',
  git: '#FFF7ED',
  spring: '#F0FDF4',
  oracle: '#FEF2F2',
}

/** Wordmarks horizontaux */
const WIDE = new Set(['jdk', 'jvm', 'openjdk'])

const NAMES: Record<string, string> = {
  java: 'Java',
  jdk: 'JDK',
  jvm: 'JVM',
  openjdk: 'OpenJDK',
  intellij: 'IntelliJ IDEA',
  eclipse: 'Eclipse',
  vscode: 'VS Code',
  maven: 'Maven',
  gradle: 'Gradle',
  git: 'Git',
  spring: 'Spring',
  jakarta: 'Jakarta EE',
  oracle: 'Oracle',
}

export function TechMark({ label, color, size = 48 }: { label: string; color: string; size?: number }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-2xl mono font-black"
      style={{
        width: size,
        height: size,
        background: color + '14',
        border: `2px solid ${color}`,
        color,
        fontSize: size * 0.28,
        letterSpacing: '-0.02em',
        boxShadow: `0 6px 18px ${color}22`,
      }}
      aria-hidden
    >
      {label}
    </div>
  )
}

export function ToolLogo({
  kind,
  size = 52,
  /** Mode compact : force un cadre carré (pipelines / cartes étroites) */
  compact = false,
}: {
  kind: string
  size?: number
  compact?: boolean
}) {
  const src = LOGO_SRC[kind]
  if (!src) {
    return <TechMark label={kind.slice(0, 2).toUpperCase()} color={ORANGE} size={size} />
  }

  const isBadge = kind === 'intellij' || kind === 'java'
  const isWide = !compact && WIDE.has(kind)
  const pad = isBadge ? 0 : Math.max(4, Math.round(size * (isWide ? 0.08 : 0.12)))
  const radius = Math.max(8, Math.round(size * 0.18))
  const boxW = isWide ? Math.round(size * (kind === 'jvm' ? 1.45 : 2.1)) : size
  const boxH = size

  return (
    <div
      className="shrink-0 flex items-center justify-center overflow-hidden"
      style={{
        width: boxW,
        height: boxH,
        borderRadius: radius,
        background: isBadge ? (PLATE[kind] ?? 'transparent') : PLATE[kind] ?? '#F8FAFC',
        border: isBadge ? 'none' : '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: isBadge ? '0 8px 24px rgba(15,23,42,0.18)' : '0 4px 14px rgba(15,23,42,0.06)',
        padding: pad,
      }}
      title={NAMES[kind] ?? kind}
    >
      <img
        src={src}
        alt={NAMES[kind] ?? kind}
        width={boxW - pad * 2}
        height={boxH - pad * 2}
        style={{
          width: boxW - pad * 2,
          height: boxH - pad * 2,
          objectFit: 'contain',
          display: 'block',
        }}
        draggable={false}
      />
    </div>
  )
}

/** Rangée de logos — wordmarks JDK/JVM en compact pour éviter le débordement */
export function LogoStrip({
  kinds = ['java', 'jdk', 'jvm', 'intellij'],
  size = 40,
  gap = 10,
  labels = false,
}: {
  kinds?: string[]
  size?: number
  gap?: number
  labels?: boolean
}) {
  const labelText: Record<string, string> = {
    java: 'Java',
    jdk: 'JDK',
    jvm: 'JVM',
    openjdk: 'OpenJDK',
    intellij: 'IntelliJ',
    eclipse: 'Eclipse',
    vscode: 'VS Code',
    maven: 'Maven',
    gradle: 'Gradle',
    git: 'Git',
    spring: 'Spring',
    oracle: 'Oracle',
  }
  return (
    <div className="flex items-center flex-wrap" style={{ gap }} aria-label="Technologies Java">
      {kinds.map((k) => (
        <div key={k} className="flex flex-col items-center" style={{ gap: 4 }}>
          <ToolLogo kind={k} size={size} compact={WIDE.has(k) && size <= 48} />
          {labels && (
            <span className="mono font-bold" style={{ fontSize: Math.max(10, size * 0.22), color: '#64748B' }}>
              {labelText[k] ?? k}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
