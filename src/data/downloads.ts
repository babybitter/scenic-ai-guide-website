export type DownloadStatus = 'ready' | 'soon' | 'planned'

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

export const webAppUrl = 'https://www.shuzhiyouzong.cn'
export const downloadHost = 'https://www.shuzhiyouzong.cn/downloads'
export const androidDownloadUrl = `${downloadHost}/shuzhiyouzong-1.0.0-android.apk`
export const harmonyDownloadUrl = `${downloadHost}/shuzhiyouzong-1.0.0-harmony.hap`

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
    href: `${downloadHost}/ShuzhiYouzong-0.1.0-win-x64.exe`,
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
      { label: '下载 AppImage', href: `${downloadHost}/ShuzhiYouzong-0.1.0-linux-x86_64.AppImage` },
      { label: '下载 DEB', href: `${downloadHost}/ShuzhiYouzong-0.1.0-linux-amd64.deb` },
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
      { label: 'Apple Silicon', href: `${downloadHost}/ShuzhiYouzong-0.1.0-mac-arm64.dmg` },
      { label: 'Intel', href: `${downloadHost}/ShuzhiYouzong-0.1.0-mac-x64.dmg` },
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
    badge: 'v1.0.0',
  },
  {
    id: 'harmony',
    title: 'HarmonyOS 客户端',
    platform: 'HarmonyOS NEXT',
    format: 'HAP',
    description: '基于鸿蒙原生能力交付的游客端安装包，延续统一的景区导览服务流程。',
    href: harmonyDownloadUrl,
    status: 'ready',
    badge: 'v1.0.0',
  },
]

export const mobileTargets = [
  { name: 'Android App', note: 'APK v1.0.0 已开放', status: 'ready', href: androidDownloadUrl },
  { name: 'HarmonyOS', note: 'HAP v1.0.0 已开放', status: 'ready', href: harmonyDownloadUrl },
  { name: '微信小程序', note: '入口保留 · 二维码待更新', status: 'soon' },
]
