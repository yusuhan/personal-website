export interface Article {
  title: string;
  platform: string;
  summary: string;
  url: string;
  date: string;
}
export const articles: Article[] = [
  {
    title: "Claude Code 半年深度使用心得：从简单聊天到系统化工程治理",
    platform: "人人都是产品经理",
    summary:
      "半年深度使用 Claude Code 的复盘——从把它当聊天工具，到建立系统化的工程治理流程。",
    url: "https://www.woshipm.com/ai/6354184.html",
    date: "2026-03-16",
  },
  {
    title: "浏览器正在变成 AI Agent 的工作台，产品经理该重新设计什么？",
    platform: "人人都是产品经理",
    summary:
      "当浏览器成为 Agent 的执行环境，产品交互该如何重新设计——Agent 时代的产品视角。",
    url: "https://www.woshipm.com/share/6392725.html",
    date: "2026-05-11",
  },
  {
    title: "前 Anthropic 研究员：这 10 个 Prompt，能让 Claude 的输出质量提升 40%",
    platform: "人人都是产品经理",
    summary: "拆解十个可复用的 Prompt 技巧，以及它们为什么能稳定提升大模型输出质量。",
    url: "https://www.woshipm.com/ai/6380032.html",
    date: "2026-04-20",
  },
  {
    title: "AI 圈最热的词「世界模型」，产品人需要懂到什么程度？",
    platform: "人人都是产品经理",
    summary: "给产品人讲清楚世界模型是什么、边界在哪、需要理解到什么颗粒度才够用。",
    url: "https://www.woshipm.com/ai/6387985.html",
    date: "2026-05-04",
  },
  {
    title: "Karpathy 最新分享：我用 LLM 管理个人知识库，40 万字全自动维护",
    platform: "人人都是产品经理",
    summary: "解读 Karpathy 用 LLM 自动维护个人知识库的工作流，及其对知识管理的启发。",
    url: "https://www.woshipm.com/ai/6371245.html",
    date: "2026-04-07",
  },
  {
    title: "你用 AI 写的那篇文章，你还信吗？",
    platform: "人人都是产品经理",
    summary: "关于 AI 生成内容可信度的反思——什么时候该信、什么时候该警惕。",
    url: "https://www.woshipm.com/ai/6365552.html",
    date: "2026-03-30",
  },
];
