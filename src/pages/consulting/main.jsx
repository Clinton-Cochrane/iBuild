import Papercard from "../../components/papercard/papercard";
import './consulting.css';

const services = [
    {
        title: "Websites",
        description: "From simple business sites to custom web applications",
    },
    {
        title: "Software",
        description: "Tools that replace repetitive work, organize messy processes, or solve a problem that off- the - shelf software does not.",
    },
    {
        title: "Technical Help",
        description:
            "Hosting, domains, deployments, integrations, and figuring out the technical path from an idea to something usable.",
    },
];

const consultingWork = [
    {
        id: "little-town-bakes",
        title: "Little Town Bakes",
        clientType: "cottage bakery",
        description: "A custom ordering and inventory system designed around the workflow of a small bakery.",
        technologies: ["Web", "Ordering", "Inventory"],
    },
    {
        id: "roast66-coffee",
        title: "Roast66coffee",
        clientType: "Mobile coffee business",
        description:
            "A customer ordering experience with menu management, customizable drinks, payments, and administrative tools.",
        technologies: ["Web", "Payments", "Operations"],
    }
];

export default function Consulting() {
    return (
        <main className="consulting-page">
            <header className="consulting-header">
                <h1 className="consulting-heading">Consulting</h1>
                <p>  I help small businesses turn technical problems and ideas
                    into practical tools they can actually use.
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
                        <article className="consulting-case-study" key={project.id}>
                            <div className="consulting-case-study-heading">
                                <h3>{project.title}</h3>
                                <span>{project.clientType}</span>
                            </div>
                            <p>{project.description}</p>
                            <div className="consulting-case-study-tags">
                                {project.technologies.map((technology) => (
                                    <span key={technology}>{technology}</span>
                                ))}
                            </div>
                            <span className="consulting-case-study-arrow">
                                →
                            </span>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}