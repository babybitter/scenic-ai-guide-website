/**
 * @fileoverview 数智游踪介绍站的全局页面布局组件。
 *
 * @description
 * 统一管理响应式页头、导航、语言与主题切换、滚动显隐行为、移动端菜单、页面出口及非文档页页脚。
 */
import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Github, Languages, Moon, Sun } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { type Locale, useLanguage } from '../context/LanguageContext'
import { Brand } from './Brand'
import { MagneticButton } from './MagneticButton'

const GITHUB_URL = 'https://github.com/babybitter/scenic-ai-guide'

const layoutCopy = {
  'zh-CN': {
    navigation: '主导航',
    nav: { home: '主页', docs: '文档', roadmap: '路线图', innovation: '项目创新点' },
    language: '切换语言',
    simplifiedChinese: '简体中文',
    traditionalChinese: '繁體中文',
    english: 'English',
    lightTheme: '切换到浅色模式',
    darkTheme: '切换到深色模式',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    appearance: '外观',
    footerDescription: '让景区知识被看见，让每一次游览都被理解。',
    footerDocs: '项目文档',
    footerRoadmap: '开发历程',
    footerInnovation: '项目创新点',
    footerFeedback: '建议反馈',
    onlineExperience: '在线体验',
    copyright: '© 2026 数智游踪 · 第十五届中国软件杯 A5 赛题作品',
  },
  'zh-TW': {
    navigation: '主導覽',
    nav: { home: '主頁', docs: '文件', roadmap: '路線圖', innovation: '專案創新點' },
    language: '切換語言',
    simplifiedChinese: '简体中文',
    traditionalChinese: '繁體中文',
    english: 'English',
    lightTheme: '切換到淺色模式',
    darkTheme: '切換到深色模式',
    openMenu: '開啟選單',
    closeMenu: '關閉選單',
    appearance: '外觀',
    footerDescription: '讓景區知識被看見，讓每一次遊覽都被理解。',
    footerDocs: '專案文件',
    footerRoadmap: '開發歷程',
    footerInnovation: '專案創新點',
    footerFeedback: '建議回饋',
    onlineExperience: '線上體驗',
    copyright: '© 2026 數智遊蹤 · 第十五屆中國軟件杯 A5 賽題作品',
  },
  en: {
    navigation: 'Main navigation',
    nav: { home: 'Home', docs: 'Docs', roadmap: 'Roadmap', innovation: 'Innovation' },
    language: 'Change language',
    simplifiedChinese: '简体中文',
    traditionalChinese: '繁體中文',
    english: 'English',
    lightTheme: 'Switch to light mode',
    darkTheme: 'Switch to dark mode',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    appearance: 'Appearance',
    footerDescription: 'Make scenic knowledge visible and every journey understood.',
    footerDocs: 'Documentation',
    footerRoadmap: 'Development roadmap',
    footerInnovation: 'Project innovation',
    footerFeedback: 'Feedback',
    onlineExperience: 'Try online',
    copyright: '© 2026 Shuzhi Youzong · China Software Cup A5 Project',
  },
} as const

/**
 * @description 渲染全站公共布局，并协调导航、主题、语言、滚动页头和移动端菜单的交互状态。
 * @returns {import('react').JSX.Element} 包含公共页头、当前子路由页面及条件页脚的站点外壳。
 * @example
 * <Route element={<SiteLayout />}>
 *   <Route path="/" element={<HomePage />} />
 * </Route>
 */
export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [scrolled, setScrolled] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const lastScrollY = useRef(0)
  const scrollFrame = useRef<number | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const isDocs = location.pathname.startsWith('/docs')
  const { locale, setLocale } = useLanguage()
  const copy = layoutCopy[locale]
  const navItems = [
    { to: '/', label: copy.nav.home, end: true },
    { to: '/docs', label: copy.nav.docs },
    { to: '/roadmap', label: copy.nav.roadmap },
    { to: '/innovation', label: copy.nav.innovation },
  ]

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    /**
     * @description 将滚动状态更新合并到下一帧，并根据页面类型、菜单状态和滚动方向控制页头显隐。
     * @returns {void} 不返回值。
     * @example
     * window.addEventListener('scroll', onScroll)
     */
    const onScroll = () => {
      if (scrollFrame.current !== null) return

      scrollFrame.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY.current

        setScrolled(currentScrollY > 12)
        if (isDocs || menuOpen || currentScrollY <= 12) {
          setHeaderHidden(false)
        } else if (currentScrollY > 80 && delta > 0) {
          setHeaderHidden(true)
        } else if (delta < 0) {
          setHeaderHidden(false)
        }

        lastScrollY.current = currentScrollY
        scrollFrame.current = null
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current)
        scrollFrame.current = null
      }
    }
  }, [isDocs, menuOpen])

  useEffect(() => {
    /**
     * @description 在用户按下 Escape 键时关闭移动端菜单与语言选择面板。
     * @param {KeyboardEvent} event 浏览器键盘事件。
     * @returns {void} 不返回值。
     * @example
     * window.addEventListener('keydown', onKeyDown)
     */
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setLanguageOpen(false)
      }
    }

    /**
     * @description 当指针按下位置不在页头内部时关闭语言选择面板。
     * @param {PointerEvent} event 浏览器原生指针按下事件。
     * @returns {void} 不返回值。
     * @example
     * window.addEventListener('pointerdown', onPointerDown)
     */
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMenuOpen(false)
      setLanguageOpen(false)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /**
   * @description 完成站内导航后关闭菜单与语言面板，并将页面滚动位置重置到顶部。
   * @returns {void} 不返回值。
   * @example
   * onNavigation()
   */
  const onNavigation = () => {
    setMenuOpen(false)
    setLanguageOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  /**
   * @description 切换移动端导航菜单，同时关闭语言面板并确保页头保持可见。
   * @returns {void} 不返回值。
   * @example
   * toggleMenu()
   */
  const toggleMenu = () => {
    setLanguageOpen(false)
    setHeaderHidden(false)
    setMenuOpen((value) => !value)
  }

  /**
   * @description 切换语言选择面板，同时关闭移动端菜单并确保页头保持可见。
   * @returns {void} 不返回值。
   * @example
   * toggleLanguage()
   */
  const toggleLanguage = () => {
    setMenuOpen(false)
    setHeaderHidden(false)
    setLanguageOpen((value) => !value)
  }

  /**
   * @description 应用指定站点语言，并在选择完成后关闭语言菜单。
   * @param {Locale} nextLocale 用户选择的目标语言代码。
   * @returns {void} 不返回值。
   * @example
   * selectLocale('zh-CN')
   */
  const selectLocale = (nextLocale: Locale) => {
    setLocale(nextLocale)
    setLanguageOpen(false)
  }

  return (
    <div className="site-shell">
      <header ref={headerRef} className={`site-header ${scrolled ? 'is-scrolled' : ''} ${headerHidden ? 'is-hidden' : ''}`}>
        <div className="header-inner">
          <Brand />
          <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label={copy.navigation}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={onNavigation}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mobile-menu-extras">
              <button className="mobile-theme-row" type="button" onClick={() => setDark((value) => !value)}>
                <span>{copy.appearance}</span>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a className="mobile-github-row" href={GITHUB_URL} target="_blank" rel="noreferrer">
                <Github size={19} />
                <span>GitHub</span>
              </a>
            </div>
          </nav>
          <div className="header-actions">
            <div className="language-control">
              <button
                className="language-button"
                type="button"
                aria-label={copy.language}
                aria-expanded={languageOpen}
                onClick={toggleLanguage}
              >
                <Languages size={18} />
                <ChevronDown size={13} />
              </button>
              {languageOpen && (
                <div className="language-menu" role="menu">
                  <strong>{copy.language}</strong>
                  <button className={locale === 'zh-CN' ? 'current' : undefined} type="button" role="menuitem" onClick={() => selectLocale('zh-CN')}>
                    <span>{copy.simplifiedChinese}</span>
                    {locale === 'zh-CN' && <Check size={15} />}
                  </button>
                  <button className={locale === 'en' ? 'current' : undefined} type="button" role="menuitem" onClick={() => selectLocale('en')}>
                    <span>{copy.english}</span>
                    {locale === 'en' && <Check size={15} />}
                  </button>
                  <button className={locale === 'zh-TW' ? 'current' : undefined} type="button" role="menuitem" onClick={() => selectLocale('zh-TW')}>
                    <span>{copy.traditionalChinese}</span>
                    {locale === 'zh-TW' && <Check size={15} />}
                  </button>
                </div>
              )}
            </div>
            <MagneticButton
              className="icon-button desktop-theme-button"
              ariaLabel={dark ? copy.lightTheme : copy.darkTheme}
              onClick={() => setDark((value) => !value)}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </MagneticButton>
            <MagneticButton className="icon-button header-github-link" href={GITHUB_URL} ariaLabel="GitHub">
              <Github size={19} />
            </MagneticButton>
            <button
              className={`menu-button ${menuOpen ? 'is-open' : ''}`}
              type="button"
              aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span className="menu-glyph" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      {!isDocs && <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Brand />
            <p>{copy.footerDescription}</p>
          </div>
          <div className="footer-links">
            <NavLink to="/docs">{copy.footerDocs}</NavLink>
            <NavLink to="/roadmap">{copy.footerRoadmap}</NavLink>
            <NavLink to="/innovation">{copy.footerInnovation}</NavLink>
            <NavLink to="/feedback">{copy.footerFeedback}</NavLink>
            <a href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">{copy.onlineExperience}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{copy.copyright}</span>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">闽ICP备2025107095号-3</a>
        </div>
      </footer>}
    </div>
  )
}
