import "./projectcard.css";

export default function ProjectCard({ project }) {
    return (
        <article className="project-card">
            <div className="project-card-image">
                {project.image ? (
                    <img src={project.image} alt={`${project.title} screenshot`} />
                ) : (<span>Project image</span>)}
            </div>
            <div className="project-card-body">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="project-card-tech">
                    {project.technologies.map((technology) => {
                        <span key={technology}>{technology}</span>
                    })}
                </div>
                <div className="project-card-links">
                    <a href={project.projectUrl}> View project →</a>
                    <a href={project.githubUrl}>
                        GitHub
                    </a>
                </div>
            </div>
        </article>
    );
}