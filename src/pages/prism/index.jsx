import ProjectPageLayout from '../ProjectPageLayout'
import overviewRaw from '../../content/projects/prism/overview.md?raw'

const articleModules = import.meta.glob(
  '../../content/projects/prism/articles/*.md',
  { query: '?raw', import: 'default', eager: true }
)

const ARTICLES = Object.entries(articleModules)
  .map(([path, content]) => ({
    slug: path.split('/').pop().replace('.md', ''),
    content,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const STACK = ['Next.js', 'TypeScript', 'Claude API', 'Prisma', 'PostgreSQL']

export default function PrismPage() {
  return (
    <ProjectPageLayout
      title="Prism"
      description="Multi-model LLM prompt testing tool. Run any prompt against multiple AI models simultaneously, compare responses side by side, score them, and save runs for later review."
      stack={STACK}
      overviewRaw={overviewRaw}
      articles={ARTICLES}
    />
  )
}
