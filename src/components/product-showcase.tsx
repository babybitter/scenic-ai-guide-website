"use client";

import { Bot, ChevronLeft, ChevronRight, Map, MapPin, Navigation, Route, Search, Sparkles, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const scenes = [
  {
    eyebrow: "01 / 智慧地图",
    title: "一张图，读懂整座景区",
    description: "聚合景点、服务设施与游览动线，实时定位当前位置，少走回头路。",
    tab: "地图导览",
    accent: "green",
  },
  {
    eyebrow: "02 / AI 讲解",
    title: "走到哪里，故事就讲到哪里",
    description: "融合景点知识库与大模型问答，支持语音唤醒、连续追问和个性化讲解。",
    tab: "智能讲解",
    accent: "red",
  },
  {
    eyebrow: "03 / 行程编排",
    title: "把时间留给风景",
    description: "根据游览时长、兴趣偏好和实时位置，生成可执行的个性化路线。",
    tab: "路线规划",
    accent: "amber",
  },
  {
    eyebrow: "04 / 数字人",
    title: "更自然，也更可靠的导览陪伴",
    description: "讯飞数字人与 Live2D 双引擎协同，兼顾表现力、弱网环境与终端性能。",
    tab: "数字导游",
    accent: "blue",
  },
];

function MapPreview() {
  return (
    <div className="demo-app demo-app--map">
      <aside className="demo-sidebar">
        <span className="demo-sidebar__logo"><Route size={18} /></span>
        <Navigation size={18} />
        <Map size={18} />
        <Bot size={18} />
        <span className="demo-sidebar__avatar">游</span>
      </aside>
      <div className="demo-map">
        <div className="demo-search"><Search size={15} /><span>搜索景点、服务设施</span></div>
        <div className="demo-map__road demo-map__road--one" />
        <div className="demo-map__road demo-map__road--two" />
        <span className="demo-pin demo-pin--one"><MapPin size={18} />观景台</span>
        <span className="demo-pin demo-pin--two"><MapPin size={18} />游客中心</span>
        <span className="demo-pin demo-pin--three"><MapPin size={18} />云水栈道</span>
        <div className="demo-location"><Navigation size={15} fill="currentColor" /></div>
        <div className="demo-route-card"><small>为你推荐</small><strong>山水人文精华线</strong><span>6 个景点 · 约 2.5 小时</span></div>
      </div>
    </div>
  );
}

function GuidePreview() {
  return (
    <div className="demo-app demo-app--guide">
      <aside className="demo-sidebar"><span className="demo-sidebar__logo"><Route size={18} /></span><Navigation size={18} /><Map size={18} /><Bot size={18} /><span className="demo-sidebar__avatar">游</span></aside>
      <div className="guide-stage">
        <div className="guide-stage__meta"><span>正在游览</span><strong>云水栈道</strong><small>距你 80 米</small></div>
        <div className="guide-orb"><Sparkles size={28} /><span className="guide-orb__wave guide-orb__wave--one" /><span className="guide-orb__wave guide-orb__wave--two" /></div>
        <div className="guide-dialog">
          <div className="guide-dialog__head"><span><Volume2 size={15} /></span><strong>小踪正在为你讲解</strong><small>01:26</small></div>
          <p>这条栈道依山临水而建。向左看，山体层叠形成了景区最具代表性的天际线……</p>
          <div className="guide-dialog__actions"><button>为什么叫云水栈道？</button><button>附近还有什么？</button></div>
        </div>
      </div>
    </div>
  );
}

function RoutePreview() {
  return (
    <div className="demo-app demo-app--route">
      <aside className="demo-sidebar"><span className="demo-sidebar__logo"><Route size={18} /></span><Navigation size={18} /><Map size={18} /><Bot size={18} /><span className="demo-sidebar__avatar">游</span></aside>
      <div className="route-panel">
        <header><small>我的一日游</small><strong>山水之间，人文漫游</strong><span>预计 4 小时 20 分</span></header>
        <div className="route-timeline">
          {[
            ["09:00", "游客中心", "领取导览设备，了解今日客流"],
            ["09:35", "云水栈道", "轻徒步 · 建议停留 45 分钟"],
            ["11:00", "山顶观景台", "最佳拍摄点 · 海拔 620 米"],
            ["12:10", "溪畔茶舍", "午间休息 · 可预约"],
          ].map(([time, title, desc], index) => <div className="route-stop" key={title}><time>{time}</time><span className={`route-stop__dot route-stop__dot--${index}`} /><div><strong>{title}</strong><small>{desc}</small></div></div>)}
        </div>
      </div>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div className="demo-app demo-app--avatar">
      <aside className="demo-sidebar"><span className="demo-sidebar__logo"><Route size={18} /></span><Navigation size={18} /><Map size={18} /><Bot size={18} /><span className="demo-sidebar__avatar">游</span></aside>
      <div className="avatar-stage">
        <div className="avatar-visual"><div className="avatar-halo" /><div className="avatar-head"><span /><span /></div><div className="avatar-body" /></div>
        <div className="avatar-copy"><small>数字导游 · 小踪</small><strong>你好，今天想从哪里出发？</strong><p>我可以为你讲景点故事、规划路线，也能回答游览中的任何问题。</p><div className="avatar-chips"><span>人文历史</span><span>亲子轻松游</span><span>摄影路线</span></div><div className="avatar-input"><Volume2 size={15} /><span>按住说话，或输入你的问题</span></div></div>
      </div>
    </div>
  );
}

const previews = [<MapPreview key="map" />, <GuidePreview key="guide" />, <RoutePreview key="route" />, <AvatarPreview key="avatar" />];

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const revealRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % scenes.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  function step(direction: number) {
    setActive((value) => (value + direction + scenes.length) % scenes.length);
  }

  return (
    <div className="reveal" ref={revealRef}>
      <section className="section container showcase" id="showcase">
        <div className="section-heading">
          <span className="eyebrow">PRODUCT TOUR</span>
          <h2>在山水间，找到你的游览节奏</h2>
          <p>从行前规划到在途讲解，把复杂的景区信息整理成一条清晰、自然、可靠的旅程。</p>
        </div>
        <div className="showcase__tabs" role="tablist" aria-label="产品功能预览">
          {scenes.map((scene, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={scene.tab}>{scene.tab}</button>)}
        </div>
        <div className={`showcase__frame showcase__frame--${scenes[active].accent}`}>
          <div className="showcase__copy">
            <span>{scenes[active].eyebrow}</span>
            <h3>{scenes[active].title}</h3>
            <p>{scenes[active].description}</p>
            <div className="showcase__controls"><button type="button" onClick={() => step(-1)} aria-label="上一个功能"><ChevronLeft size={19} /></button><span>{String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span><button type="button" onClick={() => step(1)} aria-label="下一个功能"><ChevronRight size={19} /></button></div>
          </div>
          <div className="showcase__preview"><div className="showcase__slider" style={{ transform: `translateX(-${active * 100}%)` }}>{previews.map((preview, index) => <div className="showcase__slide" key={scenes[index].tab}>{preview}</div>)}</div></div>
        </div>
        <p className="showcase__hint">正式产品截图可直接替换此处展示内容，轮播与切换交互无需调整。</p>
      </section>
    </div>
  );
}
