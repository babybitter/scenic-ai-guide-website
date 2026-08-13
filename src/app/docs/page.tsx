import type { Metadata } from "next";
import { Check, Code2, Map, Server, Smartphone, Sparkles } from "lucide-react";
import { DocsLayout } from "@/components/docs-layout";

export const metadata: Metadata = {
  title: "项目文档",
  description: "数智游踪项目介绍、安装部署、使用指南及技术选型文档。",
};

export default function DocsPage() {
  return (
    <DocsLayout>
      <header className="docs-article__hero" id="intro"><span>DOCUMENTATION · 2026</span><h1>数智游踪</h1><p className="docs-lead">一个面向智慧景区的全端 AI 导览平台。</p><p>数智游踪连接景区空间数据、文旅知识与多模态交互能力，为游客提供“行前可规划、在途有讲解、到点能交互”的连续游览体验。</p><div className="docs-callout"><Sparkles size={19} /><p><strong>我们的目标：</strong>让复杂的数字化能力隐于山水之间，让每一位游客都能自然地获得可靠、个性化的导览服务。</p></div></header>

      <section id="capabilities"><h2>核心能力</h2><div className="docs-feature-grid"><div><Map size={19} /><strong>地图导览</strong><p>景点、路线与服务设施统一呈现，支持实时定位和空间触发。</p></div><div><Sparkles size={19} /><strong>AI 智能讲解</strong><p>知识库增强问答，支持自由追问与多风格内容生成。</p></div><div><Smartphone size={19} /><strong>全端发布</strong><p>一套业务能力覆盖 Web、桌面、移动端与小程序。</p></div><div><Server size={19} /><strong>稳定兜底</strong><p>地图与数字人双引擎可切换，保障弱网及异常环境可用。</p></div></div></section>

      <section id="requirements"><h2>安装与部署教程</h2><h3>环境准备</h3><p>建议在 Linux 服务器部署服务端，终端应用按需分发。开发与部署环境需要：</p><ul className="docs-checklist"><li><Check size={15} />Node.js 20 或更高版本</li><li><Check size={15} />Docker 24+ 与 Docker Compose</li><li><Check size={15} />PostgreSQL 15+、Redis 7+</li><li><Check size={15} />具备 HTTPS 证书的正式域名</li></ul></section>

      <section id="local-deploy"><h3>本地部署</h3><p>拉取项目后安装依赖，并复制环境变量模板。生产密钥只写入服务器环境，不提交至代码仓库。</p><pre><code>{`git clone <project-repository>\ncd scenic-ai-guide\nnpm install\ncp .env.example .env.local\nnpm run dev`}</code></pre><p>开发服务启动后，通过 <code>http://localhost:3000</code> 访问管理与游客端页面。</p></section>

      <section id="docker-deploy"><h3>容器化部署</h3><p>正式环境建议使用 Docker Compose 编排网关、业务服务、数据库和缓存，便于统一升级与回滚。</p><pre><code>{`docker compose pull\ndocker compose up -d\ndocker compose ps`}</code></pre><div className="docs-note"><strong>上线检查</strong><p>确认地图服务密钥已配置域名白名单、数字人服务回调地址可达，并完成核心景点数据的离线缓存。</p></div></section>

      <section id="create-scenic"><h2>使用指南</h2><h3>创建景区</h3><ol><li>在管理端新建景区，填写名称、开放时间和服务联系方式。</li><li>导入景区边界、路网、景点与公共设施的空间数据。</li><li>选择地图主引擎，并配置 Leaflet 离线底图作为兜底。</li></ol></section>

      <section id="content-config"><h3>配置导览内容</h3><p>为每个景点维护结构化资料、讲解稿、图片和问答知识。发布前通过内容预览检查事实准确性、讲解时长和敏感内容。</p><div className="docs-steps"><span>资料入库</span><i>→</i><span>知识切片</span><i>→</i><span>AI 校验</span><i>→</i><span>多端发布</span></div></section>

      <section id="publish"><h3>发布多端应用</h3><p>Web 与 H5 可通过统一域名直接发布；桌面客户端从国内服务器下载入口分发；移动端与小程序复用统一 API、鉴权及内容模型。</p></section>

      <section id="stack"><h2>技术选型与方案对比</h2><h3>技术选型</h3><div className="stack-list"><div><Code2 size={18} /><strong>前端</strong><p>Next.js + React + TypeScript，兼顾 SSR、SEO 与组件复用。</p></div><div><Server size={18} /><strong>服务端</strong><p>模块化 API 服务 + PostgreSQL/PostGIS，统一管理业务与空间数据。</p></div><div><Map size={18} /><strong>地图</strong><p>腾讯地图承载在线体验，Leaflet 提供可控的开源与离线兜底。</p></div><div><Sparkles size={18} /><strong>智能交互</strong><p>知识库增强生成结合讯飞数字人、Live2D，平衡能力与稳定性。</p></div></div></section>

      <section id="comparison"><h3>方案对比</h3><div className="docs-table-wrap"><table><thead><tr><th>决策项</th><th>选用方案</th><th>备选方案</th><th>决策依据</th></tr></thead><tbody><tr><td>应用框架</td><td>Next.js</td><td>纯 SPA</td><td>主站 SEO、路由能力与多端组件复用更完整</td></tr><tr><td>空间数据</td><td>PostGIS</td><td>普通关系表</td><td>原生空间索引适合景点邻近检索与路线计算</td></tr><tr><td>在线地图</td><td>腾讯地图</td><td>单一开源底图</td><td>国内 POI、路径规划与访问稳定性更优</td></tr><tr><td>数字人</td><td>讯飞 + Live2D</td><td>单一云服务</td><td>云端表现力与本地可用性兼顾，避免单点依赖</td></tr></tbody></table></div></section>

      <section id="fallback"><h3>双引擎兜底策略</h3><p>系统对地图与数字人分别抽象统一适配层。主服务异常、弱网或设备性能不足时，运行时按健康检查结果无感切换：</p><div className="fallback-flow"><div><small>数字人</small><strong>讯飞数字人</strong><span>主引擎</span></div><i>⇄</i><div><small>本地兜底</small><strong>Live2D</strong><span>轻量稳定</span></div><b>＋</b><div><small>在线地图</small><strong>腾讯地图</strong><span>主引擎</span></div><i>⇄</i><div><small>开源兜底</small><strong>Leaflet</strong><span>离线可用</span></div></div></section>

      <section className="thanks-placeholder" id="thanks"><h2>致谢</h2><div><span>ACKNOWLEDGMENTS</span><p>此区域已预留，后续补充指导教师、合作单位及开源项目致谢内容。</p></div></section>
    </DocsLayout>
  );
}
