import GlassCard from "./GlassCard";
export default function FooterCard() {
  return (
    <GlassCard className="footer-card">
      {" "}
      <span>© {new Date().getFullYear()}</span> <span>me</span>{" "}
      <span>{"</>"}</span>{" "}
    </GlassCard>
  );
}
