"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const links = [
  { label: "作品", href: "#products", id: "products" },
  { label: "文章", href: "#writing", id: "writing" },
  { label: "经历", href: "#about", id: "about" },
  { label: "联系", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 滚动高亮当前所在区块(纯装饰:只切换颜色,无位移,reduced-motion 无需特殊处理)
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // 取视口中部一条窄带做判定,避免多区块同时高亮
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const linkClass = (id: string, base: string) =>
    `${base} transition-colors ${
      active === id
        ? "text-foreground font-medium"
        : "text-muted hover:text-foreground"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/80 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#" className="font-semibold tracking-tight">
          {profile.name}
        </a>

        {/* 桌面端链接 */}
        <ul className="hidden gap-8 text-sm sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.id ? "true" : undefined}
                className={linkClass(l.id, "")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 移动端汉堡 */}
        <button
          type="button"
          aria-label="菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center sm:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* 移动端展开菜单 */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 pb-4 pt-2 sm:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.id ? "true" : undefined}
                className={linkClass(l.id, "block py-2")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
