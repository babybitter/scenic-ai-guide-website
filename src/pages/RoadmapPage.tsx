import { ArrowRight, CheckCircle2, GitBranch, Lightbulb, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { roadmapStages } from '../data/content'

const stageFacts = [
  ['Vue / Node / SQLite 双端骨架', '多模态问答与来源引用', '讯飞数字人 + Live2D 预留', '路线推荐、反馈与运营模块', 'Windows 环境检查脚本'],
  ['地图组件域与讲解协调器', '灵山胜境 / 拈花湾双景区', '官方道路轨迹与手绘图块', 'Live2D MotionSync 口型', '知识去重与 PDF/XLSX 预览', '腾讯地图 + Leaflet'],
  ['Electron 三系统交付', 'Windows NSIS 安装包', 'Linux AppImage / DEB', 'macOS x64 / arm64 DMG', '包体、SQLite 与启动门禁', '不可变发布与原子回滚'],
]

export function RoadmapPage() {
  return (
    <div className="subpage">
      <section className="page-hero section-pad">
        <div className="container narrow">
          <span className="competition-pill"><GitBranch size={15} /> BUILD IN PUBLIC</span>
          <h1>每一次重构，都让导览<br /><em>更接近真实景区</em></h1>
          <p>以 Git 历史、项目文档与当前实现为依据，记录数智游踪从 MVP 到架构重构，再到多端交付收敛的真实过程。</p>
        </div>
      </section>

      <section className="roadmap-section section-pad">
        <div className="container">
          <SectionHeading eyebrow="THREE STAGES" title="三段迭代，一条完整产品化路径" />
          <div className="roadmap-timeline">
            {roadmapStages.map((stage, index) => (
              <article key={stage.title} className="roadmap-stage">
                <div className="stage-rail"><span>{index + 1}</span></div>
                <div className="stage-content">
                  <div className="stage-heading">
                    <div><span>{stage.phase}阶段</span><h2>{stage.title}</h2></div>
                    <b>PHASE 0{index + 1}</b>
                  </div>
                  <div className="stage-details">
                    <div><CheckCircle2 size={20} /><h3>开发进展</h3><p>{stage.progress}</p></div>
                    <div><TriangleAlert size={20} /><h3>技术问题</h3><p>{stage.problem}</p></div>
                    <div><Lightbulb size={20} /><h3>方案决策</h3><p>{stage.decision}</p></div>
                  </div>
                  <ul className="stage-facts">{stageFacts[index].map((fact) => <li key={fact}>{fact}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-boundaries section-pad">
        <div className="container">
          <SectionHeading eyebrow="CURRENT BOUNDARIES" title="当前边界，也是下一阶段的任务清单" body="路线图不只记录已经完成的内容，也公开仍需工程验证、产品验证和授权确认的部分。" />
          <div className="boundary-list">{[
            ['01', '知识能力', '让 PDF / XLSX 进入 RAG 索引，并定位到来源页码或工作表。'],
            ['02', '性能度量', '量化首反馈、首字、首句和首音频的 P50 / P95 时延。'],
            ['03', '路线语义', '继续验证可达性、无障碍与动态道路信息，但不将现有官方游线称为实时导航。'],
            ['04', '移动交付', '推进 Android、iOS、HarmonyOS、微信小程序和移动 H5 统一游客端。'],
            ['05', '正式发布', '完成 Windows / macOS 商业签名、公证、自动更新与第三方素材授权验收。'],
          ].map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="next-road section-pad">
        <div className="container">
          <SectionHeading eyebrow="NEXT MILESTONE" title="下一程：把移动端做成游客真正愿意打开的导览" />
          <div className="milestone-grid">
            {[
              ['阶段 0', '五端技术验证', '锁定 uni-app x、地图、录音、流式请求与数字人的能力矩阵。'],
              ['阶段 1', '统一工程骨架', '建设设计 Token、请求层、状态层、平台适配层和五导航页面。'],
              ['阶段 2', '核心闭环真机化', '首页景点 → 地图定位 → AI 讲解 → 生成路线 → 保存行程。'],
              ['阶段 3+', '多端质量收敛', '逐端验证弱网、权限、安全区、数字人降级与真机性能。'],
            ].map(([phase, title, body]) => (
              <article key={phase}><span>{phase}</span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
          <Link className="text-link" to="/feedback">从游客视角给出建议 <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  )
}
