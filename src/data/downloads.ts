/**
 * @fileoverview 数智游踪官网的多端下载地址与发布状态配置。
 *
 * @description
 * 统一维护网页端、桌面端和移动端的公开入口、安装包版本及文件地址，
 * 供主页使用方式卡片与下载页面共同读取，避免各页面重复拼接发布链接。
 */

/**
 * @typedef {'ready'|'soon'|'planned'} DownloadStatus
 * @description 下载目标的可用状态：可下载、即将开放或规划中。
 */
export type DownloadStatus = 'ready' | 'soon' | 'planned'

/**
 * @typedef {object} DownloadTarget
 * @description 官网下载页面中的单个平台入口。
 * @property {string} id 平台入口的稳定标识。
 * @property {string} title 平台或客户端名称。
 * @property {string} platform 支持的系统版本或运行环境。
 * @property {string} format 安装包或入口格式。
 * @property {string} description 客户端能力与适用场景说明。
 * @property {string} [href] 仅包含一个入口时使用的直接访问地址。
 * @property {Array<{label: string, href: string}>} [links] 包含多个架构或格式时使用的下载链接。
 * @property {DownloadStatus} status 当前发布状态。
 * @property {string} [badge] 展示在下载卡片上的状态徽标。
 */
export interface DownloadTarget {
  id: string
  title: string
  platform: string
  format: string
  description: string
  href?: string
  links?: Array<{ label: string; href: string }>
  status: DownloadStatus
  badge?: string
}

/**
 * @description 数智游踪现有产品 Web 应用的公开入口。
 * @type {string}
 */
export const webAppUrl = 'https://www.shuzhiyouzong.cn'

/**
 * @description 自有 Linux 下载服务器对外提供安装包的基础目录。
 * @type {string}
 */
export const downloadHost = 'https://www.shuzhiyouzong.cn/downloads'

/**
 * @description 当前官网用于拼接各平台安装包文件名的统一发布版本。
 * @type {string}
 */
export const releaseVersion = '0.2.0'

/**
 * @description 当前版本 Android APK 的直接下载地址。
 * @type {string}
 */
export const androidDownloadUrl = `${downloadHost}/shuzhiyouzong-${releaseVersion}-android.apk`

/**
 * @description 当前版本 HarmonyOS HAP 的直接下载地址。
 * @type {string}
 */
export const harmonyDownloadUrl = `${downloadHost}/shuzhiyouzong-${releaseVersion}-harmony.hap`

/**
 * @description 定义网页端及各桌面、移动平台在下载页中的入口和发布状态。
 * @type {DownloadTarget[]}
 * @example
 * const windowsTarget = downloadTargets.find((target) => target.id === 'windows')
 */
export const downloadTargets: DownloadTarget[] = [
  {
    id: 'web',
    title: '电脑网页端',
    platform: '浏览器即开即用',
    format: 'Web',
    description: '免安装体验数字人问答、景点讲解、地图导览与管理后台。',
    href: webAppUrl,
    status: 'ready',
    badge: '立即体验',
  },
  {
    id: 'windows',
    title: 'Windows 客户端',
    platform: 'Windows 10 / 11 · x64',
    format: 'EXE',
    description: '集成网页、Node.js 服务和本地知识库运行时的一体化安装包。',
    href: `${downloadHost}/ShuzhiYouzong-${releaseVersion}-win-x64.exe`,
    status: 'ready',
    badge: '评审测试包',
  },
  {
    id: 'linux',
    title: 'Linux 客户端',
    platform: '主流 x64 发行版',
    format: 'AppImage / DEB',
    description: '便携 AppImage 与 Debian 安装包并行提供，适配景区终端设备。',
    links: [
      { label: 'AppImage', href: `${downloadHost}/ShuzhiYouzong-${releaseVersion}-linux-x86_64.AppImage` },
      { label: 'DEB', href: `${downloadHost}/ShuzhiYouzong-${releaseVersion}-linux-amd64.deb` },
    ],
    status: 'ready',
    badge: '评审测试包',
  },
  {
    id: 'mac',
    title: 'macOS 客户端',
    platform: 'Intel / Apple Silicon',
    format: 'DMG',
    description: '分别构建 x64 与 arm64 安装镜像，覆盖两代 Mac 平台。',
    links: [
      { label: 'Apple Silicon', href: `${downloadHost}/ShuzhiYouzong-${releaseVersion}-mac-arm64.dmg` },
      { label: 'Intel', href: `${downloadHost}/ShuzhiYouzong-${releaseVersion}-mac-x64.dmg` },
    ],
    status: 'ready',
    badge: '评审测试包',
  },
  {
    id: 'android',
    title: 'Android App',
    platform: 'Android 8.0 及以上',
    format: 'APK',
    description: '面向游客随身使用的移动导览客户端，覆盖问答、地图、讲解与路线体验。',
    href: androidDownloadUrl,
    status: 'ready',
    badge: `Release v${releaseVersion}`,
  },
  {
    id: 'harmony',
    title: 'HarmonyOS 客户端',
    platform: 'HarmonyOS NEXT',
    format: 'HAP',
    description: '基于鸿蒙原生能力交付的游客端安装包，延续统一的景区导览服务流程。',
    href: harmonyDownloadUrl,
    status: 'ready',
    badge: `Release v${releaseVersion}`,
  },
]

/**
 * @typedef {object} MobileTarget
 * @description 首页移动游客端发布状态列表中的单个平台。
 * @property {string} name 移动平台名称。
 * @property {string} note 当前安装包或入口状态说明。
 * @property {DownloadStatus} status 当前发布状态。
 * @property {string} [href] 安装包已开放时的直接下载地址。
 */

/**
 * @description 定义 Android、HarmonyOS 与微信小程序三端的当前发布状态。
 * @type {MobileTarget[]}
 * @example
 * const readyMobileTargets = mobileTargets.filter((target) => target.status === 'ready')
 */
export const mobileTargets = [
  { name: 'Android App', note: `APK Release v${releaseVersion} 已开放`, status: 'ready', href: androidDownloadUrl },
  { name: 'HarmonyOS', note: `HAP Release v${releaseVersion} 已开放`, status: 'ready', href: harmonyDownloadUrl },
  { name: '微信小程序', note: '入口保留 · 二维码待更新', status: 'soon' },
]
