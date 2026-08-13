"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "./site-shell";

const sections = [
  {
    label: "基础",
    items: [
      { label: "项目介绍", id: "intro" },
      { label: "核心能力", id: "capabilities" },
    ],
  },
  {
    label: "安装与部署",
    items: [
      { label: "环境准备", id: "requirements" },
      { label: "本地部署", id: "local-deploy" },
      { label: "容器化部署", id: "docker-deploy" },
    ],
  },
  {
    label: "使用指南",
    items: [
      { label: "创建景区", id: "create-scenic" },
      { label: "配置导览内容", id: "content-config" },
      { label: "发布多端应用", id: "publish" },
    ],
  },
  {
    label: "技术方案",
    items: [
      { label: "技术选型", id: "stack" },
      { label: "方案对比", id: "comparison" },
      { label: "双引擎兜底", id: "fallback" },
    ],
  },
  {
    label: "致谢",
    items: [{ label: "致谢", id: "thanks" }],
  },
];

export function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [active, setActive] = useState("intro");
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ids = sections.flatMap((section) => section.items.map((item) => item.id));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-110px 0px -68%", threshold: [0, 1] });
    ids.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  function toggle(label: string) {
    setCollapsed((current) => { const next = new Set(current); if (next.has(label)) next.delete(label); else next.add(label); return next; });
  }

  const sidebar = (
    <nav className="docs-sidebar__nav" aria-label="文档目录">
      {sections.map((section) => <section key={section.label}><button type="button" onClick={() => toggle(section.label)} aria-expanded={!collapsed.has(section.label)}><span>{section.label}</span><ChevronDown size={14} /></button>{!collapsed.has(section.label) ? section.items.map((item) => <a href={`#${item.id}`} className={active === item.id ? "is-active" : ""} key={item.id} onClick={() => setOpen(false)}>{item.label}</a>) : null}</section>)}
    </nav>
  );

  return (
    <div className="docs-page">
      <SiteHeader />
      <button className="docs-menu-button" type="button" onClick={() => setOpen(true)}><Menu size={17} />目录</button>
      <aside className={`docs-sidebar ${open ? "is-open" : ""}`}><div className="docs-sidebar__mobile-head"><strong>文档目录</strong><button type="button" onClick={() => setOpen(false)} aria-label="关闭目录"><X size={18} /></button></div>{sidebar}</aside>
      {open ? <button className="docs-backdrop" type="button" onClick={() => setOpen(false)} aria-label="关闭目录" /> : null}
      <main className="docs-main"><article className="docs-article">{children}</article><aside className="docs-outline"><div><strong>本页目录</strong>{sections.flatMap((section) => section.items).map((item) => <a className={active === item.id ? "is-active" : ""} href={`#${item.id}`} key={item.id}>{item.label}</a>)}</div></aside></main>
    </div>
  );
}

export function DocsLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  return <Link href={href}>{children}</Link>;
}
