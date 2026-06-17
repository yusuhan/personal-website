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
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 首屏绘制前同步给 <html> 加 js 类:只有 JS 可用时才会应用进场初始隐藏态,
            从而保证禁用 JS / 水合失败时内容默认完整可见,且不产生闪烁。 */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
