import { useState, useRef, useEffect } from 'react'

/**
 * FolioChat – floating AI-chat widget for the portfolio.
 *
 * Props
 *   endpoint {string} – base URL of the FolioChat API
 *                       (set via VITE_FOLIOCHAT_API_URL).
 *                       If omitted the widget silently hides itself.
 */
export default function FolioChat({ endpoint }) {
  // Guard: endpoint is required. Without it every fetch would target
  // "undefined/..." which fails silently and locks the widget.
  if (!endpoint) {
    console.warn('FolioChat: endpoint prop is required')
    return null
  }

  const [open, setOpen] = useState(false)
  const msgIdRef = useRef(0)
  const nextId = () => ++msgIdRef.current

  const [messages, setMessages] = useState([
    { id: 0, role: 'assistant', text: "Hi! I\u2019m Shane\u2019s portfolio assistant. Ask me anything!" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  async function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages(prev => [...prev, { id: nextId(), role: 'user', text }])
    setLoading(true)

    try {
      const res = await fetch(`${endpoint}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }

      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: data.reply ?? 'No response received.' },
      ])
    } catch (err) {
      console.error('FolioChat fetch error:', err)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Sorry, something went wrong. Please try again later.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="foliochat-container">
      {open && (
        <div className="foliochat-window" role="dialog" aria-label="Portfolio chat assistant">
          <div className="foliochat-header">
            <span>Portfolio Assistant</span>
            <button
              className="foliochat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="foliochat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`foliochat-msg foliochat-msg--${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="foliochat-msg foliochat-msg--assistant foliochat-msg--loading">
                <span className="foliochat-dots">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="foliochat-form" onSubmit={sendMessage}>
            <input
              className="foliochat-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything…"
              aria-label="Chat input"
              disabled={loading}
            />
            <button
              className="foliochat-send"
              type="submit"
              aria-label="Send message"
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        className="foliochat-fab"
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
