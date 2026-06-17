import type { CSSProperties } from "react";
import { profile } from "@/data/profile";

// 进场延迟:名字 → 强调线 → 标语 → 副标语 → CTA 依次入场。
// 用 data-reveal-load(纯 CSS @keyframes,加载即播放),不依赖滚动 / IntersectionObserver,
// 也不依赖 React 水合——只要 CSS 生效首屏就会显现;无 JS / reduced-motion 时则直接可见。
const delay = (s: number): CSSProperties =>
  ({ "--reveal-delay": `${s}s` }) as CSSProperties;

// Hero 视觉锚点:大面积低透明度克莱因蓝径向光晕(右上)+ 顶部柔和白色高光,
// 透明度控制在 ~13%,只是隐约一片蓝调氛围,无硬边、不形成实色块。
const glow: CSSProperties = {
  background:
    "radial-gradient(55% 45% at 82% 12%, rgba(0, 47, 167, 0.13), transparent 68%), radial-gradient(85% 55% at 50% 0%, rgba(255, 255, 255, 0.6), transparent 60%)",
};

// 把定位语里的「RAG 与部署」用克莱因蓝(全局 accent)高亮,其余保持近黑。
const HIGHLIGHT = "RAG 与部署";
const [tagBefore, tagAfter] = profile.tagline.split(HIGHLIGHT);

export default function Hero() {
  return (
    <section
      aria-label="简介"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* 氛围光晕,纯装饰 */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={glow} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          data-reveal-load
          className="text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {profile.name}
        </h1>

        {/* 克莱因蓝强调线:视觉锚点 */}
        <div
          data-reveal-load
          style={delay(0.1)}
          aria-hidden
          className="mt-7 h-1 w-16 rounded-full bg-accent"
        />

        <p
          data-reveal-load
          style={delay(0.2)}
          className="mt-7 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg"
        >
          {tagBefore}
          <span className="font-medium text-accent">{HIGHLIGHT}</span>
          {tagAfter}
        </p>

        <p
          data-reveal-load
          style={delay(0.3)}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
        >
          {profile.subTagline}
        </p>

        <div
          data-reveal-load
          style={delay(0.45)}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
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
