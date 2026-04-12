import ProjectPageLayout from '../ProjectPageLayout'
import overviewRaw from '../../content/projects/kaminify/overview.md?raw'

const articleModules = import.meta.glob(
  '../../content/projects/kaminify/articles/*.md',
  { query: '?raw', import: 'default', eager: true }
)

const ARTICLES = Object.entries(articleModules)
  .map(([path, content]) => ({
    slug: path.split('/').pop().replace('.md', ''),
    content,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const STACK = ['Next.js', 'TypeScript', 'Claude API', 'Supabase', 'Tailwind CSS']

export default function KaminifyPage() {
  return (
    <ProjectPageLayout
      title="Kaminify"
      description="AI pipeline that clones a site's visual identity onto new content. Extracts the design system, synthesises pages with Claude, streams output progressively, delivers as a ZIP."
      stack={STACK}
      overviewRaw={overviewRaw}
      articles={ARTICLES}
    />
  )
}
