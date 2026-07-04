'use client'

import { supabase } from "@/app/_libs/supabase";
import { SubmitHandler } from "react-hook-form"
import { useState } from "react";
import { Input } from "@/app/_components/Input"
import { AuthButton } from "@/app/_components/AuthButton";
import { Card } from "@/app/_components/Card";
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { getAuthErrorMessage } from "@/app/_libs/authErrorHandler";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

type Inputs = {
  email: string;
};

export default function Page() {
  const [isSuccess, setIsSuccess] = useState(false)

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
  } = useAuthForm<Inputs>({ email: "" })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${appUrl}/forget_password/input/password`,
        })

        if (error) {
          setError("root.serverError", {
            type: "manual",
            message: getAuthErrorMessage(error.code)
          })
          return
        }

      setIsSuccess(true)
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: getAuthErrorMessage(undefined)
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      {isSuccess && (
        <p className="text-(--color-text) text-xs border border-(--color-sub) bg-(--color-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
          パスワードリセットに必要なメールを送信しました。<br />
          30分以内にメール記載のリンクをクリックし、<br />
          パスワードの再設定に進んでください。</p>
      )}
      {isSubmitting && <p className="text-(--color-primary) text-xs border border-(--color-sub) bg-(--color-bg) max-w-115 w-full text-center p-3 rounded-[10px]">送信中</p>}
      {errors.root?.serverError && (
        <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
          {errors.root.serverError.message}
        </p>
      )}

      <Card>
        <h2 className="text-center text-2xl font-bold">パスワードをリセットする</h2>
        <p className="text-center text-[15px] leading-relaxed">
          「パスワード再設定ページのURL」を、<br />登録メールアドレスに送信します。<br />登録メールアドレスを入力し【送信する】を<br />押してください。
        </p>

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

          <AuthButton
            text="送信する"
            disabled={!isDirty || !isValid || isSubmitting}
          />
        </form>
      </Card>
    </div>
  )
}