"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** 延迟出现的秒数,用于同组元素错峰 */
  delay?: number;
  className?: string;
}

/**
 * 进入视口时淡入 + 轻微上移,只触发一次。
 *
 * SSR / 无 JS / 水合失败 / 减弱动效 时:元素默认可见(见 globals.css 的
 * `[data-reveal] { opacity: 1 }`),不依赖 JS。仅当 <html class="js"> 且用户
 * 未开启 prefers-reduced-motion 时,CSS 才把它初始隐藏,再由本组件在进入视口
 * 时加上 `is-visible` 触发过渡。
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 减弱动效:CSS 已让其保持可见,无需观察。
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el); // 只触发一次
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}s` } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} data-reveal style={style} className={className}>
      {children}
    </div>
  );
}
