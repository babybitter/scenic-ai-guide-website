"use client";

import { Apple, ArrowUpRight, AppWindow, Download, Globe2, Laptop, MonitorDown, Smartphone } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const available = [
  { name: "网页端", detail: "打开即用", icon: Globe2, href: "https://www.shuzhiyouzong.cn/" },
  { name: "Windows", detail: "x64 客户端", icon: MonitorDown, href: "https://www.shuzhiyouzong.cn/downloads/shuzhiyouzong-windows-x64.exe" },
  { name: "Linux", detail: "AppImage", icon: Laptop, href: "https://www.shuzhiyouzong.cn/downloads/shuzhiyouzong-linux-x86_64.AppImage" },
  { name: "macOS", detail: "通用版本", icon: Apple, href: "https://www.shuzhiyouzong.cn/downloads/shuzhiyouzong-macos-universal.dmg" },
];

const expansion = [
  { name: "移动端 App", icon: Smartphone },
  { name: "iOS", icon: Apple },
  { name: "鸿蒙", icon: AppWindow },
  { name: "微信小程序", icon: AppWindow },
  { name: "移动端 H5", icon: Globe2 },
];

export function PlatformSection() {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div className="reveal" ref={revealRef}>
      <section className="section container platforms" id="downloads">
        <div className="section-heading section-heading--row">
          <div><span className="eyebrow">MULTI-PLATFORM</span><h2>从大屏到掌心，随时出发</h2></div>
          <p>同一套导览能力，适配不同景区、设备与出行场景。所有安装包均由国内服务器直连分发。</p>
        </div>
        <div className="platforms__layout">
          <div className="platforms__primary">
            <div className="platforms__label"><span>现在可用</span><small>4 个终端</small></div>
            <div className="platforms__grid">
              {available.map((platform) => {
                const Icon = platform.icon;
                return <a href={platform.href} className="platform-card" key={platform.name}><span className="platform-card__icon"><Icon size={21} /></span><div><strong>{platform.name}</strong><small>{platform.detail}</small></div>{platform.name === "网页端" ? <ArrowUpRight size={17} /> : <Download size={17} />}</a>;
              })}
            </div>
          </div>
          <div className="platforms__expansion">
            <div className="platforms__label"><span>更多场景</span><small>持续拓展</small></div>
            <div className="platforms__rail">
              {expansion.map((platform) => { const Icon = platform.icon; return <button type="button" className="platform-mini" key={platform.name}><Icon size={18} /><span>{platform.name}</span></button>; })}
              <div className="platform-qr"><span className="platform-qr__placeholder">扫码入口</span><p>二维码与设备下载入口预留区</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
