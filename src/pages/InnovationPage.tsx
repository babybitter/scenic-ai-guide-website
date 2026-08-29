/**
 * @fileoverview 数智游踪项目创新点页面组件。
 *
 * @description
 * 集中呈现多端交付、数字人兜底、地图兜底、知识问答与运营闭环等工程创新，
 * 并明确每项能力当前可验证的实现边界。
 */
import { Activity, AudioLines, BookOpenCheck, Layers3, MapPinned, MessagesSquare, Network } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

/**
 * @description 定义创新点页面展示的工程实践、说明文案及对应图标。
 * @type {Array<{number: string, icon: import('lucide-react').LucideIcon, title: string, subtitle: string, body: string, note: string}>}
 */
const innovations = [
  {
    number: '01', icon: Layers3, title: '一套业务，覆盖多端', subtitle: 'FULL-STACK MULTI-PLATFORM DELIVERY',
    body: 'Vue 3 游客端与管理端、Node.js 同源服务和 Electron 桌面运行时共享业务模型。Web、Windows、Linux、macOS、Android 与 HarmonyOS 已形成可运行交付；微信小程序保留发布入口并等待二维码更新。',
    note: '多端不是简单套壳：网络、文件、音频、地图、权限与本地服务能力均进入平台适配层。',
  },
  {
    number: '02', icon: AudioLines, title: '数字人双引擎连续服务', subtitle: 'IFLYTEK + LIVE2D RESILIENCE',
    body: '讯飞交互式数字人承担云端实时画面、音色与口型表现；Live2D 提供本地模型渲染、TTS 音频和 MotionSync 口型链路。两者通过统一播报、打断与状态接口协作。',
    note: '当前边界是可配置切换与多层降级，不将其夸大为任意页面都已无感自动切换。',
  },
  {
    number: '03', icon: MapPinned, title: '地图双底图韧性导览', subtitle: 'TENCENT MAP + LEAFLET FALLBACK',
    body: '联网环境优先使用腾讯地图承载标准底图与地理语义；离线、Key 缺失或 SDK 失败时，由 Leaflet 接管本地手绘图、景点、设施与路线。',
    note: '坐标转换、手绘图旋转、Marker 与道路折线采用统一模型，避免底图切换后二次偏移。',
  },
  {
    number: '04', icon: Network, title: '双景区统一导览运行时', subtitle: 'MULTI-SCENIC RUNTIME',
    body: '灵山胜境与拈花湾复用同一套地图、路线、全景与讲解架构，同时保持数据、缓存与交互状态隔离。新增景区不再复制页面，而是加载经过审计的数据包。',
    note: '迁移过程保留点位、路线锚点、图块、媒体和全景审计，不为凑数量伪造坐标或景点匹配。',
  },
  {
    number: '05', icon: BookOpenCheck, title: '可追溯的本地知识问答', subtitle: 'GROUNDED LOCAL RAG',
    body: '景区官方资料被转换为结构化景点与知识分块，通过关键词、内容覆盖、景点实体加权和意图重排完成检索。答案保留来源，资料未覆盖时明确说明边界。',
    note: '固定 FAQ 与缓存用于稳定高频服务，不使用纯模型记忆替代景区事实。',
  },
  {
    number: '06', icon: Activity, title: '多来源讲解的单音源调度', subtitle: 'SINGLE-SOURCE AUDIO ORCHESTRATION',
    body: '地图讲解可能来自数字人、官方原声、后端 TTS、浏览器语音或纯文字。统一讲解协调器负责选择、停止与释放当前来源，避免多个音频争抢播放。',
    note: '地图和全景切换时保留必要状态，并回收 WebRTC、Audio 与渲染资源。',
  },
  {
    number: '07', icon: MessagesSquare, title: '从游客反馈回到内容维护', subtitle: 'SERVICE QUALITY FEEDBACK LOOP',
    body: '一次问答同时记录来源、质量标签、阶段耗时、评分与评论。运营人员可从低满意会话回溯具体消息，完成错误标注并形成知识补充草稿。',
    note: '热门问题、景点关注与质量报告继续反向指导 FAQ 和景区内容更新。',
  },
]

/**
 * @description 渲染数智游踪七项工程创新及其实现边界说明。
 * @returns {JSX.Element} 包含创新实践列表与总结的 React 元素。
 * @example
 * <InnovationPage />
 */
export function InnovationPage() {
  return (
    <div className="subpage innovation-page">
      <section className="page-hero section-pad">
        <div className="container narrow"><span className="competition-pill">TECHNICAL INNOVATION</span><h1>创新不止“能演示”，<br /><em>更要可解释、可降级、可交付</em></h1><p>数智游踪把创新放在真实景区约束中衡量：网络会波动、云服务有边界、终端各不相同，核心导览仍应连续工作。</p></div>
      </section>
      <section className="innovation-detail section-pad">
        <div className="container">
          <SectionHeading eyebrow="SEVEN PRACTICES" title="七项工程创新，构成一条韧性服务链" body="每一项都对应当前代码、数据或交付链路，也明确保留仍需继续验证的边界。" />
          <div className="innovation-detail-list">
            {innovations.map((item) => <article key={item.number} tabIndex={0}>
              <div className="innovation-detail-number"><span>{item.number}</span><item.icon size={23} /></div>
              <div><small>{item.subtitle}</small><h2>{item.title}</h2><p>{item.body}</p><em>{item.note}</em></div>
            </article>)}
          </div>
          <div className="innovation-conclusion"><b>创新判断</b><p>数智游踪的重点不是堆叠模型或终端数量，而是在外部服务不稳定、景区数据存在边界、终端环境不同的条件下，仍然保持导览链路可解释、可降级、可维护和可交付。</p></div>
        </div>
      </section>
    </div>
  )
}
