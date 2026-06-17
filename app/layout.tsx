import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

// 拉丁文用 Inter,中文回退到苹方等系统字体(见 globals.css 的字体栈)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "余苏涵 | LLM 应用工程师";
const description = `${profile.tagline}。`;
// TODO: 部署到 Vercel 后改成真实域名,OG/Twitter 的绝对 URL 依赖它
const siteUrl = "https://yusuhan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "zh_CN",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — LLM 应用工程师` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
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
        {/* 首屏绘制前同步给 <html> 加 js 类:仅用于装饰性进场动画的触发,
            内容可见性不依赖它(见 globals.css 与 Reveal 的说明)。 */}
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
