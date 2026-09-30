import { useState } from "react";
import Papercard from "../../components/papercard/papercard";
import "./about.css"

const aboutSections = {
    past: {
        title: "How I started",
        paragraphs: ["I was a builder before I was a developer.",
            "As a kid, I was always making things, even little battery-powered lights to use when the classroom went dark for the projector. I got my first computer when I was five, running Windows 95, and computers have been part of my life ever since.I got into programming because of someone I met on Google+. He told me to give it a chance, so I did. JavaScript led to Python, Python led to a computer science degree, and that degree gave me the foundation to understand how software works.",
            "It also taught me pretty quickly that the learning never stops. My first job out of school was in C#, a language my degree never covered, so I learned it. I started out loving Python, but once I began building applications, I found myself drawn to C# and ASP.NET. It has been my go-to backend stack ever since.","The path has changed over the years, but the reason I do it really hasn’t: I like figuring out how things work and then building something with what I learned."
        ]
    },
    present: {
        title: "How I work now",
        paragraphs: [
            "Three monitors and a membrane keyboard ","I’ve tried different setups, and three screens seems to be the right number for me. Most days I have Visual Studio Code open, a couple of Codex terminal sessions running, GitHub nearby, and music playing somewhere in the background.The process has changed a lot with AI tools, mostly because they have cut down on decision fatigue. Breaking large problems into small, manageable pieces has always been one of my strengths, and my current workflow leans heavily into that.",
            "Most projects start as an idea in Obsidian. I add thoughts and details over days or weeks until I have the bandwidth to work on it. From there, I use a chat session to turn the idea into a printable low-level design document I can review, lock, and stop endlessly reconsidering. Then I validate the idea by building the smallest, most brute-force version that can prove whether it actually works.Once I have that starting point, the project moves into an implementation and testing loop. I deploy it, use it, find what is missing, and capture new features or problems as GitHub issues. Those issues get broken into small slices, and I work alongside Codex sessions to implement them while I review the decisions, code, and results.",
            "Every project gets a README and a set of “printed” documentation that represents the decisions I already made, something a late-night coding session cannot quietly rewrite. Once a project is stable, it joins the rotation. I revisit it periodically to test it, update dependencies, fix anything that has broken, and add features when there is a real reason to.The goal is not to finish everything. It is to keep each project understandable, useful, and easy to pick back up."
        ],
    },

    future: {
        title: "What I am working toward",
        paragraphs: [
            "your mom",
            "Gottem.", "I don’t really have a finish line in mind. I want to keep learning, keep building useful things, and keep getting better at turning ideas into something real.I want the freedom to work on problems that interest me, help people and small businesses when I can, and keep enough room in my life to experiment just because I’m curious.Some projects might become products. Some might turn into consulting work. Some might exist only because I wanted to know if I could build them. That is fine with me.Mostly, I want to keep building, keep learning, and leave things a little better than I found them. ",],

    }
};

const aboutCards = [
    {
        title: "Spare Time",
        description: "In my spare time, I’m usually exploring the Bay Area, sitting in front of a computer, being a dad, playing video games, reading, watching YouTube, or working on the project car or one of the bikes",
        className: "about-card-spare-time",
    },
    {
        title: "Hobbies",
        description: "Hiking, biking, photography, video games, car shows, tinkering, experimenting, and learning how things work.",
        className: "about-card-hobbies",
    },
    {
        title: "What I Like To Build",
        description: "Useful things. Most of my projects start with a real pain point, something I wish existed, or an existing solution that doesn’t quite do what I need. Sometimes I build something just to see if I can. Other times, making the thing myself is simpler than trying to bend someone else’s solution into shape.",
        className: "about-card-building",

    }
]


export default function About() {
    const [activeSection, setActiveSection] = useState("present");
    const section = aboutSections[activeSection]

    return (
        <main className="about-page">
            <div className="about-switcher" aria-label="About timeline">
                <button
                    className={`about-switcher-button ${activeSection === 'past' ? 'active' : ""}`}
                    onClick={() => setActiveSection("past")}
                    aria-pressed={activeSection === 'past'}
                >
                    <strong>Past</strong>
                    <span>How I started</span>
                </button>

                <button
                    className={`about-switcher-button ${activeSection === 'present' ? "active" : ""}`}
                    onClick={() => setActiveSection("present")}
                    aria-pressed={activeSection === 'present'}
                >
                    <strong>Present</strong>
                    <span>How I work now</span>
                </button>

                <button
                    className={`about-switcher-button ${activeSection === 'future' ? "active" : ""}`}
                    onClick={() => setActiveSection("future")}
                    aria-pressed={activeSection === "future"}
                >
                    <strong>Future</strong>
                    <span>Where I am going</span>
                </button>
            </div>
            <Papercard title={section.title} className="about-main-card">
                <p>{section.paragraphs[0]}</p>
                <div className="about-main-card-scroll" key={activeSection} role="region" aria-label={`${section.title} details`} tabIndex={0}>
                    {section.paragraphs.slice(1).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </Papercard>

            <section className="about-card-grid" aria-label="More about me">
                {aboutCards.map((card) => (
                    <Papercard key={card.title} title={card.title} className={card.className}>
                        <p>{card.description}</p>
                    </Papercard>
                ))}
            </section>
        </main>
    )
}
