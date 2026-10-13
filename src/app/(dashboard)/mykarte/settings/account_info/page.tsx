'use client'

import { PageHeader } from "@/app/_components/PageHeader"
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession"
import { useEffect, useState } from "react";
import { Input } from "@/app/_components/Input"

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
  const currentEmail = session?.user.email;
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(false)
  const [visibleNewPassword, setVisibleNewPassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, isValid, isSubmitting, errors },
    reset
  } = useAuthForm<EmailFormValues>({ email: currentEmail })

  useEffect(() => {
    if (!isLoading) {
      reset({ email: currentEmail })
    }
  }, [isLoading, currentEmail])

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
    watch: watchPw
  } = useAuthForm<PasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

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
            <div className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5">
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
                type="button"
                className="bg-(--color-primary) text-white text-sm font-medium rounded-[8px] px-4 py-2 hover:opacity-90 duration-300"
              >
                メールアドレスを変更
              </button>
            </div>

            {/* パスワード変更 */}
            <div className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5">
              <h3 className="text-[16px] font-bold text-(--color-text) pb-3 border-b border-(--color-sub)/20 mb-3">パスワード変更</h3>

              <div className="flex flex-col gap-3 pb-4">
                <div className="flex flex-col gap-1.5">
                  <Input
                    htmlFor="current-password"
                    title="現在のパスワード"
                    type={visibleCurrentPassword ? 'text' : 'password'}
                    id="current-password"
                    placeholder="••••••••"
                    registerProps={registerPw("currentPassword", {
                      required: "パスワードが入力されていません。",
                    })}
                  />
                  {errorsPw.currentPassword &&
                    <span className="text-(--color-danger) text-xs">{errorsPw.currentPassword.message}</span>
                  }
                </div>
                <div className="flex justify-end items-center gap-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="current-password-visible"
                    checked={visibleCurrentPassword}
                    onChange={(e) => setVisibleCurrentPassword(e.target.checked)}
                    className="border-(--color-primary)"
                  />
                  <label htmlFor="current-password-visible" className="text-[10px]">パスワードを表示</label>
                </div>
              </div>

              <div className="flex flex-col gap-3 pb-4">
                <div className="flex flex-col gap-1.5">
                  <Input
                    htmlFor="new-password"
                    title="新しいパスワード"
                    type={visibleNewPassword ? 'text' : 'password'}
                    id="new-password"
                    placeholder="••••••••"
                    registerProps={registerPw("newPassword", {
                      required: "パスワードが入力されていません。",
                      pattern: {
                        value: /^[a-zA-Z0-9!-/:-@[-`{-~]{8,}$/,
                        message: "半角英数字・記号のみ 8字以上で入力してください。"
                      }
                    })}
                  />
                  {errorsPw.newPassword &&
                    <span className="text-(--color-danger) text-xs">{errorsPw.newPassword.message}</span>
                  }
                </div>
                <div className="flex justify-end items-center gap-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="new-password-visible"
                    checked={visibleNewPassword}
                    onChange={(e) => setVisibleNewPassword(e.target.checked)}
                    className="border-(--color-primary)"
                  />
                  <label htmlFor="new-password-visible" className="text-[10px]">パスワードを表示</label>
                </div>
              </div>

              <div className="flex flex-col gap-3 pb-4">
                <div className="flex flex-col gap-1.5">
                  <Input
                    htmlFor="confirm-password"
                    title="確認用パスワード"
                    type={visibleConfirmPassword ? 'text' : 'password'}
                    id="confirm-password"
                    placeholder="••••••••"
                    registerProps={registerPw("confirmPassword", {
                      required: "パスワードが入力されていません。",
                      validate: (value) => value === watchPw("newPassword") || "パスワードが一致しません。"
                    })}
                  />
                  {errorsPw.confirmPassword &&
                    <span className="text-(--color-danger) text-xs">{errorsPw.confirmPassword.message}</span>
                  }
                </div>
                <div className="flex justify-end items-center gap-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="confirm-password-visible"
                    checked={visibleConfirmPassword}
                    onChange={(e) => setVisibleConfirmPassword(e.target.checked)}
                    className="border-(--color-primary)"
                  />
                  <label htmlFor="confirm-password-visible" className="text-[10px]">パスワードを表示</label>
                </div>
              </div>

              <button
                type="button"
                className="bg-(--color-primary) text-white text-sm font-medium rounded-[8px] px-4 py-2 hover:opacity-90 duration-300"
              >
                パスワードを変更
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}