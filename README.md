# 数智游踪官方网站

第十五届中国软件杯 A5 赛题「景区导览服务 AI 数字人」参赛项目的官方介绍网站。

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

下载链接集中维护在 `src/data/downloads.ts`。当前网页端与三类桌面评审测试包均已接入自有服务器直链；移动五端继续保持“规划中”状态。

## 部署

站点可通过 `PUBLIC_BASE_PATH` 部署到子路径，例如：

```bash
PUBLIC_BASE_PATH=/website-preview/ npm run build
```

当前评审测试包通过 `www.shuzhiyouzong.cn/downloads/` 由自有 Linux 服务器分发；`download` 子域名完成 DNS 与证书配置后可再迁移到独立入口。
