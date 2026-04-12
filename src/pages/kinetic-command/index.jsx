import ProjectPageLayout from '../ProjectPageLayout'
import overviewRaw from '../../content/projects/kinetic-command/overview.md?raw'

const articleModules = import.meta.glob(
  '../../content/projects/kinetic-command/articles/*.md',
  { query: '?raw', import: 'default', eager: true }
)

const ARTICLES = Object.entries(articleModules)
  .map(([path, content]) => ({
    slug: path.split('/').pop().replace('.md', ''),
    content,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const STACK = ['Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS']

export default function KineticCommandPage() {
  return (
    <ProjectPageLayout
      title="Kinetic Command"
      description="Real-time operations dashboard for manufacturing floor KPI tracking. WebSocket data streams, role-based access, and trend analysis."
      stack={STACK}
      overviewRaw={overviewRaw}
      articles={ARTICLES}
    />
  )
}
