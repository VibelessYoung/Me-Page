import GlassCard from "./GlassCard";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="link-icon">
      <path
        fill="currentColor"
        d="M12 .7A11.3 11.3 0 0 0 8.42 22.92c.57.1.78-.25.78-.55v-2.1c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.15-1.48 3.12-1.17 3.12-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.41-2.67 5.38-5.21 5.67.41.36.78 1.07.78 2.16v3.19c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7Z"
      />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="link-icon">
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
    <GlassCard className="links-card">
      <h2 className="card-heading">
        <span aria-hidden="true">🔗</span>
        Links
      </h2>

      <div className="link-row">
        <a
          className="icon-link"
          href="https://github.com/VibelessYoung"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>

        <a
          className="icon-link"
          href="https://vibeless.vercel.app/en"
          target="_blank"
          rel="noreferrer"
          aria-label="Resume"
        >
          <ResumeIcon />
        </a>
      </div>
    </GlassCard>
  );
}
