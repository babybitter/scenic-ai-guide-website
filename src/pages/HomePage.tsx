import {
  ArrowRight,
  AudioLines,
  BookOpenCheck,
  CheckCircle2,
  CircleGauge,
  CloudOff,
  Compass,
  Database,
  ExternalLink,
  Layers3,
  MapPinned,
  MessageCircleMore,
  Route,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductShowcase } from '../components/ProductShowcase'
import { SectionHeading } from '../components/SectionHeading'
import { domains, innovationItems, roadmapStages } from '../data/content'
import { downloadTargets, futureTargets } from '../data/downloads'

const valueSteps = [
  { icon: MapPinned, title: '感知游客场景', body: '景点、位置、时间、兴趣与体力成为服务上下文。' },
  { icon: Database, title: '编排可信能力', body: 'RAG、语音、路线与数字人按需协同，答案保留来源。' },
  { icon: MessageCircleMore, title: '即时触达服务', body: '从问一个问题到听一段讲解，再到生成一条游线。' },
  { icon: CircleGauge, title: '沉淀运营洞察', body: '会话、反馈和关注热点反哺知识维护与景区决策。' },
]

const innovationIcons = [Layers3, AudioLines, MapPinned, BookOpenCheck]

export function HomePage() {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

  return (
    <>
      <section className="hero section-pad">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="competition-pill"><Sparkles size={15} /> 第十五届中国软件杯 · A5 赛题作品</span>
            <h1>让每一步游览，<br /><em>都有智能相伴</em></h1>
            <p>数智游踪面向景区游客与运营方，把 AI 数字人、可信知识问答、地图导览、个性化路线与服务洞察连成一条可落地的智慧文旅服务链。</p>
            <div className="hero-actions">
              <a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">
                在线体验 <ArrowRight size={18} />
              </a>
              <Link className="button secondary" to="/download">
                获取客户端
              </Link>
            </div>
            <div className="hero-proof">
              <span><CheckCircle2 size={16} /> 讯飞 × Live2D 双引擎</span>
              <span><CheckCircle2 size={16} /> 腾讯地图 × Leaflet 双底图</span>
              <span><CheckCircle2 size={16} /> 本地 RAG 知识库</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="数智游踪品牌图形与能力概览">
            <div className="hero-logo-card">
              <img src={asset('brand/brand-mark.png')} alt="数智游踪品牌图形" />
              <div>
                <span>智慧同行 · 游有所问</span>
                <strong>数智游踪</strong>
                <small>AI SCENIC GUIDE</small>
              </div>
            </div>
            <div className="floating-card card-route"><Route size={20} /><span>个性化游线</span><b>按兴趣与时长</b></div>
            <div className="floating-card card-cloud"><CloudOff size={20} /><span>弱网不掉线</span><b>核心能力可降级</b></div>
            <div className="floating-card card-guide"><Compass size={20} /><span>双景区实景</span><b>灵山胜境 · 拈花湾</b></div>
          </div>
        </div>
        <div className="container hero-meta">
          <span>01 / 游客智能服务</span><span>02 / 景区运营闭环</span><span>03 / 工程化多端交付</span>
        </div>
      </section>

      <section className="section-pad value-section">
        <div className="container">
          <SectionHeading
            eyebrow="SERVICE LOOP"
            title="不止回答问题，而是完成一次导览"
            body="传统导览在“播放一段录音”处结束。数智游踪从游客真实处境出发，将服务触达、内容可信与运营优化串成持续闭环。"
          />
          <div className="value-flow">
            {valueSteps.map((step, index) => (
              <article key={step.title}>
                <span className="flow-number">0{index + 1}</span>
                <step.icon size={24} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad product-section" id="product">
        <div className="container">
          <SectionHeading
            eyebrow="PRODUCT IN ACTION"
            title="从游客到运营，每一环都有真实产品承接"
            body="以下页面截图取自数智游踪当前项目，用产品证据对应赛题对多模态、知识库、个性化服务和运营分析的要求。"
          />
          <ProductShowcase />
        </div>
      </section>

      <section className="section-pad innovation-section">
        <div className="container">
          <SectionHeading
            eyebrow="INNOVATION"
            title="把“能演示”做成“不中断、可交付”"
            body="创新不只体现在模型能力，也体现在外部服务失效、网络波动和终端差异出现时，产品仍能把核心体验交付给游客。"
          />
          <div className="innovation-grid">
            {innovationItems.map((item, index) => {
              const Icon = innovationIcons[index]
              return (
                <article key={item.number} className={index === 0 ? 'innovation-card feature-card' : 'innovation-card'}>
                  <div className="innovation-top">
                    <span>{item.number}</span>
                    <Icon size={26} />
                  </div>
                  <p className="card-kicker">{item.subtitle}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="tag-row">{item.meta.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad access-section">
        <div className="container">
          <SectionHeading
            eyebrow="ACCESS EVERYWHERE"
            title="选择适合你的使用方式"
            body="网页端立即体验，桌面端面向稳定演示与景区终端交付；安装包统一由自有 Linux 下载服务器分发，不依赖 GitHub Release。"
          />
          <div className="access-layout">
            <article className="web-access-card">
              <div className="browser-preview">
                <div><i /><i /><i /><span>app.shuzhiyouzong.cn</span></div>
                <img src={asset('screenshots/visitor-guide.webp')} alt="电脑网页端预览" />
              </div>
              <div className="access-copy">
                <span className="status-ready">现在可用</span>
                <h3>电脑网页端</h3>
                <p>无需安装，打开浏览器即可走通游客问答、数字人讲解、地图导览与运营管理闭环。</p>
                <a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">
                  打开网页版 <ExternalLink size={17} />
                </a>
              </div>
            </article>
            <div className="desktop-access-grid">
              {downloadTargets.slice(1).map((target) => (
                <article key={target.id}>
                  <span className="format-badge">{target.format}</span>
                  <h3>{target.title}</h3>
                  <b>{target.platform}</b>
                  <p>{target.description}</p>
                  <Link to="/download">查看下载状态 <ArrowRight size={15} /></Link>
                </article>
              ))}
            </div>
          </div>
          <div className="future-platforms">
            <div>
              <span className="eyebrow">NEXT · FULL FIVE-PLATFORM</span>
              <h3>移动游客端，全五端共用一套体验逻辑</h3>
              <p>规划中的移动端以 uni-app x Vapor 为底座，核心页面与平台能力通过适配层分级实现。</p>
            </div>
            <div className="future-list">
              {futureTargets.map((target) => <span key={target.name}><b>{target.name}</b><small>{target.note}</small></span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad roadmap-preview-section">
        <div className="container">
          <SectionHeading
            eyebrow="BUILD IN PUBLIC"
            title="从能跑通，到可交付"
            body="开发历程不是功能清单，而是一组真实问题、方案权衡和工程决策。"
          />
          <div className="mini-timeline">
            {roadmapStages.map((stage, index) => (
              <article key={stage.title}>
                <div className="timeline-dot">{index + 1}</div>
                <span>{stage.date}</span>
                <h3>{stage.title}</h3>
                <p>{stage.progress}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" to="/roadmap">阅读完整开发历程 <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="domain-section section-pad">
        <div className="container domain-panel">
          <div>
            <span className="eyebrow">DOMAIN PLAN</span>
            <h2>一套清晰的产品域名体系</h2>
            <p>主站、体验端、管理端、文档、下载与 API 各司其职，便于后续独立部署、权限隔离与缓存配置。</p>
          </div>
          <div className="domain-list">
            {domains.slice(0, 6).map(([domain, name]) => <span key={domain}><b>{domain}</b><small>{name}</small></span>)}
          </div>
        </div>
      </section>

      <section className="final-cta section-pad">
        <div className="container">
          <span className="eyebrow">START A SMART JOURNEY</span>
          <h2>景有万千，问有所答，<em>游有所得</em></h2>
          <p>从一次游客提问开始，看见 AI 数字人如何连接景区内容、路线与运营。</p>
          <div className="hero-actions">
            <a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">进入数智游踪 <ArrowRight size={18} /></a>
            <Link className="button secondary" to="/docs">阅读项目文档</Link>
          </div>
        </div>
      </section>
    </>
  )
}
