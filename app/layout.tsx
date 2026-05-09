import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전세계 HS Code 검색 · Global HS Code Search",
  description:
    "AI가 제품 설명을 국제 HS 코드와 국가별 확장 코드로 분류해 주는 검색 도구입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
