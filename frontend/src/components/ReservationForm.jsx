import { useState } from 'react'

function ReservationForm() {
  // One piece of state holds every field. The keys match each input's `name`.
  const [form, setForm] = useState({
    timeSlot: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
  })

  // Holds a validation message to show the user (empty = no error).
  const [error, setError] = useState('')

  // One handler for every input. e.target.name tells us WHICH field changed.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Runs when the form is submitted (Reserve clicked or Enter pressed).
  function handleSubmit(e) {
    e.preventDefault() // stop the browser's default full-page reload

    // Guard clause 1: required fields must be filled (phone is optional)
    if (!form.timeSlot || !form.guests || !form.name || !form.email) {
      setError('Please fill in date & time, guests, name, and email.')
      return
    }

    // Guard clause 2: email must look like an address
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('') // all checks passed — clear any previous error
    console.log('Reservation submitted:', form)
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2>Reserve a Table</h2>

      <label htmlFor="timeSlot">Date &amp; Time</label>
      <input type="datetime-local" id="timeSlot" name="timeSlot"
        value={form.timeSlot} onChange={handleChange} />

      <label htmlFor="guests">Number of Guests</label>
      <input type="number" id="guests" name="guests" min="1"
        value={form.guests} onChange={handleChange} />

      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name"
        value={form.name} onChange={handleChange} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email"
        value={form.email} onChange={handleChange} />

      <label htmlFor="phone">Phone (optional)</label>
      <input type="tel" id="phone" name="phone"
        value={form.phone} onChange={handleChange} />

      {error && <p className="error">{error}</p>}
      <button type="submit">Reserve</button>
    </form>
  )
}

export default ReservationForm
