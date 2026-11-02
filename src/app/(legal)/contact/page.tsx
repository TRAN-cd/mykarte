'use client'

import { Input } from "@/app/_components/Input";
import { Textarea } from "@/app/_components/Textarea";
import { useState } from "react"

export default function ContactPage() {
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");
  const steps = ["input", "confirm", "complete"];
  const currentIndex = steps.indexOf(step);

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

      <div className="max-w-115 w-full">
        <p>お問い合わせ内容を入力してください。</p>

        <div className="flex flex-col gap-6 pt-9 pb-6">
          <Input
            htmlFor="name"
            title="氏名"
            isRequired={true}
            type="text"
            id="name"
            placeholder="お名前"
            className="bg-white"
          // registerProps={}
          />
          <Input
            htmlFor="email"
            title="メールアドレス"
            isRequired={true}
            type="email"
            id="email"
            placeholder="example@mykarte.com"
            className="bg-white"
          // registerProps={}
          />
          <Textarea
            htmlFor="content"
            title="内容"
            isRequired={true}
            id="content"
            placeholder="お問い合わせ内容"
            className="bg-white"
            rows={6}
          // registerProps={}
          />
        </div>

        <button
          type="button"
          className="bg-(--color-primary) text-white text-sm font-medium rounded-[5px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer mt-8"
          // disabled={!isDirty || !isValid}
        >
          内容を確認する
        </button>
      </div>
    </div>
  )
}