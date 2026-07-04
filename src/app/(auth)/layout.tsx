import type { Metadata } from "next";
import "../globals.css";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

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
    <div className="flex flex-col flex-1 bg-[url('/images/shared/bg.png')] bg-no-repeat bg-cover bg-fixed">
      <Header variant="fixed" />
      <main className="flex-1 flex pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
