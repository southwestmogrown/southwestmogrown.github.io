import shaneProfile from '/assets/images/shane-profile.jpg'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg-glow"></div>
      <div className="container">
        <div className="hero__text">
          <p className="hero__greeting">Hi, I&apos;m</p>
          <h1 className="hero__name">
            Shane M. <span>Wilkey</span>
          </h1>
          <p className="hero__title">Full-Stack Dev · AI Engineer · Instructor</p>
          <p className="hero__desc">
            Six years building software and teaching it. I write agentic
            workflows, run code reviews, and take on freelance work where
            shipping something solid actually matters.
          </p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View Projects
            </a>
            <a
              href="https://github.com/southwestmogrown"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              <i className="fa-brands fa-github"></i> GitHub
            </a>
          </div>
        </div>
        <div className="hero__image">
          <img src={shaneProfile} alt="Shane M. Wilkey" />
        </div>
      </div>
    </section>
  )
}
