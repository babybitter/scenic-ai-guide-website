import Link from "next/link";
import { ArrowRight, Bot, MapPinned, Route, ShieldCheck, Sparkles } from "lucide-react";
import { PlatformSection } from "@/components/platform-section";
import { ProductShowcase } from "@/components/product-showcase";
import { SiteShell } from "@/components/site-shell";

const capabilities = [
  { number: "01", title: "所见即所讲", body: "基于实时位置感知附近景点，让讲解在恰当的地点自然出现。", icon: MapPinned },
  { number: "02", title: "懂景，也懂你", body: "结合知识库与用户兴趣，支持自由追问，告别单向播放式导览。", icon: Bot },
  { number: "03", title: "路线随人而变", body: "综合游览时长、同行人群与偏好，动态编排更合适的游览线路。", icon: Route },
  { number: "04", title: "服务始终在线", body: "数字人与地图均采用双引擎兜底，弱网与多端环境下依然稳定可用。", icon: ShieldCheck },
];

export default function HomePage() {
  return (
    <SiteShell>
      <main>
        <section className="hero">
          <div className="hero__ambient hero__ambient--one" /><div className="hero__ambient hero__ambient--two" />
          <div className="container hero__inner">
            <div className="hero__kicker hero-enter"><Sparkles size={14} /><span>新一代智慧景区 AI 导览平台</span></div>
            <h1 className="serif hero-enter hero-title">让每一步探索，<em>都有智慧相伴</em></h1>
            <p className="hero__copy hero-enter hero-copy">融合智能讲解、个性路线与数字人交互，把景区服务装进每一位游客的随身终端。</p>
            <div className="hero__actions hero-enter hero-actions"><Link className="button button--primary" href="#showcase">开始探索 <ArrowRight size={16} /></Link><Link className="button button--ghost" href="/docs">了解项目</Link></div>
            <div className="hero__aside hero-enter hero-aside"><span>SCENIC · AI · GUIDE</span><p>科技藏进风景里<br />体验留在旅程中</p></div>
          </div>
        </section>

        <ProductShowcase />

        <section className="section container capability-section">
          <div className="section-heading"><span className="eyebrow">CORE CAPABILITIES</span><h2>让景区导览，回到游览本身</h2><p>技术不应成为旅途的负担。数智游踪把复杂能力藏在简单、直觉的使用体验里。</p></div>
          <div className="capability-list">
            {capabilities.map((capability) => { const Icon = capability.icon; return <article key={capability.number}><span className="capability-list__number">{capability.number}</span><span className="capability-list__icon"><Icon size={20} /></span><div><h3>{capability.title}</h3><p>{capability.body}</p></div><ArrowRight className="capability-list__arrow" size={18} /></article>; })}
          </div>
        </section>

        <PlatformSection />

        <section className="home-cta">
          <div className="container home-cta__inner"><span className="eyebrow">START YOUR JOURNEY</span><h2 className="serif">山水有迹，智慧无界</h2><p>从一座景区出发，重新想象人与空间、故事和服务的连接方式。</p><div><Link className="button button--primary" href="/innovation">查看创新方案 <ArrowRight size={16} /></Link><Link className="button button--ghost" href="/roadmap">了解开发历程</Link></div></div>
        </section>
      </main>
    </SiteShell>
  );
}
