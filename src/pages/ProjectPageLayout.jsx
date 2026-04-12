import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

/**
 * Shared layout for all project deep-dive pages.
 *
 * Props:
 *   title       {string}   - Project title
 *   description {string}   - Short tagline shown under the title
 *   stack       {string[]} - Tech stack tags
 *   overviewRaw {string}   - Raw markdown for the overview section
 *   articles    {Array<{slug: string, content: string}>} - Sorted article list
 */
export default function ProjectPageLayout({ title, description, stack, overviewRaw, articles }) {
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
          <h1 className="project-page__title">{title}</h1>
          <p className="project-page__description">{description}</p>
          <div className="project-page__stack">
            {stack.map(t => (
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
          {articles.length === 0 ? (
            <p className="project-page__empty">
              No articles yet. Content pipeline incoming.
            </p>
          ) : (
            <div className="project-page__articles">
              {articles.map(article => (
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
