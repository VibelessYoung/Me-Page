import ProfileCard from "./ProfileCard";
import SkillsCard from "./SkillsCard";
import LinksCard from "./LinksCard";
import AboutCard from "./AboutCard";
import LocalTimeCard from "./LocalTimeCard";
import ProjectsCard from "./ProjectsCard";
import FooterCard from "./FooterCard";

export default function Dashboard() {
  return (
    <main className="relative isolate min-h-svh w-full px-3 py-3 sm:px-[18px] sm:py-[18px] lg:grid lg:min-h-svh lg:place-items-center lg:p-6">
      <div className="flex w-full max-w-[944px] flex-col gap-2.5 lg:grid lg:h-[528px] lg:grid-cols-[260px_288px_220px] lg:gap-2.5">
        {/* Left */}
        <div className="flex flex-col gap-2.5 lg:grid lg:grid-rows-[87px_168px_1fr] lg:gap-2.5">
          <ProfileCard />
          <SkillsCard />
          <LinksCard />
        </div>

        {/* Center */}
        <div className="flex flex-col gap-2.5 lg:grid lg:grid-rows-[236px_138px_1fr] lg:gap-2.5">
          <AboutCard />
          <LocalTimeCard />
          <FooterCard />
        </div>

        {/* Projects */}
        <ProjectsCard />
      </div>
    </main>
  );
}
