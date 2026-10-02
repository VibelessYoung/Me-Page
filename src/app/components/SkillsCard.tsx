import GlassCard from "./GlassCard";

const skills = ["Next.js", "React", "TypeScript", "JavaScript", "MongoDB", "TailwindCSS"];

export default function SkillsCard() {
  return (
    <GlassCard className="skills-card">
      <h2 className="card-heading">
        <span aria-hidden="true">⚡</span>
        Skills
      </h2>

      <div className="skill-list">
        {skills.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
