import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Boxes, Map, MonitorSmartphone, Network, ShieldCheck, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "项目创新点", description: "数智游踪的全端覆盖、双数字人、双地图及上下文感知导览创新方案。" };

const extras = [
  { title: "空间上下文感知", body: "把游客位置、行进方向、游览阶段一起带入 AI，让讲解真正理解“此时此地”。", icon: Network },
  { title: "内容与能力解耦", body: "景区知识、地图能力和终端展示分别演进，同一份内容可一次配置、多端发布。", icon: Boxes },
  { title: "端云协同降级", body: "云端负责高质量生成，本地缓存承担核心信息与基础交互，弱网不等于失去导览。", icon: ShieldCheck },
];

export default function InnovationPage() {
  return (
    <SiteShell>
      <main className="subpage innovation-page">
        <header className="subpage-hero innovation-hero container"><span className="eyebrow">WHAT MAKES IT DIFFERENT</span><h1 className="serif">不是堆叠功能，<br />而是为真实旅程留好退路</h1><p>数智游踪的创新来自真实景区约束：网络会波动、设备有差异、服务可能异常。我们让每项核心体验都有可靠的第二条路径。</p><Link className="button button--primary" href="#core-innovations">探索核心创新 <ArrowRight size={16} /></Link><div className="innovation-hero__orbit"><span>AI</span><i /><i /><i /><small>SCENIC<br />INTELLIGENCE</small></div></header>

        <section className="container core-innovations" id="core-innovations">
          <article className="innovation-card innovation-card--wide"><div className="innovation-card__index">01</div><div className="innovation-card__copy"><span className="innovation-card__tag"><MonitorSmartphone size={15} />全端覆盖能力</span><h2>一套导览能力，抵达每一种终端</h2><p>以统一业务内核覆盖网页端、Windows、Linux、macOS，并为 App、iOS、鸿蒙、微信小程序与 H5 保留一致的数据和发布能力。</p><div className="terminal-track">{["WEB", "WIN", "LINUX", "MAC", "APP", "iOS", "HM", "MINI", "H5"].map((item, index) => <span className={index < 4 ? "is-live" : ""} key={item}>{item}</span>)}</div></div><MonitorSmartphone className="innovation-card__watermark" /></article>

          <article className="innovation-card innovation-card--digital"><div className="innovation-card__index">02</div><div className="innovation-card__copy"><span className="innovation-card__tag"><Bot size={15} />数字人双兜底</span><h2>表现力与可用性，不做单选题</h2><p>讯飞数字人提供高质量语音与形象驱动，Live2D 在弱网、服务异常或轻量终端上接续交互。</p><div className="engine-switch"><div><small>PRIMARY</small><strong>讯飞数字人</strong><span>云端高表现</span></div><i>自动切换</i><div><small>FALLBACK</small><strong>Live2D</strong><span>本地轻量</span></div></div></div><Bot className="innovation-card__watermark" /></article>

          <article className="innovation-card innovation-card--map"><div className="innovation-card__index">03</div><div className="innovation-card__copy"><span className="innovation-card__tag"><Map size={15} />地图导览双兜底</span><h2>在线体验与离线可靠，兼得</h2><p>腾讯地图提供国内 POI、路线规划与成熟服务；Leaflet 兼容自有底图和离线资源，确保核心地图始终可用。</p><div className="map-dual"><div><span className="map-grid" /><strong>腾讯地图</strong><small>在线主引擎</small></div><div><span className="map-contour" /><strong>Leaflet</strong><small>开源兜底</small></div></div></div><Map className="innovation-card__watermark" /></article>
        </section>

        <section className="container innovation-extras"><div className="section-heading section-heading--row"><div><span className="eyebrow">BEYOND FALLBACK</span><h2>更多面向场景的设计</h2></div><p>从系统架构到游客体验，每一项选择都服务于景区里真实发生的那一刻。</p></div><div className="innovation-extras__grid">{extras.map((item, index) => { const Icon = item.icon; return <article key={item.title}><span>0{index + 4}</span><Icon size={22} /><h3>{item.title}</h3><p>{item.body}</p></article>; })}</div></section>

        <section className="innovation-principle"><div className="container"><Sparkles size={22} /><p className="serif">“好的导览不是让游客看见技术，<br />而是让他更好地看见风景。”</p><span>数智游踪 · 产品设计原则</span></div></section>
      </main>
    </SiteShell>
  );
}
