import { Apple, ArrowRight, Check, Clock3, ExternalLink, Globe2, Laptop, Layers3, MonitorDown, PackageOpen, Smartphone } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { downloadTargets, mobileTargets } from '../data/downloads'

const targetIcons = [Globe2, MonitorDown, PackageOpen, Apple, Smartphone, Layers3]

export function DownloadPage() {
  return (
    <div className="subpage download-page">
      <section className="page-hero section-pad">
        <div className="container narrow">
          <span className="competition-pill"><Laptop size={15} /> ONE PRODUCT · MANY SCREENS</span>
          <h1>从浏览器到桌面终端，<br /><em>按你的场景进入</em></h1>
          <p>网页端现已开放。Windows、Linux、macOS、Android 与 HarmonyOS 安装包均由自有 Linux 服务器直接分发；微信小程序入口将在二维码更新后开放。</p>
        </div>
      </section>

      <section className="download-grid-section section-pad">
        <div className="container">
          <SectionHeading eyebrow="CURRENT COVERAGE" title="当前覆盖" body="网页端、三类桌面系统与 Android、HarmonyOS 均可进入；安装包使用服务器直链，不依赖 GitHub Release。" />
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
                      {target.links.map((link) => <a key={link.href} className="button primary" href={link.href}>{link.label} · 直接下载 <ExternalLink size={16} /></a>)}
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
            <div><b>当前通过自有服务器分发 · /downloads/ 提供公开下载目录</b><p>当前统一发布包版本为 v0.2.0；Android 与 HarmonyOS 应用内部版本保持为 1.0.2（102）。Windows 与 macOS 包尚未进行商业代码签名/公证，首次打开时可能出现系统安全提示。SHA-256 校验清单与安装包位于同一下载目录。</p></div>
          </div>
        </div>
      </section>

      <section className="five-platform section-pad">
        <div className="container">
          <SectionHeading eyebrow="MOBILE · THREE-PLATFORM" title="移动游客端三端发布" body="Android App 与 HarmonyOS 已提供安装包；微信小程序保留发布位置，待二维码更新后开放扫码入口。三端共享品牌、业务流程与数据模型，平台能力由适配层分别接管。" />
          <div className="platform-track">
            {mobileTargets.map((target, index) => (
              <article key={target.name} className={target.status === 'ready' ? 'ready' : ''}><span>{String(index + 1).padStart(2, '0')}</span><h3>{target.name}</h3><p>{target.note}</p><b>{target.status === 'ready' ? '已发布' : '二维码待更新'}</b></article>
            ))}
          </div>
          <a className="text-link" href="https://docs.shuzhiyouzong.cn" target="_blank" rel="noreferrer">查看多端架构规划 <ArrowRight size={16} /></a>
        </div>
      </section>
    </div>
  )
}
