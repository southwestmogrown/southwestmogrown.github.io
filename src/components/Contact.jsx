import { useState } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

export default function Contact() {
  const [labelRef, labelClass] = useFadeUp()
  const [titleRef, titleClass] = useFadeUp()
  const [contentRef, contentClass] = useFadeUp()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact">
      <div className="container">
        <span ref={labelRef} className={`section-label ${labelClass}`}>
          Get in Touch
        </span>
        <h2 ref={titleRef} className={`section-title ${titleClass}`}>
          Let&apos;s Work Together
        </h2>

        <div ref={contentRef} className={`contact__content ${contentClass}`}>
          <div className="contact__info">
            <p>
              Whether you need a freelance developer, an agentic AI solution, or
              just want to chat about code, music, or Fallout — I&apos;d love to
              hear from you.
            </p>
            <div className="contact__socials">
              <a
                href="https://github.com/southwestmogrown"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/shane-wilkey-b5822b210/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <form
            className="contact__form"
            action="https://formspree.io/f/mayalnrb"
            method="post"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn btn--primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
