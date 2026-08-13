# 数智游踪官方网站

「数智游踪」智慧景区 AI 导览项目的官方介绍网站。项目基于 Next.js App Router 开发，以克制留白、细线布局与自然过渡构建独立品牌、内容体系和多端响应式体验。

## 页面

- `/`：项目首页、产品能力轮播、核心能力与多端下载入口
- `/docs`：项目介绍、安装部署、使用指南、技术选型与方案对比
- `/roadmap`：MVP、架构重构、功能打磨与规模化验证路线图
- `/innovation`：全端覆盖、数字人双兜底、地图双兜底与扩展创新点

## 本地开发

```bash
npm ci
npm run dev
```

访问 `http://localhost:3000`。

## 质量检查

```bash
npm run check
```

该命令依次执行 ESLint、TypeScript 类型检查与生产构建。

## 正式产品截图

首页产品轮播位于 `src/components/product-showcase.tsx`。当前内置了四组与项目能力对应的界面预览，后续收到正式产品截图后，可将预览节点替换为 `next/image`，保留现有的标签、自动轮播、左右切换与响应式容器。

## 下载入口

客户端下载地址集中维护在 `src/components/platform-section.tsx`，当前统一指向 `https://www.shuzhiyouzong.cn/downloads/` 下的文件。文件名可在正式安装包确定后直接调整。

## 域名规划

- 主站：`www.shuzhiyouzong.cn`
- 文档：`docs.shuzhiyouzong.cn`，部署时可将该域名反向代理至 `/docs`
- 下载：`www.shuzhiyouzong.cn/downloads/`

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Lucide React（仅复用源码工程已有图标体系）

项目不包含网页克隆模板、Agent 指令、抓取脚本、参考站品牌资源或旧站业务内容。
