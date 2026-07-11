import { useState } from 'react'

function NewsletterSignup() {
  const [email, setEmail] = useState('') // controlled input (same as before)
  const [message, setMessage] = useState('') // feedback shown to the user

  function handleSubmit(e) {
    e.preventDefault()

    // Same email validation as the reservation form
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    // Success: confirm to the user and clear the box.
    // (Later this will POST the email to the backend to store it — FR-16.)
    setMessage(`Thanks! ${email} is now subscribed.`)
    setEmail('')
  }

  return (
    <form className="newsletter" onSubmit={handleSubmit}>
      <h2>Join Our Newsletter</h2>
      <p className="newsletter-sub">
        Be the first to hear about events and seasonal menus.
      </p>

      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <div className="newsletter-row">
        <input
          type="email"
          id="newsletter-email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </div>

      {message && <p className="newsletter-message">{message}</p>}
    </form>
  )
}

export default NewsletterSignup
