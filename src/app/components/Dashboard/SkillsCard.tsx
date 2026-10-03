import GlassCard from "./GlassCard";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "MongoDB",
  "TailwindCSS",
];

export default function SkillsCard() {
  return (
    <GlassCard className="min-h-[156px] px-[18px] py-[17px]">
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
        <span aria-hidden="true">⚡</span>
        Skills
      </h2>

      <div className="mt-[18px] flex flex-wrap gap-x-2 gap-y-2.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              inline-flex
              min-h-[26px]
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.055]
              bg-[rgba(41,41,43,0.78)]
              px-3
              py-[3px]
              text-sm
              font-semibold
              leading-none
              text-[#efeff1]
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
