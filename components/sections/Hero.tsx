"use client";

import { motion } from "motion/react";

// TODO: 把名字换成你自己的(当前为根据目录名的推测值)
const NAME = "苏涵宇";
const TAGLINE = "专注 LLM 应用层:从评测、Prompt 到 RAG 与部署的全链路交付";

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        {NAME}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
      >
        {TAGLINE}
      </motion.p>
    </section>
  );
}
