import { useState } from "react"
import Papercard from "../../components/papercard/papercard"
import "./photos.css"

const photos = [
    {
        id: "photo-1",
        src: "/photos/photo-1.jpg",
        alt: "Landscape photograph",
        title: "Photo One",
        date: "2026",
        description:
            "A temporary description for this photograph.",
    },
    {
        id: "photo-2",
        src: "/photos/photo-2.jpg",
        alt: "Outdoor photograph",
        title: "Photo Two",
        date: "2026",
        description:
            "Another temporary description..",
    },
    {
        id: "photo-3",
        src: "/photos/photo-3.jpg",
        alt: "Scenic photograph",
        title: "Photo Three",
        date: "2026",
        description:
            "The third photograph in the temporary local collection.",
    },
];

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
                <h1 className="photos-heading">Photos</h1>

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