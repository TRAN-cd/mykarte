'use client'

import { supabase } from "@/app/_libs/supabase";
import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/Input"
import { AuthButton } from "@/app/_components/AuthButton";
import Link from "next/link";
import Image from "next/image";
import { DividerLine } from "@/app/_components/DividerLine";
import { Card } from "@/app/_components/Card";
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { getAuthErrorMessage } from "@/app/_libs/authErrorHandler";

type Inputs = {
  email: string;
};

export default function Page() {
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
    },
    reset,
  } = useAuthForm<Inputs>({ email: "" })

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
          message: getAuthErrorMessage(error.code)
        })
        return
      }

      sessionStorage.setItem('email', data.email);
      reset();
      router.push('/signup/email_verification/');
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: getAuthErrorMessage(undefined)
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
        <h2 className="text-center text-2xl font-bold">新規登録</h2>
        <p className="text-center text-[15px] leading-relaxed"><a href="/user_policy" className="text-(--color-link) border-b hover:border-transparent hover:opacity-70 duration-300">利用規約</a>、<a href="/privacy" className="text-(--color-link) border-b hover:border-transparent hover:opacity-70 duration-300">プライバシーポリシー</a>について同意の上、<br />以下のいずれかの方法でご登録ください。</p>
        <div className="flex items-center gap-6">
          <div className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] hover:opacity-70 duration-300">
            <Image src="/icons/google.png" alt="googleアカウント" width={30} height={26} />
          </div>
          <div className="border border-(--color-sub) px-17.25 py-1.75 rounded-[30px] hover:opacity-70 duration-300">
            <Image src="/icons/apple.png" alt="Appleアカウント" width={30} height={26} />
          </div>
        </div>
        <DividerLine text="またはメールアドレスで登録" />

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
            text="上記に同意して登録"
            disabled={!isDirty || !isValid || isSubmitting}
          />
        </form>


        <Link href="/login" className="text-center text-(--color-primary) text-xs hover:opacity-70 duration-300">すでにお持ちのアカウントでログインする</Link>
      </Card>
    </div>
  )
}
