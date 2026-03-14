import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { FolioChat } from '@foliochat/react'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <FolioChat
        endpoint={import.meta.env.VITE_FOLIOCHAT_API_URL}
        accentColor="#f97316"
        theme="auto"
        position="bottom-right"
      />
      <Footer />
    </>
  )
}
