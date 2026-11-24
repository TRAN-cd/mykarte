'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/Input"
import { AuthButton } from "@/app/_components/AuthButton";
import { DividerLine } from "@/app/_components/DividerLine";
import Link from "next/link";
import { Card } from "@/app/_components/Card";
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { getAuthErrorMessage } from "@/app/_libs/getAuthErrorMessage";
import { GoogleAuthButton } from "@/app/_components/GoogleAuthButton";

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

  // ゲストログイン用
  const [isGuestLoggingIn, setIsGuestLoggingIn] = useState(false)
  const handleGuestLogin = async () => {
    setIsGuestLoggingIn(true)
    try {
      const response = await fetch("/api/guest-login", { method: "POST" })
      if (!response.ok) {
        throw new Error("ゲストログインに失敗しました。時間をおいて再度お試しください。")
      }

      const { accessToken, refreshToken } = await response.json()
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      if (error) throw error

      router.push("/mykarte")
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "ゲストログインに失敗しました。時間をおいて再度お試しください。"
      })
    } finally {
      setIsGuestLoggingIn(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">

      {errors.root?.serverError && (
        <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-250 w-full text-center p-3 rounded-[10px]">
          {errors.root.serverError.message}
        </p>
      )}

      <Card size="wide">
        <h2 className="text-center text-2xl font-bold pb-6">ログイン</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
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
          </div>

          <div className="flex flex-col gap-4.5 md:border-l md:border-(--color-sub)/20 md:pl-8">
            <div className="md:hidden">
              <DividerLine text="他の方法でログインする" />
            </div>
            <p className="hidden md:block text-center text-sm font-medium">
              他の方法でログインする
            </p>

            <p className="text-center text-xs leading-relaxed">初めてGoogleアカウントでご利用の方は、18歳以上であり、<br /><a href="/user_policy" target="_blank" className="text-(--color-link) border-b hover:border-transparent hover:opacity-70 duration-300">利用規約</a>・<a href="/privacy" target="_blank" className="text-(--color-link) border-b hover:border-transparent hover:opacity-70 duration-300">プライバシーポリシー</a>に同意のうえご利用ください。</p>
            <GoogleAuthButton label="Googleでログイン" />

            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={isGuestLoggingIn}
              className="flex justify-center items-center gap-3 w-full border border-(--color-sub) py-1.75 rounded-[5px] duration-300 cursor-pointer enabled:hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isGuestLoggingIn ? "ログイン中…" : "ゲストとしてログイン"}</span>
            </button>
            <p className="text-center text-[10px] text-(--color-sub)">
              ※ゲストでは、入力した内容が他のゲストにも表示されます。<br />実際の健康情報は入力しないでください。
            </p>
          </div>
        </div>

        <Link href="/signup" className="text-center text-(--color-primary) text-xs pt-6 hover:opacity-70 duration-300">
          myカルテ の新規登録はこちら
        </Link>
      </Card>
    </div>
  )
}
