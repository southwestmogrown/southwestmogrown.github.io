import { useFadeUp } from '../hooks/useFadeUp'

const cards = [
  {
    icon: '🤖',
    title: 'AI-Aided Development',
    body: 'Building with LLMs, CrewAI, and the Claude API. I design agentic workflows and automation pipelines that cut the tedious parts out of how dev teams work.',
  },
  {
    icon: '👨‍🏫',
    title: 'Bootcamp Instructor',
    body: 'Taught full-stack web development cohorts for 6+ years. From fundamentals to final projects — helping hundreds of students land their first engineering roles.',
  },
  {
    icon: '🎯',
    title: 'Leader & Process Builder',
    body: 'Led cross-functional engineering teams, built code review cultures, and established delivery rhythms that keep quality high without slowing teams down.',
  },
  {
    icon: '🚀',
    title: 'Open for Freelance',
    body: 'Taking on freelance projects in web development, AI tooling, and process improvement. If you have a specific problem and want someone who will think it through with you, reach out.',
  },
]

export default function About() {
  const [labelRef, labelClass] = useFadeUp()
  const [titleRef, titleClass] = useFadeUp()
  const [subtitleRef, subtitleClass] = useFadeUp()

  return (
    <section className="about" id="about">
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          About Me
        </span>
        <h2 ref={titleRef} className={`section-title ${titleClass}`}>
          Engineer. Instructor. Builder.
        </h2>
        <p ref={subtitleRef} className={`section-subtitle ${subtitleClass}`}>
          Full-stack developer and bootcamp instructor. I&apos;ve spent six years
          writing software, teaching it, and figuring out how to ship more of it
          with less friction.
        </p>

        <div className="about__grid">
          {cards.map((card) => (
            <AboutCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutCard({ icon, title, body }) {
  const [ref, cls] = useFadeUp()
  return (
    <div ref={ref} className={`about__card ${cls}`}>
      <div className="about__card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}
