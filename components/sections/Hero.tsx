import Reveal from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

// 名字 → 标语 → 副标语 → CTA 依次入场(靠 Reveal 的 delay 错峰)。
// 不再硬设 opacity:0:无 JS / 减弱动效时由 CSS 兜底,内容默认完整可见。
export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
          {profile.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {profile.subTagline}
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#products"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            看作品
          </a>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
            >
              下简历
            </a>
          )}
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
          >
            联系我
          </a>
        </div>
      </Reveal>
    </section>
  );
}
