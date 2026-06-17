"use client";

import { useEffect, useRef } from "react";

/**
 * 跟随鼠标的克莱因蓝光晕,带阻尼延迟(靠 CSS transition 实现拖尾)。
 * 纯装饰:pointer-events:none,不参与内容渲染。
 * - 无指针设备(移动端)不渲染、不监听;
 * - prefers-reduced-motion 时不启用。
 */
export default function HeroPointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const noHover = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 无指针设备(移动端):直接移除这层,不渲染。
    if (noHover) {
      el.remove();
      return;
    }
    // 减弱动效:保留但不启用跟随(始终不可见)。
    if (reduce) return;

    const section = el.closest("section");
    if (!section) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // 只改 transform/opacity,GPU 加速,不触发重排
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="hero-glow" />;
}
