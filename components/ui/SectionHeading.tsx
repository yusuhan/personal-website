import Reveal from "@/components/ui/Reveal";

// 统一的 section 标题:克莱因蓝序号 + 短线 + 小标签(贯穿全站的视觉线索),
// 下接超大左对齐标题,与 Hero 的版式语言呼应。
// tone:light=浅底;dark=深底(联系区);onAccent=克莱因蓝实色底(作品区)。
export default function SectionHeading({
  index,
  label,
  title,
  tone = "light",
  className = "mb-12",
}: {
  index: string;
  label: string;
  title: string;
  tone?: "light" | "dark" | "onAccent";
  className?: string;
}) {
  const indexColor =
    tone === "onAccent"
      ? "text-cream/75"
      : tone === "dark"
        ? "text-[#8AA0FF]"
        : "text-accent";
  const barColor =
    tone === "onAccent"
      ? "bg-cream/45"
      : tone === "dark"
        ? "bg-[#8AA0FF]/50"
        : "bg-accent/40";
  const labelColor =
    tone === "onAccent" ? "text-cream/70" : tone === "dark" ? "text-white/55" : "text-muted";
  const titleColor =
    tone === "onAccent" ? "text-cream" : tone === "dark" ? "text-white" : "";

  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3">
        <span className={`font-mono text-sm ${indexColor}`}>{index}</span>
        <span className={`h-px w-8 ${barColor}`} />
        <p className={`text-xs font-medium uppercase tracking-[0.2em] ${labelColor}`}>
          {label}
        </p>
      </div>
      <h2
        className={`title-wipe mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl ${titleColor}`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
