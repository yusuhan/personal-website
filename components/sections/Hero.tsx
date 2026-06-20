import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import HeroPointerGlow from "@/components/ui/HeroPointerGlow";
import HeroChat from "@/components/ui/HeroChat";
import Magnetic from "@/components/ui/Magnetic";

const delay = (s: number): CSSProperties =>
  ({ "--reveal-delay": `${s}s` }) as CSSProperties;

// 定位语里的「RAG 与部署」用克莱因蓝高亮,其余近黑。
const HIGHLIGHT = "RAG 与部署";
const [tagBefore, tagAfter] = profile.tagline.split(HIGHLIGHT);

// 把名字按字符拆成"遮罩盒 + 内层",做 mask reveal(每字带序号 --i 错位)。
// 无 JS 时内层无位移,字符正常落位 → 完整可见。
// 字符以普通文本节点呈现 → <h1> 的无障碍名自然就是「余苏涵」,无需任何 ARIA。
function MaskedName({ text }: { text: string }) {
  return (
    <span data-mask className="inline-flex">
      {[...text].map((ch, i) => (
        <span key={i} className="char-mask">
          <span className="char-inner" style={{ "--i": i } as CSSProperties}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      aria-label="简介"
      className="relative flex min-h-screen items-center overflow-hidden py-28 lg:py-0"
    >
      {/* 装饰层(纯装饰,pointer-events:none) */}
      <div aria-hidden className="hero-aurora pointer-events-none" />
      <div aria-hidden className="hero-grid pointer-events-none" />
      <HeroPointerGlow />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* 左:静态文案(SSR 可见、SEO 友好) */}
        <div>
          <div
            data-reveal-load
            aria-hidden
            className="h-1.5 w-16 rounded-full bg-accent"
          />
          <h1 className="mt-7 font-display text-7xl font-black leading-[0.92] tracking-tight sm:text-8xl lg:text-9xl">
            <MaskedName text={profile.name} />
          </h1>
          <p
            data-reveal-load
            style={delay(0.38)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl"
          >
            {tagBefore}
            <span className="font-medium text-accent">{HIGHLIGHT}</span>
            {tagAfter}
          </p>
          <p
            data-reveal-load
            style={delay(0.48)}
            className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
          >
            {profile.subTagline}
          </p>
          <div
            data-reveal-load
            style={delay(0.58)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <a
                href="#products"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                看作品
              </a>
            </Magnetic>
            {profile.resumeUrl && (
              <Magnetic>
                <a
                  href={profile.resumeUrl}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
                >
                  下简历
                </a>
              </Magnetic>
            )}
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
              >
                联系我
              </a>
            </Magnetic>
          </div>
        </div>

        {/* 右:可对话的 AI 分身(增强,非替代) */}
        <div data-reveal-load style={delay(0.2)} className="w-full">
          <HeroChat />
        </div>
      </div>
    </section>
  );
}
