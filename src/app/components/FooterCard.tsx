import GlassCard from "./GlassCard";
import Image from "next/image";
export default function FooterCard() {
  return (
    <GlassCard className="footer-card">
      <Image src="/yuta.gif" alt="" width={32} height={32} unoptimized />
    </GlassCard>
  );
}
