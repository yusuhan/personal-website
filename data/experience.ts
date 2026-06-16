// 经历 / 时间线数据
export interface Experience {
  org: string;
  role: string;
  period: string; // 如 "2024.07 – 至今"
  points: string[];
}

export const experiences: Experience[] = [
  {
    org: "某 AI 创业公司",
    role: "LLM 应用工程师",
    period: "2024.07 – 至今",
    points: [
      "搭建 RAG 评测体系,把主观判断变成可量化、可回归的离线指标。",
      "负责 Prompt 工程与多模型对比,推动核心问答准确率持续提升。",
      "主导从原型到上线的全链路交付,包含部署、监控与成本优化。",
    ],
  },
  {
    org: "某互联网公司",
    role: "后端开发工程师",
    period: "2022.06 – 2024.06",
    points: [
      "负责核心业务接口的设计与性能优化,支撑日均千万级请求。",
      "推动服务化改造,沉淀团队可复用的工程规范。",
    ],
  },
];
