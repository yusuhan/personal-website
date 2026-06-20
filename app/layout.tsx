import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/data/profile";

// 正文:拉丁文用 Inter,中文回退苹方等系统字体(见 globals.css 字体栈)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 展示字(名字 / 区块大标题):拉丁文用 Anton(condensed black)
// 当前可见展示文本以中文为主(走 Noto SC),Anton 非首屏关键 → 不预载,避免渲染阻塞。
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  preload: false,
});

// 展示字中文:思源黑体 Heavy(900)的"子集"——只含展示用的 11 个字形
// (余苏涵 + 作品/文章/经历/联系),自托管仅 2.8KB、可预载,几乎零性能成本。
// unicode-range 限定只对这些字生效,其余中文回退系统字体。
// 若以后新增区块标题用到新字,需重新生成子集(见 README/note)。
const notoSC = localFont({
  src: "./fonts/noto-sc-900-subset.woff2",
  weight: "900",
  variable: "--font-noto-sc",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+4f59, U+4f5c, U+5386, U+54c1, U+6587, U+6db5, U+7ae0, U+7cfb, U+7ecf, U+8054, U+82cf",
    },
  ],
});

const title = "余苏涵 | LLM 应用工程师";
const description = `${profile.tagline}。`;
// Vercel 部署域名,OG/Twitter 的绝对 URL 依赖它
const siteUrl = "https://personal-website-lac-omega.vercel.app";

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
      className={`${inter.variable} ${anton.variable} ${notoSC.variable} h-full antialiased`}
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
