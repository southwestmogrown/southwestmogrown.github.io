import { useEffect, useState } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

const USERNAME = 'southwestmogrown'

const FEATURED_REPOS = [
  'code_genie',
  'kanboard',
  'quizquest',
  'chkn-tndr',
  'beginner-synth',
  'guitar-hub',
]

const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
}

const REPO_DESCRIPTIONS = {
  code_genie:
    'A CrewAI flow that generates, reviews, and optionally refactors code snippets based on user prompt.',
  kanboard:
    'Full-stack kanban board with real-time collaboration via native WebSockets. Built with Next.js, TypeScript, PostgreSQL, and Prisma.',
  quizquest: 'A gamified Learning Management System built with TypeScript.',
  'chkn-tndr':
    'Real-time, multiplayer "where should we eat?" game — Tinder-style swiping for the group dinner dilemma.',
  'beginner-synth':
    'A software synthesizer built from scratch in C++ — exploring audio DSP and sound design.',
  'guitar-hub':
    'A social platform for guitarists to share tabs, riffs, and connect with other musicians.',
}

const FALLBACK_LANGS = {
  'beginner-synth': 'C++',
  'guitar-hub': 'JavaScript',
  code_genie: 'Python',
  kanboard: 'TypeScript',
  quizquest: 'TypeScript',
  'chkn-tndr': 'TypeScript',
}

function buildFallback() {
  return FEATURED_REPOS.map((name) => ({
    name,
    html_url: `https://github.com/${USERNAME}/${name}`,
    description: REPO_DESCRIPTIONS[name] || '',
    language: FALLBACK_LANGS[name] || '',
  }))
}

function ProjectCard({ repo }) {
  const desc = REPO_DESCRIPTIONS[repo.name] || repo.description || 'No description available.'
  const langColor = LANG_COLORS[repo.language] || '#8b8ba7'
  const title = repo.name.replace(/[-_]/g, ' ')

  return (
    <article className="project-card fade-up visible">
      <div className="project-card__header">
        <span className="project-card__icon">📁</span>
        <div className="project-card__links">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repo"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__desc">{desc}</p>
      <div className="project-card__footer">
        {repo.language && (
          <span className="project-card__lang">
            <span
              className="project-card__lang-dot"
              style={{ background: langColor }}
            ></span>
            {repo.language}
          </span>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState(null)
  const [labelRef, labelClass] = useFadeUp()
  const [titleRef, titleClass] = useFadeUp()
  const [subtitleRef, subtitleClass] = useFadeUp()

  useEffect(() => {
    const promises = FEATURED_REPOS.map((name) =>
      fetch(`https://api.github.com/repos/${USERNAME}/${name}`)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null)
    )
    Promise.all(promises)
      .then((results) => {
        const valid = results.filter(Boolean)
        setRepos(valid.length > 0 ? valid : buildFallback())
      })
      .catch(() => setRepos(buildFallback()))
  }, [])

  return (
    <section className="projects" id="projects">
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          Portfolio
        </span>
        <h2 ref={titleRef} className={`section-title ${titleClass}`}>
          Featured Projects
        </h2>
        <p ref={subtitleRef} className={`section-subtitle ${subtitleClass}`}>
          A selection of recent work — from AI agent pipelines to real-time
          collaborative apps and creative coding experiments.
        </p>

        <div className="projects__grid" id="projects-grid">
          {repos === null ? (
            <div className="projects__loading">
              <div className="spinner"></div>
              <p>Loading projects from GitHub&hellip;</p>
            </div>
          ) : (
            repos.map((repo) => <ProjectCard key={repo.name} repo={repo} />)
          )}
        </div>
      </div>
    </section>
  )
}
