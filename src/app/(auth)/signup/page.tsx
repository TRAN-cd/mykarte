'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import Link from "next/link";


export default function Page(){
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `http://localhost:3000/signup/email_verification`, 
      },
    })

    if (error) {
      console.log(error)
      alert('登録に失敗しました。')
    } else {
      setEmail('')
      alert('認証用コードを送信しました。')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-115.5 w-full mx-auto bg-white rounded-[10px] p-12 flex flex-col gap-6 border border-(--color-sub) card-shadow">
        <h2 className="text-center text-2xl font-bold">新規登録</h2>
        <p className="text-center text-[15px] leading-relaxed"><a href="/user_policy" className="text-(--color-link) border-b hover:border-transparent link-hover">利用規約</a>、<a href="/privacy" className="text-(--color-link) border-b hover:border-transparent link-hover">プライバシーポリシー</a>について同意の上、<br />以下のいずれかの方法でご登録ください。</p>
        <div className="flex items-center gap-6">
          <div className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] link-hover">
            <img src="/icons/google.png" alt="googleアカウント" className="w-7.5 h-auto"/>
          </div>
          <div className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] link-hover">
            <img src="/icons/apple.png" alt="Appleアカウント" className="w-7.5 h-auto"/>
          </div>
        </div>
        <p className="text-center text-xs divider-line">
          <span className="bg-white px-3.75 relative z-1">またはメールアドレスで登録</span>
        </p>

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

          <div className="max-w-45 w-full mx-auto pt-3">
            <button 
              className="text-center bg-(--color-primary) text-white text-xs font-medium w-full px-9 py-2 rounded-[5px] link-hover"
              type="submit"
              disabled={isSubmitting}
            >
              上記に同意して登録
            </button>
          </div>
        </form>


        <Link href="/login" className="text-center text-(--color-primary) text-xs">すでにお持ちのアカウントでログインする</Link>
      </div>
    </div>
  )
}
