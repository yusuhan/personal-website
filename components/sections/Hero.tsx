import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import HeroPointerGlow from "@/components/ui/HeroPointerGlow";

// 进场延迟:强调线 → 名字 → 标语 → 副标语 → CTA 依次入场。
// 用 data-reveal-load(纯 CSS @keyframes,加载即播放),不依赖滚动 / React 水合。
const delay = (s: number): CSSProperties =>
  ({ "--reveal-delay": `${s}s` }) as CSSProperties;

// 定位语里的「RAG 与部署」用克莱因蓝(全局 accent)高亮,其余近黑。
const HIGHLIGHT = "RAG 与部署";
const [tagBefore, tagAfter] = profile.tagline.split(HIGHLIGHT);

export default function Hero() {
  return (
    <section
      aria-label="简介"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* —— 装饰层(纯装饰,pointer-events:none,不影响内容) —— */}
      <div aria-hidden className="hero-aurora pointer-events-none" />
      <div aria-hidden className="hero-grid pointer-events-none" />
      <HeroPointerGlow />
      {/* 右侧极淡克莱因蓝几何:大圆环 + 细竖线,作为不对称版式锚点 */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-11rem] top-1/2 hidden h-[36rem] w-[36rem] -translate-y-1/2 rounded-full border border-[#002FA7]/10 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-24 top-1/2 hidden h-[32rem] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#002FA7]/20 to-transparent lg:block"
      />

      {/* —— 内容(左对齐、不对称) —— */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div
          data-reveal-load
          aria-hidden
          className="h-1 w-14 rounded-full bg-accent"
        />

        <h1
          data-reveal-rise
          className="mt-8 text-7xl font-bold leading-[1.02] tracking-tight sm:text-8xl lg:text-9xl"
        >
          {profile.name}
        </h1>

        <p
          data-reveal-load
          style={delay(0.2)}
          className="mt-8 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl"
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
    </section>
  );
}
