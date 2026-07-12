import { useState } from 'react'

// Build the valid reservation slots the backend actually accepts:
// whole-hour 2-hour slots — 5/7/9 PM Mon–Sat, 5/7 PM Sun — for the next 14 days.
// The value is the exact ISO string the backend seeded (e.g. "2026-07-18T19:00").
function buildTimeSlots(daysAhead = 14) {
  const slots = []
  const today = new Date()
  for (let offset = 1; offset <= daysAhead; offset++) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
    const hours = day.getDay() === 0 ? [17, 19] : [17, 19, 21] // Sunday has 2 slots
    for (const hour of hours) {
      const y = day.getFullYear()
      const m = String(day.getMonth() + 1).padStart(2, '0')
      const d = String(day.getDate()).padStart(2, '0')
      const h = String(hour).padStart(2, '0')
      const value = `${y}-${m}-${d}T${h}:00`
      const label =
        day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
        ' — ' +
        new Date(2000, 0, 1, hour).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      slots.push({ value, label })
    }
  }
  return slots
}

const TIME_SLOTS = buildTimeSlots()

function ReservationForm() {
  const [form, setForm] = useState({
    timeSlot: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' | 'error'

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Client-side validation before hitting the API
    if (!form.timeSlot || !form.guests || !form.name || !form.email) {
      setMessageType('error')
      setMessage('Please fill in date & time, guests, name, and email.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setMessageType('error')
      setMessage('Please enter a valid email address.')
      return
    }

    // Send the reservation to the backend (FR-8/FR-9/FR-18)
    fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessageType('success')
          setMessage(`${data.message} Your table is #${data.tableNumber}.`)
          setForm({ timeSlot: '', guests: '', name: '', email: '', phone: '' })
        } else {
          setMessageType('error')
          setMessage(data.error) // backend's user-facing error (e.g. slot full)
        }
      })
      .catch(() => {
        setMessageType('error')
        setMessage('Could not reach the server. Please try again.')
      })
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2>Reserve a Table</h2>

      <div className="field">
        <label htmlFor="timeSlot">Date &amp; Time</label>
        <select id="timeSlot" name="timeSlot" value={form.timeSlot} onChange={handleChange}>
          <option value="">Select a time…</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot.value} value={slot.value}>{slot.label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="guests">Number of Guests</label>
        <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
          <option value="">Select…</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"
          value={form.name} onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"
          value={form.email} onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="phone">Phone (optional)</label>
        <input type="tel" id="phone" name="phone"
          value={form.phone} onChange={handleChange} />
      </div>

      {message && (
        <p className={messageType === 'success' ? 'success-msg' : 'error'}>{message}</p>
      )}
      <button type="submit">Reserve</button>
    </form>
  )
}

export default ReservationForm
