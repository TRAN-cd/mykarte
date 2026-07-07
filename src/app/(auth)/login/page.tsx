'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/Input"
import { AuthButton } from "@/app/_components/AuthButton";
import { DividerLine } from "@/app/_components/DividerLine";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/app/_components/Card";
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { getAuthErrorMessage } from "@/app/_libs/getAuthErrorMessage";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

type Inputs = {
  email: string;
  password: string;
};

export default function Page() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      isDirty,
      isValid,
      isSubmitting,
      errors,
    }
  } = useAuthForm<Inputs>({
    email: "",
    password: ""
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        setError("root.serverError", {
          type: "manual",
          message: getAuthErrorMessage(error.code)
        })
        return
      }

      router.push('/mykarte/')
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: getAuthErrorMessage(undefined)
      })
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${appUrl}/mykarte`
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">

      {errors.root?.serverError && (
        <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
          {errors.root.serverError.message}
        </p>
      )}

      <Card>
        <h2 className="text-center text-2xl font-bold">ログイン</h2>
        <p className="text-center text-[15px] leading-relaxed">登録したメールアドレスとパスワードをご入力の上、<br />【ログイン】ボタンを押してください。</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            htmlFor="email"
            title="メールアドレス"
            type="email"
            id="email"
            placeholder="example@mykarte.com"
            registerProps={register("email", {
              required: "メールアドレスが入力されていません。",
              pattern: {
                value: /[\w\.-]+@[\w\.-]+\.\w{2,4}/,
                message: "正しいメールアドレス形式で入力してください。"
              }
            })}
          />
          {errors.email &&
            <span className="text-(--color-danger) text-xs">{errors.email.message}</span>
          }

          <Input
            htmlFor="password"
            title="パスワード(半角英数字・記号のみ 8字以上)"
            type={visible ? 'text' : 'password'}
            id="password"
            placeholder="••••••••"
            registerProps={register("password", {
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

          <AuthButton
            text="ログイン"
            disabled={!isDirty || !isValid || isSubmitting}
          />
        </form>

        <Link href="/forget_password" className="text-center text-(--color-link) text-xs hover:opacity-70 duration-300">
          パスワードをお忘れの場合
        </Link>

        <DividerLine text="他の方法でログインする" />

        <div className="flex items-center gap-6">
          <button
            onClick={handleGoogleLogin}
            className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] hover:opacity-70 duration-300 cursor-pointer">
            <Image src="/icons/google.png" alt="googleアカウント" width={30} height={26} />
          </button>
          <div className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] hover:opacity-70 duration-300">
            <Image src="/icons/apple.png" alt="Appleアカウント" width={30} height={26} />
          </div>
        </div>

        <Link href="/signup" className="text-center text-(--color-primary) text-xs hover:opacity-70 duration-300">
          myカルテ の新規登録はこちら
        </Link>
      </Card>
    </div>
  )
}
