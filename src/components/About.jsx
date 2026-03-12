import { useFadeUp } from '../hooks/useFadeUp'

const cards = [
  {
    icon: '💻',
    title: 'Developer & Instructor',
    body: '6+ years of hands-on coding and teaching experience across multiple languages and frameworks. Passionate about mentoring the next generation of engineers.',
  },
  {
    icon: '🤖',
    title: 'Agentic Engineer',
    body: 'Building intelligent agent workflows with CrewAI, LLMs, and custom toolchains. Specializing in AI-augmented development and automation.',
  },
  {
    icon: '🎸',
    title: 'Musician & Composer',
    body: 'Multi-instrumentalist and composer. Music fuels my creativity and problem-solving — from writing riffs to writing code.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Husband & Father of 4',
    body: 'Family is my foundation. Being a dad of four has taught me patience, time management, and the art of solving chaos with creativity.',
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
          Engineer. Musician. Father.
        </h2>
        <p ref={subtitleRef} className={`section-subtitle ${subtitleClass}`}>
          Lifelong tech enthusiast turned freelance programmer and agentic engineer.
          I build full-stack applications, design AI agent pipelines, and love
          turning complex problems into clean, working software.
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
