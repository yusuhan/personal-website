import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { articles } from "@/data/articles";

export default function Writing() {
  return (
    <section id="writing" aria-label="文章" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading label="Writing" title="文章" />

        <div className="border-t border-border">
          {articles.map((a, i) => (
            <Reveal key={a.url} delay={i * 0.08}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 border-b border-border py-6 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="sm:flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
                      {a.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                      {a.platform}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {a.summary}
                  </p>
                </div>
                <time className="shrink-0 text-sm text-muted">{a.date}</time>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
