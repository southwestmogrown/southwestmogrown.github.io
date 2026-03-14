import { useState, useEffect } from 'react'

const NAV_SECTIONS = ['about', 'skills', 'projects', 'contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const scrollY = window.scrollY + 100
      let current = ''
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="nav__logo">
        shane<span>.dev</span>
      </a>
      <ul className={`nav__links${menuOpen ? ' open' : ''}`}>
        {NAV_SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
              onClick={closeMenu}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`nav__toggle${menuOpen ? ' open' : ''}`}
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}
