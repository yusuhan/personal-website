import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

// Live Demo 链接优先排在前面
function orderLinks<T extends { label: string }>(links: T[]) {
  return [...links].sort((a, b) => {
    const score = (l: T) => (/live\s*demo/i.test(l.label) ? 0 : 1);
    return score(a) - score(b);
  });
}

export default function Products() {
  return (
    <section id="products" aria-label="作品" className="scroll-mt-20 py-24 sm:py-28">
      <Container size="wide">
        <SectionHeading label="Products" title="作品" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition duration-300 ease-out hover:border-accent hover:shadow-card-hover motion-safe:hover:-translate-y-1">
                {/* 缩略图位 */}
                <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border bg-foreground/[0.03] text-xs text-muted">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.title} 项目预览图`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    "缩略图"
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        p.status === "已上线"
                          ? "bg-accent/10 text-accent"
                          : "border border-border text-muted"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                    {p.oneLiner}
                  </p>

                  {/* 亮点列表 */}
                  {p.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 技术栈 */}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* 链接 */}
                  {p.links.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-4 pt-5">
                      {orderLinks(p.links).map((l) => (
                        <a
                          key={l.label}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline inline-flex items-center text-sm font-medium text-accent max-sm:min-h-[44px]"
                        >
                          {l.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
