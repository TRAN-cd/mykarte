'use client'

import { Input } from "@/app/_components/Input";
import { Textarea } from "@/app/_components/Textarea";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthForm } from "@/app/_hooks/useAuthForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

type ContactFormValues = {
  name: string;
  email: string;
  content: string;
}

export default function ContactPage() {
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");
  const steps = ["input", "confirm", "complete"];
  const currentIndex = steps.indexOf(step);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, isValid, isSubmitting, errors },
    watch
  } = useAuthForm<ContactFormValues>({ name: "", email: "", content: "" })

  const nameValue = watch("name");
  const emailValue = watch("email");
  const contentValue = watch("content");

  const { session } = useSupabaseSession();

  return (
    <div className="flex flex-col max-w-208 w-full mx-auto py-25 px-5">
      <h2 className="text-2xl font-bold pb-6">お問い合わせ</h2>

      <ul className="flex gap-3 pb-6 [&_li]:text-[10px] [&_li]:font-medium [&_li]:border [&_li]:border-(--color-primary) [&_li]:px-3 [&_li]:py-1.5 [&_li]:rounded-[20px]">
        <li className={
          0 === currentIndex
            ? "bg-(--color-primary) text-white"
            : 0 < currentIndex
              ? "bg-(--color-bg) text-(--color-primary)"
              : "border-white text-(--color-primary)"
        }>
          {0 < currentIndex && "✓ "}入力
        </li>
        <li className={
          1 === currentIndex
            ? "bg-(--color-primary) text-white"
            : 1 < currentIndex
              ? "bg-(--color-bg) text-(--color-primary)"
              : "border-white text-(--color-primary)"
        }>
          {1 < currentIndex && "✓ "}確認
        </li>
        <li className={
          2 === currentIndex
            ? "bg-(--color-primary) text-white"
            : "border-white text-(--color-primary)"
        }>
          完了
        </li>
      </ul>

      {/* 入力ステップ */}
      {step === "input" && (
        <div className="max-w-115 w-full">
          <p>お問い合わせ内容を入力してください。</p>

          <div className="flex flex-col gap-6 pt-9 pb-6">
            <div>
              <Input
                htmlFor="name"
                title="お名前"
                isRequired={true}
                type="text"
                id="name"
                placeholder="お名前"
                className="bg-white"
                registerProps={register("name", {
                  required: "お名前が入力されていません。",
                })}
              />
              {errors.name &&
                <span className="text-(--color-danger) text-xs">{errors.name.message}</span>
              }
            </div>
            <div>
              <Input
                htmlFor="email"
                title="メールアドレス"
                isRequired={true}
                type="email"
                id="email"
                placeholder="example@mykarte.com"
                className="bg-white"
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
            <div>
              <Textarea
                htmlFor="content"
                title="内容"
                isRequired={true}
                id="content"
                placeholder="お問い合わせ内容"
                className="bg-white"
                rows={6}
                registerProps={register("content", {
                  required: "お問い合わせの内容が入力されていません。"
                })}
              />
              {errors.content &&
                <span className="text-(--color-danger) text-xs">{errors.content.message}</span>
              }
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-(--color-primary) text-white border border-(--color-primary) text-sm font-medium rounded-[5px] px-4 py-2 hover:bg-white hover:text-(--color-primary) duration-300 disabled:opacity-50 cursor-pointer"
              disabled={!isDirty || !isValid}
              onClick={() => setStep("confirm")}
            >
              内容を確認する
            </button>
          </div>
        </div>
      )}

      {/* 確認ステップ */}
      {step === "confirm" && (
        <div className="max-w-115 w-full">
          <p>内容をご確認ください</p>
          <p className="text-xs text-(--color-sub) pt-3">以下の内容で送信します。修正がある場合は【戻る】をクリックしてください。</p>

          <div className="bg-white border border-(--color-sub) rounded-[10px] flex flex-col gap-3 p-6 mt-9 mb-6">
            <div className="flex flex-col gap-1.5 pb-3 border-b border-(--color-sub)/20">
              <p className="text-xs text-(--color-sub)">氏名</p>
              <p>{nameValue}</p>
            </div>
            <div className="flex flex-col gap-1.5 pb-3 border-b border-(--color-sub)/20 ">
              <p className="text-xs text-(--color-sub)">メールアドレス</p>
              <p>{emailValue}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-(--color-sub)">内容</p>
              <p>{contentValue}</p>
            </div>
          </div>

          <div className="flex justify-end gap-6">
            <button
              type="button"
              className="bg-white text-(--color-primary) border border-(--color-primary) text-sm font-medium rounded-[5px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
              onClick={() => setStep("input")}
            >
              戻る
            </button>
            <button
              type="button"
              className="bg-(--color-primary) text-white border border-(--color-primary) text-sm font-medium rounded-[5px] px-4 py-2 hover:bg-white hover:text-(--color-primary) duration-300 disabled:opacity-50 cursor-pointer"
              onClick={() => setStep("complete")}
            >
              この内容で送信する
            </button>
          </div>
        </div>
      )}

      {/* 完了ステップ */}
      {step === "complete" && (
        <div className="max-w-115 w-full">
          <div className="bg-white border border-(--color-sub) rounded-[10px] flex flex-col items-center gap-3 p-6 mt-9">
            <div className="w-12 bg-(--color-bg) rounded-full p-3">
              <Image src="/images/shared/icon_complete.svg" width="24" height="24" alt="" />
            </div>
            <div className="flex flex-col gap-3 py-3 text-center">
              <p>送信が完了しました</p>
              <p className="text-xs text-(--color-primary)">お問い合わせいただきありがとうございます。<br />内容を確認の上、通常3営業日以内に<br />ご登録のメールアドレスへご返信いたします。</p>
            </div>

            {session ? (
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/mykarte"
                  className="w-55 bg-white border border-(--color-text)/20 text-sm text-center font-medium rounded-[5px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
                >
                  ホームへ戻る
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/"
                  className="w-55 bg-white border border-(--color-text)/20 text-sm text-center font-medium rounded-[5px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
                >
                  トップページに戻る
                </Link>
                <Link
                  href="/login"
                  className="w-55 bg-white border border-(--color-text)/20 text-sm text-center font-medium rounded-[5px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
                >
                  ログインページへ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}