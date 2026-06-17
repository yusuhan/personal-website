import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

export default function Products() {
  return (
    <section id="products" className="scroll-mt-20 py-24 sm:py-28">
      <Container size="wide">
        <SectionHeading label="Products" title="作品" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors">
                {/* 缩略图位 */}
                <div className="flex aspect-video items-center justify-center border-b border-border bg-foreground/[0.03] text-xs text-muted">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "缩略图"
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.oneLiner}
                  </p>

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

                  <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        {l.label} →
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
