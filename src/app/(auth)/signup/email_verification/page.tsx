'use client'

import { supabase } from "@/app/_libs/supabase";
import { SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/Input"
import { AuthButton } from "@/app/_components/AuthButton";
import { Card } from "@/app/_components/Card";
import { useAuthForm } from "@/app/_hooks/useAuthForm";

type Inputs = {
  email: string;
  code: string;
};

type ResendInputs = {
  email: string
}

export default function Page() {
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: {
      isDirty,
      isValid,
      isSubmitting,
      errors,
    }
  } = useAuthForm<Inputs>({
    email: "",
    code: ""
  })

  const email = watch('email')

  // ストレージからメアドを取得
  useEffect(() => {
    setValue('email', sessionStorage.getItem('email') ?? '')
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: data.email,
        token: data.code,
        type: 'email',
      })

      if (error) {
        setError("root.serverError", {
          type: "manual",
          message: "確認コードが異なります。再度お試しください。"
        })
        return
      }

      sessionStorage.removeItem('email')
      router.push('/signup/passkey_setting/')
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "確認コードが異なります。再度お試しください。"
      })
    }
  }

  const {
    register: registerResend,
    handleSubmit: handleSubmitResend,
    setError: setErrorResend,
    setValue: setValueResend,
    formState: {
      isSubmitting: isResendSubmitting,
    }
  } = useAuthForm<ResendInputs>({email: ""})

  useEffect(() => {
    setValueResend('email', sessionStorage.getItem('email') ?? '')
  }, [])

  const onReSubmit: SubmitHandler<ResendInputs> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          shouldCreateUser: true,
        },
      })

      if (error) {
        setErrorResend("root.serverError", {
          type: "manual",
          message: "しばらく時間をおいてから再度お試しください。"
        })
        return
      }

      setSuccessMessage('再送信しました。')

    } catch (error) {
      setErrorResend("root.serverError", {
        type: "manual",
        message: "エラーが発生しました。初めからお試しください。"
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

      <Card>
        <h2 className="text-center text-2xl font-bold">確認コードを入力してください</h2>
        <p className="text-center text-[15px] leading-relaxed">
          <span className="font-bold">{email}</span> に確認コードを<br />記載したメールを送信しました。<br />記載されている確認コードを入力してください。
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            htmlFor="code"
            title="確認コード"
            type="text"
            id="code"
            placeholder="00000000"
            registerProps={register("code", {
              required: "確認コードが入力されていません。",
              pattern: {
                value: /^\d{8}$/,
                message: "8桁の数字を入力してください。"
              }
            })}
            inputMode="numeric"
          />
          {errors.code &&
            <span className="text-(--color-danger) text-xs">{errors.code.message}</span>
          }

          <AuthButton
            text="次へ"
            disabled={!isDirty || !isValid || isSubmitting}
          />
        </form>

        <p className="text-center text-xs leading-relaxed">確認メールが届かない場合や誤って削除した場合は、<br />以下より再度送信してください。</p>

        <form onSubmit={handleSubmitResend(onReSubmit)} className="flex flex-col gap-3">
          <div className="w-25 mx-auto">
            <button
              className="w-full flex justify-center items-center text-(--color-primary) text-xs hover:opacity-70 duration-300 cursor-pointer"
              type="submit"
              disabled={isResendSubmitting}
            >
              再送信する
            </button>
          </div>
          {successMessage && <p className="text-center text-xs p-2">{successMessage}</p>}
        </form>
      </Card>
    </div>
  )
}