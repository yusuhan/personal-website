"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { products } from "@/data/products";
import { experiences } from "@/data/experience";

type Msg = { role: "user" | "assistant"; content: string };

// 起始建议问题(走 API)
const STARTERS = ["他做过哪些项目?", "他的技术栈是什么?", "怎么联系他?"];

// 兜底预设问答:答案直接由真实资料生成,API 不可用时本地作答,保证准确且对话框不死。
const FALLBACKS: { q: string; a: string }[] = [
  {
    q: "他做过哪些项目?",
    a: products
      .map((p) => `${p.title}(${p.status})——${p.oneLiner}`)
      .join("\n"),
  },
  {
    q: "他的技术栈是什么?",
    a:
      "主要技术栈:" +
      [...new Set(products.flatMap((p) => p.stack))].join("、") +
      "。",
  },
  {
    q: "他的经历是?",
    a: experiences
      .map((e) => `${e.period} · ${e.role} @ ${e.org}`)
      .join("\n"),
  },
  {
    q: "怎么联系他?",
    a: `邮箱:${profile.email};也可以在 ${profile.socials
      .map((s) => s.label)
      .join("、")} 找到他(见下方「联系」区)。`,
  },
];

export default function HeroChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fellBack, setFellBack] = useState(false); // API 失败后转预设问答
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              (data?.message as string) ||
              "AI 分身暂时不可用,你可以点下面的常见问题,或直接看下方板块。",
          },
        ]);
        setFellBack(true); // 展示预设问答按钮
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "网络好像有点问题,点下面的常见问题看看,或直接浏览下方板块。",
        },
      ]);
      setFellBack(true);
    } finally {
      setLoading(false);
    }
  }

  // 本地预设作答(不走 API)
  function answerLocally(item: { q: string; a: string }) {
    setMessages((m) => [
      ...m,
      { role: "user", content: item.q },
      { role: "assistant", content: item.a },
    ]);
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-white/75 shadow-card backdrop-blur sm:h-[420px]">
      {/* 头部 */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="text-sm font-medium">余苏涵 · AI 分身</span>
        <span className="ml-auto text-xs text-muted">问我关于他的一切</span>
      </div>

      {/* 消息区 */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="对话内容"
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {empty && (
          <p className="text-sm leading-relaxed text-muted">
            我是余苏涵的 AI 分身,基于他的真实资料回答。试着问我:
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-accent px-3.5 py-2 text-sm text-accent-foreground"
                  : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-foreground/[0.04] px-3.5 py-2 text-sm leading-relaxed text-foreground"
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-foreground/[0.04] px-3.5 py-2.5">
              <span className="flex gap-1" aria-label="正在思考">
                <span className="h-1.5 w-1.5 rounded-full bg-muted motion-safe:animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted motion-safe:animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted motion-safe:animate-bounce" />
              </span>
            </div>
          </div>
        )}

        {/* 建议 / 兜底问题 */}
        {!loading && (empty || fellBack) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {(fellBack ? FALLBACKS.map((f) => f.q) : STARTERS).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() =>
                  fellBack
                    ? answerLocally(FALLBACKS.find((f) => f.q === q)!)
                    : send(q)
                }
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-strong transition-colors hover:border-accent hover:text-accent max-sm:min-h-[44px]"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 输入区 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border p-2.5"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          enterKeyHint="send"
          aria-label="向 AI 分身提问"
          placeholder="问问关于余苏涵的经历、项目…"
          className="min-h-[44px] flex-1 rounded-full border border-border bg-background/60 px-4 text-sm outline-none transition-colors focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="发送"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12l16-8-6 16-3-7-7-1z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
