import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Menu from './pages/Menu'
import AboutUs from './pages/AboutUs'
import Reservations from './pages/Reservations'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
