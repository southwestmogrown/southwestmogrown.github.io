import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import overviewRaw from '../../content/projects/foliochat/overview.md?raw'

// Auto-discovers all markdown files dropped into the articles directory
const articleModules = import.meta.glob(
  '../../content/projects/foliochat/articles/*.md',
  { query: '?raw', import: 'default', eager: true }
)

const ARTICLES = Object.entries(articleModules)
  .map(([path, content]) => ({
    slug: path.split('/').pop().replace('.md', ''),
    content,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const STACK = ['TypeScript', 'React', 'Claude API', 'GitHub API', 'Node.js']

export default function FolioChatPage() {
  return (
    <div className="project-page">
      <header className="project-page__header">
        <div className="container">
          <Link to="/" className="project-page__back">← BACK</Link>
        </div>
      </header>

      <main className="container">
        <div className="project-page__meta">
          <span className="section-label">PROJECT // DEEP DIVE</span>
          <h1 className="project-page__title">FolioChat</h1>
          <p className="project-page__description">
            AI-powered portfolio chat assistant with live GitHub context. Indexes public repos,
            answers questions about projects, skills, and background in real time.
            Embeddable widget — active on this page.
          </p>
          <div className="project-page__stack">
            {STACK.map(t => (
              <span key={t} className="stack-tag">{t}</span>
            ))}
          </div>
        </div>

        <section className="project-page__section">
          <h2 className="project-page__section-title">// OVERVIEW</h2>
          <div className="project-page__prose">
            <ReactMarkdown>{overviewRaw}</ReactMarkdown>
          </div>
        </section>

        <section className="project-page__section">
          <h2 className="project-page__section-title">// ARTICLES</h2>
          {ARTICLES.length === 0 ? (
            <p className="project-page__empty">
              No articles yet. Content pipeline incoming.
            </p>
          ) : (
            <div className="project-page__articles">
              {ARTICLES.map(article => (
                <article key={article.slug} className="project-page__article">
                  <h3 className="project-page__article-title">
                    {article.slug.replace(/-/g, ' ').toUpperCase()}
                  </h3>
                  <div className="project-page__prose">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
