import type { ReactNode } from "react";

// 内容容器:收窄居中 + 统一左右留白
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-4xl px-6 ${className}`}>{children}</div>
  );
}
