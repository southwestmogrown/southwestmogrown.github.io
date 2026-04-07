import { useFadeUp } from '../hooks/useFadeUp'

const contactCards = [
  {
    icon: 'fa-regular fa-envelope',
    label: 'Email',
    value: 'southwestmogrown@gmail.com',
    href: 'mailto:southwestmogrown@gmail.com',
  },
  {
    icon: 'fa-brands fa-github',
    label: 'GitHub',
    value: 'southwestmogrown',
    href: 'https://github.com/southwestmogrown',
  },
  {
    icon: 'fa-brands fa-dev',
    label: 'Dev.to',
    value: 'southwestmogrown',
    href: 'https://dev.to/southwestmogrown',
  },
  {
    icon: 'fa-brands fa-linkedin-in',
    label: 'LinkedIn',
    value: 'Shane Wilkey',
    href: 'https://www.linkedin.com/in/shane-wilkey-b5822b210/',
  },
]

export default function Contact() {
  const [labelRef, labelClass] = useFadeUp()
  const [titleRef, titleClass] = useFadeUp()
  const [subtitleRef, subtitleClass] = useFadeUp()
  const [gridRef, gridClass] = useFadeUp()

  return (
    <section id="contact" className="contact">
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          CONTACT
        </span>
        <h2 ref={titleRef} className={`section-title ${titleClass}`}>
          Open a Channel
        </h2>
        <p ref={subtitleRef} className={`section-subtitle ${subtitleClass}`}>
          Available for freelance work — web development, AI tooling, process
          improvement. If you have a problem that needs a developer who thinks
          before they code, open a channel.
        </p>

        <div ref={gridRef} className={`contact__grid ${gridClass}`}>
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="contact-card"
              target={card.href.startsWith('mailto') ? undefined : '_blank'}
              rel={card.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            >
              <i className={`contact-card__icon ${card.icon}`}></i>
              <span className="contact-card__label">{card.label}</span>
              <span className="contact-card__value">{card.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

