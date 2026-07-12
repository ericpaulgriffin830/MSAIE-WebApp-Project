import { useState } from 'react'

function NewsletterSignup() {
  // Name + email together — the backend needs both ({ name, email }) because
  // customers.customer_name is NOT NULL, so it can align a person to their signup.
  const [form, setForm] = useState({ name: '', email: '' })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' | 'error'

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Client-side validation before we hit the API
    if (!form.name || !form.email) {
      setMessageType('error')
      setMessage('Please enter your name and email.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setMessageType('error')
      setMessage('Please enter a valid email address.')
      return
    }

    // Send to the backend (FR-16): stores the subscriber in the database
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form), // { name, email }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessageType('success')
          setMessage(data.message)
          setForm({ name: '', email: '' }) // clear on success
        } else {
          setMessageType('error')
          setMessage(data.error) // backend's user-facing error string
        }
      })
      .catch(() => {
        setMessageType('error')
        setMessage('Could not reach the server. Please try again.')
      })
  }

  return (
    <form className="newsletter" onSubmit={handleSubmit}>
      <h2>Join Our Newsletter</h2>
      <p className="newsletter-sub">
        Be the first to hear about events and seasonal menus.
      </p>

      <div className="newsletter-fields">
        <label htmlFor="newsletter-name" className="sr-only">Your name</label>
        <input
          type="text"
          id="newsletter-name"
          name="name"
          className="newsletter-input"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          className="newsletter-input"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <button type="submit">Subscribe</button>
      </div>

      {message && (
        <p className={`newsletter-message ${messageType === 'success' ? 'success-msg' : 'error'}`}>
          {message}
        </p>
      )}
    </form>
  )
}

export default NewsletterSignup
