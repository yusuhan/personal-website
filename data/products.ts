// 作品 / 项目数据
export interface ProductLink {
  label: string;
  url: string;
}

export interface Product {
  title: string;
  oneLiner: string;
  stack: string[];
  links: ProductLink[];
  image?: string; // public/images 下的路径,如 "/images/foo.png"
}

export const products: Product[] = [
  {
    title: "RAG 评测流水线",
    oneLiner: "把检索增强问答的离线评测做成可复现的一键流程,覆盖召回到生成全链路。",
    stack: ["Python", "LlamaIndex", "Ragas", "FastAPI"],
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Demo", url: "https://example.com/" },
    ],
  },
  {
    title: "Prompt 实验平台",
    oneLiner: "面向团队的 Prompt 版本管理与 A/B 评测,支持多模型对比与回归。",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    links: [{ label: "GitHub", url: "https://github.com/" }],
  },
];
