import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Café Fausse</h1>

      {/* Restaurant History */}
      <section className="history-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, 
          Café Fausse blends traditional Italian flavors with modern culinary innovation. 
          Our mission is to provide an unforgettable dining experience that reflects 
          both quality and creativity.
        </p>
      </section>

      {/* Founders */}
      <section className="founders-section">
        <h2>Meet Our Founders</h2>
        
        <div className="founder">
          <h3>Chef Antonio Rossi</h3>
          <p>
            Chef Antonio Rossi is a culinary visionary with over 25 years of experience 
            in fine dining. His passion for traditional Italian cuisine combined with 
            modern techniques has earned Café Fausse its reputation for excellence. 
            Antonio believes in using only the finest, locally sourced ingredients to 
            create unforgettable dishes.
          </p>
        </div>

        <div className="founder">
          <h3>Maria Lopez</h3>
          <p>
            Maria Lopez brings her expertise in restaurant management and hospitality 
            to Café Fausse. With a dedication to creating a warm and welcoming atmosphere, 
            Maria ensures that every guest experiences exceptional service and attention 
            to detail. Her commitment to excellence extends from the dining experience 
            to every aspect of the restaurant's operations.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mission-section">
        <h2>Our Commitment</h2>
        <div className="commitment-grid">
          <div className="commitment-item">
            <h3>Excellent Food</h3>
            <p>
              We are committed to serving only the highest quality dishes, 
              prepared with fresh, locally sourced ingredients and culinary excellence.
            </p>
          </div>
          <div className="commitment-item">
            <h3>Unforgettable Experience</h3>
            <p>
              Every visit to Café Fausse is designed to be memorable, 
              from our elegant ambiance to our attentive service.
            </p>
          </div>
          <div className="commitment-item">
            <h3>Local Sourcing</h3>
            <p>
              We partner with local farmers and suppliers to bring you the freshest 
              ingredients and support our community.
            </p>
          </div>
        </div>
      </section>

      {/* Awards & Reviews */}
      <section className="awards-section">
        <h2>Awards & Recognition</h2>
        
        <div className="awards-grid">
          <div className="award">
            <h3>Culinary Excellence Award</h3>
            <p>2022</p>
          </div>
          <div className="award">
            <h3>Restaurant of the Year</h3>
            <p>2023</p>
          </div>
          <div className="award">
            <h3>Best Fine Dining Experience</h3>
            <p>Foodie Magazine, 2023</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews-section">
        <h2>What Our Guests Say</h2>
        
        <div className="reviews-grid">
          <div className="review">
            <p className="review-text">
              "Exceptional ambiance and unforgettable flavors."
            </p>
            <p className="review-author">— Gourmet Review</p>
          </div>
          <div className="review">
            <p className="review-text">
              "A must-visit restaurant for food enthusiasts."
            </p>
            <p className="review-author">— The Daily Bite</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;