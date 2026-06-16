// 顶部导航占位,后续补全锚点与样式
export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-semibold tracking-tight">余苏涵</span>
        {/* TODO: 导航链接 Products / Writing / About / Contact */}
      </div>
    </nav>
  );
}
