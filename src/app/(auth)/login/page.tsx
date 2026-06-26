'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('メールアドレスまたはパスワードが間違っています。')
    } else {
      setEmail('')
      router.push('/mykarte/')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-115.5 w-full mx-auto bg-white rounded-[10px] p-12 flex flex-col gap-6 border border-(--color-sub) card-shadow">
        <h2 className="text-center text-2xl font-bold">ログイン</h2>
        <p className="text-center text-[15px] leading-relaxed">登録したメールアドレスとパスワードをご入力の上、<br />【ログイン】ボタンを押してください。</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="email" className="text-[15px] font-bold">メールアドレス</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@mykarte.com"
            className="input-form"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isSubmitting}
          />

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
              ログイン
            </button>
          </div>
        </form>

        <Link href="/forget_password" className="text-center text-(--color-link) text-xs link-hover">
          パスワードをお忘れの場合
        </Link>

        <p className="text-center text-xs divider-line py-4">
          <span className="bg-white px-3.75 relative z-1">他の方法でログインする</span>
        </p>

        <div className="flex items-center gap-6">
          <div className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] link-hover">
            <img src="/icons/google.png" alt="googleアカウント" className="w-7.5 h-auto" />
          </div>
          <div className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] link-hover">
            <img src="/icons/apple.png" alt="Appleアカウント" className="w-7.5 h-auto" />
          </div>
        </div>

        <Link href="/signup" className="text-center text-(--color-primary) text-xs link-hover">
          myカルテ の新規登録はこちら
        </Link>
      </div>
    </div>
  )
}
