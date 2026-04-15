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

const STACK = ['Next.js', 'TypeScript', 'Claude API', 'Stripe', 'Supabase', 'Tailwind CSS']

export default function ResumeParserPage() {
  return (
    <ProjectPageLayout
      title="PassStack"
      description="Multi-phase Claude API pipeline — upload a PDF resume, get tiered gap analysis, bullet rewrites, a streaming cover letter, a study plan, and behavioral STAR interview coaching. Stripe-gated paid phases with Supabase token storage."
      stack={STACK}
      overviewRaw={overviewRaw}
      articles={ARTICLES}
    />
  )
}
