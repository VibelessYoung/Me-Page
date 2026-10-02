import Background from "./Background";
import ProfileCard from "./ProfileCard";
import SkillsCard from "./SkillsCard";
import LinksCard from "./LinksCard";
import AboutCard from "./AboutCard";
import LocalTimeCard from "./LocalTimeCard";
import ProjectsCard from "./ProjectsCard";
import FooterCard from "./FooterCard";

export default function Dashboard() {
  return (
    <main className="page-shell">
      <Background />

      <div className="dashboard-grid">
        <div className="left-column">
          <ProfileCard />
          <SkillsCard />
          <LinksCard />
        </div>

        <div className="center-column">
          <AboutCard />
          <LocalTimeCard />
          <FooterCard />
        </div>

        <ProjectsCard />
      </div>
    </main>
  );
}
