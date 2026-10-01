import { useState } from "react"
import Papercard from "../../components/papercard/papercard"
import photos from "../../data/photos"
import "./photos.css"

export default function Photos(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPhoto = photos[currentIndex]

    function showPreviousPhoto() {
        setCurrentIndex((currentIndex - 1 + photos.length) % photos.length)
    }
    function showNextPhoto() {
        setCurrentIndex((currentIndex + 1) % photos.length);
    }

    return (
        <main className="photos-page">
            <header className="photos-header">

                <p>
                    A collection of things that caught my eye.
                </p>
            </header>

            <section
                className="photo-carousel"
                aria-label="Photo gallery"
            >
                <button
                    className="carousel-button carousel-button-previous"
                    type="button"
                    onClick={showPreviousPhoto}
                    aria-label="Previous photo"
                >
                    ←
                </button>

                <div className="photo-frame">
                    <img
                        src={currentPhoto.src}
                        alt={currentPhoto.alt}
                    />
                </div>

                <button
                    className="carousel-button carousel-button-next"
                    type="button"
                    onClick={showNextPhoto}
                    aria-label="Next photo"
                >
                    →
                </button>
            </section>

            <div className="photo-counter">
                {currentIndex + 1} / {photos.length}
            </div>

            <Papercard
                title={currentPhoto.title}
                className="photo-description-card"
            >
                <span className="photo-date">
                    {currentPhoto.date}
                </span>

                <p>{currentPhoto.description}</p>
            </Papercard>
        </main>
    );

};