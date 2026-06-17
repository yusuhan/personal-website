import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading label="Contact" title="联系" />

        <Reveal>
          <p className="text-base leading-relaxed text-muted">
            欢迎就 LLM 应用层的合作、咨询或机会与我联系。
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-block text-xl font-medium tracking-tight hover:text-accent"
          >
            {profile.email}
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
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
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
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
