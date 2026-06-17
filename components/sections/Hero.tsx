import type { CSSProperties } from "react";
import { profile } from "@/data/profile";

// 进场延迟:名字 → 标语 → 副标语 → CTA 依次入场。
// 用 data-reveal-load(纯 CSS @keyframes,加载即播放),不依赖滚动 / IntersectionObserver,
// 也不依赖 React 水合——只要 CSS 生效首屏就会显现;无 JS / reduced-motion 时则直接可见。
const delay = (s: number): CSSProperties =>
  ({ "--reveal-delay": `${s}s` }) as CSSProperties;

// 克莱因蓝(International Klein Blue):仅在 Hero 内做点缀,不改全局 --accent。
const KLEIN = "#002FA7";

// 浅冷调底:近白但隐约偏冷,叠一层极轻的上→下渐变增加层次(幅度很小)。
const coolBg: CSSProperties = {
  background:
    "linear-gradient(180deg, #F7F9FC 0%, #F3F5FB 55%, #EEF1F8 100%)",
};

// 把定位语里的「RAG 与部署」用克莱因蓝高亮,其余保持近黑。
const HIGHLIGHT = "RAG 与部署";
const [tagBefore, tagAfter] = profile.tagline.split(HIGHLIGHT);

export default function Hero() {
  return (
    <section
      aria-label="简介"
      style={coolBg}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <h1
        data-reveal-load
        className="text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        {profile.name}
      </h1>

      <p
        data-reveal-load
        style={delay(0.15)}
        className="mt-6 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg"
      >
        {tagBefore}
        <span className="font-medium" style={{ color: KLEIN }}>
          {HIGHLIGHT}
        </span>
        {tagAfter}
      </p>

      <p
        data-reveal-load
        style={delay(0.25)}
        className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
      >
        {profile.subTagline}
      </p>

      <div
        data-reveal-load
        style={delay(0.4)}
        className="mt-10 flex flex-col gap-3 sm:flex-row"
      >
        <a
          href="#products"
          style={{ backgroundColor: KLEIN }}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
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
    </section>
  );
}
