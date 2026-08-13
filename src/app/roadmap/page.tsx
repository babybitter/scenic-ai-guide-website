import type { Metadata } from "next";
import { AlertCircle, ArrowRight, CheckCircle2, GitBranch, Lightbulb, Rocket, Settings2, Wrench } from "lucide-react";
import { FeedbackPanel } from "@/components/feedback-panel";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "项目路线图", description: "数智游踪从 MVP 到架构重构与体验打磨的完整迭代历程。" };

const phases = [
  {
    id: "PHASE 01", period: "MVP 最小版本", state: "已完成", title: "先让一条导览路线真正跑起来", summary: "围绕游客最核心的“找路、听讲解、问问题”构建可验证闭环。", icon: Rocket,
    progress: ["完成景点与服务设施数据模型", "实现基础地图标注、定位与路线展示", "接入景区知识库与 AI 问答", "搭建 Web 端游客入口"],
    issue: "景区资料来源分散、格式不一，知识切片后易丢失空间与上下文关系。",
    decision: "采用结构化景点主数据关联知识片段，检索时同步注入位置、景点和游览阶段上下文。",
  },
  {
    id: "PHASE 02", period: "架构重构", state: "已完成", title: "从单点原型走向可扩展平台", summary: "拆分地图、数字人、知识服务与终端层，让每项能力可以独立替换和演进。", icon: GitBranch,
    progress: ["统一多端 API 与鉴权模型", "抽象地图适配层与数字人适配层", "引入 PostGIS 空间索引和 Redis 缓存", "完善服务健康检查与降级策略"],
    issue: "单一云地图与数字人服务形成强依赖，弱网、配额或服务异常会中断核心导览流程。",
    decision: "确立双地图、双数字人引擎架构：腾讯地图 ↔ Leaflet，讯飞数字人 ↔ Live2D。",
  },
  {
    id: "PHASE 03", period: "功能打磨", state: "进行中", title: "把技术能力打磨成自然体验", summary: "围绕真实游览动线优化首屏速度、语音交互、路线推荐和终端一致性。", icon: Wrench,
    progress: ["优化位置触发的讲解时机", "完善亲子、适老与摄影主题路线", "适配 Windows、Linux 与 macOS 客户端", "构建内容审核及运营数据面板"],
    issue: "不同终端的性能、屏幕与交互方式差异明显，同一套界面无法直接覆盖全部场景。",
    decision: "共享业务模型与组件语义，按 Web、桌面和移动端的使用距离分别设计交互密度。",
  },
  {
    id: "PHASE 04", period: "规模化验证", state: "下一步", title: "进入景区，接受真实客流检验", summary: "以小范围试点验证高并发、弱网、运营配置与游客反馈闭环。", icon: Settings2,
    progress: ["接入试点景区真实空间数据", "完成峰值客流压力测试", "上线游客反馈与需求分级", "扩展 App、鸿蒙、小程序和 H5 终端"],
    issue: "真实景区网络、客流峰值和内容更新频率远比实验环境复杂。",
    decision: "采用离线包、边缘缓存与灰度发布组合方案，先小范围验证，再分批扩大覆盖。",
  },
];

export default function RoadmapPage() {
  return (
    <SiteShell>
      <main className="subpage roadmap-page">
        <header className="subpage-hero container"><span className="eyebrow">PROJECT ROADMAP</span><h1 className="serif">从一个可用原型，走向完整的景区体验</h1><p>路线图不只记录“做了什么”，也保留每个阶段遇到的问题，以及我们为何做出当时的技术选择。</p><div className="subpage-hero__actions"><a className="button button--ghost" href="#journey">查看迭代历程 <ArrowRight size={16} /></a><FeedbackPanel /></div></header>
        <section className="roadmap container" id="journey">
          <div className="roadmap__line" />
          {phases.map((phase, index) => { const Icon = phase.icon; return <article className="roadmap-phase" key={phase.id}><div className="roadmap-phase__marker"><span>{String(index + 1).padStart(2, "0")}</span></div><div className="roadmap-phase__card"><header><div><span>{phase.id} · {phase.period}</span><h2>{phase.title}</h2><p>{phase.summary}</p></div><span className={`phase-state phase-state--${index}`}>{phase.state}</span></header><div className="roadmap-phase__content"><section><h3><Icon size={17} />开发进展</h3><ul>{phase.progress.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul></section><section><h3><AlertCircle size={17} />核心技术问题</h3><p>{phase.issue}</p></section><section><h3><Lightbulb size={17} />关键选型决策</h3><p>{phase.decision}</p></section></div></div></article>; })}
        </section>
        <section className="roadmap-feedback container"><div><span className="eyebrow">YOUR VOICE MATTERS</span><h2>你走过的每一步，都能帮助我们改进下一步</h2><p>没有“太小”的问题。一个难找的入口、一段不合时宜的讲解，或一次绕远的路线，都是值得解决的真实体验。</p></div><FeedbackPanel /></section>
      </main>
    </SiteShell>
  );
}
