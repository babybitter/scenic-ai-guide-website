"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "./brand-logo";

const navItems = [
  { label: "主页", href: "/" },
  { label: "文档", href: "/docs" },
  { label: "路线图", href: "/roadmap" },
  { label: "项目创新点", href: "/innovation" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("scenic-theme");
    const nextDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", nextDark);
    const frame = window.requestAnimationFrame(() => setDark(nextDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("scenic-theme", next ? "dark" : "light");
  }

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <BrandLogo />
        <div className="site-header__desktop">
          <nav className="main-nav" aria-label="主导航">
            {navItems.map((item) => (
              <Link className={pathname === item.href ? "is-active" : ""} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="header-divider" />
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? "切换浅色主题" : "切换深色主题"}>
            <span>{dark ? <Moon size={12} /> : <Sun size={12} />}</span>
          </button>
        </div>
        <div className="site-header__mobile-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={dark ? "切换浅色主题" : "切换深色主题"}>{dark ? <Moon size={17} /> : <Sun size={17} />}</button>
          <button className="icon-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="打开导航" aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {open ? (
        <nav className="mobile-nav" aria-label="移动端导航">
          {navItems.map((item) => (
            <Link className={pathname === item.href ? "is-active" : ""} href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
          <div className="mobile-nav__note">让技术隐于山水，让讲解恰逢其时。</div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <BrandLogo compact />
        <p>让每一段旅程，都有智慧相伴。</p>
        <div className="site-footer__meta">
          <span>© 2026 数智游踪</span>
          <span>主站：www.shuzhiyouzong.cn</span>
          <span>文档：docs.shuzhiyouzong.cn</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children, footer = true }: Readonly<{ children: React.ReactNode; footer?: boolean }>) {
  return (
    <div className="site-page">
      <SiteHeader />
      {children}
      {footer ? <SiteFooter /> : null}
    </div>
  );
}
