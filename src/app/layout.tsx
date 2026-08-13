import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shuzhiyouzong.cn"),
  title: {
    default: "数智游踪｜智慧景区 AI 导览",
    template: "%s｜数智游踪",
  },
  description: "融合 AI 智能讲解、双地图导览与双数字人引擎的全端智慧景区导览平台。",
  keywords: ["数智游踪", "智慧景区", "AI 导览", "数字人", "智能讲解", "路线规划"],
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#10100f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
