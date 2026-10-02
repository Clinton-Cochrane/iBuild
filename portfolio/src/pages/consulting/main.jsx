import Papercard from "../../components/papercard/papercard";
import './consulting.css';

const services = [
    {
        title: "Websites",
        description: "I build websites that fit the job, from simple static sites to full applications with authentication, payments, dashboards, and custom backend logic. I focus on keeping them fast, maintainable, and no more complicated than they need to be.",
    },
    {
        title: "Software",
        description: "I build software around specific problems, including terminal applications, native mobile apps, desktop tools, and LLM-assisted workflows. The goal is usually the same: take a repetitive, awkward, or overly manual process and turn it into something useful.",
    },
    {
        title: "Technical Help",
        description:
            "I help with the broader technical problems that do not fit neatly into a software project. That can include, but not limited to,  networking, computer builds and upgrades, software troubleshooting, system setup, and serving as a technical subject-matter resource when someone needs help understanding their options.",
    },
];

const consultingWork = [
    {
        id: "little-town-bakes",
        title: "Little Town Bakes",
        clientType: "cottage bakery",
        description: "A custom ordering and inventory system designed around the workflow of a small bakery.",
        keywords: ["Web", "Ordering", "Inventory", "React, Node"],
        technologies: ["React", "Next.js", "PostgresSql"],
        projectUrl: "https://little-town-bakes.vercel.app/",

    },
    {
        id: "roast66-coffee",
        title: "Roast 66 Coffee",
        clientType: "Mobile coffee business",
        description:
            "A customer ordering experience with menu management, customizable drinks, payments, and administrative tools.",
        keywords: ["Web", "Payments", "Operations"],
        technologies: ["React", "ASP.Net", "Postgres", "Stripe"],
        projectUrl: "https://roast66coffee-frontend.onrender.com/",
    }
];

export default function Consulting() {
    return (
        <main className="consulting-page">
            <header className="consulting-header">
                <p>  I solve small businesses technical problems
                </p>
            </header>

            <section className="consulting-services" aria-label="Consulting Services">
                {services.map((service) => (
                    <Papercard key={service.title} title={service.title} className="consulting-service-card">
                        <p>{service.description}</p>
                    </Papercard>
                ))}
            </section>

            <section className="consulting-work">
                <h2>Work I've done</h2>

                <div className="consulting-work-grid">
                    {consultingWork.map((project) => (
                        <a className="consulting-case-study" key={project.id} href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                            <div className="consulting-case-study-heading">
                                <h3>{project.title}</h3>
                                <span>{project.clientType}</span>
                            </div>
                            <p>{project.description}</p>
                            <div className="consulting-case-study-tags">
                                {project.keywords.map((keyword) => (
                                    <span key={keyword}>{keyword}</span>
                                ))}
                            </div>
                            <div className="consulting-case-study-tech">
                                {project.technologies.map((technology) => (
                                    <span key={technology}>{technology}</span>
                                ))}
                            </div>
                            <span className="consulting-case-study-arrow">
                                →
                            </span>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}