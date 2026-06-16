// 作品 / 项目数据。后续在此填充条目。
export interface Product {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  image?: string;
}

export const products: Product[] = [];
