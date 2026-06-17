"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.h1
        {...fade}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        {...fade}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mt-6 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg"
      >
        {profile.tagline}
      </motion.p>

      <motion.p
        {...fade}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
      >
        {profile.subTagline}
      </motion.p>

      <motion.div
        {...fade}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="mt-10 flex flex-col gap-3 sm:flex-row"
      >
        <a
          href="#products"
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          看作品
        </a>
        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
          >
            下简历
          </a>
        )}
        <a
          href="#contact"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
        >
          联系我
        </a>
      </motion.div>
    </section>
  );
}
