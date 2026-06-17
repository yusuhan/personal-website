// 个人资料数据
export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  tagline: string;
  email: string;
  resumeUrl: string; // 简历 PDF 路径,放在 public/ 下
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "余苏涵",
  tagline: "专注 LLM 应用层：从评测、Prompt 到 RAG 与部署的全链路交付",
  email: "suhanyu143@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "知乎", url: "https://zhihu.com/" },
    { label: "X", url: "https://x.com/" },
  ],
};
