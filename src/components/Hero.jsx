import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: 'WILKEY_OS v2.0.48 — SYSTEMS ARCHITECT & TECHNICAL LEADER', cls: 'terminal__line--accent' },
  { text: 'Initializing primary systems...', cls: '' },
  { text: '  [OK] Full-stack engineering core loaded', cls: '' },
  { text: '  [OK] AI/ML pipeline subsystems online', cls: '' },
  { text: '  [OK] Production supervision module active', cls: '' },
  { text: '  [OK] Instruction & mentorship engine ready', cls: '' },
  { text: 'Security protocols: SECURITY+ / AWS CERTIFIED', cls: 'terminal__line--dim' },
  { text: 'Status: ALL SYSTEMS OPTIMAL', cls: 'terminal__line--accent' },
  { text: '$ _', cls: '' },
]

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) return
    const delay = visibleLines === 0 ? 400 : 280
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay)
    return () => clearTimeout(timer)
  }, [visibleLines])

  return (
    <section className="hero" id="hero">
      <div className="container">
        {/* Left: text block */}
        <div className="hero__text">
          <p className="hero__label">SYSTEMS ARCHITECT &amp; TECHNICAL LEADER</p>
          <h1 className="hero__heading">
            Engineering<br />
            <mark>Resilient</mark><br />
            Solutions.
          </h1>
          <p className="hero__subhead">
            Engineering resilient full-stack solutions with the precision of a
            production supervisor and the logic of an instructor.
          </p>
          <div className="hero__actions">
            <a href="#firmware" className="btn btn--primary">
              [ VIEW SOLUTIONS ]
            </a>
            <a
              href="https://github.com/southwestmogrown"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              [ VIEW SOURCE ]
            </a>
          </div>
        </div>

        {/* Right: terminal window */}
        <div className="terminal" aria-label="System boot sequence">
          <div className="terminal__header">
            <span className="terminal__dot terminal__dot--red"></span>
            <span className="terminal__dot terminal__dot--yellow"></span>
            <span className="terminal__dot terminal__dot--green"></span>
            <span className="terminal__title">WILKEY_OS — boot.log</span>
          </div>
          <div className="terminal__body" aria-live="polite">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <span key={i} className={`terminal__line ${line.cls}`}>
                {line.text}
              </span>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span className="terminal__cursor" aria-hidden="true"></span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

