import { useFadeUp } from '../hooks/useFadeUp'

const METRICS = [
  {
    metric: '1,000+',
    label: 'Engineers Mentored',
    desc: 'Bootcamp cohorts trained in full-stack development over 6+ years of instruction.',
  },
  {
    metric: '90%',
    label: 'Student Success Rate',
    desc: 'Graduates landing engineering roles or advancing into technical careers.',
  },
  {
    metric: '98%',
    label: 'First Pass Yield',
    desc: 'Managing 45-person value streams with production-grade quality standards.',
    isFpy: true,
  },
  {
    metric: 'SECURITY+\n& AWS CERTIFIED',
    label: 'Certifications Active',
    desc: 'CompTIA Security+ and AWS certified for secure, cloud-native architecture.',
    isBadge: true,
  },
]

export default function BentoGrid() {
  const [labelRef, labelClass] = useFadeUp()
  const [gridRef, gridClass] = useFadeUp()

  return (
    <section className="bento" id="metrics">
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          IMPACT METRICS
        </span>

        <div ref={gridRef} className={`bento__grid ${gridClass}`}>
          {METRICS.map((m) => (
            <BentoCard key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BentoCard({ metric, label, desc, isBadge }) {
  return (
    <div className="bento-card">
      <div className={`bento-card__metric${isBadge ? ' bento-card__metric--badge' : ''}`}>
        {metric.split('\n').map((line, i) => (
          <span key={i} style={{ display: 'block' }}>{line}</span>
        ))}
      </div>
      <div className="bento-card__label">{label}</div>
      <p className="bento-card__desc">{desc}</p>
    </div>
  )
}
