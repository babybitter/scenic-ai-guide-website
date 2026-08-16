# 数智游踪官方网站

第十五届中国软件杯 A5 赛题「景区导览服务 AI 数字人」参赛项目的官方介绍网站。

## 页面结构

- `/`：品牌 Banner、七页产品展示、项目创新点、多端入口与路线图摘要
- `/docs/*`：项目介绍、安装部署、使用指南、技术选型对比与致谢
- `/roadmap`：MVP、架构重构、交付收敛及后续边界
- `/innovation`：七项工程创新的独立高密度说明页
- `/download`：Web、Windows、Linux、macOS、Android 与 HarmonyOS 下载入口

产品轮播配置位于 `src/data/content.ts`。其中 `placeholder-*.svg` 为等待替换的明确占位图；获得产品截图后保持文件名或更新 `image` 字段即可。

## 本地开发

```bash
npm install
npm run dev
```

## 工程检查

```bash
npm run lint
npm run build
```

## 域名规划

- `shuzhiyouzong.cn`：品牌主站
- `www.shuzhiyouzong.cn`：现有产品应用入口（后续建议迁移至 `app`）
- `app.shuzhiyouzong.cn`：游客与演示端
- `admin.shuzhiyouzong.cn`：景区管理端
- `docs.shuzhiyouzong.cn`：文档站
- `download.shuzhiyouzong.cn`：自有服务器安装包
- `api.shuzhiyouzong.cn`：服务 API
- `status.shuzhiyouzong.cn`：服务状态

下载链接集中维护在 `src/data/downloads.ts`。当前网页端、三类桌面评审测试包、Android APK 与 HarmonyOS HAP 均已接入自有服务器直链；微信小程序保留发布位置，待二维码更新后开放。

## 部署

站点可通过 `PUBLIC_BASE_PATH` 部署到子路径，例如：

```bash
PUBLIC_BASE_PATH=/website-preview/ npm run build
```

当前安装包通过 `www.shuzhiyouzong.cn/downloads/` 由自有 Linux 服务器分发。该路径启用 Nginx 目录索引，访问目录可查看下载站，访问完整文件名可直接下载；配置样例位于 `deploy/nginx/scenic-downloads.conf`。
