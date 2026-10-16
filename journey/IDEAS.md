# Working with AI

### 背景

- 我需要在部门周会上分享在工作生活中和 AI 打交道的经验，要进行一些头脑风暴
- 程序员，Codex app 重度使用者，日常已经用 Codex 完全覆盖工作内容
- 部门是工程/研发方向，同事不少人已经是重度用户
- 希望有干货但不要太权威，所有 practice 都还没有最佳实践
- work with 不仅限于上班，也包括生活方方面面
- 风格：混搭（故事+干货+讨论），结合 meme，反 systematic，最核心要点：欢乐、有趣、有意思

### Slides 结构（脑暴扩展版）

---

#### 0. Title: Working with AI

- 副标题：不是 best practice，是 real practice
- 这个 slides 本身就是用 AI 做的（meta！）

---

#### 1. knowledge.jpeg — LLM 是知识的有损压缩

- 核心比喻：人类知识 = RAW，Wikipedia = PNG，LLM = JPEG
- 模型越小 = 压缩率越高 = artifact 越多
- hallucination = compression artifact（JPEG 马赛克）
- 视觉呈现：展示同一张图不同压缩等级，最糊的那张标注 "7B model"
- 延伸：所以不要问 AI "对不对"，要问 "在哪个压缩等级上是对的"
- 搞笑点：`knowledge.jpeg` 文件名本身就是一个很好的 meme

---

#### 2. 从 Google 到 LLM — query 到 intent 的认知迁移

- 以前：精心构建 query，"python sort list reverse" → 得到一堆链接 → 自己筛选
- 现在：表达意图，"我有一个嵌套的字典列表，想按第二层的 created_at 字段降序排列" → 直接得到结果
- 类比：意图是一个高维向量，query 是它在搜索引擎语法上的投影（降维打击反过来了）
- 个人数据：Google 使用频率 ↓95%，剩下 5% 是因为惯性——忘了切换，直接在地址栏打了
- 回报也变了：信息 → 结果。以前给你 10 blue links 让你自己拼，现在直接给答案
- 搞笑点：地址栏打字的肌肉记忆比大脑快

---

#### 3. AI 的超能力：翻译

- "翻译" 的广义定义——AI 最擅长的就是在不同表征之间转换
  - 自然语言 ↔ 自然语言（中 ↔ 英 ↔ 日 ↔ ...）
  - 编程语言 ↔ 编程语言（Python ↔ Rust ↔ Go ↔ ...）
  - 意图 → 实现（"我想要一个..." → 代码）
  - 格式 ↔ 格式（JSON ↔ YAML ↔ CSV ↔ ...）
  - 抽象层级之间：需求 → 设计 → 实现 → 测试
- 本质：LLM 就是一个万能的 codec
- 搞笑点：所以 AI 取代的第一批人是翻译，不是因为翻译简单，而是因为这就是 AI 的本体

---

#### 4. Tab 的消亡 — 从补全到 Agent

- 时间线：
  - 2023 新年：祝大家一路 tab 到底！
  - 2023 年中：等等，我好像不怎么按 tab 了……
  - 2024：tab 键可以拆了（不是）
- Copilot 时代：tab tab tab，人是驾驶员，AI 是副驾
- Agent 时代：你描述目的地，AI 开车，你看风景（偶尔看一眼方向对不对）
- 隐喻：从"逐行确认"到"审查结果"，review 的粒度在变粗，信任在增加
- 搞笑点：键盘厂商最大的危机不是机械轴，是 tab 键没人按了

---

#### 5. AI 编程的自动驾驶等级

- L0: 人写代码，人 review（石器时代）
- L1: AI 补全，人写主体，人 review（Copilot tab 时代）
- L2: AI 写代码，人 review（当前主流，Claude Code / Cursor）
- L3: AI 写代码，AI + 人 review（正在到来）
- L4: AI 写代码，AI review，人审批（近未来）
- L5: AI 全自动，人喝咖啡（遥远的梦？）
- 现实：大部分人卡在 L1→L2 的心理障碍上。技术已经到了，信任还没到
- 瓶颈转移：写代码不再是瓶颈，review 才是。以前嫌写得慢，现在嫌看不过来
- 搞笑点：L5 就是失业（不是）

---

#### 6. Workflow: research → plan → implement → review

- 不是一个线性流程，是一个 loop
- research：让 AI 帮你理解背景、读代码、读文档
- plan：跟 AI 对齐方案，而不是让它直接动手（重要！）
- implement：AI 写，你引导
- review：你审，AI 也审
- 关键心法：在 plan 阶段多花时间，implement 阶段少返工
- 现实：大部分人直接跳到 implement，然后在 review 阶段崩溃
- 类比：跟 AI 协作就像跟一个特别能干但没有 context 的新人合作——你得先 onboard 它

---

#### 7. design.md — 用文档 distill 一个项目

- 问题：大型项目，AI 读不完所有代码，context window 不够
- 方案：写 design.md，把项目的核心架构、设计决策、约定俗成浓缩成文档
- 效果：相当于给 AI 一个"项目简报"，它能更精准地工作
- 大型项目可以多层：顶层 design.md → 模块级 design.md → 组件级
- 本质：这就是给 AI 做的语义索引（semantic index for AI）
- 额外收益：写这个文档的过程本身就帮你理清了思路
- DeepWiki：快速理解一个开源项目的架构（别人帮你做了 distill）
- Context 管理：Codex GPT 5.4 依赖自动压缩即可，context 太大反而注意力涣散——跟人一样

---

#### 8. AI 味 vs 人味 — 平均脸理论

- "AI 味"到底是什么？圆角、渐变、紫色、emoji 满天飞、"Let me help you with that"
- 核心观点：AI 味 = 人味的平均值。就像"平均脸"——把所有人脸叠加，得到一张最"好看"但最没特色的脸
- AI 产出的东西不丑，但无聊——因为它是所有训练数据的中位数
- 去 AI 味的方法：给它具体的、有个性的约束（品牌、风格、反例）
- 搞笑 idea：做一个"AI 味浓度测试页面"——集齐所有 AI 美学特征
- 反转：所以你觉得 AI 做的东西"看起来都一样"，其实是因为人类的品味在统计上就是趋同的

---

#### 9. Token 中文名事件

- 背景：官方要给 AI 术语定中文名
- 吐槽：这翻译不太行啊
- 我的建议——对标三大 AI 顶刊：
  - token → 新智元
  - logits → 量子位
  - model → 机器之心
- （这是一个圈内梗，三个都是国内 AI 媒体的名字）
- 纯搞笑，调节气氛

---

#### 10. Claude 与龙虾 🦞

- Claude 的名字梗：Claude → Claw'd → 有爪子的 → 🦞
- 社区衍生：ClawdBot, OpenClaw
- Fun fact：Anthropic 官方默默接受了这个 meme
- 龙虾 emoji 已经成了 Claude 用户的暗号
- 搞笑：我还没试过问 Claude 关于龙虾的事（现场试？）

---

#### 11. Coding Agent = General-Purpose Agent

- 认知升级：不要把 Claude Code / Cursor 只当"写代码的工具"
- Coding agent 有文件系统访问、命令行、网络——这就是一个通用 agent
- 案例：用 Claude Code 准备会议材料（就是这个 slides！）
- 案例：用 Claude Code 分析数据、生成报告
- 案例：用 Claude Code 调试生产问题
- 本质：code 是 agent 与世界交互的最强 interface
- 搞笑点：你以为你在用 IDE，其实你在用操作系统

---

#### 12. Skill Issue

- 当 AI 写出 bug 的时候，是 AI 的 skill issue 还是你的 prompt issue？
- 通常是你的（残酷的事实）
- "Garbage in, garbage out" 的 AI 版本
- 但也有时候真的是 AI 的 skill issue（承认这一点也很重要）
- 区分方法：换一种方式说，如果结果变好了，那就是你的 skill issue
- 搞笑：每次 AI 写出 bug，先照照镜子

---

#### 13. MCP vs CLI — 工具选择的哲学

- MCP (Model Context Protocol)：标准化的 AI-工具连接方式
- CLI：古老但强大，AI 通过命令行操作一切
- 现实：CLI 更灵活，MCP 更规范
- 类比：MCP 像 REST API，CLI 像 SSH 进去直接搞
- 目前个人倾向：CLI > MCP，因为 CLI 更 general（但 MCP 在追赶）

---

#### 14. 生活中的 AI — Debunk Rumors

- 不只是工作，生活中也离不开了
- 辟谣：家人群里的"震惊！"文章，直接丢给 AI 分析
- 育儿：该不该信某个育儿建议？
- 烹饪：冰箱里这些材料能做什么？
- 搞笑：AI 成了我的"家庭辟谣小能手"

---

#### 15. You're Absolutely Right 及其他 Memes

- AI 的 sycophancy 问题："You're absolutely right"
- 收集一些经典 meme：
  - "I apologize for the confusion"
  - "As an AI language model..."
  - "Let me help you with that"
  - 越来越长的回复
  - AI 在写了一屏代码之后说 "Hope this helps!"
- 搞笑点：这些就像 NPC 对话，你已经能预测下一句了

---

#### 16. 彩蛋：Emoji 猜电影

- 互动环节！用 emoji 表达电影，让大家猜
- 例子：🧙‍♂️💍🌋 = 指环王
- 例子：🦁👑 = 狮子王
- 例子：🚢❄️🎻💔 = 泰坦尼克号
- 例子：👨‍🚀🌍🕳️📚 = 星际穿越
- 可以现场让 AI 生成更多，做互动

---

#### 17. Meta 彩蛋：这个 Slides 本身

- 开头或结尾揭示：这整个 slides 就是用 Claude Code 做的
- 包括内容策划、视觉设计、代码实现
- 就是对 "Coding Agent = General-Purpose Agent" 的最好证明
- 搞笑：所以如果 slides 有 bug，那也是 AI 味的一部分
