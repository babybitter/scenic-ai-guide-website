import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Github, Languages, Moon, Sun } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { type Locale, useLanguage } from '../context/LanguageContext'
import { Brand } from './Brand'

const GITHUB_URL = 'https://github.com/babybitter/scenic-ai-guide'

const layoutCopy = {
  'zh-CN': {
    navigation: '主导航',
    nav: { home: '主页', docs: '文档', roadmap: '路线图', innovation: '项目创新点' },
    language: '切换语言',
    simplifiedChinese: '简体中文',
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
  en: {
    navigation: 'Main navigation',
    nav: { home: 'Home', docs: 'Docs', roadmap: 'Roadmap', innovation: 'Innovation' },
    language: 'Change language',
    simplifiedChinese: '简体中文',
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
    const onScroll = () => {
      if (scrollFrame.current !== null) return

      scrollFrame.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY.current

        setScrolled(currentScrollY > 12)
        if (menuOpen || currentScrollY <= 12) {
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
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setLanguageOpen(false)
      }
    }

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

  const onNavigation = () => {
    setMenuOpen(false)
    setLanguageOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const toggleMenu = () => {
    setLanguageOpen(false)
    setHeaderHidden(false)
    setMenuOpen((value) => !value)
  }

  const toggleLanguage = () => {
    setMenuOpen(false)
    setHeaderHidden(false)
    setLanguageOpen((value) => !value)
  }

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
                </div>
              )}
            </div>
            <button
              className="icon-button desktop-theme-button"
              type="button"
              aria-label={dark ? copy.lightTheme : copy.darkTheme}
              onClick={() => setDark((value) => !value)}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a className="icon-button header-github-link" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={19} />
            </a>
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
