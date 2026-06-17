import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

// 深色收尾区:近黑冷调底 + 白色大标题,作为整站压轴,与 Hero 首尾呼应。
export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="联系"
      className="relative scroll-mt-20 overflow-hidden bg-[#0a0c16]"
    >
      {/* 从上方白色区块自然过渡到深底(避免生硬色块拼接) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #0a0c16 100%)" }}
      />
      {/* 克莱因蓝氛围光晕,深底上的点缀 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,47,167,0.30), transparent 68%)",
        }}
      />

      <Container className="relative z-10 pb-24 pt-40 sm:pb-28 sm:pt-48">
        <SectionHeading index="04" label="Contact" title="联系" tone="dark" />

        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-white/60">
            欢迎就 LLM 应用层的合作、咨询或机会与我联系。
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-flex min-h-[44px] items-center text-2xl font-semibold tracking-tight text-white transition-colors hover:text-[#8aa0ff] sm:text-3xl"
          >
            {profile.email}
          </a>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#002fa7] transition-opacity hover:opacity-90"
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
                className="link-underline inline-flex items-center text-sm font-medium text-white/70 transition-colors hover:text-white max-sm:min-h-[44px]"
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
