'use client'

import { PageHeader } from "@/app/_components/PageHeader"
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession"
import { useEffect, useState, useRef } from "react";
import { Input } from "@/app/_components/Input"
import { supabase } from "@/app/_libs/supabase";
import { PasswordInput } from "@/app/_components/settings/PasswordInput";

type EmailFormValues = {
  email: string;
};

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string
}

export default function AccountInfo() {
  const { session, isLoading } = useSupabaseSession();
  const loginMethod = session?.user.app_metadata.provider;
  const [emailSubmitSuccess, setEmailSubmitSuccess] = useState(false)
  const currentEmail = session?.user.email;
  const [passwordSubmitSuccess, setPasswordSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, isValid, isSubmitting, errors },
    reset,
    watch
  } = useAuthForm<EmailFormValues>({ email: currentEmail })

  useEffect(() => {
    if (!isLoading) {
      reset({ email: currentEmail })
    }
  }, [isLoading, currentEmail])

  const emailValue = watch("email")
  useEffect(() => {
    setEmailSubmitSuccess(false)
  }, [emailValue])

  const onSubmitEmail = async (data: EmailFormValues) => {
    setEmailSubmitSuccess(false)
    const { error } = await supabase.auth.updateUser({
      email: data.email
    })

    if (error) {
      setError("root.serverError", {
        type: "manual",
        message: "メールアドレスの変更に失敗しました。"
      })
      return
    }
    setEmailSubmitSuccess(true)
  }

  const {
    register: registerPw,
    handleSubmit: handleSubmitPw,
    setError: setErrorPw,
    formState: {
      isDirty: isDirtyPw,
      isValid: isValidPw,
      isSubmitting: isSubmittingPw,
      errors: errorsPw
    },
    reset: resetPw,
    watch: watchPw,
    trigger: triggerPw
  } = useAuthForm<PasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const isFirstRender = useRef(true);
  const newPasswordValue = watchPw("newPassword");
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
    triggerPw("confirmPassword")
  }, [newPasswordValue])

  const onSubmitPassword = async (data: PasswordFormValues) => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: currentEmail ?? "",
      password: data.currentPassword
    })

    if (signInError) {
      setErrorPw("root.serverError", {
        type: "manual",
        message: "現在のパスワードが正しくありません。"
      })
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: data.newPassword
    })
    if (updateError) {
      setErrorPw("root.serverError", {
        type: "manual",
        message: "パスワードの変更に失敗しました。"
      })
      return
    }

    resetPw()
    setPasswordSubmitSuccess(true)
  }

  if (isLoading) return (
    <div className="px-6 py-5">
      <p className="text-sm text-(--color-sub) text-center py-10">読み込み中...</p>
    </div>
  );


  return (
    <div className="px-6 py-5 w-full">
      <PageHeader pageTitle="アカウント情報変更" />

      {
        loginMethod === "google" ? (
          <div className="flex flex-col items-center gap-8 max-w-121 w-full bg-white border border-(--color-sub)/20 rounded-[10px] p-5">
            <p className="text-sm text-(--color-sub) text-center">
              Googleアカウントでログインしています。
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 max-w-121 w-full">
            {/* メールアドレス変更 */}
            {errors.root?.serverError && (
              <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
                {errors.root.serverError.message}
              </p>
            )}
            {emailSubmitSuccess && (
              <p className="text-(--color-primary) text-xs border border-(--color-primary) bg-(--color-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
                新しいメールアドレスに確認メールを送信しました。<br />メール内のリンクを選択して、変更を完了してください。
              </p>
            )}
            <form
              onSubmit={handleSubmit(onSubmitEmail)}
              className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5">
              <h3 className="text-[16px] font-bold text-(--color-text) pb-3 border-b border-(--color-sub)/20 mb-3">メールアドレス変更</h3>

              <div className="flex flex-col gap-1.5 pb-4">
                <Input
                  htmlFor="email"
                  title="現在のメールアドレス"
                  type="email"
                  id="email"
                  placeholder={currentEmail}
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
              </div>

              <button
                type="submit"
                className="bg-(--color-primary) text-white text-sm font-medium rounded-[8px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
                disabled={!isDirty || !isValid || isSubmitting}
              >
                メールアドレスを変更
              </button>
            </form>

            {/* パスワード変更 */}
            {errorsPw.root?.serverError && (
              <p className="text-(--color-danger) text-xs border border-(--color-danger) bg-(--color-danger-bg) max-w-115 w-full text-center p-3 rounded-[10px]">
                {errorsPw.root.serverError.message}
              </p>
            )}
            <form
              onSubmit={handleSubmitPw(onSubmitPassword)}
              className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5"
            >
              <h3 className="text-[16px] font-bold text-(--color-text) pb-3 border-b border-(--color-sub)/20 mb-3">パスワード変更</h3>

              <PasswordInput
                htmlFor="current-password"
                title="現在のパスワード"
                registerProps={registerPw("currentPassword", {
                  required: "パスワードが入力されていません。",
                })}
                errorMessage={errorsPw.currentPassword?.message}
              />

              <PasswordInput
                htmlFor="new-password"
                title="新しいパスワード"
                registerProps={registerPw("newPassword", {
                  required: "パスワードが入力されていません。",
                  pattern: {
                    value: /^[a-zA-Z0-9!-/:-@[-`{-~]{8,}$/,
                    message: "半角英数字・記号のみ 8字以上で入力してください。"
                  }
                })}
                errorMessage={errorsPw.newPassword?.message}
              />

              <PasswordInput
                htmlFor="confirm-password"
                title="確認用パスワード"
                registerProps={registerPw("confirmPassword", {
                  required: "パスワードが入力されていません。",
                  validate: (value) => value === watchPw("newPassword") || "パスワードが一致しません。"
                })}
                errorMessage={!passwordSubmitSuccess ? errorsPw.confirmPassword?.message : undefined}
              />

              <button
                type="submit"
                className="bg-(--color-primary) text-white text-sm font-medium rounded-[8px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
                disabled={!isDirtyPw || !isValidPw || isSubmittingPw}
              >
                パスワードを変更
              </button>
              {passwordSubmitSuccess && (
                <p className="text-(--color-primary) text-xs border border-(--color-primary) bg-(--color-bg) max-w-115 w-full text-center p-3 rounded-[10px] mt-3">
                  パスワードを変更しました。
                </p>
              )}
            </form>
          </div>
        )
      }
    </div >
  )
}