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
 * 可见性不依赖 React 水合:元素默认可见。只有本组件成功挂载(React 已水合)
 * 且未开启 reduced-motion 时,才给自己加 `reveal-armed` 隐藏(见 globals.css),
 * 再在进入视口时加 `is-visible` 触发过渡。若水合失败,组件不挂载、不武装,
 * 元素保持可见——绝不会出现空白。
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 减弱动效:不武装、保持默认可见。
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 只有组件成功挂载(即 React 已水合)才"武装"隐藏自己。
    // 若水合失败,这段代码不会执行,元素保持默认可见——绝不空白。
    el.classList.add("reveal-armed");

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
