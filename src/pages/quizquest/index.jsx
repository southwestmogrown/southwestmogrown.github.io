import ProjectPageLayout from '../ProjectPageLayout'
import overviewRaw from '../../content/projects/quizquest/overview.md?raw'

const articleModules = import.meta.glob(
  '../../content/projects/quizquest/articles/*.md',
  { query: '?raw', import: 'default', eager: true }
)

const ARTICLES = Object.entries(articleModules)
  .map(([path, content]) => ({
    slug: path.split('/').pop().replace('.md', ''),
    content,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const STACK = ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Go', 'Claude API']

export default function QuizQuestPage() {
  return (
    <ProjectPageLayout
      title="QuizQuest"
      description="Gamified LMS that turns Markdown files into interactive lessons. In-browser Go code challenges, AI Socratic Coach via SSE, XP, streaks, and a rank system."
      stack={STACK}
      overviewRaw={overviewRaw}
      articles={ARTICLES}
    />
  )
}
