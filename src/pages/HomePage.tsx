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
  Github,
  Globe2,
  Laptop,
  Layers3,
  MapPinned,
  MessageCircleMore,
  Route,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductShowcase } from '../components/ProductShowcase'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { domains, innovationItems, roadmapStages } from '../data/content'
import { downloadTargets, futureTargets } from '../data/downloads'

const valueSteps = [
  { icon: MapPinned, title: '感知游客场景', body: '景点、位置、时间、兴趣与体力成为服务上下文。' },
  { icon: Database, title: '编排可信能力', body: 'RAG、语音、路线与数字人按需协同，答案保留来源。' },
  { icon: MessageCircleMore, title: '即时触达服务', body: '从问一个问题到听一段讲解，再到生成一条游线。' },
  { icon: CircleGauge, title: '沉淀运营洞察', body: '会话、反馈和关注热点反哺知识维护与景区决策。' },
]

const innovationIcons = [Layers3, AudioLines, MapPinned, BookOpenCheck]
const accessIcons = [Globe2, Laptop, TerminalSquare, Compass]

export function HomePage() {
  const { locale, t } = useLanguage()
  const isEnglish = locale === 'en'
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

  return (
    <>
      <section className="hero section-pad">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="competition-pill hero-reveal reveal-1"><Sparkles size={15} /> {t('competition')}</span>
            <h1 className="hero-reveal reveal-2">{t('heroLineOne')}<br /><em>{t('heroLineTwo')}</em></h1>
            <p className="hero-reveal reveal-3">{t('heroBody')}</p>
            <div className="hero-actions hero-reveal reveal-4">
              <a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">
                {t('tryOnline')} <ArrowRight size={18} />
              </a>
              <Link className="button secondary" to="/download">
                {t('getClient')}
              </Link>
              <a className="button secondary github-button" href="https://github.com/babybitter/scenic-ai-guide" target="_blank" rel="noreferrer">
                <Github size={19} /> GitHub
              </a>
            </div>
            <div className="hero-proof hero-reveal reveal-5">
              <span><CheckCircle2 size={16} /> {t('proofAvatar')}</span>
              <span><CheckCircle2 size={16} /> {t('proofMap')}</span>
              <span><CheckCircle2 size={16} /> {t('proofRag')}</span>
            </div>
          </div>
          <div className="hero-visual hero-reveal reveal-visual" aria-label="数智游踪品牌图形与能力概览">
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
            title="从一次提问，看见完整景区服务"
            body="七个真实页面覆盖游客导览、路线规划、景区内容运营与服务质量复盘，自动轮播与手动标签切换均按统一画幅平滑过渡。"
          />
          <ProductShowcase />
        </div>
      </section>

      <section className="section-pad innovation-section" id="innovation">
        <div className="container">
          <SectionHeading
            eyebrow="INNOVATION"
            title="把“能演示”做成“不中断、可交付”"
            body="创新不只体现在模型能力，也体现在外部服务失效、网络波动和终端差异出现时，产品仍能把核心体验交付给游客。"
          />
          <div className="innovation-list">
            {innovationItems.map((item, index) => {
              const Icon = innovationIcons[index]
              return (
                <article key={item.number} className="innovation-row" tabIndex={0}>
                  <div className="innovation-top">
                    <span>{item.number}</span>
                    <Icon size={26} />
                  </div>
                  <div>
                    <p className="card-kicker">{item.subtitle}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <div className="tag-row">{item.meta.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              )
            })}
          </div>
          <Link className="text-link" to="/innovation">查看完整技术创新说明 <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section-pad access-section">
        <div className="container">
          <SectionHeading
            eyebrow={t('accessEyebrow')}
            title={t('accessTitle')}
            body={t('accessBody')}
          />
          <div className="access-grid">
            {downloadTargets.map((target, index) => {
              const Icon = accessIcons[index]
              const isWeb = target.id === 'web'
              return (
                <article className={`access-card ${isWeb ? 'is-featured' : ''}`} key={target.id}>
                  <div className="access-card-top">
                    <span className="access-icon"><Icon size={22} /></span>
                    <span className="format-badge">{target.format}</span>
                  </div>
                  <span className="status-ready">{t('availableNow')}</span>
                  <h3>{isEnglish ? ['Web app', 'Windows client', 'Linux client', 'macOS client'][index] : target.title}</h3>
                  <b>{target.platform}</b>
                  <p>{target.description}</p>
                  <div className="access-card-meta">
                    <span>{isWeb ? t('noInstall') : t('directDownload')}</span>
                    {isWeb ? (
                      <a href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">{t('openWeb')} <ExternalLink size={15} /></a>
                    ) : (
                      <Link to="/download">{t('downloadStatus')} <ArrowRight size={15} /></Link>
                    )}
                  </div>
                </article>
              )
            })}
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
