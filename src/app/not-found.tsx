'use client'

import Image from "next/image"
import Link from "next/link"


export default function NotFound(){

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <h2 className="">
        <Image src="/images/not-found/404.png" width="520" height="324" alt="404"/>
      </h2>
      <h3 className="text-2xl font-medium pb-6">ページが見つかりません</h3>
      <p className="text-center pb-6">お探しのページは存在しないか、移動または削除された可能性があります。<br />URLをご確認の上、もう一度お試しください。</p>
      <div className="flex items-center gap-3">
        <Link href="/" className="text-xs font-medium px-13 py-3 bg-white rounded-[5px] border-2 border-(--color-text)/20 link-hover">トップページに戻る</Link>
        <Link href="/login" className="text-xs font-medium px-13 py-3 bg-white rounded-[5px] border-2 border-(--color-text)/20 link-hover">ログインページへ</Link>
      </div>
    </section>
  )
}