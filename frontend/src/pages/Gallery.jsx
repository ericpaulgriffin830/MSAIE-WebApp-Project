import Gallery from '../components/Gallery'
import './Gallery.css'

// The /gallery page: the image grid + lightbox (reusable component),
// plus the Awards & Reviews content (SRS FR-14), moved here from About Us.
function GalleryPage() {
  return (
    <div className="gallery-page">
      <Gallery />

      {/* Awards & Recognition (FR-14) */}
      <section className="awards-section">
        <h2>Awards &amp; Recognition</h2>
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

      {/* Customer Reviews (FR-14) */}
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
  )
}

export default GalleryPage
