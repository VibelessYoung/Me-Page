import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <section
      className={`
        min-w-0
        h-full
        overflow-hidden
        rounded-[9px]
        border border-white/[0.12]
        bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_32%),rgba(17,17,18,0.62)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.015),0_10px_24px_rgba(0,0,0,0.12)]
        backdrop-blur-[20px]
        backdrop-saturate-125
        ${className}
      `}
    >
      {children}
    </section>
  );
}
