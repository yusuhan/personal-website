export interface Experience {
  org: string;
  role: string;
  period: string;
  tag?: string;
  points: string[];
}
export const experiences: Experience[] = [
  {
    org: "阿里巴巴 ·「快乐生蚝」世界模型项目",
    role: "模型评测 & 项目管理（QC Lead）",
    period: "2026.03 – 至今",
    tag: "项目外包 / 数据服务商团队",
    points: [
      "跨多城市管理约 50 人标注团队，统筹视频采集、字幕改写、模型评测三条业务线的质量与交付。",
      "主导 Story-Caption 字幕改写项目质检（6000+ 条英文字幕），沉淀质检规范与离岸团队 onboarding 指南，系统性收敛时间戳越界、运镜误标、格式错误等高频问题。",
      "搭建世界模型评测体系：GSB 成对评测、标注一致性（Cohen's / Fleiss' Kappa）、位置偏置校正、LLM-as-judge 流程，覆盖指令遵循 / 视觉质量 / 音频质量多维度。",
      "构建世界模型评测分类体系（场景、难度、镜头视角、运镜、艺术风格等），并为视频生成评测构造带约束的 prompt 集。",
    ],
  },
  {
    org: "字节跳动 · 内容安全",
    role: "Prompt 工程",
    period: "2025.11 – 2026.03",
    tag: "项目外包",
    points: [
      "将内容审核规则体系转化为 LLM 系统提示词，把人工审核逻辑工程化为可执行、可迭代的 prompt 流程。",
    ],
  },
  {
    org: "成都体育学院",
    role: "体育经济与管理 · 本科",
    period: "2021 – 2025",
    points: [],
  },
];
