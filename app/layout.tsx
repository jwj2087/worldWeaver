import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorldMap Studio",
  description: "세계관 지도와 캐릭터 이동 경로를 시각화하는 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
