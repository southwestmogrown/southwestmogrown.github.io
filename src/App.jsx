import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { FolioChat } from './components/FolioChat'

export default function App() {
  return (
    <>
      <Sidebar />
      <div className="main-layout">
        <Hero />
        <BentoGrid />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
      <FolioChat
        endpoint={import.meta.env.VITE_FOLIOCHAT_API_URL}
        accentColor="#F26419"
        theme="dark"
        position="bottom-right"
        greeting="ENCRYPTED_COMMS ONLINE. Ask me about Shane's projects, skills, or background."
      />
    </>
  )
}

