import { useFadeUp } from '../hooks/useFadeUp'

export const SOLUTIONS = [
  {
    id: 'SOL-000',
    title: 'FolioChat',
    problem: 'Portfolio sites are static and passive — visitors scroll once and leave without experiencing the depth behind the work.',
    solution: 'AI-powered portfolio chat assistant with live GitHub context. Fetches real repo data, answers questions about projects, skills, and background in real time. Embeddable widget — active on this page.',
    stack: ['TypeScript', 'React', 'Claude API', 'GitHub API'],
    sourceUrl: 'https://github.com/southwestmogrown/foliochat',
    liveUrl: null,
    liveAction: () => window.dispatchEvent(new CustomEvent('foliochat:open')),
    detailUrl: '/projects/foliochat',
    imageUrl: '/assets/images/projects/foliochat/foliochat-example.png',
    featured: true,
  },
  {
    id: 'SOL-001',
    title: 'Kinetic Command',
    problem: 'Production floor lacked real-time visibility into shift metrics, leading to reactive decision-making.',
    solution: 'Real-time operations dashboard for manufacturing floor KPI tracking. WebSocket data streams, role-based access, and trend analysis integrated with existing floor systems.',
    stack: ['Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/southwestmogrown/ops-dashboard-demo',
    imageUrl: '/assets/images/projects/kinetic-command/Kinetic-Command-Dashboard.png',
    liveUrl: 'https://ops-dashboard-demo.vercel.app/',
    detailUrl: '/projects/kinetic-command',
  },
  {
    id: 'SOL-002',
    title: 'Kaminify',
    problem: 'Recreating a site\'s visual identity on different content required hours of manual CSS extraction and design-system templating with no repeatable workflow.',
    solution: 'AI pipeline that accepts a design URL and a content URL, extracts the visual design system from the first, structures content from the second, and uses Claude to generate a cloned multi-page site — streamed progressively and downloadable as a ZIP.',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Supabase', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/southwestmogrown/kaminify',
    liveUrl: 'https://kaminify.com',
    imageUrl: '/assets/images/projects/kaminify/kaminify-splash.png',
    detailUrl: '/projects/kaminify',
  },
  {
    id: 'SOL-003',
    title: 'Prism',
    problem: 'Engineers lacked a structured way to iterate, version, and evaluate LLM prompts across projects.',
    solution: 'Multi-model LLM prompt testing tool. Run any prompt against multiple AI models simultaneously, compare responses side by side, score them, and save runs for later review. Includes a demo mode for unauthenticated visitors.',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Prisma', 'PostgreSQL'],
    sourceUrl: 'https://github.com/southwestmogrown/prompt-playground',
    imageUrl: '/assets/images/projects/prism/prism-landing.png',
    liveUrl: 'https://prompt-playground-weld.vercel.app/',
    detailUrl: '/projects/prism',
  },
  {
    id: 'SOL-004',
    title: 'PassStack',
    problem: 'Job seekers spend hours manually tailoring resumes and cover letters with no structured feedback on skill gaps, fit, or how to prepare for interviews.',
    solution: 'Multi-phase Claude API pipeline — upload a PDF resume, get a tiered gap analysis against a job description, bullet rewrites, a streaming cover letter draft, a personalized study plan, and behavioral STAR interview coaching. Stripe-gated paid phases with Supabase token storage.',
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Stripe', 'Supabase', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/southwestmogrown/resume-parser',
    imageUrl: '/assets/images/projects/resume-parser/PassStack-Landing.png',
    liveUrl: 'https://resume-parser-ten-mu.vercel.app/',
    detailUrl: '/projects/resume-parser',
  },
  {
    id: 'SOL-005',
    title: 'QuizQuest',
    problem: 'Traditional training platforms offered no engagement loop — learners dropped off quickly with no incentive to retain knowledge or complete courses.',
    solution: 'Gamified LMS that turns Markdown files into interactive lessons — reading, quizzes, and in-browser code challenges with a Go execution sandbox. AI Socratic Coach streams hints via SSE without giving answers. XP, streaks, and a rank system drive completion.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Go', 'Claude API'],
    sourceUrl: 'https://github.com/southwestmogrown/quizquest',
    imageUrl: '/assets/images/projects/quizquest/quizquest-dashboard.png',
    liveUrl: 'https://quizquest-5g96.onrender.com/',
    detailUrl: '/projects/quizquest',
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

function SolutionCard({ id, title, problem, solution, stack, sourceUrl, liveUrl, liveAction, imageUrl, detailUrl, featured }) {
  return (
    <article className={`solution-card${featured ? ' solution-card--featured' : ''}`}>
      <div className="solution-card__id">{id}</div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${title} screenshot`}
          className="solution-card__image"
          loading="lazy"
        />
      )}
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
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="solution-card__link"
          >
            <i className="fa-brands fa-github"></i> SOURCE
          </a>
        )}
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
        {!liveUrl && liveAction && (
          <button
            onClick={liveAction}
            className="solution-card__link"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i> LIVE
          </button>
        )}
        {detailUrl && (
          <a href={detailUrl} className="solution-card__link solution-card__link--detail">
            <i className="fa-solid fa-file-lines"></i> DEEP DIVE
          </a>
        )}
      </div>
    </article>
  )
}

