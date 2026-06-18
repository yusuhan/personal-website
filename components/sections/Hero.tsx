import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import HeroPointerGlow from "@/components/ui/HeroPointerGlow";
import HeroChat from "@/components/ui/HeroChat";

// 进场延迟。data-reveal-load(纯 CSS,加载即播放)/ data-reveal-rise(仅位移,
// 用于 LCP 大标题),不依赖滚动 / React 水合;无 JS / reduced-motion 时直接可见。
const delay = (s: number): CSSProperties =>
  ({ "--reveal-delay": `${s}s` }) as CSSProperties;

// 定位语里的「RAG 与部署」用克莱因蓝高亮,其余近黑。
const HIGHLIGHT = "RAG 与部署";
const [tagBefore, tagAfter] = profile.tagline.split(HIGHLIGHT);

export default function Hero() {
  return (
    <section
      aria-label="简介"
      className="relative flex min-h-screen items-center overflow-hidden py-28 lg:py-0"
    >
      {/* —— 装饰层(纯装饰,pointer-events:none,不影响内容) —— */}
      <div aria-hidden className="hero-aurora pointer-events-none" />
      <div aria-hidden className="hero-grid pointer-events-none" />
      <HeroPointerGlow />

      {/* —— 内容:左文案 / 右 AI 分身(桌面两栏,移动端堆叠) —— */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* 左:静态文案(SSR 可见、SEO 友好) */}
        <div>
          <div
            data-reveal-load
            aria-hidden
            className="h-1 w-14 rounded-full bg-accent"
          />
          <h1
            data-reveal-rise
            className="mt-8 text-6xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
          >
            {profile.name}
          </h1>
          <p
            data-reveal-load
            style={delay(0.2)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl"
          >
            {tagBefore}
            <span className="font-medium text-accent">{HIGHLIGHT}</span>
            {tagAfter}
          </p>
          <p
            data-reveal-load
            style={delay(0.3)}
            className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
          >
            {profile.subTagline}
          </p>
          <div
            data-reveal-load
            style={delay(0.45)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
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
        </div>

        {/* 右:可对话的 AI 分身(增强,非替代) */}
        <div data-reveal-load style={delay(0.35)} className="w-full">
          <HeroChat />
        </div>
      </div>
    </section>
  );
}
