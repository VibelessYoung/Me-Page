import GlassCard from "./GlassCard";

const projects = [
  {
    title: "CyrefJS",
    description:
      "A modern, lightweight utility library for JavaScript and TypeScript.",
  },
  {
    title: "Clothing-Shop",
    description:
      "A Full-Stack Shop",
  },
];

export default function ProjectsCard() {
  return (
    <GlassCard className="projects-card">
      <h2 className="card-heading project-heading">
        <span aria-hidden="true">🛠️</span>
        Projects
      </h2>

      <div className="project-list">
        {projects.map((project) => (
          <article className="project-item" key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}
