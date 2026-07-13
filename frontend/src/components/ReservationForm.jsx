import { useState } from 'react'

// Valid start times per weekday (JS getDay: Sun=0 … Sat=6), on 15-minute marks.
// Every reservation runs 2 hours, so the latest start must still leave time before
// close — matching the backend's rules exactly: Sun 5–7 PM, every other day 5–9 PM.
const OPEN_MINUTES = 17 * 60
const LAST_START_MINUTES_SUN = 19 * 60
const LAST_START_MINUTES_OTHER = 21 * 60
const SLOT_STEP_MINUTES = 15

function validTimesForDate(dateStr) {
  if (!dateStr) return []
  const [y, m, d] = dateStr.split('-').map(Number)
  const day = new Date(y, m - 1, d)
  const lastStart = day.getDay() === 0 ? LAST_START_MINUTES_SUN : LAST_START_MINUTES_OTHER

  const options = []
  for (let minutes = OPEN_MINUTES; minutes <= lastStart; minutes += SLOT_STEP_MINUTES) {
    const h = Math.floor(minutes / 60)
    const min = minutes % 60
    options.push({
      value: `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
      label: new Date(2000, 0, 1, h, min).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
    })
  }
  return options
}

// Bookable date range: tomorrow through 30 days out (within the seeded window).
function dateBounds() {
  const now = new Date()
  const fmt = (dt) =>
    `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(
      dt.getDate()
    ).padStart(2, '0')}`
  return {
    min: fmt(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)),
    max: fmt(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)),
  }
}
const { min: MIN_DATE, max: MAX_DATE } = dateBounds()

function ReservationForm() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [form, setForm] = useState({ guests: '', name: '', email: '', phone: '' })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' | 'error'

  // Which times to show depends on the picked date's weekday.
  const timeOptions = validTimesForDate(date)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleDateChange(e) {
    setDate(e.target.value)
    setTime('') // reset time — the available slots differ per day
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!date || !time || !form.guests || !form.name || !form.email) {
      setMessageType('error')
      setMessage('Please fill in date, time, guests, name, and email.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setMessageType('error')
      setMessage('Please enter a valid email address.')
      return
    }

    // Combine the calendar date + chosen time into the ISO slot the backend expects.
    const timeSlot = `${date}T${time}`

    fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timeSlot, ...form }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessageType('success')
          setMessage(`${data.message} Your table is #${data.tableNumber}.`)
          setDate('')
          setTime('')
          setForm({ guests: '', name: '', email: '', phone: '' })
        } else {
          setMessageType('error')
          setMessage(data.error)
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
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          min={MIN_DATE}
          max={MAX_DATE}
          value={date}
          onChange={handleDateChange}
        />
      </div>

      <div className="field">
        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={!date}
        >
          <option value="">{date ? 'Select a time…' : 'Pick a date first'}</option>
          {timeOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
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
