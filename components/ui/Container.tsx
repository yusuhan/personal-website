import type { ReactNode } from "react";

// 内容容器:收窄居中 + 统一左右留白
// prose: 正文区,约 760px;wide: 卡片网格区,更宽
export default function Container({
  children,
  size = "prose",
  className = "",
}: {
  children: ReactNode;
  size?: "prose" | "wide";
  className?: string;
}) {
  const max = size === "wide" ? "max-w-5xl" : "max-w-[760px]";
  return (
    <div className={`mx-auto w-full ${max} px-6 ${className}`}>{children}</div>
  );
}
