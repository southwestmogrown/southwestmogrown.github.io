import { useState, useEffect } from 'react'
import { IDENTITY, OS_VERSION } from '../constants'

const NAV_ITEMS = [
  { label: 'INDEX',    href: '#hero',     idx: '01' },
  { label: 'HARDWARE', href: '#hardware', idx: '02' },
  { label: 'FIRMWARE', href: '#firmware', idx: '03' },
  { label: 'CONTACT',  href: '#contact',  idx: '04' },
]

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sectionIds = ['hero', 'hardware', 'firmware', 'contact']

    const handleScroll = () => {
      const scrollY = window.scrollY + 120
      let current = 'hero'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="sidebar__toggle"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar${menuOpen ? ' open' : ''}`}>
        <div className="sidebar__identity">{IDENTITY.name}</div>
        <div className="sidebar__version">{OS_VERSION}</div>

        <nav aria-label="Primary navigation">
          <ul className="sidebar__nav">
            {NAV_ITEMS.map(({ label, href, idx }) => {
              const sectionId = href.slice(1)
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={activeSection === sectionId ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    <span className="sidebar__nav-index">{idx}</span>
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="sidebar__foliochat">
          <a href="/projects/foliochat" className="sidebar__foliochat-link">
            <span className="sidebar__foliochat-label">FOLIOCHAT</span>
            <span className="sidebar__foliochat-status">● ACTIVE</span>
          </a>
        </div>

        <div className="sidebar__cv">
          <a
            href="/assets/Shane_Wilkey_CV.pdf"
            download
            className="btn--cv"
          >
            ↓ DOWNLOAD_CV
          </a>
        </div>

        <div className="sidebar__footer">
          <a href="#contact">CONTACT</a>
          <a href="#firmware">PROJECTS</a>
        </div>
      </aside>
    </>
  )
}
