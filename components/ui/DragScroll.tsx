"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 横向滚动容器的"鼠标拖拽"增强。
 * - 触摸设备:不启用,用浏览器原生横滑。
 * - 无 JS:容器本身仍可原生横向滚动(触摸板/滚动条/键盘 Tab 聚焦自动滚入),
 *   内容完整在 DOM 中、可访问 —— 不依赖本组件。
 * - 拖拽超过阈值时抑制随后的 click,避免误触发卡片链接。
 */
export default function DragScroll({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return; // 触摸设备用原生

    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e: PointerEvent) => {
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      down = false;
      el.style.cursor = "grab";
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
      el.style.cursor = "";
    };
  }, []);

  return (
    <div ref={ref} role="region" aria-label={ariaLabel} tabIndex={0} className={className}>
      {children}
    </div>
  );
}
