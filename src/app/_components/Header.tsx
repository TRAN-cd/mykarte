'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  variant: "floating" | "fixed"
}

export default function Header({variant}: Props){

  return(
    <header className={variant === "floating" 
      ? `fixed top-8 left-1/2 -translate-x-1/2 max-w-290 w-full flex items-center justify-between bg-white py-3 pl-9 pr-4 rounded-[15px]`
      : `fixed top-0 z-50 w-full flex items-center justify-between bg-white py-3 pl-9 pr-4`}>
      <h1>
        <Link href="/"><Image src="/images/shared/logo.svg" width={106} height={34} alt="myカルテ"/></Link>
      </h1>
      <div className="nav-wrap flex items-center gap-7">
        <nav className="nav-menu">
          <ul className="flex items-center gap-2">
            <li className="text-sm font-bold py-2 px-4 rounded-[5px] hover:bg-(--color-bg) duration-300"><Link href="#about"><span className="font-en">my</span>カルテとは</Link></li>
            <li className="text-sm font-bold py-2 px-4 rounded-[5px] hover:bg-(--color-bg) duration-300"><Link href="/#use">使い方</Link></li>
            <li className="text-sm font-bold py-2 px-4 rounded-[5px] hover:bg-(--color-bg) duration-300"><Link href="/#function">便利な機能</Link></li>
            <li className="text-sm font-bold py-2 px-4 rounded-[5px] hover:bg-(--color-bg) duration-300"><Link href="/#scene">活用シーン</Link></li>
            <li className="text-sm font-bold py-2 px-4 rounded-[5px] hover:bg-(--color-bg) duration-300"><Link href="/#faq">よくあるご質問</Link></li>
          </ul>
        </nav>
        <ul className="auth-actions flex items-center gap-4">
          <Link href="/signup" className="bg-(--color-primary) rounded-[5px] py-2 px-5 text-white font-bold text-sm tracking-wider border-2 border-transparent hover:bg-transparent hover:text-(--color-primary) hover:border-(--color-primary) duration-300">無料登録</Link>
          <Link href="/login" className="rounded-[5px] py-2 px-5 font-bold text-sm hover:bg-(--color-bg) duration-300">ログイン</Link>
        </ul>
      </div>
    </header>
  )
}