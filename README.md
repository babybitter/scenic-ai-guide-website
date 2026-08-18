# 数智游踪官方网站

数智游踪官方网站是第十五届中国软件杯 A5 赛题「景区导览服务 AI 数字人」项目的产品介绍、文档与下载入口。网站用于展示项目价值、核心能力、技术选型、迭代路线和可获取的客户端。

## 功能概览

- 首页 Banner、项目价值说明与七项产品能力轮播展示。
- 项目创新点、开发路线图和需求建议反馈页面。
- 文档站：项目介绍、安装与部署指南、使用操作指南、技术选型与方案对比、致谢。
- 下载站入口：网页端、Windows、Linux、macOS、Android 与 HarmonyOS。
- 简体中文、繁体中文和 English 三种界面语言。
- 深色模式、响应式布局、移动端汉堡菜单、滚动收起/恢复导航和首屏淡入上移动效。

## 技术栈

| 层次 | 技术 | 用途 |
| --- | --- | --- |
| UI 框架 | React 19、React DOM | 页面组件与交互状态 |
| 开发语言 | TypeScript 5.9 | 类型安全的页面与数据模型 |
| 路由 | React Router 7 | SPA 路由、文档子页面和 `BrowserRouter` 基础路径 |
| 构建工具 | Vite 8 | 本地开发服务器、TypeScript 检查和生产构建 |
| 图标 | lucide-react | 导航、下载、外链、主题等图标 |
| 样式 | 原生 CSS、CSS Variables、媒体查询 | 设计令牌、主题、响应式和页面动效 |
| 代码质量 | ESLint 9、typescript-eslint、React Hooks 规则 | 静态检查与工程规范 |
| 静态资源 | `public/brand`、`public/screenshots` | 品牌标识和产品展示截图 |
| 部署 | Nginx 静态文件服务 | 网站 SPA 回退、HTTPS、下载目录索引与安装包直链 |

说明：本仓库是官网项目自身，采用 React + Vite；文档中的 Vue、Node.js、Electron、SQLite、讯飞数字人和地图服务属于数智游踪产品整体的技术生态，不是本仓库的依赖。

## 环境要求

- Node.js 20.19 及以上，或当前维护中的 Node.js LTS。
- npm 10 及以上（仓库已提交 `package-lock.json`）。
- Git。
- 生产部署需要一台可通过 SSH 管理的 Linux 服务器，以及 Nginx 和 HTTPS 证书。

## 本地开发

在仓库根目录执行：

```bash
npm ci
npm run dev
```

Vite 默认在 `http://localhost:5173` 启动开发服务器。需要让局域网内其他设备访问时，可执行：

```bash
npm run dev -- --host 0.0.0.0
```

Windows PowerShell、macOS 和 Linux 均使用同一组 npm 命令。修改 `src` 或 `public` 文件后，开发服务器会自动热更新。

## 构建与本地部署

### 生产构建与预览

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` 会先执行 TypeScript 项目检查，再生成 `dist/` 静态产物；`npm run preview` 用于在本机预览构建后的产物，不是生产服务器。

### 部署到根路径

将 `dist/` 的内容同步到 Nginx 网站根目录，并为 SPA 配置回退：

```nginx
root /var/www/scenic-ai-guide-website/current;
index index.html;

location / {
    try_files $uri $uri/ /index.html;
}
```

发布时建议使用不可变目录和软链接，例如将新版本上传到 `/var/www/scenic-ai-guide-website/releases/<版本目录>/`，检查完成后再把 `current` 原子切换到新目录。

### 部署到子路径

网站支持通过 `PUBLIC_BASE_PATH` 设置 Vite 基础路径，React Router 会同步使用该路径作为 `basename`。例如部署到 `/website-preview/`：

PowerShell：

```powershell
$env:PUBLIC_BASE_PATH = "/website-preview/"
npm run build
```

macOS/Linux：

```bash
PUBLIC_BASE_PATH=/website-preview/ npm run build
```

Nginx 对应的子路径同样需要 `try_files` 回退到该目录下的 `index.html`。如果部署在根路径，省略 `PUBLIC_BASE_PATH` 即可。

## 下载站部署

网站页面中的安装包链接集中维护在 [`src/data/downloads.ts`](src/data/downloads.ts)。当前公开下载目录为：

```text
https://www.shuzhiyouzong.cn/downloads/
```

Linux 服务器建议将安装包放在 `/var/www/shuzhiyouzong-downloads/`，并使用 [`deploy/nginx/scenic-downloads.conf`](deploy/nginx/scenic-downloads.conf) 中的 Nginx 配置。该配置提供目录索引和完整文件名直链：

```text
https://www.shuzhiyouzong.cn/downloads/<文件名>
```

当前文件名约定如下：

| 平台 | 文件名 |
| --- | --- |
| Windows | `ShuzhiYouzong-0.1.0-win-x64.exe` |
| Linux AppImage | `ShuzhiYouzong-0.1.0-linux-x86_64.AppImage` |
| Linux DEB | `ShuzhiYouzong-0.1.0-linux-amd64.deb` |
| macOS Apple Silicon | `ShuzhiYouzong-0.1.0-mac-arm64.dmg` |
| macOS Intel | `ShuzhiYouzong-0.1.0-mac-x64.dmg` |
| Android | `shuzhiyouzong-1.0.0-android.apk` |
| HarmonyOS | `shuzhiyouzong-1.0.0-harmony.hap` |

更新安装包时需要同时检查服务器文件名和 `src/data/downloads.ts` 的链接；如果只替换服务器文件而不更新数据文件，页面可能继续指向旧版本。Windows 和 macOS 评审包在完成商业签名、公证前，首次启动可能出现系统安全提示。

## 项目结构

```text
scenic-ai-guide-website/
├─ public/
│  ├─ brand/                 # Logo 与品牌静态资源
│  └─ screenshots/           # 产品展示截图与占位图
├─ src/
│  ├─ components/            # Brand、站点布局、轮播、磁吸按钮等通用组件
│  ├─ context/               # 语言状态与本地化文案
│  ├─ data/                  # 产品轮播、创新点、路线图、下载链接等数据
│  ├─ pages/                 # 首页、文档、路线图、创新点、反馈、下载页
│  ├─ App.tsx                # 路由表与页面入口
│  ├─ main.tsx               # React 挂载、语言上下文和 BrowserRouter
│  ├─ styles.css             # 全站样式、主题、响应式和动效
│  └─ vite-env.d.ts          # Vite 类型声明
├─ deploy/nginx/             # 文档站与下载站 Nginx 配置样例
├─ index.html                # Vite HTML 入口
├─ vite.config.ts            # Vite、React 插件和基础路径配置
├─ package.json              # 依赖与 npm scripts
├─ package-lock.json         # npm 依赖锁定文件
├─ tsconfig*.json            # TypeScript 配置
└─ eslint.config.js          # ESLint 配置
```

## 页面路由

| 路径 | 页面 |
| --- | --- |
| `/` | 首页：Banner、产品展示、创新点摘要、多端入口与路线图摘要 |
| `/docs` | 文档首页及文档导航 |
| `/docs/intro` | 数智游踪项目介绍 |
| `/docs/install` | 安装与部署指南 |
| `/docs/usage` | 使用操作指南 |
| `/docs/technology` | 技术选型与方案对比 |
| `/docs/thanks` | 致谢 |
| `/roadmap` | MVP、架构重构、细节打磨与交付边界 |
| `/innovation` | 项目创新点的完整说明 |
| `/feedback` | 面向游客和普通浏览者的需求与建议反馈 |
| `/download` | 网页端、桌面端和移动端下载入口 |

未知路径会由 React Router 重定向到首页。文档页使用固定导航，不参与主站滚动收起导航逻辑。

## 内容与资源维护

- 产品七项轮播在 `src/data/content.ts` 的 `featureSlides` 中维护，图片放在 `public/screenshots/`；替换截图时同步更新 `image` 字段。
- 首页、路线图和创新点的展示数据也位于 `src/data/content.ts`，页面组件只负责布局和交互。
- 多语言公共文案位于 `src/context/LanguageContext.tsx`，当前支持 `zh-CN`、`zh-TW` 和 `en`。
- 下载平台、架构快捷入口和服务器直链位于 `src/data/downloads.ts`。
- Nginx 配置样例位于 `deploy/nginx/`；其中 [`docs.shuzhiyouzong.cn.conf`](deploy/nginx/docs.shuzhiyouzong.cn.conf) 用于文档站 HTTPS 与 SPA 回退。

## 域名规划

当前规划只保留以下五个入口：

- `www.shuzhiyouzong.cn`：现有产品应用入口。
- `www.shuzhiyouzong.cn/website-preview`：项目介绍站
- `www.shuzhiyouzong.cn/downloads`：下载站
- `docs.shuzhiyouzong.cn`：文档站。
- `api.shuzhiyouzong.cn`：服务 API。

## 工程检查

提交前建议运行：

```bash
npm run lint
npm run build
git diff --check
```

只提交与当前变更相关的文件，不要将 `.env`、私钥、服务器凭证、构建机缓存或 `dist/` 临时产物提交到仓库。
