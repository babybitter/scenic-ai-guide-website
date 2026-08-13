import { Apple, ArrowRight, Check, Clock3, ExternalLink, Globe2, Laptop, MonitorDown, PackageOpen } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { downloadTargets, futureTargets } from '../data/downloads'

const targetIcons = [Globe2, MonitorDown, PackageOpen, Apple]

export function DownloadPage() {
  return (
    <div className="subpage download-page">
      <section className="page-hero section-pad">
        <div className="container narrow">
          <span className="competition-pill"><Laptop size={15} /> ONE PRODUCT · MANY SCREENS</span>
          <h1>从浏览器到桌面终端，<br /><em>按你的场景进入</em></h1>
          <p>网页端现已开放。Windows、Linux 与 macOS 评审测试包由自有 Linux 服务器直接分发；移动五端仍处于统一游客端重构规划阶段。</p>
        </div>
      </section>

      <section className="download-grid-section section-pad">
        <div className="container">
          <SectionHeading eyebrow="CURRENT COVERAGE" title="当前覆盖" body="网页与三类桌面系统均可进入；安装包使用服务器直链，不依赖 GitHub Release。" />
          <div className="download-grid">
            {downloadTargets.map((target, index) => {
              const Icon = targetIcons[index]
              const ready = target.status === 'ready'
              return (
                <article key={target.id} className={ready ? 'download-card ready' : 'download-card'}>
                  <div className="download-card-top">
                    <Icon size={28} />
                    <span className={ready ? 'status-ready' : 'status-soon'}>{ready ? <Check size={14} /> : <Clock3 size={14} />}{target.badge}</span>
                  </div>
                  <span className="format-badge">{target.format}</span>
                  <h2>{target.title}</h2>
                  <b>{target.platform}</b>
                  <p>{target.description}</p>
                  {ready && target.links ? (
                    <div className="download-actions">
                      {target.links.map((link) => <a key={link.href} className="button primary" href={link.href}>{link.label} <ExternalLink size={16} /></a>)}
                    </div>
                  ) : ready ? (
                    <a className="button primary" href={target.href} target={target.id === 'web' ? '_blank' : undefined} rel={target.id === 'web' ? 'noreferrer' : undefined}>{target.id === 'web' ? '立即打开' : '下载安装包'} <ExternalLink size={16} /></a>
                  ) : (
                    <button className="button secondary" type="button" disabled>等待服务器开放</button>
                  )}
                </article>
              )
            })}
          </div>
          <div className="download-note">
            <MonitorDown size={22} />
            <div><b>当前通过自有服务器分发 · download.shuzhiyouzong.cn 已纳入域名规划</b><p>桌面端当前为大赛评审测试包，版本 v0.1.0；Windows 与 macOS 包尚未进行商业代码签名/公证，首次打开时可能出现系统安全提示。SHA-256 校验清单与安装包位于同一下载目录。</p></div>
          </div>
        </div>
      </section>

      <section className="five-platform section-pad">
        <div className="container">
          <SectionHeading eyebrow="NEXT · MOBILE FIRST" title="后续扩展至全五端" body="跨端一致不等于能力硬抹平。品牌、业务流程和数据模型统一，定位、地图、录音、分享与数字人由适配层分别接管。" />
          <div className="platform-track">
            {futureTargets.map((target, index) => (
              <article key={target.name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{target.name}</h3><p>{target.note}</p><b>规划中</b></article>
            ))}
          </div>
          <a className="text-link" href="https://docs.shuzhiyouzong.cn" target="_blank" rel="noreferrer">查看多端架构规划 <ArrowRight size={16} /></a>
        </div>
      </section>
    </div>
  )
}
