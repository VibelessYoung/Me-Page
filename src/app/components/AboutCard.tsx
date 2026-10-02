import GlassCard from "./GlassCard";

export default function AboutCard() {
  return (
    <GlassCard className="about-card">
      <h2 className="card-heading">
        <span aria-hidden="true">🧑‍💻</span>
        About Me
      </h2>

      <p className="about-copy">
        <span className="muted-strike">CS Student</span>
        <br />
        Im a Full-Stack Developer with over many months of experience creating
        beautiful, functional digital experiences. ensuring every project is both visually
        stunning and technically sound.
      </p>
    </GlassCard>
  );
}
