import GlassCard from "./GlassCard";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
      <path
        fill="currentColor"
        d="M12 .7A11.3 11.3 0 0 0 8.42 22.92c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.15-1.48 3.12-1.17 3.12-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.41-2.67 5.38-5.21 5.67.41.36.78 1.07.78 2.16v3.19c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7Z"
      />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M9 8h6M9 12h6M9 16h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <circle cx="16.5" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

export default function LinksCard() {
  return (
    <GlassCard className="min-h-[150px] px-[18px] py-[18px]">
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
        <span aria-hidden="true">🔗</span>
        Links
      </h2>

      <div className="mt-[18px] flex gap-2.5">
        <a
          href="https://github.com/VibelessYoung"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="
            grid
            h-[50px]
            w-[54px]
            place-items-center
            rounded-[13px]
            border
            border-white/[0.06]
            bg-[rgba(42,42,44,0.82)]
            text-[#f4f4f4]
            transition-all
            duration-150
            hover:-translate-y-0.5
            hover:border-white/[0.12]
            hover:bg-[rgba(55,55,57,0.92)]
          "
        >
          <GitHubIcon />
        </a>

        <a
          href="https://vibeless.vercel.app/en"
          target="_blank"
          rel="noreferrer"
          aria-label="Resume"
          className="
            grid
            h-[50px]
            w-[54px]
            place-items-center
            rounded-[13px]
            border
            border-white/[0.06]
            bg-[rgba(42,42,44,0.82)]
            text-[#f4f4f4]
            transition-all
            duration-150
            hover:-translate-y-0.5
            hover:border-white/[0.12]
            hover:bg-[rgba(55,55,57,0.92)]
          "
        >
          <ResumeIcon />
        </a>
      </div>
    </GlassCard>
  );
}
