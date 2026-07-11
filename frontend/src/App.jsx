import './App.css'
import ReservationForm from './components/ReservationForm'
import NewsletterSignup from './components/NewsletterSignup'

function App() {
  return (
    <div className="app">
      <h1>Café Fausse</h1>
      <p>Fine dining in the heart of Washington, DC</p>
      <ReservationForm />
      <NewsletterSignup />
    </div>
  )
}

export default App
