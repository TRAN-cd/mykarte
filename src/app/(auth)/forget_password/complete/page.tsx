'use client'

import { Card } from "@/app/_components/Card";
import Link from "next/link";

export default function Page() {

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <Card>
        <h2 className="text-center text-2xl font-bold">パスワードを変更しました</h2>
        <p className="text-center text-[15px] leading-relaxed">パスワードを変更しました。<br />引き続きサービスをお使いください。</p>

        <Link href="/login" className="max-w-45 w-full mx-auto text-center bg-(--color-primary) text-white text-xs font-medium px-9 py-2 rounded-[5px] hover:opacity-70 duration-300">
          ログインページへ
        </Link>
      </Card>
    </div>
  )
}