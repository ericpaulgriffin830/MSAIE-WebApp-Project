import '../App.css'
import ReservationForm from '../components/ReservationForm'
import NewsletterSignup from '../components/NewsletterSignup'
import Gallery from '../components/Gallery'

function Reservations() {
  return (
    <div className="app">
      <h1>Café Fausse</h1>
      <p>Fine dining in the heart of Washington, DC</p>
      <ReservationForm />
      <NewsletterSignup />
      <Gallery />
    </div>
  )
}

export default Reservations
