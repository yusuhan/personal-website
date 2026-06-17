export interface SocialLink {
  label: string;
  url: string;
}
export const profile = {
  name: "余苏涵",
  tagline: "专注 LLM 应用层：从评测、Prompt 到 RAG 与部署的全链路交付",
  subTagline: "AI 训练 / 评测出身，把大模型能力做成能跑在生产环境里的产品。",
  email: "yusuhan2003@outlook.com",
  socials: [
    { label: "GitHub", url: "https://github.com/yusuhan" },
    { label: "人人都是产品经理", url: "https://www.woshipm.com/u/1639312" },
  ] as SocialLink[],
  resumeUrl: null as string | null,
};
