import GlassCard from "./GlassCard";

const projects = [
  {
    title: "CyrefJS",
    description:
      "A modern, lightweight utility library for JavaScript and TypeScript.",
  },
  {
    title: "Clothing-Shop",
    description: "A Full-Stack Shop",
  },
];

export default function ProjectsCard() {
  return (
    <GlassCard
      className="
        min-h-[280px]
        px-[18px]
        py-[18px]
        lg:min-h-0
      "
    >
      <h2
        className="
          m-0
          flex
          items-center
          gap-2.5
          text-lg
          font-bold
          leading-none
          tracking-[-0.028em]
        "
      >
        <span aria-hidden="true">🛠️</span>
        Projects
      </h2>

      <div className="mt-5 grid gap-2.5">
        {projects.map((project) => (
          <article
            key={project.title}
            className="
              rounded-[10px]
              border
              border-white/[0.08]
              bg-[rgba(20,20,21,0.48)]
              px-[17px]
              pb-[17px]
              pt-[18px]
            "
          >
            <h3
              className="
                m-0
                text-base
                font-bold
                leading-[1.1]
                tracking-[-0.02em]
                text-[#f4f4f5]
              "
            >
              {project.title}
            </h3>

            <p
              className="
                mt-[21px]
                mb-0
                text-sm
                leading-[1.42]
                tracking-[-0.005em]
                text-[#a3a3a7]
              "
            >
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}
