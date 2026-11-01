'use client'

import { useState } from "react"

export default function ContactPage() {
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");
  const steps = ["input", "confirm", "complete"];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="flex flex-col max-w-208 w-full mx-auto pt-25 px-5">
      <h2 className="text-2xl font-bold pb-6">お問い合わせ</h2>

      <ul className="flex gap-3 [&_li]:text-[10px] [&_li]:font-medium [&_li]:border [&_li]:border-(--color-primary) [&_li]:px-3 [&_li]:py-1.5 [&_li]:rounded-[20px]">
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
    </div>
  )
}