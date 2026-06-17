export interface ProductLink {
  label: string;
  url: string;
}
export interface Product {
  title: string;
  oneLiner: string;
  status: "已上线" | "进行中";
  highlights: string[];
  stack: string[];
  links: ProductLink[];
  image?: string;
}
export const products: Product[] = [
  {
    title: "Football Gear AI Assistant",
    oneLiner:
      "面向商家的 AI 客服 Agent——通过渠道适配层接入电商与 CRM 工作流，而非一个孤立的聊天机器人。",
    status: "已上线",
    highlights: [
      "Agent + Tool Calling 架构：商品检索、库存查询、尺码推荐三类工具；默认本地规则路由保证演示稳定，可选接入 OpenAI SDK。",
      "渠道适配层：统一入口接入淘宝 / 1688 / 企微 / 独立站，按真实 B2B 集成方式设计，而非 demo 级对话框。",
      "人工接管闭环：投诉、退款、订单异常自动建工单转人工；工单期间业务消息进队列、助手元问题仍由 AI 回答，处理完成后恢复全自动服务。",
      "生产化细节：会话持久化、工具调用与 Agent 事件落库、admin/support 角色权限、会话令牌与操作审计日志。",
    ],
    stack: [
      "FastAPI",
      "Pydantic",
      "Tool Calling",
      "OpenAI SDK",
      "SQLite / PostgreSQL",
      "ChromaDB",
      "Next.js",
      "Docker Compose",
      "Render / Vercel",
    ],
    links: [
      { label: "Live Demo", url: "https://football-gear-ai-assistant.vercel.app/" },
      { label: "GitHub", url: "https://github.com/yusuhan/football-gear-ai-assistant" },
    ],
  },
  {
    title: "FootyChat",
    oneLiner:
      "基于真实英超数据的问答助手——有据才答、不编造，覆盖不到的如实说明。",
    status: "进行中",
    highlights: [
      "接地式回答：答案绑定真实数据源，超出覆盖范围时如实说明，而非生成看似可信的幻觉内容。",
      "stub-first 架构：先用桩数据跑通前后端链路与交互，再逐步接入真实能力，压缩早期联调成本。",
      "FastAPI + Next.js 前后端分离，独立端口设计避免与既有项目冲突。",
    ],
    stack: ["FastAPI", "Next.js", "RAG"],
    links: [],
    image: "/images/footychat-hero.png",
  },
];
