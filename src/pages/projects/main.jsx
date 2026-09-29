import ProjectCard from "../../components/projectcard/projectcard";
import projects from "../../data/projects";
import "./project.css"
export default function Projects() {
    const featuredProjects = projects.filter((project) => project.featured);
    return (<main className="projects-page">
        <h1 className="projects-heading">Projects</h1>

        <p className="projects-intro">
            Things I have built, experimented with, and learned from.
        </p>

        <section
            className="featured-projects"
            aria-label="Featured projects"
        >
            {featuredProjects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                />
            ))}
        </section>

        <div className="all-projects-link">
            <a href="https://github.com/Clinton-Cochrane?tab=repositories" target="_blank" rel="noopener noreferrer">
                View all projects →
            </a>
        </div>
    </main>
    );
}
