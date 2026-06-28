'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

export default function Page() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  const defaultValues = {
    email: "",
    password: ""
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
  } = useForm<Inputs>({
    defaultValues,
    mode: "all"
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("root.serverError", {
            type: "manual",
            message: "メールアドレスまたはパスワードが正しくありません。"
          })
        } else {
          setError("root.serverError", {
            type: "manual",
            message: "エラーが発生しました。しばらく時間をおいて再度お試しください。"
          })
        }
        return
      }

      router.push('/mykarte/')
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "エラーが発生しました。しばらく時間をおいて再度お試しください。"
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">

      {errors.root?.serverError && (
        <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
            {errors.root.serverError.message}
        </p>
      )}

      <div className="max-w-115.5 w-full mx-auto bg-white rounded-[10px] p-12 flex flex-col gap-6 border border-(--color-sub) card-shadow">
        <h2 className="text-center text-2xl font-bold">ログイン</h2>
        <p className="text-center text-[15px] leading-relaxed">登録したメールアドレスとパスワードをご入力の上、<br />【ログイン】ボタンを押してください。</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <label htmlFor="email" className="text-[15px] font-bold">メールアドレス</label>
          <input
            type="email"
            id="email"
            placeholder="example@mykarte.com"
            className="input-form"
            {...register("email", {
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

          <label htmlFor="password" className="text-[15px] font-bold">
            パスワード(半角英数字・記号のみ 8字以上)
          </label>
          <input
            type={visible ? 'text' : 'password'}
            id="password"
            placeholder="••••••••"
            className="input-form"
            {...register("password", {
              required: "パスワードが入力されていません。",
              pattern: {
                value: /^[a-zA-Z0-9!-/:-@[-`{-~]{8,}$/,
                message: "半角英数字・記号のみ 8字以上で入力してください。"
              }
            })}
          />
          {errors.password &&
            <span className="text-(--color-danger) text-xs">{errors.password.message}</span>
          }
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
              className="text-center bg-(--color-primary) text-white text-xs font-medium w-full px-9 py-2 rounded-[5px] link-hover disabled:opacity-50"
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
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
