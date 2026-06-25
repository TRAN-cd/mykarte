'use client'

import { supabase } from "@/app/_libs/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page(){
  // const [email, setEmail] = useState('')
  // const [code, setCode] = useState('')
  // const [isSubmitting, setIsSubmitting] = useState(false)
  // const router = useRouter()

  // // ストレージからメアドを取得
  // useEffect(() => {
  //   setEmail(sessionStorage.getItem('email') ?? '')
  // }, [])


  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()

  //   setIsSubmitting(true)

  //   const { error } = await supabase.auth.verifyOtp({
  //     email: email,
  //     token: code,
  //     type: 'email',
  //   })

  //   if (error) {
  //     console.log(error)
  //     alert('認証コードが異なります')
  //   } else {
  //     setEmail('')
  //     router.push('/signup/passkey_setting/')
  //   }
  //   setIsSubmitting(false)
  // }

  return (
    // <div className="flex items-center justify-center w-full">
    //   <div className="max-w-115.5 w-full mx-auto bg-white rounded-[10px] p-12 flex flex-col gap-6 border border-(--color-sub) card-shadow">
    //     <h2 className="text-center text-2xl font-bold">確認コードを入力してください</h2>
    //     <p className="text-center text-[15px] leading-relaxed">
    //       <span className="font-bold">{email}</span> に確認コードを<br />記載したメールを送信しました。<br />記載されている確認コードを入力してください。
    //     </p>

    //     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    //       <label htmlFor="number" className="text-[15px] font-bold">確認コード</label>
    //       <input 
    //         type="number"
    //         name="code"
    //         id="number"
    //         placeholder="00000000"
    //         className="input-form" 
    //         required
    //         onChange={(e) => setCode(e.target.value)}
    //         value={code}
    //         disabled={isSubmitting} 
    //       />

    //       <div className="max-w-45 w-full mx-auto pt-3">
    //         <button 
    //           className="text-center bg-(--color-primary) text-white text-xs font-medium w-full px-9 py-2 rounded-[5px] link-hover"
    //           type="submit"
    //           disabled={isSubmitting}
    //         >
    //           次へ
    //         </button>
    //       </div>
    //     </form>

    //     <p className="text-center text-xs leading-relaxed">確認メールが届かない場合や誤って削除した場合は、<br />以下より再度送信してください。</p>

    //     <div className="w-full">
    //       <button className="w-full text-center text-(--color-primary) text-xs link-hover">
    //         再送信する
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <h1>PW設定画面です。</h1>
  )
}