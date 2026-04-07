import { useFadeUp } from '../hooks/useFadeUp'

const cards = [
  {
    icon: '⚙',
    title: 'AI-Aided Development',
    body: 'Building with LLMs, CrewAI, and the Claude API. Designing agentic workflows and automation pipelines that cut the tedious parts out of how dev teams operate.',
  },
  {
    icon: '📡',
    title: 'Bootcamp Instructor',
    body: 'Taught full-stack web development cohorts for 6+ years. From fundamentals to final projects — 1,000+ engineers trained, 90% placement rate.',
  },
  {
    icon: '🔧',
    title: 'Leader & Process Builder',
    body: 'Led cross-functional engineering teams and 45-person value streams. Production-grade quality standards with 98% first pass yield.',
  },
  {
    icon: '🛠',
    title: 'Open for Freelance',
    body: 'Taking on freelance projects in web development, AI tooling, and process improvement. If you have a problem, reach out.',
  },
]

export default function About() {
  const [labelRef, labelClass] = useFadeUp()
  const [titleRef, titleClass] = useFadeUp()
  const [subtitleRef, subtitleClass] = useFadeUp()

  return (
    <section id="hardware" className="hardware">
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          HARDWARE
        </span>
        <h2 ref={titleRef} className={`section-title ${titleClass}`}>
          Engineer. Instructor. Builder.
        </h2>
        <p ref={subtitleRef} className={`section-subtitle ${subtitleClass}`}>
          Full-stack developer and bootcamp instructor. Six years writing
          software, teaching it, and shipping more of it with less friction.
        </p>

        <div className="hardware__grid">
          {cards.map((card) => (
            <HardwareCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HardwareCard({ icon, title, body }) {
  const [ref, cls] = useFadeUp()
  return (
    <div ref={ref} className={`hardware-card ${cls}`}>
      <div className="hardware-card__icon">{icon}</div>
      <h3 className="hardware-card__title">{title}</h3>
      <p className="hardware-card__body">{body}</p>
    </div>
  )
}

