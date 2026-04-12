import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const articleModules = import.meta.glob(
  '../../content/writing/*.md',
  { query: '?raw', import: 'default', eager: true }
)

const ARTICLES = Object.entries(articleModules)
  .map(([path, content]) => ({
    slug: path.split('/').pop().replace('.md', ''),
    content,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

export default function WritingPage() {
  return (
    <div className="project-page">
      <header className="project-page__header">
        <div className="container">
          <Link to="/" className="project-page__back">← BACK</Link>
        </div>
      </header>

      <main className="container">
        <div className="project-page__meta">
          <span className="section-label">SIGNAL // TRANSMISSIONS</span>
          <h1 className="project-page__title">Writing</h1>
          <p className="project-page__description">
            Articles on engineering, AI systems, and building software for real-world environments.
            Not tied to any single project — observations from the field.
          </p>
        </div>

        <section className="project-page__section">
          {ARTICLES.length === 0 ? (
            <p className="project-page__empty">
              No articles yet. Content pipeline incoming.
            </p>
          ) : (
            <div className="project-page__articles">
              {ARTICLES.map(article => (
                <article key={article.slug} className="project-page__article">
                  <h3 className="project-page__article-title">
                    {article.slug.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase()}
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
