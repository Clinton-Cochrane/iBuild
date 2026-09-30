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
                        I love building. Cars, computers, code, cycles.
                        I solve problems as they come up. Building is how I think, take something apart, understand it, and put it back together better than I found it.
                        This site is a place to explore what I’ve built, how I work, and who I am.

                    </p>
                    <nav className="home-intro-links" aria-label="Profile links">
                        <a href="https://www.linkedin.com/in/clinton-cochrane/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://github.com/Clinton-Cochrane" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="/resume/Clinton_Cochrane_Resume.docx.pdf" download>Resume</a>
                    </nav>
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
        description:
            "See where I’ve been, what I’m working on now, and where I’m headed. Come learn a little more about me.",
        className: "home-card-about",
    },
    {
        title: "Projects",
        to: "/projects",
        description:
            "From terminal tools and websites to native mobile apps, bikes, and cars, see what I’ve built, what I’m building, and the problems behind each project.",
        className: "home-card-projects",
    },
    {
        title: "Consulting",
        to: "/consulting",
        description:
            "Real problems I have helped businesses solve. See the case studies behind the work.",
        className: "home-card-consulting",
    },
    {
        title: "Photos",
        to: "/photos",
        description:
            "Aside from building, I love to explore and document the memories along the way. Take a look through my viewfinder.",
        className: "home-card-photos",
    },
    {
        title: "Contact",
        to: "/contact",
        description:
            "Want to talk? Send me a message. Cool project, new idea, need help, want to hire me, like the site, hate the site, I’m listening. Whatever brought you here, I’d like to hear from you.",
        className: "home-card-contact",
    },
];
