'use client'

import { PageHeader } from "@/app/_components/PageHeader"
import { apiFetch } from "@/app/_libs/apiFetch"
import { handleApiError } from "@/app/_libs/handleApiError"
import { supabase } from "@/app/_libs/supabase"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Unsubscribe() {
  const [agreed, setAgreed] = useState(false)
  const router = useRouter();

  const handleUnsubscribeAccount = async () => {
    const isConfirmed = confirm("本当にアカウントを削除しますか？この操作は取り消せません。")
    if(!isConfirmed) return

    try {
      await apiFetch.del("/api/users")
      await supabase.auth.signOut()
      router.replace("/login")
    } catch (error) {
      handleApiError(error, "アカウントの削除に失敗しました。")
    }
  }

  return (
    <div className="px-6 py-5 w-full">
      <PageHeader pageTitle="アカウント削除" />

      <div className="bg-(--color-danger-bg) p-6 rounded-[10px] border border-(--color-danger)/20 flex items-start gap-3 max-w-121 w-full mb-6">
        <Image src="/images/shared/icon_warning.svg" alt="" width={20} height={20} />
        <div className="flex flex-col gap-3">
          <p className="text-sm text-(--color-danger) font-medium">この操作は取り消せません</p>
          <p className="text-sm">アカウントを削除すると、すべてのデータが完全に削除されます。削除後の復元はできません。本当によろしいですか？</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-5 max-w-121 w-full">
        <div className="bg-white p-6 rounded-[10px] border border-(--color-sub)/20 w-full">
          <p className="text-(--color-sub) text-sm font-medium pb-4.5">削除されるデータ</p>
          <ul className="list-disc list-inside text-sm pb-4.5 border-b border-(--color-sub)/20">
            <li>アカウント情報（メールアドレス・パスワード）</li>
            <li>すべての健康記録データ</li>
            <li>カテゴリー設定</li>
            <li>その他、本サービスに関連するすべてのデータ</li>
          </ul>
          <div className="flex items-center gap-2.5 pt-4.5">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className=""
            />
            <label htmlFor="checkbox" className="text-sm">上記の内容を理解した上で、アカウントを削除することに同意します。</label>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/mykarte/settings"
            className="bg-white px-7 py-2 rounded-[5px] text-xs border border-(--color-text)/20 hover:opacity-70 duration-300 cursor-pointer"
            >
            削除せずに戻る
          </Link>
          <button 
            className="bg-(--color-danger-bg) px-7 py-2 rounded-[5px] text-xs text-(--color-danger) border border-(--color-danger) hover:opacity-70 duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-default"
            type="button"
            onClick={handleUnsubscribeAccount}
            disabled={!agreed}
            >
            アカウントを削除する
          </button>
        </div>
      </div>
    </div>
  )
}