'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Footer(){

  return (
    <footer className="flex flex-col items-center gap-9 mb-6">
      <nav>
        <ul className="flex gap-3">
          <li className="text-sm font-semibold p-2 hover:opacity-80 duration-700">
            <Link href="/user_policy">利用規約</Link>
          </li>
          <li className="text-sm font-semibold p-2 hover:opacity-70 duration-800">
            <Link href="/privacy">プライバシーポリシー</Link>
          </li>
          <li className="text-sm font-semibold p-2 hover:opacity-70 duration-800">
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
      </nav>
      <small className="font-en text-sm font-semibold text-(--color-text)/70 p-2">&copy; 2026 tran ngoc kiet</small>
    </footer>
  )
}