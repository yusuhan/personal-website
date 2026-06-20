import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

// 压轴收尾:克莱因蓝实色底 + 暖白大字,与作品区的蓝块呼应(米→蓝→米→米→蓝)。
export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="联系"
      className="relative scroll-mt-20 overflow-hidden bg-accent text-cream"
    >
      {/* 从上方米底自然过渡到克莱因蓝(避免生硬色块拼接) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-36 bg-gradient-to-b from-[var(--background)] to-transparent"
      />
      {/* 暖白氛围光晕,蓝底上的点缀 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 z-0 h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,240,230,0.10), transparent 68%)",
        }}
      />

      <Container className="relative z-10 pb-24 pt-40 sm:pb-28 sm:pt-48">
        <SectionHeading index="04" label="Contact" title="联系" tone="onAccent" />

        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-cream/80">
            欢迎就 LLM 应用层的合作、咨询或机会与我联系。
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-flex min-h-[44px] items-center text-2xl font-semibold tracking-tight text-cream transition-opacity hover:opacity-80 sm:text-3xl"
          >
            {profile.email}
          </a>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-cream px-6 py-2.5 text-sm font-medium text-accent transition-opacity hover:opacity-90"
              >
                下载简历
              </a>
            )}
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center text-sm font-medium text-cream/80 transition-opacity hover:opacity-100 max-sm:min-h-[44px]"
              >
                {s.label} →
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
