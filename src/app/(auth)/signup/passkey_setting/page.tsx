'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(){
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      alert('エラーが発生しました。')
    } else {
      router.push('/mykarte/')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-115.5 w-full mx-auto bg-white rounded-[10px] p-12 flex flex-col gap-6 border border-(--color-sub) card-shadow">
        <h2 className="text-center text-2xl font-bold">パスワードを設定してください</h2>
        <p className="text-center text-[15px] leading-relaxed">パスワードを設定して登録を完了してください。</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="password" className="text-[15px] font-bold">
            パスワード(半角英字・記号のみ 8字以上)
          </label>
          <input 
            type={visible ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="••••••••"
            className="input-form" 
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isSubmitting} 
          />

          <div className="flex justify-end items-center gap-2">
            <input 
              type="checkbox" 
              name="checkbox"
              id="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
              className="border-(--color-primary)"
            />
            <label htmlFor="checkbox" className="text-[10px]">パスワードを表示</label>
          </div>

          <div className="max-w-45 w-full mx-auto pt-3">
            <button 
              className="text-center bg-(--color-primary) text-white text-xs font-medium w-full px-9 py-2 rounded-[5px] link-hover"
              type="submit"
              disabled={isSubmitting}
            >
              登録を完了する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}