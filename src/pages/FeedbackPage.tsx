/**
 * @fileoverview 数智游踪游客反馈页面组件。
 *
 * @description
 * 通过真实游览场景说明反馈方向，展示规划中的反馈表单结构，
 * 并提供在线体验与路线图页面入口。
 */
import { ArrowRight, MapPin, MessageSquareText, SignalLow, SunMedium } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { feedbackScenarios } from '../data/content'

/**
 * @description 按反馈场景顺序提供场景卡片使用的图标组件。
 * @type {import('lucide-react').LucideIcon[]}
 */
const icons = [MapPin, SignalLow, SunMedium, MessageSquareText]

/**
 * @description 渲染面向普通游客的反馈场景、表单预览和体验入口。
 * @returns {JSX.Element} 包含反馈说明与预览表单的 React 元素。
 * @example
 * <FeedbackPage />
 */
export function FeedbackPage() {
  return (
    <div className="subpage">
      <section className="page-hero feedback-hero section-pad">
        <div className="container narrow">
          <span className="competition-pill"><MessageSquareText size={15} /> FROM THE VISITOR</span>
          <h1>你的真实游览感受，<br /><em>决定下一次更新</em></h1>
          <p>不要求你理解技术，也不需要写 Issue。只要告诉我们：在景区里哪一步不顺、哪段讲解不清楚、哪项服务还可以更贴心。</p>
        </div>
      </section>

      <section className="feedback-scenarios section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="REAL SCENARIOS"
            title="我们更想听见这样的反馈"
            body="以普通游客、亲子家庭、老年访客和弱网环境下的真实体验作为产品优化依据。"
          />
          <div className="scenario-grid">
            {feedbackScenarios.map((item, index) => {
              const Icon = icons[index]
              return <article key={item.title}><Icon size={24} /><span>{item.tag}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            })}
          </div>
        </div>
      </section>

      <section className="feedback-form-section section-pad">
        <div className="container feedback-form-card">
          <div>
            <span className="eyebrow">FEEDBACK PREVIEW</span>
            <h2>把场景说清楚，就已经很有帮助</h2>
            <p>建议包含“使用设备 / 所在景点 / 当时想完成什么 / 发生了什么”。官网暂不收集个人信息，正式反馈通道接入前，此表单仅展示规划中的交互结构。</p>
            <div className="privacy-note">不会索要账号密码、定位历史或任何服务密钥。</div>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>我当时在做什么<input type="text" placeholder="例如：带家人在拈花湾跟随亲子路线" /></label>
            <label>遇到了什么<textarea placeholder="例如：切到弱网后数字人停了，希望保留字幕和已下载讲解。" rows={5} /></label>
            <label>你希望怎样改进<input type="text" placeholder="描述你理想中的使用方式" /></label>
            <button className="button primary" type="button" disabled>正式通道即将开放</button>
          </form>
        </div>
      </section>

      <section className="final-cta compact section-pad">
        <div className="container"><h2>先体验，再告诉我们哪里还能更好</h2><p>数智游踪会把反馈转化为路线、内容、交互和无障碍体验的具体改进。</p><a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">进入在线体验 <ArrowRight size={18} /></a><Link className="button secondary" to="/roadmap">查看迭代计划</Link></div>
      </section>
    </div>
  )
}
