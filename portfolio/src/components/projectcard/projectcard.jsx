import "./projectcard.css";

export default function ProjectCard({ project }) {
    const hasImage = Boolean(project.image);
    const hasProjectUrl = Boolean(project.projectUrl && project.projectUrl !== "#");
    const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl !== "#");

    return (
        <article className={`project-card ${hasImage ? "project-card--with-image" : "project-card--text-only"}`}>
            {hasImage && (
                <div className="project-card-image">
                    <img src={project.image} alt={project.imageAlt || `${project.title} project image`} loading="lazy" />
                </div>
            )}
            <div className="project-card-body">
                <h2>{project.title}</h2>
                <p className="project-card-description" tabIndex={0}>{project.description}</p>
                {project.technologies?.length > 0 && (
                    <div className="project-card-tech">
                        {project.technologies.map((technology) => (
                            <span key={technology}>{technology}</span>
                        ))}
                    </div>
                )}
                {(project.LastCommitDate || project.commitDetails) && (
                    <p className="project-card-meta">
                        {project.LastCommitDate && `As of ${project.LastCommitDate}`}
                        {project.LastCommitDate && project.commitDetails && " · "}
                        {project.commitDetails}
                    </p>
                )}
                {(hasProjectUrl || hasGithubUrl) && (
                    <div className="project-card-links">
                        {hasProjectUrl && (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">View project →</a>
                        )}
                        {hasGithubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}