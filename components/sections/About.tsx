import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading label="Experience" title="经历" />

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
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">
                    {e.role} · {e.org}
                  </h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-border">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
