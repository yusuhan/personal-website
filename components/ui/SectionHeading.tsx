import Reveal from "@/components/ui/Reveal";

// 统一的 section 标题:克莱因蓝序号 + 短线 + 小标签(贯穿全站的视觉线索),
// 下接超大左对齐标题,与 Hero 的版式语言呼应。
// tone="dark" 用于深色区块(联系区),反转文字颜色并保证对比度。
export default function SectionHeading({
  index,
  label,
  title,
  tone = "light",
}: {
  index: string;
  label: string;
  title: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span
          className={`font-mono text-sm ${dark ? "text-[#8AA0FF]" : "text-accent"}`}
        >
          {index}
        </span>
        <span
          className={`h-px w-8 ${dark ? "bg-[#8AA0FF]/50" : "bg-accent/40"}`}
        />
        <p
          className={`text-xs font-medium uppercase tracking-[0.2em] ${
            dark ? "text-white/55" : "text-muted"
          }`}
        >
          {label}
        </p>
      </div>
      <h2
        className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${
          dark ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
