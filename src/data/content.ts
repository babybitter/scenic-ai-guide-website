export interface FeatureSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  alt: string
  facts: string[]
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const featureSlides: FeatureSlide[] = [
  {
    id: 'digital-human',
    eyebrow: '多模态服务入口',
    title: '数字人智能问答',
    description: '游客通过文字或语音自然提问，数字人将景区知识、语音播报、口型表情与答案来源组织成连续讲解。',
    image: asset('screenshots/visitor-guide.webp'),
    alt: '数智游踪 AI 数字人导览页面',
    facts: ['语音 / 文本双模态', '景区事实来源可追溯', '讯飞主引擎 + Live2D 兜底'],
  },
  {
    id: 'map',
    eyebrow: '游中空间服务',
    title: '景区地图导览',
    description: '在灵山胜境与拈花湾间切换，融合景点、设施、官方道路轨迹、全景入口和数字人讲解。',
    image: asset('screenshots/map-guide.png'),
    alt: '数智游踪地图导览页面',
    facts: ['灵山胜境 + 拈花湾', '腾讯地图 + Leaflet 兜底', '官方游线与 AI 讲解协同'],
  },
  {
    id: 'route',
    eyebrow: '个性化决策',
    title: '个性化路线推荐',
    description: '根据游览时长、兴趣偏好、亲子和拍照等条件编排官方路线，并在地图节点中提供分段讲解。',
    image: asset('screenshots/placeholder-route.svg'),
    alt: '个性化路线推荐页面占位图',
    facts: ['兴趣 / 时长组合', '官方道路轨迹', '节点讲解与行程保存'],
  },
  {
    id: 'knowledge',
    eyebrow: '知识运营中枢',
    title: '知识库管理',
    description: '从资料上传、SHA-256 去重、索引构建，到检索测试和答案来源定位，形成可维护的景区知识闭环。',
    image: asset('screenshots/knowledge-console.webp'),
    alt: '数智游踪知识库检索测试页面',
    facts: ['DOCX / MD / TXT 可入库', 'PDF / XLSX 安全预览', '上传—索引—问答可验证'],
  },
  {
    id: 'avatar-config',
    eyebrow: '数字人运营配置',
    title: '数字人配置',
    description: '集中维护形象、音色、欢迎语、语速、情绪风格和服务状态，让不同景区拥有可独立配置的讲解角色。',
    image: asset('screenshots/placeholder-avatar.svg'),
    alt: '数字人配置页面占位图',
    facts: ['形象与音色管理', '欢迎语 / 语速 / 情绪', '主备引擎状态可控'],
  },
  {
    id: 'ops',
    eyebrow: '景区运营端',
    title: '运营数据大屏',
    description: '将服务人次、热门问答、景点关注、情感与满意度汇聚成景区可行动的运营线索。',
    image: asset('screenshots/admin-dashboard.webp'),
    alt: '数智游踪景区运营数据大屏',
    facts: ['会话与反馈回溯', '多维运营指标', '从游客体验反哺内容维护'],
  },
  {
    id: 'quality',
    eyebrow: '服务质量闭环',
    title: '会话与反馈分析',
    description: '查看会话详情、低满意反馈、消息标注与知识补充草稿，把游客遇到的问题转化为运营改进任务。',
    image: asset('screenshots/placeholder-feedback.svg'),
    alt: '会话与反馈分析页面占位图',
    facts: ['低满意会话筛选', '反馈聚类与消息标注', '知识修正草稿'],
  },
]

export const innovationItems = [
  {
    number: '01',
    title: '一套业务，覆盖多端',
    subtitle: 'Full-stack multi-platform delivery',
    body: '以 Vue 3 游客/管理 Web、Node.js 同源服务与 Electron 桌面运行时构成当前交付底座；移动游客端按 Android、iOS、HarmonyOS、微信小程序、H5 共用领域模型继续演进。',
    meta: ['Web', 'Windows', 'Linux', 'macOS', '五端规划'],
  },
  {
    number: '02',
    title: '数字人双引擎连续服务',
    subtitle: 'iFlytek + Live2D resilience',
    body: '优先使用讯飞交互式数字人承载 WebRTC、云端口型与音色表现；外部服务或网络不可用时，切换至本地 Live2D + TTS/字幕链路，避免导览能力随单一供应商中断。',
    meta: ['实时数字人', '本地轻量形象', '字幕与文本降级'],
  },
  {
    number: '03',
    title: '地图双底图韧性导览',
    subtitle: 'Tencent Map + Leaflet fallback',
    body: '联网环境优先调用腾讯地图承载标准底图与定位；Key 缺失、SDK 加载失败或处于弱网时，Leaflet 无缝接管本地手绘地图、点位与路线，保证核心导览可用。',
    meta: ['在线标准底图', '本地手绘地图', '坐标与旋转校正'],
  },
  {
    number: '04',
    title: '可信问答与运营闭环',
    subtitle: 'Grounded RAG service loop',
    body: '景区资料进入本地知识库，问答结果保留来源；游客会话和满意度反馈再回流到运营分析，帮助管理者定位热点、内容缺口与服务问题。',
    meta: ['来源可追溯', '内容可维护', '反馈可分析'],
  },
]

export const roadmapStages = [
  {
    phase: '初期',
    date: '2026.07.14 — 07.18',
    title: 'MVP 最小可行版本',
    progress: '搭建 Vue 3 游客/管理双端与 Node.js 服务，完成 SQLite、景区知识库、文字/语音问答、讯飞数字人、路线推荐和基础运营模块。',
    problem: '早期内存数据难以支持完整业务闭环；浏览器自动播放策略会阻断数字人声音；路线仅凭兴趣时长选择，边界不稳定。',
    decision: '迁移至 SQLite 持久化，引入显式音频解锁与演示降级，并将路线选择逻辑改造成可测试的确定性服务。',
  },
  {
    phase: '中期',
    date: '2026.08.06 — 08.11',
    title: '架构重构与能力融合',
    progress: '将地图图块、真实道路轨迹、多景区切换、全景入口和数字人讲解统一到地图导览运行时；补充 Live2D、音频适配器与知识上传链路。',
    problem: '外部地图/全景资源具有网络和授权不确定性；浏览器数字人 SDK 无法保证全平台表现；大型页面状态互相牵连。',
    decision: '建立可审计的本地景区数据快照，采用地图与数字人的双引擎兜底策略，并通过领域服务与适配器隔离外部能力。',
  },
  {
    phase: '后期',
    date: '2026.08.12 — 至今',
    title: '细节打磨与交付收敛',
    progress: '完成同源生产部署、跨平台 Electron 打包、暗色/多语言、知识文档预览、响应式地图与 Linux 便携包验证，持续收敛比赛演示动线。',
    problem: '桌面包需要携带可复现的 Node/SQLite 运行环境；弱网、凭证缺失和多操作系统差异容易破坏现场演示。',
    decision: '以不可变发布、健康检查、离线 Demo 与自动化包体校验构建交付门禁；移动五端采用统一适配层分阶段验证。',
  },
]

export const feedbackScenarios = [
  {
    title: '路线绕远或不好走',
    body: '“我带着老人和孩子，希望少爬坡、能中途休息，但推荐路线绕得有点远。”',
    tag: '路线体验',
  },
  {
    title: '弱网时讲解中断',
    body: '“山里信号不稳定，地图还能看，但数字人播报断了，希望自动切到离线文字讲解。”',
    tag: '弱网可用',
  },
  {
    title: '户外看不清字幕',
    body: '“太阳下屏幕反光，讲解字幕有点小，希望一键放大并保持高对比。”',
    tag: '无障碍',
  },
  {
    title: '景点信息需更新',
    body: '“现场活动时间和导览里的信息不一致，希望景区确认后尽快更新。”',
    tag: '内容准确',
  },
]

export const domains = [
  ['shuzhiyouzong.cn', '品牌主站', '官方介绍、创新点、路线图与产品入口'],
  ['app.shuzhiyouzong.cn', '游客 / 演示端', '面向评委和游客的在线体验'],
  ['admin.shuzhiyouzong.cn', '景区运营端', '知识、数字人、会话与运营管理'],
  ['docs.shuzhiyouzong.cn', '文档站', '介绍、安装部署、操作指南、技术选型'],
  ['download.shuzhiyouzong.cn', '下载中心', '由自有 Linux 服务器分发安装包'],
  ['api.shuzhiyouzong.cn', '统一 API', '业务接口、流式问答与健康检查'],
  ['status.shuzhiyouzong.cn', '服务状态', '后续用于状态公告与可用性记录'],
]
