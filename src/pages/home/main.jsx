import Papercard from "../../components/papercard/papercard";
import "./home.css"

export default function Home() {
    return (
        <main className="home-page">
            <section className="home-grid">
                <Papercard
                    title="Clinton Cochrane"
                    className="home-intro">
                    <p>Software engineer, builder, and problem solver.</p>
                    <p>
                        I like turning messy problems into useful tools
                        for people and small businesses.
                    </p>
                </Papercard>
                {homeCards.map((card) => (
                    <Papercard className={card.className} key={card.to} title={card.title} to={card.to}>
                        {card.description}
                    </Papercard>
                ))}
            </section>
        </main>
    );
}

const homeCards = [
    {
        title: "About",
        to: "/about",
        description: "A little about where I came from, how I work now, and where I am trying to go.",
        className: "home-card-about"
    },

    {
        title: "Projects",
        to: "/projects",
        description: "Software and experiments I have built because something seemed worth making.",
        className: "home-card-consulting"
    },

    {
        title: "Photos",
        to: "/photos",
        description: "A collection of things I noticed along the way.",
        className: "home-card-photos"
    },

    {
        title: "Contact",
        to: "/contact",
        description: "Have something interesting to build? Say hello.",
        className: "home-card-contact"
    },
]
