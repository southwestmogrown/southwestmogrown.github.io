import ProjectPageLayout from '../ProjectPageLayout'
import overviewRaw from '../../content/projects/resume-parser/overview.md?raw'

const articleModules = import.meta.glob(
  '../../content/projects/resume-parser/articles/*.md',
  { query: '?raw', import: 'default', eager: true }
)

const ARTICLES = Object.entries(articleModules)
  .map(([path, content]) => ({
    slug: path.split('/').pop().replace('.md', ''),
    content,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const STACK = ['Next.js', 'TypeScript', 'Claude API', 'Tailwind CSS']

export default function ResumeParserPage() {
  return (
    <ProjectPageLayout
      title="Resume Parser"
      description="Parses a PDF resume and scores it against a job description using two sequential Claude API calls. Extracts structured data and outputs ranked summaries — cutting review time by 80%."
      stack={STACK}
      overviewRaw={overviewRaw}
      articles={ARTICLES}
    />
  )
}
