import { useFadeUp } from '../hooks/useFadeUp'

const SKILLS = [
  { icon: 'devicon-javascript-plain colored', label: 'JavaScript' },
  { icon: 'devicon-typescript-plain colored', label: 'TypeScript' },
  { icon: 'devicon-python-plain colored', label: 'Python' },
  { icon: 'devicon-go-original-wordmark colored', label: 'Go' },
  { icon: 'devicon-cplusplus-plain colored', label: 'C++' },
  { icon: 'devicon-react-original colored', label: 'React' },
  { icon: 'devicon-nextjs-plain', label: 'Next.js' },
  { icon: 'devicon-nodejs-plain colored', label: 'Node.js' },
  { icon: 'devicon-express-original', label: 'Express' },
  { icon: 'devicon-flask-original', label: 'Flask' },
  { icon: 'devicon-postgresql-plain colored', label: 'PostgreSQL' },
  { icon: 'devicon-prisma-original', label: 'Prisma' },
  { icon: 'devicon-docker-plain colored', label: 'Docker' },
  { icon: 'devicon-git-plain colored', label: 'Git' },
  { icon: 'devicon-amazonwebservices-plain-wordmark colored', label: 'AWS' },
  { icon: 'devicon-redux-original colored', label: 'Redux' },
  { icon: 'devicon-html5-plain colored', label: 'HTML5' },
  { icon: 'devicon-css3-plain colored', label: 'CSS3' },
]

export default function Skills() {
  const [labelRef, labelClass] = useFadeUp()
  const [titleRef, titleClass] = useFadeUp()
  const [gridRef, gridClass] = useFadeUp()

  return (
    <section id="skills" style={{ paddingTop: '0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          TECH STACK
        </span>
        <h2 ref={titleRef} className={`section-title ${titleClass}`}>
          Skills &amp; Technologies
        </h2>

        <div ref={gridRef} className={`skills-grid ${gridClass}`}>
          {SKILLS.map(({ icon, label }) => (
            <div className="skill-tag" key={label}>
              <i className={icon}></i> {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

