import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Café Fausse</h1>
          <p>Experience Elegant Fine Dining</p>
        </div>
      </section>

      {/* Contact & Hours Section */}
      <section className="info-section">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            <strong>Address:</strong> 1234 Culinary Ave, Suite 100, Washington, DC 20002
          </p>
          <p>
            <strong>Phone:</strong> (202) 555-4567
          </p>
        </div>

        <div className="hours-info">
          <h2>Hours</h2>
          <p>
            <strong>Monday – Saturday:</strong> 5:00 PM – 11:00 PM
          </p>
          <p>
            <strong>Sunday:</strong> 5:00 PM – 9:00 PM
          </p>
        </div>
      </section>

      {/* About Brief Section */}
      <section className="welcome-section">
        <h2>Welcome to Café Fausse</h2>
        <p>
          Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, 
          Café Fausse blends traditional Italian flavors with modern culinary innovation. 
          Join us for an unforgettable dining experience.
        </p>
      </section>
    </div>
  );
}

export default Home;
