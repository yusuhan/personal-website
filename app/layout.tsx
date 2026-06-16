import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "余苏涵 | LLM 应用层工程师",
  description:
    "专注 LLM 应用层:从评测、Prompt 到 RAG 与部署的全链路交付。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
