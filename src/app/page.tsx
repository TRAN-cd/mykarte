'use client'

import Image from "next/image";
import Header from "./_components/Header"
import Footer from "./_components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-[url('/images/shared/bg.png')] bg-no-repeat bg-cover bg-fixed">
      <Header variant="floating" />
      <main className="flex-1 flex">
        <div className="font-bold text-6xl w-full flex justify-center items-center h-[80vh]">
          Topページコンテンツ
        </div>
      </main>
      <Footer />
    </div>
  );
}
