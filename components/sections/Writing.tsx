import Container from "@/components/ui/Container";
import DragScroll from "@/components/ui/DragScroll";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { articles } from "@/data/articles";

export default function Writing() {
  return (
    <section
      id="writing"
      aria-label="文章"
      className="scroll-mt-20 bg-[var(--background)] py-24 sm:py-28"
    >
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="02"
            label="Writing"
            title="文章"
            className="mb-0"
          />
          <p className="hidden text-xs text-muted sm:block">← 拖动 / 横向滑动浏览 →</p>
        </div>
      </Container>

      {/* 横向滚动:卡片不上下堆叠,而是横向铺开。无 JS 时容器仍可原生横滑、内容完整。 */}
      <Reveal className="mt-10">
        <DragScroll
          ariaLabel="文章列表,可横向滚动"
          className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:px-[max(1.5rem,calc((100vw-64rem)/2))]"
        >
          {articles.map((a, i) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-[80vw] max-w-[340px] shrink-0 snap-start flex-col rounded-xl border border-border bg-surface p-6 shadow-card transition duration-300 ease-out hover:shadow-card-hover motion-safe:hover:-translate-y-1 sm:w-[340px]"
            >
              {/* 超大 condensed 编号(Anton 拉丁数字),装饰 */}
              <span
                aria-hidden
                className="font-display text-7xl font-black leading-none text-accent/15"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="mt-4 inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                {a.platform}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {a.summary}
              </p>

              <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted">
                <time>{a.date}</time>
                <span className="link-underline font-medium text-accent">
                  阅读原文 →
                </span>
              </div>
            </a>
          ))}
        </DragScroll>
      </Reveal>
    </section>
  );
}
