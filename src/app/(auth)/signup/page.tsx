'use client'

import { supabase } from "@/app/_libs/supabase";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import Link from "next/link";

type Inputs = {
  email: string;
};


export default function Page(){
  const router = useRouter()

  const defaultValues = {
    email: ""
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      isDirty,
      isValid,
      isSubmitting,
      errors,
    },
    reset,
  } = useForm<Inputs>({
    defaultValues,
    mode: "all",
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          shouldCreateUser: true,
        },
      })

      if (error) {
        setError("root.serverError", {
          type: "manual",
          message: "しばらく時間をおいてから再度お試しください。"
        })
        return
      }

      sessionStorage.setItem('email', data.email);
      reset();
      router.push('/signup/email_verification/');
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "登録に失敗しました。もう一度お試しください。"
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">

      {isSubmitting && <p className="text-(--color-primary) text-xs border border-(--color-sub) bg-(--color-bg) max-w-115 w-full text-center p-3 rounded-[10px]">送信中</p>}
        {errors.root?.serverError && (
          <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
            {errors.root.serverError.message}
          </p>
        )}

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

          <label htmlFor="email" className="text-[15px] font-bold">メールアドレス</label>
          <input 
            type="email"
            id="email"
            placeholder="example@mykarte.com"
            className="input-form" 

            {...register("email",{
              required: "メールアドレスが入力されていません。",
              pattern: {
                value: /[\w\.-]+@[\w\.-]+\.\w{2,4}/,
                message: "正しいメールアドレス形式で入力してください"
              }
            })}
          />
          {errors.email &&
            <span className="text-(--color-danger) text-xs">{errors.email.message}</span>
          }

          <div className="max-w-45 w-full mx-auto pt-3">
            <button 
              className="text-center bg-(--color-primary) text-white text-xs font-medium w-full px-9 py-2 rounded-[5px] link-hover disabled:opacity-50"
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
            >
              上記に同意して登録
            </button>
          </div>
        </form>


        <Link href="/login" className="text-center text-(--color-primary) text-xs link-hover">すでにお持ちのアカウントでログインする</Link>
      </div>
    </div>
  )
}
