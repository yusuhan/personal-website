import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

export default function About() {
  return (
    <section
      id="about"
      aria-label="经历"
      className="scroll-mt-20 bg-white py-24 sm:py-28"
    >
      <Container>
        <SectionHeading index="03" label="Experience" title="经历" />

        <div>
          {experiences.map((e, i) => {
            const isLast = i === experiences.length - 1;
            return (
              <Reveal key={`${e.org}-${e.period}`} delay={i * 0.08}>
                {/* 每个条目自带左侧时间线段与节点,圆点对齐到各自条目顶部 */}
                <div
                  className={`relative border-l pl-6 ${
                    isLast ? "border-l-transparent pb-0" : "border-border pb-12"
                  }`}
                >
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  <p className="text-sm text-muted">{e.period}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {e.role} · {e.org}
                    </h3>
                    {e.tag && (
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                        {e.tag}
                      </span>
                    )}
                  </div>
                  {e.points.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-border">
                      {e.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
