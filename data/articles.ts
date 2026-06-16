// 文章 / 写作数据。后续在此填充条目。
export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO,如 "2026-06-17"
  href?: string;
}

export const articles: Article[] = [];
