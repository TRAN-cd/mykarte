'use client'

import { supabase } from "@/app/_libs/supabase";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/Input"
import { AuthButton } from "@/app/_components/AuthButton";
import { Card } from "@/app/_components/Card";
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { getAuthErrorMessage } from "@/app/_libs/authErrorHandler";

type Inputs = {
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
  } = useAuthForm<Inputs>({password: ""})

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { error } = await supabase.auth.updateUser({
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

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">

      {errors.root?.serverError && (
        <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
          {errors.root.serverError.message}
        </p>
      )}

      <Card>
        <h2 className="text-center text-2xl font-bold">パスワードを設定してください</h2>
        <p className="text-center text-[15px] leading-relaxed">パスワードを設定して登録を完了してください。</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
            text="登録を完了する"
            disabled={!isDirty || !isValid || isSubmitting}
          />
        </form>
      </Card>
    </div>
  )
}