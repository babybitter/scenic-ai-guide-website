import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Brand } from './Brand'

const navItems = [
  { to: '/', label: '主页', end: true },
  { to: '/docs', label: '文档' },
  { to: '/roadmap', label: '路线图' },
  { to: '/innovation', label: '项目创新点' },
]

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isDocs = location.pathname.startsWith('/docs')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const onNavigation = () => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Brand />
          <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="主导航">
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
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={dark ? '切换到浅色模式' : '切换到深色模式'}
              onClick={() => setDark((value) => !value)}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="icon-button menu-button"
              type="button"
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
            <p>让景区知识被看见，让每一次游览都被理解。</p>
          </div>
          <div className="footer-links">
            <NavLink to="/docs">项目文档</NavLink>
            <NavLink to="/roadmap">开发历程</NavLink>
            <NavLink to="/innovation">项目创新点</NavLink>
            <NavLink to="/feedback">建议反馈</NavLink>
            <a href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">在线体验</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 数智游踪 · 第十五届中国软件杯 A5 赛题作品</span>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">闽ICP备2025107095号-3</a>
        </div>
      </footer>}
    </div>
  )
}
