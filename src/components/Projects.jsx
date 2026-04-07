import { useFadeUp } from '../hooks/useFadeUp'

const PROFILE_URL = 'https://github.com/southwestmogrown'

const SOLUTIONS = [
  {
    id: 'SOL-001',
    title: 'Ops Dashboard',
    problem: 'Production floor lacked real-time visibility into shift metrics, leading to reactive decision-making.',
    solution: 'Built a live ops dashboard with WebSocket data streams, role-based access, and KPI trend analysis integrated with existing floor systems.',
    stack: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'Docker'],
    sourceUrl: PROFILE_URL,
  },
  {
    id: 'SOL-002',
    title: 'Kaminify',
    problem: 'Recreating a site\'s visual identity on different content required hours of manual CSS extraction and design-system templating with no repeatable workflow.',
    solution: 'AI pipeline that accepts a design URL and a content URL, extracts the visual design system from the first, structures content from the second, and uses Claude to generate a cloned multi-page site — streamed progressively and downloadable as a ZIP.',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Supabase', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/southwestmogrown/kaminify',
    liveUrl: 'https://kaminify.com',
  },
  {
    id: 'SOL-003',
    title: 'Prompt Playground',
    problem: 'Engineers lacked a structured way to iterate, version, and evaluate LLM prompts across projects.',
    solution: 'Interactive prompt IDE with version history, side-by-side model comparison, and a CrewAI-powered evaluation pipeline for automated quality scoring.',
    stack: ['React', 'Python', 'Flask', 'CrewAI', 'Claude API'],
    sourceUrl: PROFILE_URL,
  },
  {
    id: 'SOL-004',
    title: 'Resume Parser',
    problem: 'Manual resume screening was consuming 3+ hours per hiring cycle and introducing inconsistent evaluation.',
    solution: 'Agentic parser that extracts structured data, scores candidates against a job spec, and outputs ranked summaries — cutting review time by 80%.',
    stack: ['Python', 'CrewAI', 'Claude API', 'FastAPI', 'PostgreSQL'],
    sourceUrl: PROFILE_URL,
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

function SolutionCard({ id, title, problem, solution, stack, sourceUrl, liveUrl }) {
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
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="solution-card__link"
        >
          <i className="fa-brands fa-github"></i> SOURCE
        </a>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="solution-card__link"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i> LIVE
          </a>
        )}
      </div>
    </article>
  )
}

