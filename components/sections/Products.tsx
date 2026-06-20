import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { products, type Product } from "@/data/products";

// Live Demo 链接优先排在前面
function orderLinks<T extends { label: string }>(links: T[]) {
  return [...links].sort((a, b) => {
    const score = (l: T) => (/live\s*demo/i.test(l.label) ? 0 : 1);
    return score(a) - score(b);
  });
}

function Card({ p }: { p: Product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-card transition duration-300 ease-out hover:shadow-card-hover motion-safe:hover:-translate-y-1">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border bg-foreground/[0.03] text-xs text-muted">
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.title} 项目预览图`}
            fill
            sizes="(max-width: 1024px) 100vw, 47vw"
            className="object-cover"
          />
        ) : (
          "缩略图"
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
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
  );
}

export default function Products() {
  return (
    <section
      id="products"
      aria-label="作品"
      className="relative scroll-mt-20 overflow-hidden py-24 text-cream sm:py-28"
      // 同色系微妙明度渐变(左上略深 → 右下略亮),替代死板平涂
      style={{
        background:
          "linear-gradient(145deg, #00227a 0%, #002fa7 52%, #0b3bb6 100%)",
      }}
    >
      {/* 极淡颗粒纹理,增加材质感(soft-light 只调明度) */}
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 z-0 opacity-[0.5] mix-blend-soft-light"
      />
      {/* 极克制的同色结构竖线,增加层次 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0, transparent 159px, rgba(255,255,255,0.03) 160px)",
        }}
      />
      {/* 上下边缘与米底自然衔接的极轻渐变 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-[var(--background)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent"
      />

      <Container size="wide" className="relative z-10">
        <SectionHeading index="01" label="Products" title="作品" tone="onAccent" />

        {/* 桌面:双列错位,两张卡片各占约一半、横向铺满蓝块;
            第二张整体下移做交错。移动端:单列堆叠(不强行错位)。 */}
        <div className="mt-4 grid grid-cols-1 gap-10 lg:mt-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          {products.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.1}
              className={i === 1 ? "lg:mt-28" : undefined}
            >
              <Card p={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
