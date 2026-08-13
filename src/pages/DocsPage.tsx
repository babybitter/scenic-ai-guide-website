import { useEffect, useState } from 'react'
import { BookOpen, Boxes, ChevronRight, HandHeart, Rocket, Wrench } from 'lucide-react'

const docs = [
  {
    id: 'intro', icon: BookOpen, title: '项目介绍', kicker: '从赛题痛点到产品闭环',
    content: <>
      <h1>数智游踪项目介绍</h1><p className="lead">数智游踪是第十五届“中国软件杯”A5 赛题「景区导览服务 AI 数字人」参赛作品，面向游客与景区运营者构建双端智慧导览系统。</p>
      <h2>解决什么问题</h2><p>项目回应旺季导游资源紧张、录音导览无法追问、景区知识更新滞后和管理者缺少游客洞察四类痛点。游客可以文字或语音提问、听取数字人讲解、查看景区地图并生成个性化游线；管理方可以维护知识、配置数字人、回溯会话并分析服务质量。</p>
      <div className="docs-callout"><b>核心服务闭环</b><p>游客场景 → RAG / 数字人 / 路线编排 → 问答与地图服务 → 会话和反馈沉淀 → 运营优化。</p></div>
      <h2>赛题能力覆盖</h2><ul><li>文字、语音、数字人播报的多模态交互。</li><li>本地景区知识库与来源可追溯的事实问答。</li><li>按兴趣、时长与体力组织个性化路线。</li><li>知识管理、数字人配置、运营大屏、会话与反馈分析。</li></ul>
    </>,
  },
  {
    id: 'install', icon: Rocket, title: '安装与部署指南', kicker: '开发、桌面与生产环境',
    content: <>
      <h1>安装与部署指南</h1><p className="lead">数智游踪采用 Vue 3 前端、Node.js 同源服务与 SQLite 数据库，支持开发启动、单机生产部署和 Electron 桌面交付。</p>
      <h2>开发环境</h2><pre><code>{`# 后端\ncd server\nnpm install\nnpm run db:init\nnpm start\n\n# 前端\ncd web\npnpm install\npnpm dev`}</code></pre>
      <h2>生产部署</h2><p>前端构建产物由 Node.js 服务同源托管，Nginx 负责 TLS、SSE 与 WebSocket 代理。推荐采用不可变版本目录与软链接原子切换，数据、上传和环境变量独立持久化。</p>
      <div className="docs-callout warning"><b>凭证安全</b><p>LLM、讯飞和地图密钥只写入未跟踪的环境文件，并对浏览器可见的地图 Key 配置域名白名单。</p></div>
      <h2>桌面交付</h2><p>Windows 使用 NSIS，Linux 提供 AppImage / DEB，macOS 分 Intel 与 Apple Silicon 构建 DMG。包体在交付前执行运行时、静态资源、SQLite 与安装内容校验。</p>
    </>,
  },
  {
    id: 'usage', icon: Wrench, title: '使用操作指南', kicker: '游客端与管理端',
    content: <>
      <h1>使用操作指南</h1><p className="lead">建议按照“问答 → 地图 → 反馈 → 后台回溯”的顺序体验完整业务闭环。</p>
      <h2>游客导览</h2><ol><li>进入“AI 数字人导览”，选择文字或语音提问。</li><li>询问景区事实，查看回答和来源；选择景点讲解或路线推荐。</li><li>进入地图切换灵山胜境 / 拈花湾，查看点位、官方游线与全景入口。</li><li>结束问答后提交满意度，供管理端分析。</li></ol>
      <h2>景区管理</h2><ol><li>在知识文档页上传、预览并构建景区资料。</li><li>通过检索测试验证新内容是否进入问答。</li><li>配置启用的数字人形象、音色和引擎。</li><li>在运营大屏、会话、反馈和服务质量页查看闭环结果。</li></ol>
    </>,
  },
  {
    id: 'tech', icon: Boxes, title: '技术选型与方案对比', kicker: '为什么这样选',
    content: <>
      <h1>技术选型与方案对比</h1><p className="lead">技术选型以比赛演示稳定性、景区私有知识可控、多端交付与后续维护成本为共同约束。</p>
      <h2>核心方案</h2><div className="compare-table"><div><b>领域</b><b>选型</b><b>相较备选方案的取舍</b></div><div><span>前端</span><span>Vue 3 + TypeScript + Vite</span><span>生态成熟、管理端组件充分；相比多套原生端更利于快速形成业务闭环。</span></div><div><span>服务</span><span>Node.js 原生 HTTP</span><span>同语言、易嵌入桌面包；相比完整框架减少运行时体积，但需自建边界与约定。</span></div><div><span>数据</span><span>SQLite</span><span>零外部依赖、可随景区终端交付；相比集中式数据库更适合单机部署。</span></div><div><span>知识</span><span>本地 RAG + 兼容式 LLM</span><span>事实资料可控且可切换模型；相比纯云端问答更易追溯来源与离线降级。</span></div></div>
      <p>当前 DOCX / MD / TXT 可进入知识构建；PDF / XLSX 已支持安全上传与预览，但接入 RAG 索引仍是后续工作。</p>
      <h2>双方案韧性设计</h2><ul><li><b>数字人：</b>讯飞交互式数字人负责实时表现，Live2D 负责本地轻量兜底，最终仍可退到 TTS / 字幕 / 文本。</li><li><b>地图：</b>腾讯地图负责联网标准底图，Leaflet 负责本地手绘地图、点位与路线；二者通过统一地图领域语义协作。</li><li><b>大模型：</b>OpenAI 兼容接口支持不同供应商，云服务异常时由 Demo / FAQ 链路保证比赛演示不中断并明确标记降级。</li></ul>
    </>,
  },
  {
    id: 'thanks', icon: HandHeart, title: '致谢', kicker: '内容待补充',
    content: <><h1>致谢</h1><p className="lead">此页面已为项目致谢、指导教师、赛题企业、开源社区、技术与素材授权方预留位置。</p><div className="thanks-placeholder"><HandHeart size={38} /><h2>待团队确认后补充</h2><p>正式发布前将根据真实贡献与授权记录完善名单，不虚构、不遗漏应说明的第三方来源。</p></div></>,
  },
]

export function DocsPage() {
  const [active, setActive] = useState('intro')
  const current = docs.find((item) => item.id === active) ?? docs[0]
  useEffect(() => {
    document.title = `${current.title}｜数智游踪文档`
    return () => {
      document.title = '数智游踪｜AI 数字人智慧导览'
    }
  }, [current.title])

  return (
    <div className="docs-page">
      <aside className="docs-sidebar">
        <div><span className="eyebrow">DOCUMENTATION</span><h2>数智游踪文档</h2><p>从项目理解到部署使用，再到技术决策。</p></div>
        <nav aria-label="文档目录">{docs.map((item) => <button key={item.id} className={active === item.id ? 'active' : ''} type="button" onClick={() => setActive(item.id)}><item.icon size={18} /><span><b>{item.title}</b><small>{item.kicker}</small></span><ChevronRight size={16} /></button>)}</nav>
      </aside>
      <article className="docs-content" key={current.id}>{current.content}</article>
      <aside className="docs-toc"><span>文档模块</span>{docs.map((item) => <button key={item.id} type="button" className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}>{item.title}</button>)}</aside>
    </div>
  )
}
