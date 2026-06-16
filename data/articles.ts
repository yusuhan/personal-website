// 文章 / 写作数据
export interface Article {
  title: string;
  platform: string; // 平台标识,如 "掘金"、"知乎"、"Medium"
  summary: string;
  url: string;
  date: string; // ISO,如 "2026-05-20"
}

export const articles: Article[] = [
  {
    title: "从零搭一条可复现的 RAG 评测流水线",
    platform: "知乎",
    summary:
      "为什么 RAG 的效果难以横向比较,以及如何用固定数据集 + 量化指标把它变成工程问题。",
    url: "https://zhuanlan.zhihu.com/",
    date: "2026-05-20",
  },
  {
    title: "Prompt 也需要版本管理:一次团队协作的复盘",
    platform: "掘金",
    summary:
      "当 Prompt 散落在代码和聊天记录里,迭代就失控了。记录我们如何把它纳入工程流程。",
    url: "https://juejin.cn/",
    date: "2026-04-08",
  },
];
