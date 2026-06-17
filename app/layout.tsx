import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 拉丁文用 Inter,中文回退到苹方等系统字体(见 globals.css 的字体栈)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "余苏涵 | LLM 应用工程师",
  description:
    "专注 LLM 应用层：从评测、Prompt 到 RAG 与部署的全链路交付。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
