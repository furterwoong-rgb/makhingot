import "./globals.css";

export const metadata = {
  title: "수학 오답 진단 리포트 — 막힌 곳을 알려드립니다",
  description:
    "아이의 수학 오답 사진을 보내주시면, 어느 단원의 어떤 단계에서 막히는지 실제 풀이 근거와 함께 리포트로 정리해 드립니다.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
