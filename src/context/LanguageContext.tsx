import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'zh-CN' | 'zh-TW' | 'en'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const commonCopy = {
  'zh-CN': {
    competition: '第十五届中国软件杯 · A5 赛题作品',
    heroLineOne: '让每一步游览，',
    heroLineTwo: '都有智能相伴',
    heroBody: '数智游踪面向景区游客与运营方，把 AI 数字人、可信知识问答、地图导览、个性化路线与服务洞察连成一条可落地的智慧文旅服务链。',
    tryOnline: '在线体验',
    getClient: '获取客户端',
    proofAvatar: '讯飞 × Live2D 双引擎',
    proofMap: '腾讯地图 × Leaflet 双底图',
    proofRag: '本地 RAG 知识库',
    accessEyebrow: 'ACCESS EVERYWHERE',
    accessTitle: '选择适合你的使用方式',
    accessBody: '网页端立即体验，桌面端与 Android、HarmonyOS 客户端面向稳定演示和真实游客使用；安装包统一由自有 Linux 下载服务器分发。',
    availableNow: '现在可用',
    noInstall: '免安装 · 浏览器即开即用',
    directDownload: '自有服务器直连下载',
    openWeb: '打开网页版',
    downloadStatus: '查看下载状态',
    downloadNow: '直接下载',
    choosePackage: '选择安装包',
  },
  en: {
    competition: '15th China Software Cup · A5 Project',
    heroLineOne: 'Every step of the journey,',
    heroLineTwo: 'guided by intelligence',
    heroBody: 'Shuzhi Youzong connects AI avatars, grounded scenic knowledge, map guidance, personalized routes, and service insights into one deployable tourism service loop.',
    tryOnline: 'Try online',
    getClient: 'Get the client',
    proofAvatar: 'iFlytek × Live2D dual engine',
    proofMap: 'Tencent Maps × Leaflet fallback',
    proofRag: 'Local grounded RAG',
    accessEyebrow: 'ACCESS EVERYWHERE',
    accessTitle: 'Choose how you want to explore',
    accessBody: 'Try the web version instantly, use a desktop client for stable demos, or take the Android and HarmonyOS apps into the scenic area. Installers come directly from our Linux server.',
    availableNow: 'Available now',
    noInstall: 'No install · Open in browser',
    directDownload: 'Direct download from our server',
    openWeb: 'Open web app',
    downloadStatus: 'View downloads',
    downloadNow: 'Download now',
    choosePackage: 'Choose package',
  },
  'zh-TW': {
    competition: '第十五屆中國軟件杯 · A5 賽題作品',
    heroLineOne: '讓每一步遊覽，',
    heroLineTwo: '都有智能相伴',
    heroBody: '數智遊蹤面向景區遊客與營運方，把 AI 數字人、可信知識問答、地圖導覽、個人化路線與服務洞察連成一條可落地的智慧文旅服務鏈。',
    tryOnline: '線上體驗',
    getClient: '取得客戶端',
    proofAvatar: '訊飛 × Live2D 雙引擎',
    proofMap: '騰訊地圖 × Leaflet 雙底圖',
    proofRag: '本地 RAG 知識庫',
    accessEyebrow: 'ACCESS EVERYWHERE',
    accessTitle: '選擇適合你的使用方式',
    accessBody: '網頁端立即體驗，桌面端與 Android、HarmonyOS 客戶端面向穩定展示和遊客使用；安裝包統一由自有 Linux 下載伺服器分發。',
    availableNow: '現在可用',
    noInstall: '免安裝 · 瀏覽器即開即用',
    directDownload: '自有伺服器直接下載',
    openWeb: '開啟網頁版',
    downloadStatus: '查看下載狀態',
    downloadNow: '直接下載',
    choosePackage: '選擇安裝包',
  },
} as const

export type TranslationKey = keyof typeof commonCopy['zh-CN']

const LANGUAGE_STORAGE_KEY = 'shuzhiyouzong-language'

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextValue | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return value
}

function getStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return stored === 'en' || stored === 'zh-TW' ? stored : 'zh-CN'
  } catch {
    return 'zh-CN'
  }
}

export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocale] = useState<Locale>(getStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
    } catch {
      // The selected locale still works for this session when storage is unavailable.
    }
  }, [locale])

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (key: TranslationKey) => commonCopy[locale][key],
  }), [locale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
