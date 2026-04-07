import { useFadeUp } from '../hooks/useFadeUp'

const SOLUTIONS = [
  {
    id: 'SOL-001',
    title: 'Ops Dashboard',
    problem: 'Production floor lacked real-time visibility into shift metrics, leading to reactive decision-making.',
    solution: 'Built a live ops dashboard with WebSocket data streams, role-based access, and KPI trend analysis integrated with existing floor systems.',
    stack: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/southwestmogrown',
  },
  {
    id: 'SOL-002',
    title: 'Kaminify',
    problem: 'Kanban workflows across remote teams were fragmented across multiple tools with no single source of truth.',
    solution: 'Full-stack kanban board with real-time collaboration via native WebSockets, drag-and-drop, and persistent board state via PostgreSQL and Prisma.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'WebSockets'],
    github: 'https://github.com/southwestmogrown/kanboard',
  },
  {
    id: 'SOL-003',
    title: 'Prompt Playground',
    problem: 'Engineers lacked a structured way to iterate, version, and evaluate LLM prompts across projects.',
    solution: 'Interactive prompt IDE with version history, side-by-side model comparison, and a CrewAI-powered evaluation pipeline for automated quality scoring.',
    stack: ['React', 'Python', 'Flask', 'CrewAI', 'Claude API'],
    github: 'https://github.com/southwestmogrown',
  },
  {
    id: 'SOL-004',
    title: 'Resume Parser',
    problem: 'Manual resume screening was consuming 3+ hours per hiring cycle and introducing inconsistent evaluation.',
    solution: 'Agentic parser that extracts structured data, scores candidates against a job spec, and outputs ranked summaries — cutting review time by 80%.',
    stack: ['Python', 'CrewAI', 'Claude API', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/southwestmogrown',
  },
]

export default function Projects() {
  const [labelRef, labelClass] = useFadeUp()
  const [titleRef, titleClass] = useFadeUp()
  const [subtitleRef, subtitleClass] = useFadeUp()
  const [gridRef, gridClass] = useFadeUp()

  return (
    <section className="firmware" id="firmware">
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          FIRMWARE
        </span>
        <h2 ref={titleRef} className={`section-title ${titleClass}`}>
          Featured Solutions
        </h2>
        <p ref={subtitleRef} className={`section-subtitle ${subtitleClass}`}>
          Business problems solved with technical precision. Each entry documents
          the problem, the engineering approach, and the stack deployed.
        </p>

        <div ref={gridRef} className={`firmware__grid ${gridClass}`}>
          {SOLUTIONS.map((s) => (
            <SolutionCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionCard({ id, title, problem, solution, stack, github }) {
  return (
    <article className="solution-card">
      <div className="solution-card__id">{id}</div>
      <h3 className="solution-card__title">{title}</h3>

      <div className="solution-card__problem">
        <span className="solution-card__problem-label">PROBLEM</span>
        <p className="solution-card__problem-text">{problem}</p>
      </div>

      <div className="solution-card__solution">
        <span className="solution-card__solution-label">SOLUTION</span>
        <p className="solution-card__solution-text">{solution}</p>
      </div>

      <div className="solution-card__stack">
        {stack.map((t) => (
          <span key={t} className="stack-tag">{t}</span>
        ))}
      </div>

      <div className="solution-card__links">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="solution-card__link"
        >
          <i className="fa-brands fa-github"></i> SOURCE
        </a>
      </div>
    </article>
  )
}

