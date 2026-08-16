import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Award, GraduationCap, HandHeart, Landmark, Mail, Users } from 'lucide-react'

interface TocItem { id: string; label: string }

interface DocPage {
  slug: string
  title: string
  kicker: string
  toc: TocItem[]
  content: ReactNode
}

const pages: DocPage[] = [
  {
    slug: '', title: '项目介绍', kicker: '理解产品与赛题',
    toc: [
      { id: 'what', label: '数智游踪是什么' }, { id: 'roles', label: '适用角色与场景' },
      { id: 'loop', label: '核心服务闭环' }, { id: 'data', label: '已接入数据范围' }, { id: 'limits', label: '能力边界' },
    ],
    content: <>
      <h1>数智游踪</h1>
      <p className="lead">面向景区游客与运营管理者的 AI 数字人智慧导览系统，让一次游客提问真正进入景区服务、内容维护与运营分析闭环。</p>
      <h2 id="what">数智游踪是什么</h2>
      <p>数智游踪是第十五届“中国软件杯”A5「景区导览服务 AI 数字人」赛题作品。系统将景区知识问答、语音交互、数字人讲解、地图导览、游线推荐、游客反馈和运营分析连接为一条完整业务链路。</p>
      <div className="docs-callout"><b>产品定位</b><p>它不是“数字人套壳问答”，而是连接可信知识、沉浸讲解、地图路线与景区运营的智慧导览平台。</p></div>
      <h2 id="roles">适用角色与场景</h2>
      <h3>景区访客</h3><p>通过文字或语音询问景点历史、服务设施与游览建议；查看答案来源；由数字人播报讲解；在灵山胜境与拈花湾地图中浏览景点、官方游线和全景入口；按时长、兴趣、同行人群与体力情况获取个性化路线。</p>
      <h3>景区运营人员</h3><p>维护文档、景点与固定问答，配置数字人形象和音色，查看服务量、满意度、热门问题和景点关注，回溯低满意会话并形成知识补充草稿。</p>
      <h3>部署与评审人员</h3><p>可使用网页端，或通过 Windows、Linux、macOS 桌面客户端运行；云端服务不可用时，系统仍保留本地知识、手绘地图、Live2D、字幕与文本等降级路径。</p>
      <h2 id="loop">核心服务闭环</h2>
      <ol><li>游客通过文字或语音描述所在景点、兴趣与时间。</li><li>服务端从本地景区知识检索事实，生成带来源和耗时标签的回答。</li><li>语音与数字人负责呈现，地图和路线继续承接游中服务。</li><li>评分、评论和会话回流管理端，形成内容修正与运营建议。</li></ol>
      <h2 id="data">已接入数据范围</h2>
      <div className="stat-table"><div><b>灵山胜境</b><span>218 个迁移点位</span><span>6 条游客可见官方游线</span><span>19 个全景记录</span></div><div><b>拈花湾</b><span>277 个迁移点位</span><span>7 条官方游线</span><span>15 个全景记录</span></div></div>
      <p>路线折线保留来源道路轨迹，不以景点间直线冒充步行导航；点位、路线、图块与媒体迁移均保留机器可读审计结果。</p>
      <h2 id="limits">能力边界</h2>
      <div className="docs-callout warning"><b>能力边界说明</b><p>推荐游线不是实时导航，不含动态道路、施工绕行与无障碍通行承诺。DOCX、TXT、Markdown 可进入知识索引；PDF、XLSX 已支持上传预览，但尚未进入 RAG 索引。移动五端列入扩展范围。</p></div>
    </>,
  },
  {
    slug: 'install', title: '安装与部署指南', kicker: '开发、生产与桌面环境',
    toc: [
      { id: 'requirements', label: '环境要求' }, { id: 'development', label: '本地开发' },
      { id: 'windows', label: 'Windows 一键安装' }, { id: 'production', label: '生产部署' },
      { id: 'desktop', label: '桌面客户端' }, { id: 'variables', label: '环境变量' },
      { id: 'backup', label: '备份与故障排查' },
    ],
    content: <>
      <h1>安装与部署指南</h1><p className="lead">从本地开发到 Linux 生产环境，再到三类桌面安装包，以下步骤均对应项目工程。</p>
      <h2 id="requirements">环境要求</h2>
      <div className="compare-table"><div><b>组件</b><b>要求</b><b>说明</b></div><div><span>Node.js</span><span>服务端 ≥20；Web ≥20.19；桌面构建 ≥22</span><span>桌面运行时由 Electron 携带</span></div><div><span>包管理器</span><span>服务端 npm；Web 端 pnpm</span><span>建议锁定依赖版本</span></div><div><span>数据库</span><span>SQLite</span><span>无需单独安装数据库服务</span></div><div><span>网络</span><span>按能力可选</span><span>云 LLM、讯飞与腾讯地图需要联网；Demo 和本地能力可降级</span></div></div>
      <h2 id="development">本地开发</h2>
      <pre><code>{`# 服务端\ncd server\nnpm install\nnpm run db:init\nnpm start\n\n# Web 端\ncd ../web\npnpm install --frozen-lockfile\npnpm dev`}</code></pre>
      <p>服务端默认监听 <code>127.0.0.1:5178</code>，Vite 将 <code>/api</code> 代理至服务端。生产环境不得继续使用默认管理员密码、开发 JWT Secret 或 Mock 凭证。</p>
      <h2 id="windows">Windows 一键安装</h2><pre><code>{`.\\scripts\\setup-windows.ps1\n\n# 只检查环境，不安装或改写数据\n.\\scripts\\setup-windows.ps1 -CheckOnly`}</code></pre><p>脚本检查 Node、pnpm、端口、磁盘、依赖、SQLite、检索、路线、数字人降级、前端构建和健康接口。</p>
      <h2 id="production">生产部署</h2><pre><code>{`cd web\npnpm build\n\ncd ../server\nnpm start`}</code></pre><p>Node 服务同源提供 API、Web 构建产物与 SPA 回退，Nginx 负责 HTTPS、SSE、WebSocket 和静态缓存。正式发布采用不可变 release 目录与软链接原子切换，上线前先备份数据并通过健康检查。</p>
      <h2 id="desktop">桌面客户端</h2><p>Electron 封装现有 Vue 前端与 Node 服务，在本机回环地址使用随机端口，数据写入用户目录。Windows 提供 x64 NSIS；Linux 提供 AppImage / DEB；macOS 提供 Intel 与 Apple Silicon DMG。</p><div className="docs-callout warning"><b>评审测试包</b><p>Windows 与 macOS 评审包尚未完成商业签名或公证，首次启动可能出现系统安全提示；请从官方下载入口获取并核对 SHA-256。</p></div>
      <h2 id="variables">环境变量</h2><ul><li><b>模型：</b><code>LLM_PROVIDER</code>、<code>LLM_BASE_URL</code>、<code>LLM_MODEL</code>、<code>LLM_API_KEY</code>、<code>DEMO_MODE</code>。</li><li><b>数据：</b><code>SQLITE_PATH</code>、数据目录与上传目录。</li><li><b>数字人：</b>讯飞 App ID、API Key、API Secret、默认形象与音色。</li><li><b>地图：</b><code>VITE_TENCENT_MAP_KEY</code>，浏览器可见 Key 必须绑定域名白名单。</li></ul>
      <h2 id="backup">备份与故障排查</h2><pre><code>{`cd server\nnpm run backup\n\n# 恢复前先确认目标备份目录\nnpm run restore -- backups/<backup-folder>`}</code></pre><ul><li>讯飞连接失败：检查外网、额度和域名配置，正文仍可退至 Live2D、普通音频或文本。</li><li>腾讯地图不显示：检查 Key 与白名单，页面会回退至 Leaflet 手绘地图。</li><li>模型不可用：检查模型 ID、Base URL 与密钥，评审环境可使用明确标记的 Demo 模式。</li><li>桌面包无法启动：确认系统架构、安全提示与安装包 SHA-256。</li></ul>
    </>,
  },
  {
    slug: 'usage', title: '使用操作指南', kicker: '游客端与管理端',
    toc: [
      { id: 'visitor', label: 'AI 数字人导览' }, { id: 'map-guide', label: '地图与路线' },
      { id: 'feedback', label: '游客反馈' }, { id: 'knowledge', label: '知识库管理' },
      { id: 'avatar', label: '数字人配置' }, { id: 'operations', label: '运营与质量闭环' },
    ],
    content: <>
      <h1>使用操作指南</h1><p className="lead">建议按照“智能问答 → 地图路线 → 满意度反馈 → 管理端回溯”的顺序体验完整闭环。</p>
      <h2 id="visitor">AI 数字人导览</h2><ol><li>进入“AI 数字人导览”，完成浏览器音频授权。</li><li>使用文字输入，或在兼容浏览器中使用语音输入。</li><li>查看回答、质量标签、引用来源与阶段耗时。</li><li>打开景点卡片听取讲解，或按时长和兴趣生成路线。</li><li>播报可打断；数字人不可用时，正文回答仍可阅读。</li></ol>
      <h2 id="map-guide">地图与路线</h2><h3>景区地图导览</h3><p>在灵山胜境和拈花湾之间切换；联网且 Key 有效时使用腾讯地图，离线或 SDK 失败时自动使用 Leaflet 本地手绘图。可按分类筛选景点和设施，打开详情、讲解与全景入口。</p>
      <h3>官方游线与个性化路线</h3><p><b>官方游线</b>保留景区来源的节点顺序和道路折线；<b>个性化路线</b>根据时长、兴趣、同行人群、体力和拍照偏好生成并解释推荐理由。两者均为游览建议，不等同于实时 GPS 步行导航。</p>
      <h2 id="feedback">游客反馈</h2><p>会话结束后可提交 1–5 星满意度与文字反馈。反馈会与会话关联，方便运营人员从低满意记录回溯具体答案、引用和响应耗时。</p>
      <h2 id="knowledge">知识库管理</h2><ul><li>DOCX、TXT、MD 可进行文本提取、内容哈希去重和索引。</li><li>PDF、XLSX 用于安全上传与预览，应标记为“未索引”。</li><li>固定 FAQ 适合开放时间、票务和服务电话等高频答案。</li><li>检索测试页用于核对命中片段、得分与来源。</li></ul>
      <h2 id="avatar">数字人配置</h2><p>管理员可维护形象、模型、音色、欢迎语、语速、情绪风格和服务状态。讯飞负责云端实时画面、音色与口型表现；Live2D 使用本地模型与 TTS 音频，两套引擎在统一接口下可配置切换。</p>
      <h2 id="operations">运营与质量闭环</h2><p>运营大屏汇总服务量、问题热度、景点关注、满意度、响应时延和画像；会话页用于回溯问答；人工标注可将错误答案转成知识补充草稿；反馈聚类和服务质量报告再整理为内容维护建议。</p>
    </>,
  },
  {
    slug: 'technology', title: '技术选型与方案对比', kicker: '决策、代价与降级',
    toc: [
      { id: 'architecture', label: '总体技术架构' }, { id: 'comparison', label: '核心方案对比' },
      { id: 'dual-engine', label: '双方案韧性设计' }, { id: 'quality', label: '测试与交付门禁' },
    ],
    content: <>
      <h1>技术选型与方案对比</h1><p className="lead">技术决策共同服从四个约束：比赛演示稳定、景区知识可控、多端可交付、后续可维护。</p>
      <h2 id="architecture">总体技术架构</h2><ul><li><b>Web：</b>Vue 3.5、TypeScript、Vite 7、Vue Router、Pinia、Element Plus、ECharts。</li><li><b>服务：</b>Node.js 原生 HTTP / ESM、统一响应、Bearer 鉴权与模块化服务。</li><li><b>数据：</b>SQLite、结构化景点实体、本地知识分块。</li><li><b>AI：</b>OpenAI-compatible LLM、讯飞 ASR / TTS / 交互数字人。</li><li><b>地图：</b>腾讯地图 JS GL 与 Leaflet 1.9.4。</li><li><b>桌面：</b>Electron 43.4 与 electron-builder。</li></ul>
      <h2 id="comparison">核心方案对比</h2>
      <div className="compare-table dense"><div><b>领域</b><b>采用方案 / 备选</b><b>选择理由与代价</b></div><div><span>Web</span><span>Vue 3 / React、原生多端</span><span>管理组件与权限生态成熟；大型地图页面仍需持续拆分。</span></div><div><span>服务</span><span>Node 原生 HTTP / Nest、Java</span><span>依赖少、易嵌入桌面；路由、边界和错误处理需自行维护。</span></div><div><span>数据库</span><span>SQLite / MySQL、PostgreSQL</span><span>零外部依赖、单机备份简单；不适合高并发多节点写入。</span></div><div><span>知识检索</span><span>本地分块检索 / 纯 LLM、云向量库</span><span>官方资料可控且可追溯；复杂语义召回仍有提升空间。</span></div><div><span>数字人</span><span>讯飞 + Live2D / 单一云引擎</span><span>兼顾主演示效果与本地可控性；需处理额度、WebGL 与素材授权。</span></div><div><span>地图</span><span>腾讯 + Leaflet / 单一在线地图</span><span>标准底图和本地手绘图兼得；需严格处理坐标转换与版权。</span></div><div><span>桌面</span><span>Electron / 原生、PWA</span><span>复用 Web 与 Node 业务；包体与签名成本高于 PWA。</span></div></div>
      <h2 id="dual-engine">双方案韧性设计</h2><h3>数字人：讯飞 + Live2D</h3><p>讯飞承担云端实时画面、合成音色与口型；Live2D 提供本地模型、TTS 和 MotionSync 链路。正确边界是“统一接口下可配置切换并保留多层降级”，不是所有页面都已自动无感切换。</p><h3>地图：腾讯地图 + Leaflet</h3><p>腾讯地图负责联网标准底图与地理语义；Leaflet 承载本地手绘图、景点、设施与路线。代码统一处理 GCJ-02、WGS84 和手绘图旋转，避免底图切换后二次偏移。</p>
      <h2 id="quality">测试与交付门禁</h2><ul><li>服务端覆盖数据库、问答、检索、路线、语音、数字人、分析、并发与 Demo 降级。</li><li>Web 执行 TypeScript 检查、地图域测试和生产构建。</li><li>桌面端验证包体内容、运行时配置、SQLite 初始化与启动冒烟。</li><li>Linux 桌面使用 Electron 内置 <code>node:sqlite</code>，阻止原生模块带入构建机 glibc 依赖。</li><li>正式发布门禁包括真机弱网、商业签名、公证与第三方授权验收。</li></ul>
    </>,
  },
  {
    slug: 'thanks', title: '致谢', kicker: '感谢每一份同行与托举',
    toc: [
      { id: 'journey', label: '一路同行' }, { id: 'mentor-team', label: '指导与团队' },
      { id: 'organizers', label: '赛事组织' }, { id: 'support', label: '答疑支持' },
      { id: 'judges', label: '评委专家' }, { id: 'ecosystem', label: '技术生态' },
      { id: 'closing', label: '写在最后' },
    ],
    content: <>
      <h1>致谢</h1><p className="lead">一项作品的最终交付，从来不是某一个人的独行。谨以此页，记录数智游踪从构想到落地过程中收到的每一份指引、坚守、耐心与信任。</p>
      <div className="thanks-hero" id="journey">
        <div className="thanks-hero-mark"><HandHeart size={30} /><span>ACKNOWLEDGEMENTS</span></div>
        <p>回望从备赛到最终交付的整个历程，我们跨越了一个又一个难点，也在持续验证、推翻与重建中完成了宝贵的蜕变与成长。每一次突破的背后，都有同行者的托举。</p>
      </div>

      <h2 id="mentor-team">指导与团队</h2>
      <div className="thanks-credit-grid">
        <article className="thanks-credit-card">
          <div className="thanks-credit-icon"><GraduationCap size={20} /></div>
          <span>指导教师</span><h3>陈子淮老师</h3>
          <p>由衷感谢陈子淮指导老师在全过程中的悉心指引与无私帮助。从选题方向的敲定、技术路线的梳理，到核心难点的攻克，每一步突破都离不开您的倾囊相授与耐心把关。</p>
        </article>
        <article className="thanks-credit-card">
          <div className="thanks-credit-icon"><Users size={20} /></div>
          <span>参赛团队</span><h3>张婧瑜 · 季祥 · 林骏毅</h3>
          <p>感谢团队成员在无数个深夜并肩调试、反复迭代的坚守与付出。正是彼此间的信任、坦诚与默契协作，支撑我们把一个想法打磨成完整系统，并一路走到总决赛的舞台。</p>
        </article>
      </div>

      <h2 id="organizers">赛事组织</h2>
      <div className="thanks-organization">
        <div className="thanks-organization-title"><Landmark size={20} /><b>致大赛主办、命题与组织单位</b></div>
        <div className="thanks-organization-list"><span>工业和信息化部</span><span>教育部</span><span>江苏省人民政府</span><span>锐捷网络（苏州）有限公司</span><span>各承办单位</span><span>大赛组委会</span></div>
      </div>
      <p>我们向本届大赛的主办单位、出题企业、各承办单位与大赛组委会致以最诚挚的谢意。感谢赛事平台为全国青年学子搭建起连接产业需求、展现软件创新能力、碰撞技术思想的国家级专业舞台。从贴合产业前沿的赛题设置，到全流程规范有序的赛事组织，再到总决赛的周全保障，每一处环节的精心安排，都为我们的参赛实践与能力成长保驾护航。</p>

      <h2 id="support">答疑支持</h2>
      <p>特别感谢组委会老师在 QQ 群答疑期间给予的细心解答。一次次及时、明确的回应，帮助我们更准确地理解参赛要求，也让团队能够把更多精力投入作品本身。点击老师姓名或邮箱即可发起邮件联系。</p>
      <div className="thanks-contact-grid">
        <a className="thanks-contact-card" href="mailto:2219396984@qq.com" aria-label="发送邮件给王佳琳老师" title="发送邮件至 2219396984@qq.com"><div><strong>王佳琳老师</strong><span>组委会答疑</span></div><Mail size={18} /><small>2219396984@qq.com</small></a>
        <a className="thanks-contact-card" href="mailto:568735108@qq.com" aria-label="发送邮件给王艳老师" title="发送邮件至 568735108@qq.com"><div><strong>王艳老师</strong><span>组委会答疑</span></div><Mail size={18} /><small>568735108@qq.com</small></a>
        <a className="thanks-contact-card" href="mailto:3216299230@qq.com" aria-label="发送邮件给马溪若老师" title="发送邮件至 3216299230@qq.com"><div><strong>马溪若老师</strong><span>组委会答疑</span></div><Mail size={18} /><small>3216299230@qq.com</small></a>
      </div>

      <h2 id="judges">评委专家</h2>
      <div className="thanks-inline-heading"><Award size={20} /><b>致每一位评委专家</b></div>
      <p>感谢各位评委专家在百忙之中拨冗评审，耐心聆听我们的项目汇报。严谨的专业视角与中肯的点评建议，不仅帮助我们清晰认识到项目的不足与优化空间，也让我们对软件技术的产业落地价值有了更深刻的理解，为未来的技术实践与职业发展指明了方向。</p>

      <h2 id="ecosystem">技术生态</h2>
      <p>数智游踪的完成也离不开 Vue、Node.js、Leaflet、Electron 等开源社区，以及科大讯飞、腾讯位置服务与 Live2D 相关技术生态提供的能力基础。我们尊重每一项工具、框架与素材背后的创造性劳动，并将持续依据软件许可证、平台服务条款与素材授权要求规范使用和发布。</p>

      <h2 id="closing">写在最后</h2>
      <div className="thanks-closing"><HandHeart size={26} /><div><b>经历本身，就是答案。</b><p>无论最终成绩如何，这段全力以赴的经历已是我们大学生涯中最珍贵的财富。我们深信，在项目中淬炼出的系统工程思维与团队协作经验，必将在未来的学习和工作中持续发光发热。</p></div></div>
    </>,
  },
]

const pathFor = (slug: string) => slug ? `/docs/${slug}` : '/docs'

export function DocsPage() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\/docs\/?/, '').split('/')[0]
  const index = Math.max(0, pages.findIndex((page) => page.slug === slug))
  const current = pages[index]

  useEffect(() => {
    document.title = `${current.title}｜数智游踪文档`
    const id = decodeURIComponent(location.hash.replace('#', ''))
    window.setTimeout(() => id ? document.getElementById(id)?.scrollIntoView() : window.scrollTo(0, 0), 0)
    return () => { document.title = '数智游踪｜AI 数字人智慧导览' }
  }, [current.title, location.hash])

  return (
    <div className="docs-page">
      <aside className="docs-sidebar">
        <div className="docs-brand"><span>DOCUMENTATION</span><h2>数智游踪文档</h2><p>产品、部署、操作与技术决策的完整说明。</p></div>
        <nav aria-label="文档导航">
          {pages.map((page) => (
            <section key={page.slug} className={current.slug === page.slug ? 'active' : ''}>
              <Link className="docs-group-title" to={pathFor(page.slug)}>{page.title}</Link>
              <div>{page.toc.map((item) => <Link key={item.id} to={`${pathFor(page.slug)}#${item.id}`}>{item.label}</Link>)}</div>
            </section>
          ))}
        </nav>
      </aside>
      <div className="docs-workspace">
        <div className="docs-grid">
          <article className="docs-content">{current.content}
            <nav className="docs-pager" aria-label="上一篇与下一篇">
              {index > 0 ? <Link to={pathFor(pages[index - 1].slug)}><ArrowLeft size={16} /><span><small>上一篇</small>{pages[index - 1].title}</span></Link> : <span />}
              {index < pages.length - 1 ? <Link to={pathFor(pages[index + 1].slug)}><span><small>下一篇</small>{pages[index + 1].title}</span><ArrowRight size={16} /></Link> : null}
            </nav>
          </article>
          <aside className="docs-toc"><b>目录</b>{current.toc.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</aside>
        </div>
      </div>
    </div>
  )
}
