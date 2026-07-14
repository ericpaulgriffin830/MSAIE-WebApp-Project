import { useState } from 'react'
import interior from '../assets/gallery-cafe-interior.webp'
import ribeye from '../assets/gallery-ribeye-steak.webp'
import event from '../assets/gallery-special-event.webp'
import ambiance from '../assets/home-cafe-fausse.webp'

// The gallery's data lives in an array — one object per image.
const images = [
  { src: interior, alt: 'The Café Fausse dining room' },
  { src: ribeye, alt: 'Ribeye steak with garlic mashed potatoes' },
  { src: event, alt: 'A special event at Café Fausse' },
  { src: ambiance, alt: 'Café Fausse evening ambiance' },
]

function Gallery() {
  // Which image is enlarged in the lightbox. null = lightbox closed.
  const [selected, setSelected] = useState(null)

  return (
    <section className="gallery">
      {/* Turn the array into a grid of image tiles with .map() */}
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            className="gallery-item"
            onClick={() => setSelected(image)}
            aria-label={`Enlarge image: ${image.alt}`}
          >
            <img src={image.src} alt={image.alt} className="gallery-thumb" />
          </button>
        ))}
      </div>

      {/* Lightbox overlay — only rendered when an image is selected */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <img src={selected.src} alt={selected.alt} className="lightbox-img" />
        </div>
      )}
    </section>
  )
}

export default Gallery
