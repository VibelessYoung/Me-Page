import Image from "next/image";
import GlassCard from "./GlassCard";

export default function ProfileCard() {
  return (
    <GlassCard className="profile-card">
      <Image
        src="/avatar.png"
        alt="sip c.ink avatar"
        width={48}
        height={48}
        className="avatar"
        priority
      />
      <div className="profile-copy">
        <h1>Amir</h1>
        <p>VibelessYoung</p>
      </div>
    </GlassCard>
  );
}
