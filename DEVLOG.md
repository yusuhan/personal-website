# 开发日志(DEVLOG)· 个人网站 personal-website

> 本文件记录开发过程中解决问题的真实过程与关键判断,用于后续复盘、以及整理成简历/面试/作品集材料。
> 重点保存"当时的现场",而非仅记结论。

---

## 1. headless 截图整页空白:dev 服务器下 React 不水合,motion 元素全停在 opacity:0

- **日期 / 阶段**:2026-06-17 · 第 3 层视觉打磨中,用真实数据覆盖 demo 后,想用 headless Chrome 给用户截图核对成果
- **类型**:问题排查

**当时的现场**
用真实数据替换占位内容后,想截一张整站图给用户确认。先用最直接的方式:`Google Chrome --headless=new --screenshot --window-size=1280,2400`。结果截出来的图**几乎全白**——只有顶部 Nav("余苏涵 作品 文章 经历 联系")和底部 Footer("© 2026 余苏涵")可见,中间整个 Hero、作品、文章、经历、联系**全是空白**,一个字都没有。

第一反应以为是 Hero 的进场动画(`animate` 从 `opacity:0` 起步)还没跑完就截图了,而且固定窗口高度只截到 Hero 一屏。于是改用 CDP(Chrome DevTools Protocol,Node 24 自带全局 WebSocket 驱动)做整页截图,并在截图前 `setTimeout` 等 2.5s、再逐段 `scrollTo` 到底触发 `whileInView`、回顶再 `Page.captureScreenshot({captureBeyondViewport:true})`。

诡异的是:**改完之后两次截图的文件大小字节完全一致(都是 34325 bytes)**,内容还是全白。滚动、等待都对结果毫无影响——这说明根本不是"动画没跑完"或"没滚到",而是页面渲染压根是静止的、确定性的。

**排查过程 / 当时怎么想的**
字节完全一致这点让我警觉:如果是动画时序问题,两次截图不可能一模一样。于是怀疑是 JS 根本没执行。写了几个 CDP 诊断脚本逐步缩小范围:

1. 读 Hero `<h1>`:`hasH1:true, h1text:"余苏涵", opacity:"0"` ——元素和文本都在,但等了 6 秒 opacity 还是 0。脚本数 34 个,React DevTools 的 `console.info` 也打印了,说明 React 在加载。
2. 抓控制台:无任何 JS 异常,只有 `WebSocket connection to 'ws://127.0.0.1:3000/_next/webpack-hmr...' failed` 反复刷屏(HMR 连接失败)。
3. 怀疑 headless 新标签页 `visibilityState=hidden` 导致 motion 的 rAF 动画被浏览器暂停 → 查到是 `visible`,排除。`prefers-reduced-motion` 也是 `false`,排除。
4. **决定性一步**:读 `<h1>` 的 inline style,仍是 SSR 输出的 `opacity:0;transform:translateY(16px)`;再 `window.scrollTo(0,400)` 后读 `<header>` 的 className——Nav 的 `scrolled` state 一变就会加 `bg-background/80` 背景类,**结果滚动后 class 纹丝不动,还是 `bg-transparent`**。事件没生效 = React 没水合。

到这里就锁定了:不是动画问题,是**整个客户端就没水合**,所以所有 motion/Reveal 元素都卡在 SSR 渲染出的 `opacity:0` 初始态,Nav 的滚动监听也没挂上。而 Footer/Nav 文本因为不是 motion 元素,SSR 出来就可见,所以只有它们显示——完美解释了"只有头尾可见"的画面。

**根因**
headless Chrome + Next dev 服务器组合下,客户端 React **没有完成水合**。最可疑的诱因是 dev 模式的 HMR websocket 在 headless 环境连接失败(`_next/webpack-hmr` 反复报错),dev 客户端运行时未把页面跑到可交互状态。一旦不水合,`motion` 组件 SSR 时写进 DOM 的 `style="opacity:0;..."` 初始态就永远不会被动画改写 → 视觉全白。真人浏览器打开同一个 dev 地址是正常的,所以这是 headless + dev 特有的组合问题,不是站点本身的 bug。

**解法**
不再跟 dev 服务器较劲,改用**生产构建**截图:`next build && next start -p 3100`,再用同一套 CDP 脚本截图。结果文件从 34KB 跳到 502KB,整页内容全部正常渲染——Hero 名字+双标语+CTA、作品双卡(含 FootyChat 缩略图)、6 篇文章、经历时间线、联系方式,浅色主题靛蓝强调色一切到位。生产版水合快且确定,顺带**验证了项目可正常 build & 部署**(对接下来上 Vercel 是有用的一次预演)。

**学到了什么 / 思路转变**
- "截图全白"先别急着归因到动画/CSS——**字节完全一致**是个强信号,意味着渲染是静止确定的,八成是 JS 没跑,而不是时序。
- 验证"页面到底活没活"的最快手段不是看像素,是**戳一个只有水合后才会变的状态**(这里是 Nav 滚动加背景类),比反复加 sleep/scroll 高效得多。
- **dev 服务器不等于真实可交付产物**。要验证"用户/爬虫/截图工具看到什么",应该用生产构建,而不是 dev——dev 的 HMR、按需编译等机制会带来失真。
- 一个隐患被顺带暴露:**站点内容依赖 JS 水合才可见**(Reveal/Hero 初始 `opacity:0`)。SSR 的 HTML 里有文字(SEO/无 JS 可读),但视觉呈现强依赖 JS。后续打磨要加 `prefers-reduced-motion` 兜底,并考虑给首屏一个无 JS 也能看见的 fallback,避免"JS 一旦没跑用户就看到白屏"。

---

## 2. AI 分身的 7B 模型把联系邮箱编造了,降温反而退化成乱码,最终升级到 14B

- **日期 / 阶段**:2026-06-18 · Hero 的"可对话 AI 分身"功能刚接通真实 LLM(SiliconFlow + Qwen),填好 key 做真实对话测试
- **类型**:问题排查 / 思路转变

**当时的现场**
对话框接通后(HTTP 200,能基于资料作答),逐项测试时发现回答虽然走的是注入的真实资料,但 **Qwen2.5-7B-Instruct 在"逐字复制"这件事上完全不可靠**。三个资料内问题的实际返回:

- 问"项目":把"快乐生蚝"写成「112生蚝」、"约 50 人"写成「5550人人」,还**漏掉了 Football Gear AI Assistant、FootyChat 两个真实作品**,拿经历(阿里/字节)充数。
- 问"技术栈":「Tool Calling」被写成「Toolbelt」,而且句子被截断。
- 问"联系方式":**邮箱直接编造**——真实是 `yusuhan2003@outlook.com`,模型吐出 `yusuhan222333@wouchang.com`(域名都换了),人人 URL 的 id 也改错。

这是最不能接受的:护栏写了"绝不编造",资料里也有正确邮箱原文,模型却把它复制错了。

**排查过程 / 当时怎么想的**
第一反应是"prompt 不够硬 + 温度太高",于是做两件免费的事:温度 0.4 → 0.2,并在 system prompt 加强约束("邮箱/网址/数字必须逐字照抄、不得改动""项目与经历不要混淆")。

重测结果**更糟**:7B 在低温下**退化成重复循环**,邮箱直接变成
`yusuhan2222D3D222D2D2222D2D2D2D2D…`(一长串 D2D2D2 乱码)、`httpshttps://…`、项目答案变成 `1user他参与过哪些…` 这种碎片。这时才意识到方向错了——不是 prompt 的问题,是模型容量的问题。小模型在"中英数字混排 + 精确复制"任务上本就不稳,低温还会触发 degeneration(重复退化),越压越坏。

**根因**
Qwen2.5-7B 的能力不足以可靠地逐字复制一个邮箱/URL/数字。它不是在"查资料",而是在"凭印象重写",于是把 `2003@outlook` 改成 `222333@wouchang`。这种事 prompt 和温度都救不了,降温甚至适得其反。

**解法**
换模型:默认从 `Qwen/Qwen2.5-7B-Instruct` 升到 `Qwen/Qwen2.5-14B-Instruct`(保留 env `SILICONFLOW_MODEL` 可覆盖),温度回到 0.3,并加 `frequency_penalty: 0.3` 抑制重复;保留强化后的 prompt(逐字照抄 + 项目/经历分区)。14B 重测:邮箱 `yusuhan2003@outlook.com` 逐字正确、两个真实作品都列出、技术栈无误,护栏(资料外说"没有提到"、无关问题礼貌拒绝)也都干净。每次对话约 1K token,成本仍是 ¥0.001 量级,配合限流可控。

**学到了什么 / 思路转变**
- **"便宜一档"的模型选型要先验准确性,别只看价格。** 对"代我对外发声"这类功能,把联系方式说错的代价远高于省下的几厘钱——准确性是这个功能的命门。
- **遇到模型乱码先判断是 prompt 问题还是容量问题。** 一个反直觉的信号:**降低温度后反而退化成重复乱码**,说明模型已在能力边界挣扎,这类问题加约束/降温都是南辕北辙,该换更大的模型。
- 呼应上一个项目的老教训(小模型做结构化抽取不可靠):**凡是要求模型"精确搬运"既有事实(邮箱、URL、数字、专有名词)的地方,要么用够强的模型,要么干脆用确定性代码兜底**——本项目的兜底预设问答正是直接用真实数据本地生成,反而最准。
