import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const jpFont = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jp',
})

const enFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-en',
})

export const metadata: Metadata = {
  title: "myカルテ",
  description: "記憶に頼らず、自分の健康状態を振り返るための私専用カルテ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${jpFont.variable} ${enFont.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
