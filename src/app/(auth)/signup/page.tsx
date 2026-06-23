'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import Link from "next/link";


export default function Page(){
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        // emailRedirectTo: `http://localhost:3000/signup/email_verification`, 
      },
    })

    if (error) {
      alert('登録に失敗しました。')
    } else {
      setEmail('')
      alert('認証用コードを送信しました。')
    }
    setIsSubmitting(false)
  }

  return (
    <div>
      <h2>新規登録</h2>
      <p><a href="/user_policy">利用規約</a>、<a href="/privacy">プライバシーポリシー</a>について同意の上、<br />以下のいずれかの方法でご登録ください。</p>
      <div>
        <div><img src="" alt="googleアカウント" /></div>
        <div><img src="" alt="Appleアカウント" /></div>
      </div>
      <p>またはメールアドレスで登録</p>
      <form>
        <label htmlFor="email">メールアドレス</label>
        <input 
          type="text"
          placeholder="example@mykarte.com"/>
      </form>

      <div>
        <button>上記に同意して登録</button>
      </div>

      <Link href="/login">すでにお持ちのアカウントでログインする</Link>
    </div>
  )
}
