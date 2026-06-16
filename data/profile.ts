// 个人资料数据。后续在此填充。
export interface Profile {
  name: string;
  tagline: string;
  bio?: string;
  email?: string;
  links?: { label: string; href: string }[];
}

export const profile: Profile = {
  name: "苏涵宇",
  tagline: "专注 LLM 应用层:从评测、Prompt 到 RAG 与部署的全链路交付",
};
