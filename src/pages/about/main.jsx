import { useState } from "react";
import Papercard from "../../components/papercard/papercard";
import "./about.css"

const aboutSections = {
    past: {
        title: "How I started",
        paragraphs: ["This is where the story of how I got started will go ",
            "We will eventually talk about the path that led me into software, building things, and the work I do now.",
        ]
    },
    present: {
        title: "How I work now",
        paragraphs: [
            "I like turning messy problems into useful, practical tools.",
            "I work iteratively: start small, get something working, learn from it, and keep refining.",
        ],
    },

    future: {
        title: "What I am working toward",
        paragraphs: [
            "This is where I will talk about what I want to build toward next.",
            "The goal is continued learning, useful work, independence, and helping people through the things I build.",
        ],

    }
};


export default function About() {
    const [activeSection, setActiveSection] = useState("present");
    const section = aboutSections[activeSection]

    return (
        <main className="about-page">
            <h1 className="about-heading">About Me</h1>
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
                {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </Papercard>
        </main>
    )
}
