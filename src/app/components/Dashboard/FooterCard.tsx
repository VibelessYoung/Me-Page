import Image from "next/image";

import GlassCard from "./GlassCard";

export default function FooterCard() {
  return (
    <GlassCard className="relative min-h-[64px] p-0 lg:min-h-0">
      <Image
        src="/yuta.gif"
        alt=""
        width={32}
        height={32}
        unoptimized
        className="block h-full w-full object-cover"
      />
    </GlassCard>
  );
}
