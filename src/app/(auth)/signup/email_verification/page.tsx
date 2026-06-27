'use client'

import { supabase } from "@/app/_libs/supabase";
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  code: string;
};

type ResendInputs = {
  email: string
}

export default function Page(){
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const defaultValues = {
    email: "",
    code: ""
  }

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
    },
  } = useForm<Inputs>({
    defaultValues,
    mode: "all"
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
    },
  } = useForm<ResendInputs>({
    defaultValues: {email: ''},
    mode: "all"
  })

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

      <div className="max-w-115.5 w-full mx-auto bg-white rounded-[10px] p-12 flex flex-col gap-6 border border-(--color-sub) card-shadow">
        <h2 className="text-center text-2xl font-bold">確認コードを入力してください</h2>
        <p className="text-center text-[15px] leading-relaxed">
          <span className="font-bold">{email}</span> に確認コードを<br />記載したメールを送信しました。<br />記載されている確認コードを入力してください。
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

          <label htmlFor="code" className="text-[15px] font-bold">確認コード</label>
          <input 
            type="text"
            id="code"
            inputMode="numeric"
            placeholder="00000000"
            className="input-form" 
            {...register("code", {
              required: "確認コードが入力されていません。",
              pattern: {
                value: /^\d{8}$/,
                message: "8桁の数字を入力してください。"
              }
            })}
          />
          {errors.code &&
            <span className="text-(--color-danger) text-xs">{errors.code.message}</span>
          }

          <div className="max-w-45 w-full mx-auto pt-3">
            <button 
              className="text-center bg-(--color-primary) text-white text-xs font-medium w-full px-9 py-2 rounded-[5px] link-hover disabled:opacity-50"
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
            >
              次へ
            </button>
          </div>
        </form>

        <p className="text-center text-xs leading-relaxed">確認メールが届かない場合や誤って削除した場合は、<br />以下より再度送信してください。</p>

        <form onSubmit={handleSubmitResend(onReSubmit)} className="flex flex-col gap-3">
          <div className="w-25 mx-auto">
            <button 
              className="w-full flex justify-center items-center text-(--color-primary) text-xs link-hover"
              type="submit"
              disabled={isResendSubmitting}
            >
              再送信する
            </button>
          </div>
          {successMessage && <p className="text-center text-xs p-2">{successMessage}</p>}
        </form>
      </div>
    </div>
  )
}