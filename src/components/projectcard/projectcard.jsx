import "./projectcard.css";

export default function ProjectCard({ project }) {
    return (
        <article className="project-card">
            <div className="project-card-body">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="project-card-tech">
                    {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                    ))}
                </div>
                <p>As of {project.LastCommitDate} there're {project.commitDetails}</p>
                <div className="project-card-links">
                    <a href={project.githubUrl} target="_blank">
                        GitHub
                    </a>
                </div>
            </div>
        </article>
    );
}