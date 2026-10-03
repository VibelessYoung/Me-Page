import Image from "next/image";

import GlassCard from "./GlassCard";

export default function ProfileCard() {
  return (
    <GlassCard
      className="
        flex
        min-h-[88px]
        items-center
        gap-4
        px-4
        py-3.5
      "
    >
      <Image
        src="/yuta.png"
        alt="Amir"
        width={48}
        height={48}
        priority
        className="
          size-[46px]
          shrink-0
          rounded-full
          border
          border-white/[0.14]
          object-cover
          shadow-[0_0_0_4px_rgba(255,255,255,0.02)]
        "
      />

      <div className="min-w-0">
        <h1
          className="
            m-0
            text-[17px]
            font-bold
            leading-[1.05]
            tracking-[-0.03em]
          "
        >
          Amir
        </h1>

        <p
          className="
            mt-1.5
            text-sm
            leading-none
            text-[#bdbdbf]
          "
        >
          VibelessYoung
        </p>
      </div>
    </GlassCard>
  );
}
