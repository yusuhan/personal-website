import Reveal from "@/components/ui/Reveal";

// 统一的 section 标题:小标签 + 大标题
export default function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
        {label}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
