import Container from "@/components/ui/Container";
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
        <SectionHeading index="02" label="Writing" title="文章" />

        {/* 纵向卡片网格,与作品区卡片语言一致 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal key={a.url} delay={(i % 2) * 0.08}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-card transition duration-300 ease-out hover:shadow-card-hover motion-safe:hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* 超大 condensed 编号(Anton 拉丁数字),装饰 */}
                  <span
                    aria-hidden
                    className="font-display text-6xl font-black leading-none text-accent/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                    {a.platform}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {a.summary}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted">
                  <time>{a.date}</time>
                  <span className="link-underline font-medium text-accent">
                    阅读原文 →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
