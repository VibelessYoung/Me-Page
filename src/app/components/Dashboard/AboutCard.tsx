import GlassCard from "./GlassCard";

export default function AboutCard() {
  return (
    <GlassCard className="min-h-[200px] px-[18px] py-[18px] lg:min-h-0">
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
        <span aria-hidden="true">🧑‍💻</span>
        About Me
      </h2>

      <p
        className="
          mt-[27px]
          mb-0
          max-w-[255px]
          text-[17px]
          font-semibold
          leading-[1.17]
          tracking-[-0.012em]
          text-[#f1f1f2]
          max-[520px]:max-w-none
          max-[520px]:text-base
        "
      >
        <span
          className="
            text-[#77777b]
            line-through
            decoration-[#6c6c70]
            decoration-[1.4px]
          "
        >
          CS Student
        </span>
        <br />
        Im a Full-Stack Developer with over many months of experience creating
        beautiful, functional digital experiences. ensuring every project is
        both visually stunning and technically sound.
      </p>
    </GlassCard>
  );
}
